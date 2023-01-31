import { v4 as uuid } from 'uuid'

/**
 * This parser should manage to detect if an clipbaord content comes from microsoft word (mso) or office365 (o365)
 * And them clean and transform the data into something, that tiptap can display nested (un)orderen lists
 *
 * Because Microsoft is quite special the way they store data in their XML, its likely that this functions
 * have to be adjusted to optimize special cases and not tested versions.
 *
 * The main method "handleWordContent" is designed to increase and in the future may handle images or tables as well
 *
 */

/**
 * Try to determin if the snippet from the clipboard comes from MS Office
 *
 * @param snippet{string}
 *
 * @return {boolean}
 */
function checkIfMso (snippet) {
  return (/class="?Mso|style="[^"]*\bmso-|style='[^']*\bmso-|w:WordDocument|office:wo/i).test(snippet)
}

/**
 * Try to determine if the snippet from the clipboard comes from Office365.
 *
 * @param snippet{string}
 *
 * @return {boolean}
 */
function checkIfOffice365 (snippet) {
  return (/class="OutlineElement/).test(snippet)
}

/**
 * Transforms a list item from office365 to a readable internal exchange Object
 *
 * Office365 stores the information for lists on the li items with a bunch of "data" and "data-aria" attributes
 * instead of nesting them.
 * To make the data handleable, we axtract that infos to a "Plain old Javascript Object"
 *
 * @param li{Element}
 *
 * @returns {Object<listId, indent, type, content>}
 */
function createItemFrom365List (li) {
  const indent = parseInt(li.getAttribute('data-aria-level')) // Current level of indentation
  const listId = parseInt(li.getAttribute('data-listid')) // List ID
  const type = li.parentElement.nodeName // Can be 'ul' or 'ol'
  const content = li.innerHTML.replace(/&nbsp;/gmi, ' ')

  return { listId, indent, type, content }
}

/**
 * Transforms a list item from Mso to a readable and manageable object
 *
 * Microsoft Office stores all items in a kind of plain structure, List items too.
 * The information, if an item is a list item is defined by the class name "[class^=MsoList]".
 * Level and List-Id is put in the style attribute.
 * To determin if its an ordered list, we have to check the leading listStyleType.
 *
 * @param li{Element}
 *
 * @returns {Object<listId, indent, type, content, listStyleType>}
 */
function createItemFromMsoList (li) {
  // "listInfo" is expected to be something something like "mso-list: l1 level1 lfo1"
  const listInfo = li.getAttribute('style').match(/mso-list:([^'|^"|^;]*)/i)[0] // Find ListInfo
  const indent = parseInt(listInfo.match(/level\d+/i)[0].slice(5)) // Strip "level" // current level of indentation
  const listId = listInfo.match(/lfo\d+/i)[0] || '' // List ID
  /*
   * To define if its an OL or UL, we first have to create the whole List.
   * Defining the type will be managed in `redefineMsoOrderedLists()` later in the transformation process
   */
  const type = 'ul'
  const listStyleType = li.querySelector('[data-val-supportLists]')?.getAttribute('data-val-supportLists') || ''
  const content = li.innerHTML

  return { listId, indent, type, content, listStyleType }
}

/**
 * Because Ms Word doesn't stores the information about the list type in such a way, that we can easily access it,
 * we have to handle it manually.
 * The approach is to take the structured list and step through each "sublist" (nested list).
 * Within each list we compare the "listStyleTypes" of two elements to find out if they have the same style or not.
 * If so, the list have to be unordered.
 * For lists with just one element an additional check is implemented.
 *
 * @param listItemObjects
 *
 * @return {Object<listItemObjects>}
 */
function redefineMsoOrderedLists (listItemObjects) {
  Object.values(listItemObjects).forEach(list => {
    let sublistId = uuid()
    const sublistIdsAtPosition = [sublistId]
    const sublistIds = [sublistId]
    let pos = 0

    /*
     * Group sublists by uuid.
     * Due to the nesting, we can't know all siblings by just checking the previous, next items
     * To make them groupable, lets add a sublistId to each element.
     */
    listItemObjects[list[0].listId].forEach((li, i) => {
      /*
       * If we "dive" into the next nesting level, we need a new uuid.
       * But if we already have been in this level, but in another sublist,
       * We have to keep the ID from the previous list.
       * Therefore we have to store the IDs in two different ways.
       */
      if (i > 0 && list[i - 1].indent < list[i].indent) {
        sublistId = uuid()
        pos++
        sublistIdsAtPosition[pos] = sublistId
        sublistIds.push(sublistId)
      }

      if (i > 0 && list[i - 1].indent > list[i].indent) {
        pos--
      }

      li.sublistId = sublistIdsAtPosition[pos]
      li.idx = i
    })

    // Check for each sublist (again) if its (un-)ordered
    sublistIds.forEach(sublistId => {
      const sublist = list.filter(el => el.sublistId === sublistId)
      if (sublist.length > 1) {
        const mappedItems = sublist
          .map(el => {
            // We assume, that if two items in one List have the same listStyleType, it is an unordered list
            const type = sublist[0].listStyleType === sublist[1].listStyleType ? 'ul' : 'ol'
            return { ...el, type: type }
          })

        mappedItems.forEach(li => {
          listItemObjects[list[0].listId][li.idx] = li
        })
      }

      /*
       * If we have just one list item we assume that a number or letter indicates an ordred list
       * Only if listStyleType is an "o". Than we assume that its more likely that its an
       * unordered list, than an ordered one because mso uses the "o" a outlined bullit.
       *
       * since the default is 'ul', we just have to change it to 'ol' if neccesary
       */
      if (sublist.length === 1 &&
        (/(\d+|\w+)/i).test(sublist[0].listStyleType) &&
        sublist[0].listStyleType !== 'o') {
        listItemObjects[list[0].listId][sublist[0].idx].type = 'ol'
      }
    })
  })

  return listItemObjects
}

/**
 * Create objects that hold the information about the list items
 * to be used for creating a nested list from that data.
 *
 * @param parsedDom{DOMTokenList}
 * @param isMso{Boolean}
 *
 * @return {Object}
 */
function createLists (parsedDom, isMso) {
  let listItemObjects = {}

  const listItems = isMso
    ? parsedDom.querySelectorAll('[class^=MsoList]')
    : parsedDom.querySelectorAll('li')

  listItems.forEach(li => {
    const item = isMso ? createItemFromMsoList(li) : createItemFrom365List(li)

    if (Object.keys(listItemObjects).includes(item.listId.toString()) === false) {
      listItemObjects[item.listId] = []
    }

    // Set data-attribute as Hook to find it back later on
    li.setAttribute('data-list-indicator', item.listId)

    listItemObjects[item.listId].push(item)
  })

  /*
   * Dirty part to determine if (mso) lists are ordered or not
   */
  if (isMso) {
    listItemObjects = redefineMsoOrderedLists(listItemObjects)
  }

  return listItemObjects
}

/**
 * Takes the flat list of list item objects and creates a HTML-String for that list
 *
 * @param list{Array<Object{indent, type, content, ?listStyleType}>}
 *
 * @return {string}
 */
function buildListAsHtmlString (list) {
  /*
   * `nesting` holds the type of lists for nested lists
   * It starts with the first indentation level and may be filled if there are lists in lists
   */
  const nesting = [list[0].type]
  let htmlList = `<${list[0].type}>`

  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    htmlList += `<li>${item.content}`

    const hasChildren = i + 1 < list.length && list[i + 1].indent > item.indent
    const isLastChild = i + 1 < list.length && list[i + 1].indent < item.indent
    const isLastElement = i + 1 === list.length

    if (hasChildren) {
      // If the next Element is a child-Element the closing Tag follows when closing the Child List
      htmlList += `<${list[i + 1].type}>`
      nesting.unshift(list[i + 1].type)
    } else {
      htmlList += '</li>'
    }

    if (isLastChild) {
      // Close the List and the Parent, for following elements that are intended above
      let c = 0
      while (list[i + 1].indent + c < item.indent) {
        htmlList += `</${nesting[0]}></li>`
        nesting.shift()
        c++
      }
    }
    if (isLastElement) {
      // Close all open Tags if its the last Element
      for (let h = item.indent; h > 1; h--) {
        htmlList += `</${nesting[0]}></li>`
        nesting.shift()
      }
    }
  }

  htmlList += `</${list[0].type}>`

  return htmlList
}

/**
 * Remove code which would make the DomParser fail
 * and store the "bullet" tht it can be checked later on.
 *
 * @param slice{string}
 *
 * @return {string}
 */
function prepareDataBeforeParsingMso (slice) {
  const test = '<html xmlns:o="urn:schemas-microsoft-com:office:office"\n' +
    'xmlns:w="urn:schemas-microsoft-com:office:word"\n' +
    'xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"\n' +
    'xmlns="http://www.w3.org/TR/REC-html40">\n' +
    '\n' +
    '<head>\n' +
    '<meta http-equiv=Content-Type content="text/html; charset=utf-8">\n' +
    '<meta name=ProgId content=Word.Document>\n' +
    '<meta name=Generator content="Microsoft Word 15">\n' +
    '<meta name=Originator content="Microsoft Word 15">\n' +
    '<link rel=File-List\n' +
    'href="file:///D:/Users/Becker/AppData/Local/Packages/oice_16_974fa576_32c1d314_1f27/AC/Temp/msohtmlclip1/01/clip_filelist.xml">\n' +
    '<!--[if gte mso 9]><xml>\n' +
    ' <o:OfficeDocumentSettings>\n' +
    '  <o:RelyOnVML/>\n' +
    '  <o:AllowPNG/>\n' +
    ' </o:OfficeDocumentSettings>\n' +
    '</xml><![endif]-->\n' +
    '<link rel=themeData\n' +
    'href="file:///D:/Users/Becker/AppData/Local/Packages/oice_16_974fa576_32c1d314_1f27/AC/Temp/msohtmlclip1/01/clip_themedata.thmx">\n' +
    '<link rel=colorSchemeMapping\n' +
    'href="file:///D:/Users/Becker/AppData/Local/Packages/oice_16_974fa576_32c1d314_1f27/AC/Temp/msohtmlclip1/01/clip_colorschememapping.xml">\n' +
    '<!--[if gte mso 9]><xml>\n' +
    ' <w:WordDocument>\n' +
    '  <w:View>Normal</w:View>\n' +
    '  <w:Zoom>0</w:Zoom>\n' +
    '  <w:TrackMoves/>\n' +
    '  <w:TrackFormatting/>\n' +
    '  <w:HyphenationZone>21</w:HyphenationZone>\n' +
    '  <w:PunctuationKerning/>\n' +
    '  <w:ValidateAgainstSchemas/>\n' +
    '  <w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid>\n' +
    '  <w:IgnoreMixedContent>false</w:IgnoreMixedContent>\n' +
    '  <w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText>\n' +
    '  <w:DoNotPromoteQF/>\n' +
    '  <w:LidThemeOther>EN-US</w:LidThemeOther>\n' +
    '  <w:LidThemeAsian>JA</w:LidThemeAsian>\n' +
    '  <w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript>\n' +
    '  <w:Compatibility>\n' +
    '   <w:BreakWrappedTables/>\n' +
    '   <w:SnapToGridInCell/>\n' +
    '   <w:WrapTextWithPunct/>\n' +
    '   <w:UseAsianBreakRules/>\n' +
    '   <w:DontGrowAutofit/>\n' +
    '   <w:SplitPgBreakAndParaMark/>\n' +
    '   <w:EnableOpenTypeKerning/>\n' +
    '   <w:DontFlipMirrorIndents/>\n' +
    '   <w:OverrideTableStyleHps/>\n' +
    '   <w:UseFELayout/>\n' +
    '  </w:Compatibility>\n' +
    '  <w:DoNotOptimizeForBrowser/>\n' +
    '  <m:mathPr>\n' +
    '   <m:mathFont m:val="Cambria Math"/>\n' +
    '   <m:brkBin m:val="before"/>\n' +
    '   <m:brkBinSub m:val="&#45;-"/>\n' +
    '   <m:smallFrac m:val="off"/>\n' +
    '   <m:dispDef/>\n' +
    '   <m:lMargin m:val="0"/>\n' +
    '   <m:rMargin m:val="0"/>\n' +
    '   <m:defJc m:val="centerGroup"/>\n' +
    '   <m:wrapIndent m:val="1440"/>\n' +
    '   <m:intLim m:val="subSup"/>\n' +
    '   <m:naryLim m:val="undOvr"/>\n' +
    '  </m:mathPr></w:WordDocument>\n' +
    '</xml><![endif]--><!--[if gte mso 9]><xml>\n' +
    ' <w:LatentStyles DefLockedState="false" DefUnhideWhenUsed="false"\n' +
    '  DefSemiHidden="false" DefQFormat="false" DefPriority="99"\n' +
    '  LatentStyleCount="376">\n' +
    '  <w:LsdException Locked="false" Priority="0" QFormat="true" Name="Normal"/>\n' +
    '  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="9" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" QFormat="true" Name="heading 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="9" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" QFormat="true" Name="heading 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="9" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" QFormat="true" Name="heading 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="9" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" QFormat="true" Name="heading 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="9" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" QFormat="true" Name="heading 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="9" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" QFormat="true" Name="heading 7"/>\n' +
    '  <w:LsdException Locked="false" Priority="9" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" QFormat="true" Name="heading 8"/>\n' +
    '  <w:LsdException Locked="false" Priority="9" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" QFormat="true" Name="heading 9"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="index 1"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="index 2"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="index 3"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="index 4"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="index 5"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="index 6"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="index 7"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="index 8"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="index 9"/>\n' +
    '  <w:LsdException Locked="false" Priority="39" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" Name="toc 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="39" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" Name="toc 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="39" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" Name="toc 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="39" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" Name="toc 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="39" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" Name="toc 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="39" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" Name="toc 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="39" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" Name="toc 7"/>\n' +
    '  <w:LsdException Locked="false" Priority="39" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" Name="toc 8"/>\n' +
    '  <w:LsdException Locked="false" Priority="39" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" Name="toc 9"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Normal Indent"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="footnote text"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="annotation text"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="header"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="footer"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="index heading"/>\n' +
    '  <w:LsdException Locked="false" Priority="35" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" QFormat="true" Name="caption"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="table of figures"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="envelope address"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="envelope return"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="footnote reference"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="annotation reference"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="line number"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="page number"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="endnote reference"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="endnote text"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="table of authorities"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="macro"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="toa heading"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List Bullet"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List Number"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List 2"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List 3"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List 4"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List 5"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List Bullet 2"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List Bullet 3"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List Bullet 4"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List Bullet 5"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List Number 2"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List Number 3"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List Number 4"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List Number 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="10" QFormat="true" Name="Title"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Closing"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Signature"/>\n' +
    '  <w:LsdException Locked="false" Priority="1" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" Name="Default Paragraph Font"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Body Text"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Body Text Indent"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List Continue"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List Continue 2"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List Continue 3"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List Continue 4"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="List Continue 5"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Message Header"/>\n' +
    '  <w:LsdException Locked="false" Priority="11" QFormat="true" Name="Subtitle"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Salutation"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Date"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Body Text First Indent"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Body Text First Indent 2"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Note Heading"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Body Text 2"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Body Text 3"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Body Text Indent 2"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Body Text Indent 3"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Block Text"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Hyperlink"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="FollowedHyperlink"/>\n' +
    '  <w:LsdException Locked="false" Priority="22" QFormat="true" Name="Strong"/>\n' +
    '  <w:LsdException Locked="false" Priority="20" QFormat="true" Name="Emphasis"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Document Map"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Plain Text"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="E-mail Signature"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="HTML Top of Form"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="HTML Bottom of Form"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Normal (Web)"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="HTML Acronym"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="HTML Address"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="HTML Cite"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="HTML Code"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="HTML Definition"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="HTML Keyboard"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="HTML Preformatted"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="HTML Sample"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="HTML Typewriter"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="HTML Variable"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Normal Table"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="annotation subject"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="No List"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Outline List 1"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Outline List 2"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Outline List 3"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Simple 1"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Simple 2"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Simple 3"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Classic 1"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Classic 2"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Classic 3"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Classic 4"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Colorful 1"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Colorful 2"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Colorful 3"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Columns 1"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Columns 2"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Columns 3"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Columns 4"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Columns 5"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Grid 1"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Grid 2"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Grid 3"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Grid 4"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Grid 5"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Grid 6"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Grid 7"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Grid 8"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table List 1"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table List 2"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table List 3"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table List 4"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table List 5"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table List 6"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table List 7"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table List 8"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table 3D effects 1"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table 3D effects 2"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table 3D effects 3"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Contemporary"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Elegant"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Professional"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Subtle 1"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Subtle 2"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Web 1"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Web 2"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Web 3"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Balloon Text"/>\n' +
    '  <w:LsdException Locked="false" Priority="39" Name="Table Grid"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Table Theme"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" Name="Placeholder Text"/>\n' +
    '  <w:LsdException Locked="false" Priority="1" QFormat="true" Name="No Spacing"/>\n' +
    '  <w:LsdException Locked="false" Priority="60" Name="Light Shading"/>\n' +
    '  <w:LsdException Locked="false" Priority="61" Name="Light List"/>\n' +
    '  <w:LsdException Locked="false" Priority="62" Name="Light Grid"/>\n' +
    '  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="65" Name="Medium List 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="66" Name="Medium List 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="70" Name="Dark List"/>\n' +
    '  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading"/>\n' +
    '  <w:LsdException Locked="false" Priority="72" Name="Colorful List"/>\n' +
    '  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid"/>\n' +
    '  <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="61" Name="Light List Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 1"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" Name="Revision"/>\n' +
    '  <w:LsdException Locked="false" Priority="34" QFormat="true"\n' +
    '   Name="List Paragraph"/>\n' +
    '  <w:LsdException Locked="false" Priority="29" QFormat="true" Name="Quote"/>\n' +
    '  <w:LsdException Locked="false" Priority="30" QFormat="true"\n' +
    '   Name="Intense Quote"/>\n' +
    '  <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="61" Name="Light List Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="61" Name="Light List Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="61" Name="Light List Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="61" Name="Light List Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="61" Name="Light List Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="19" QFormat="true"\n' +
    '   Name="Subtle Emphasis"/>\n' +
    '  <w:LsdException Locked="false" Priority="21" QFormat="true"\n' +
    '   Name="Intense Emphasis"/>\n' +
    '  <w:LsdException Locked="false" Priority="31" QFormat="true"\n' +
    '   Name="Subtle Reference"/>\n' +
    '  <w:LsdException Locked="false" Priority="32" QFormat="true"\n' +
    '   Name="Intense Reference"/>\n' +
    '  <w:LsdException Locked="false" Priority="33" QFormat="true" Name="Book Title"/>\n' +
    '  <w:LsdException Locked="false" Priority="37" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" Name="Bibliography"/>\n' +
    '  <w:LsdException Locked="false" Priority="39" SemiHidden="true"\n' +
    '   UnhideWhenUsed="true" QFormat="true" Name="TOC Heading"/>\n' +
    '  <w:LsdException Locked="false" Priority="41" Name="Plain Table 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="42" Name="Plain Table 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="43" Name="Plain Table 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="44" Name="Plain Table 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="45" Name="Plain Table 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="40" Name="Grid Table Light"/>\n' +
    '  <w:LsdException Locked="false" Priority="46" Name="Grid Table 1 Light"/>\n' +
    '  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark"/>\n' +
    '  <w:LsdException Locked="false" Priority="51" Name="Grid Table 6 Colorful"/>\n' +
    '  <w:LsdException Locked="false" Priority="52" Name="Grid Table 7 Colorful"/>\n' +
    '  <w:LsdException Locked="false" Priority="46"\n' +
    '   Name="Grid Table 1 Light Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="51"\n' +
    '   Name="Grid Table 6 Colorful Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="52"\n' +
    '   Name="Grid Table 7 Colorful Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="46"\n' +
    '   Name="Grid Table 1 Light Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="51"\n' +
    '   Name="Grid Table 6 Colorful Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="52"\n' +
    '   Name="Grid Table 7 Colorful Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="46"\n' +
    '   Name="Grid Table 1 Light Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="51"\n' +
    '   Name="Grid Table 6 Colorful Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="52"\n' +
    '   Name="Grid Table 7 Colorful Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="46"\n' +
    '   Name="Grid Table 1 Light Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="51"\n' +
    '   Name="Grid Table 6 Colorful Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="52"\n' +
    '   Name="Grid Table 7 Colorful Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="46"\n' +
    '   Name="Grid Table 1 Light Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="51"\n' +
    '   Name="Grid Table 6 Colorful Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="52"\n' +
    '   Name="Grid Table 7 Colorful Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="46"\n' +
    '   Name="Grid Table 1 Light Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="51"\n' +
    '   Name="Grid Table 6 Colorful Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="52"\n' +
    '   Name="Grid Table 7 Colorful Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="46" Name="List Table 1 Light"/>\n' +
    '  <w:LsdException Locked="false" Priority="47" Name="List Table 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="48" Name="List Table 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="49" Name="List Table 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark"/>\n' +
    '  <w:LsdException Locked="false" Priority="51" Name="List Table 6 Colorful"/>\n' +
    '  <w:LsdException Locked="false" Priority="52" Name="List Table 7 Colorful"/>\n' +
    '  <w:LsdException Locked="false" Priority="46"\n' +
    '   Name="List Table 1 Light Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="51"\n' +
    '   Name="List Table 6 Colorful Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="52"\n' +
    '   Name="List Table 7 Colorful Accent 1"/>\n' +
    '  <w:LsdException Locked="false" Priority="46"\n' +
    '   Name="List Table 1 Light Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="51"\n' +
    '   Name="List Table 6 Colorful Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="52"\n' +
    '   Name="List Table 7 Colorful Accent 2"/>\n' +
    '  <w:LsdException Locked="false" Priority="46"\n' +
    '   Name="List Table 1 Light Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="51"\n' +
    '   Name="List Table 6 Colorful Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="52"\n' +
    '   Name="List Table 7 Colorful Accent 3"/>\n' +
    '  <w:LsdException Locked="false" Priority="46"\n' +
    '   Name="List Table 1 Light Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="51"\n' +
    '   Name="List Table 6 Colorful Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="52"\n' +
    '   Name="List Table 7 Colorful Accent 4"/>\n' +
    '  <w:LsdException Locked="false" Priority="46"\n' +
    '   Name="List Table 1 Light Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="51"\n' +
    '   Name="List Table 6 Colorful Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="52"\n' +
    '   Name="List Table 7 Colorful Accent 5"/>\n' +
    '  <w:LsdException Locked="false" Priority="46"\n' +
    '   Name="List Table 1 Light Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="51"\n' +
    '   Name="List Table 6 Colorful Accent 6"/>\n' +
    '  <w:LsdException Locked="false" Priority="52"\n' +
    '   Name="List Table 7 Colorful Accent 6"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Mention"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Smart Hyperlink"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Hashtag"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Unresolved Mention"/>\n' +
    '  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"\n' +
    '   Name="Smart Link"/>\n' +
    ' </w:LatentStyles>\n' +
    '</xml><![endif]-->\n' +
    '<style>\n' +
    '<!--\n' +
    ' /* Font Definitions */\n' +
    ' @font-face\n' +
    '\t{font-family:"MS Mincho";\n' +
    '\tpanose-1:2 2 6 9 4 2 5 8 3 4;\n' +
    '\tmso-font-alt:"ＭＳ 明朝";\n' +
    '\tmso-font-charset:128;\n' +
    '\tmso-generic-font-family:modern;\n' +
    '\tmso-font-pitch:fixed;\n' +
    '\tmso-font-signature:-536870145 1791491579 134217746 0 131231 0;}\n' +
    '@font-face\n' +
    '\t{font-family:"Cambria Math";\n' +
    '\tpanose-1:2 4 5 3 5 4 6 3 2 4;\n' +
    '\tmso-font-charset:0;\n' +
    '\tmso-generic-font-family:roman;\n' +
    '\tmso-font-pitch:variable;\n' +
    '\tmso-font-signature:3 0 0 0 1 0;}\n' +
    '@font-face\n' +
    '\t{font-family:Cambria;\n' +
    '\tpanose-1:2 4 5 3 5 4 6 3 2 4;\n' +
    '\tmso-font-charset:0;\n' +
    '\tmso-generic-font-family:roman;\n' +
    '\tmso-font-pitch:variable;\n' +
    '\tmso-font-signature:-536869121 1107305727 33554432 0 415 0;}\n' +
    '@font-face\n' +
    '\t{font-family:"\\@MS Mincho";\n' +
    '\tpanose-1:2 2 6 9 4 2 5 8 3 4;\n' +
    '\tmso-font-charset:128;\n' +
    '\tmso-generic-font-family:modern;\n' +
    '\tmso-font-pitch:fixed;\n' +
    '\tmso-font-signature:-536870145 1791491579 134217746 0 131231 0;}\n' +
    ' /* Style Definitions */\n' +
    ' p.MsoNormal, li.MsoNormal, div.MsoNormal\n' +
    '\t{mso-style-unhide:no;\n' +
    '\tmso-style-qformat:yes;\n' +
    '\tmso-style-parent:"";\n' +
    '\tmargin-top:0cm;\n' +
    '\tmargin-right:0cm;\n' +
    '\tmargin-bottom:10.0pt;\n' +
    '\tmargin-left:0cm;\n' +
    '\tline-height:115%;\n' +
    '\tmso-pagination:widow-orphan;\n' +
    '\tfont-size:11.0pt;\n' +
    '\tfont-family:"Cambria",serif;\n' +
    '\tmso-ascii-font-family:Cambria;\n' +
    '\tmso-ascii-theme-font:minor-latin;\n' +
    '\tmso-fareast-font-family:"MS Mincho";\n' +
    '\tmso-fareast-theme-font:minor-fareast;\n' +
    '\tmso-hansi-font-family:Cambria;\n' +
    '\tmso-hansi-theme-font:minor-latin;\n' +
    '\tmso-bidi-font-family:"Times New Roman";\n' +
    '\tmso-bidi-theme-font:minor-bidi;\n' +
    '\tmso-fareast-language:EN-US;}\n' +
    'p.MsoFootnoteText, li.MsoFootnoteText, div.MsoFootnoteText\n' +
    '\t{mso-style-priority:99;\n' +
    '\tmso-style-link:"Fußnotentext Zchn";\n' +
    '\tmargin:0cm;\n' +
    '\tmso-pagination:widow-orphan;\n' +
    '\tfont-size:10.0pt;\n' +
    '\tfont-family:"Cambria",serif;\n' +
    '\tmso-ascii-font-family:Cambria;\n' +
    '\tmso-ascii-theme-font:minor-latin;\n' +
    '\tmso-fareast-font-family:"MS Mincho";\n' +
    '\tmso-fareast-theme-font:minor-fareast;\n' +
    '\tmso-hansi-font-family:Cambria;\n' +
    '\tmso-hansi-theme-font:minor-latin;\n' +
    '\tmso-bidi-font-family:"Times New Roman";\n' +
    '\tmso-bidi-theme-font:minor-bidi;\n' +
    '\tmso-fareast-language:EN-US;}\n' +
    'span.MsoFootnoteReference\n' +
    '\t{mso-style-priority:99;\n' +
    '\tvertical-align:super;}\n' +
    'span.FunotentextZchn\n' +
    '\t{mso-style-name:"Fußnotentext Zchn";\n' +
    '\tmso-style-priority:99;\n' +
    '\tmso-style-unhide:no;\n' +
    '\tmso-style-locked:yes;\n' +
    '\tmso-style-link:Fußnotentext;\n' +
    '\tmso-ansi-font-size:10.0pt;\n' +
    '\tmso-bidi-font-size:10.0pt;\n' +
    '\tmso-fareast-language:EN-US;}\n' +
    '.MsoChpDefault\n' +
    '\t{mso-style-type:export-only;\n' +
    '\tmso-default-props:yes;\n' +
    '\tfont-family:"Cambria",serif;\n' +
    '\tmso-ascii-font-family:Cambria;\n' +
    '\tmso-ascii-theme-font:minor-latin;\n' +
    '\tmso-fareast-font-family:"MS Mincho";\n' +
    '\tmso-fareast-theme-font:minor-fareast;\n' +
    '\tmso-hansi-font-family:Cambria;\n' +
    '\tmso-hansi-theme-font:minor-latin;\n' +
    '\tmso-bidi-font-family:"Times New Roman";\n' +
    '\tmso-bidi-theme-font:minor-bidi;}\n' +
    '.MsoPapDefault\n' +
    '\t{mso-style-type:export-only;\n' +
    '\tmargin-bottom:10.0pt;\n' +
    '\tline-height:115%;}\n' +
    ' /* Page Definitions */\n' +
    ' @page\n' +
    '\t{mso-footnote-separator:url("file:///D:/Users/Becker/AppData/Local/Packages/oice_16_974fa576_32c1d314_1f27/AC/Temp/msohtmlclip1/01/clip_header.htm") fs;\n' +
    '\tmso-footnote-continuation-separator:url("file:///D:/Users/Becker/AppData/Local/Packages/oice_16_974fa576_32c1d314_1f27/AC/Temp/msohtmlclip1/01/clip_header.htm") fcs;\n' +
    '\tmso-endnote-separator:url("file:///D:/Users/Becker/AppData/Local/Packages/oice_16_974fa576_32c1d314_1f27/AC/Temp/msohtmlclip1/01/clip_header.htm") es;\n' +
    '\tmso-endnote-continuation-separator:url("file:///D:/Users/Becker/AppData/Local/Packages/oice_16_974fa576_32c1d314_1f27/AC/Temp/msohtmlclip1/01/clip_header.htm") ecs;}\n' +
    '@page WordSection1\n' +
    '\t{size:612.0pt 792.0pt;\n' +
    '\tmargin:70.85pt 70.85pt 2.0cm 70.85pt;\n' +
    '\tmso-header-margin:36.0pt;\n' +
    '\tmso-footer-margin:36.0pt;\n' +
    '\tmso-paper-source:0;}\n' +
    'div.WordSection1\n' +
    '\t{page:WordSection1;}\n' +
    '-->\n' +
    '</style>\n' +
    '<!--[if gte mso 10]>\n' +
    '<style>\n' +
    ' /* Style Definitions */\n' +
    ' table.MsoNormalTable\n' +
    '\t{mso-style-name:"Normale Tabelle";\n' +
    '\tmso-tstyle-rowband-size:0;\n' +
    '\tmso-tstyle-colband-size:0;\n' +
    '\tmso-style-noshow:yes;\n' +
    '\tmso-style-priority:99;\n' +
    '\tmso-style-parent:"";\n' +
    '\tmso-padding-alt:0cm 5.4pt 0cm 5.4pt;\n' +
    '\tmso-para-margin-top:0cm;\n' +
    '\tmso-para-margin-right:0cm;\n' +
    '\tmso-para-margin-bottom:10.0pt;\n' +
    '\tmso-para-margin-left:0cm;\n' +
    '\tline-height:115%;\n' +
    '\tmso-pagination:widow-orphan;\n' +
    '\tfont-size:11.0pt;\n' +
    '\tfont-family:"Cambria",serif;\n' +
    '\tmso-ascii-font-family:Cambria;\n' +
    '\tmso-ascii-theme-font:minor-latin;\n' +
    '\tmso-hansi-font-family:Cambria;\n' +
    '\tmso-hansi-theme-font:minor-latin;}\n' +
    '</style>\n' +
    '<![endif]-->\n' +
    '</head>\n' +
    '\n' +
    '<body lang=DE style=\'tab-interval:35.4pt;word-wrap:break-word\'>\n' +
    '<!--StartFragment-->\n' +
    '\n' +
    '<p class=MsoNormal>Regelungen zu Grundstückseinfriedungen finden sich in der HBauO\n' +
    'sowie im HWG.<o:p></o:p></p>\n' +
    '\n' +
    '<p class=MsoNormal>Im Bebauungsplan (B-Plan) können aus gestalterischen Gründen\n' +
    'Festsetzungen über die Gestaltungsmerkmale von Einfriedungen wie beispielsweise\n' +
    'Mauern oder Zäune getroffen werden. Als sog. „Huckepack-Festsetzungen“ haben\n' +
    'sie ihre Rechtsgrundlage in §&nbsp;9 Abs.&nbsp;4 BauGB i.V.m. §&nbsp;5 Abs.&nbsp;1\n' +
    'Bauleitplanfeststellungsgesetz i.V.m. §&nbsp;81 Abs.&nbsp;2a HBauO. Die\n' +
    'Festsetzungen erfolgen i.d.R. als textliche Festsetzungen in §&nbsp;2 der\n' +
    'Verordnung zum B-Plan und sind in jedem Fall zu begründen.<o:p></o:p></p>\n' +
    '\n' +
    '<p class=MsoNormal><b>Allgemeine Anforderungen an Einfriedungen nach HBauO und\n' +
    'HWG<o:p></o:p></b></p>\n' +
    '\n' +
    '<p class=MsoNormal>Nach <b style=\'mso-bidi-font-weight:normal\'>§&nbsp;6 Abs.&nbsp;7\n' +
    'Nr.&nbsp;3 HBauO</b> sind in den Abstandsflächen eines Gebäudes sowie ohne\n' +
    'eigene Abstandsflächen, auch wenn sie nicht an die Grundstücksgrenze oder an\n' +
    'das Gebäude angebaut werden, Stützmauern und Einfriedungen mit einer Höhe bis\n' +
    'zu 2&nbsp;m zulässig, in Gewerbe- und Industriegebieten auch ohne diese\n' +
    'Höhenbegrenzung.<o:p></o:p></p>\n' +
    '\n' +
    '<p class=MsoNormal>Gemäß <b style=\'mso-bidi-font-weight:normal\'>§&nbsp;11 HBauO</b>\n' +
    'sind bauliche Einfriedungen an der Grenze benachbarter Grundstücke und zu öffentlichen\n' +
    'Wegen und Grünflächen bis zu einer Höhe von 1,5&nbsp;m, vom eigenen Grund\n' +
    'gemessen, zulässig. Sie müssen durchbrochen sein. Einfriedungen von gewerblich\n' +
    'genutzten Grundstücken dürfen dicht und bis zu 2,25&nbsp;m hoch ausgeführt\n' +
    'werden. Ausnahmen können zugelassen werden. Vorgaben über bauliche\n' +
    'Einfriedungen, soweit sie von §&nbsp;11 HBauO abweichen, erfordern eine\n' +
    'Festsetzung durch Verordnung im B-Plan (s.u.).<o:p></o:p></p>\n' +
    '\n' +
    '<p class=MsoNormal>Zudem kann nach <b style=\'mso-bidi-font-weight:normal\'>§&nbsp;58\n' +
    'HBauO</b> verlangt werden, dass aus Sicherheitsgründen Grundstücke eingefriedet\n' +
    'oder abgegrenzt werden bzw. dass dieses aus Sicherheitsgründen gerade nicht\n' +
    'geschehen darf.<o:p></o:p></p>\n' +
    '\n' +
    '<p class=MsoNormal><b style=\'mso-bidi-font-weight:normal\'>§&nbsp;24 HWG</b>\n' +
    'schließlich enthält die Befugnis der Wegeaufsichtsbehörde, die Einfriedung von\n' +
    'Grundstücken zu verlangen, soweit es zur Vermeidung von Störungen oder Gefahren\n' +
    'für den Gemeingebrauch, die von dem Grundstück ausgehen könnten, erforderlich\n' +
    'ist.<o:p></o:p></p>\n' +
    '\n' +
    '<p class=MsoNormal><b>Festsetzungen zu Einfriedungen im Bebauungsplan<o:p></o:p></b></p>\n' +
    '\n' +
    '<p class=MsoNormal>In einen B-Plan können Regelungen aus gestalterischen Gründen,\n' +
    'in Form von Anforderungen an die Art und Weise von baulichen Einfriedungen, als\n' +
    'sog. „Huckepack-Festsetzungen“ auf Grundlage von §&nbsp;9 Abs.&nbsp;4 BauGB\n' +
    'i.V.m. §&nbsp;5 Abs.&nbsp;1 Bauleitplanfeststellungsgesetz i.V.m. <b\n' +
    'style=\'mso-bidi-font-weight:normal\'>§&nbsp;81 Abs.&nbsp;1 Nr.&nbsp;2a HBauO</b>\n' +
    'aufgenommen werden.<o:p></o:p></p>\n' +
    '\n' +
    '<p class=MsoNormal>Hecken sind keine baulichen Einfriedungen i.S.d. §&nbsp;11\n' +
    'HBauO.<a style=\'mso-footnote-id:ftn1\' href="#_ftn1" name="_ftnref1" title=""><span\n' +
    'class=MsoFootnoteReference><span style=\'mso-special-character:footnote\'><![if !supportFootnotes]><span\n' +
    'class=MsoFootnoteReference><span style=\'font-size:11.0pt;line-height:115%;\n' +
    'font-family:"Cambria",serif;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:\n' +
    '"MS Mincho";mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;\n' +
    'mso-bidi-font-family:"Times New Roman";mso-bidi-theme-font:minor-bidi;\n' +
    'mso-ansi-language:DE;mso-fareast-language:EN-US;mso-bidi-language:AR-SA\'>[1]</span></span><![endif]></span></span></a>\n' +
    'Festsetzungen zu Hecken aus städtebaulichen Gründen können nach <b\n' +
    'style=\'mso-bidi-font-weight:normal\'>§&nbsp;9 Abs.&nbsp;1 Nr.&nbsp;25 BauGB</b> (Anpflanzgebote,\n' +
    'Bindungen für Bepflanzungen) getroffen werden. Gestalterische Festsetzungen\n' +
    'über Hecken, Knickwälle und dergleichen hingegen, beispielsweise betreffend die\n' +
    'Heckenhöhe, begründen sich im Allgemeinen nach §&nbsp;9 Abs.&nbsp;4 BauGB\n' +
    'i.V.m. §&nbsp;5 Abs.&nbsp;1 Bauleitplanfeststellungsgesetz i.V.m. §&nbsp;4 Abs.&nbsp;3\n' +
    'HmbBNatSchAG i.V.m. §&nbsp;9 Abs.&nbsp;3 Satz&nbsp;1 Nr.&nbsp;4 BNatSchG.<o:p></o:p></p>\n' +
    '\n' +
    '<p class=MsoNormal>Aus klimatischen und energetischen Gründen kann auch ein\n' +
    'sogenannter <i style=\'mso-bidi-font-style:normal\'>Energiezaun</i> zur Gewinnung\n' +
    'von Energie auf der Grundlage des [LINK: E24.3.1.4_Technische_Anlagen_fuer_Erneuerbare_Energien_an_Gebaeuden.docx][<b\n' +
    'style=\'mso-bidi-font-weight:normal\'>§&nbsp;9 Abs.&nbsp;1 Nr.&nbsp;23b BauGB</b>]\n' +
    'festgesetzt werden.<o:p></o:p></p>\n' +
    '\n' +
    '<div style=\'mso-element:footnote-list\'><![if !supportFootnotes]><br clear=all>\n' +
    '\n' +
    '<hr align=left size=1 width="33%">\n' +
    '\n' +
    '<![endif]>\n' +
    '\n' +
    '<div style=\'mso-element:footnote\' id=ftn1>\n' +
    '\n' +
    '<p class=MsoFootnoteText><a style=\'mso-footnote-id:ftn1\' href="#_ftnref1"\n' +
    'name="_ftn1" title=""><span class=MsoFootnoteReference><span style=\'mso-special-character:\n' +
    'footnote\'><![if !supportFootnotes]><span class=MsoFootnoteReference><span\n' +
    'style=\'font-size:10.0pt;line-height:115%;font-family:"Cambria",serif;\n' +
    'mso-ascii-theme-font:minor-latin;mso-fareast-font-family:"MS Mincho";\n' +
    'mso-fareast-theme-font:minor-fareast;mso-hansi-theme-font:minor-latin;\n' +
    'mso-bidi-font-family:"Times New Roman";mso-bidi-theme-font:minor-bidi;\n' +
    'mso-ansi-language:DE;mso-fareast-language:EN-US;mso-bidi-language:AR-SA\'>[1]</span></span><![endif]></span></span></a>\n' +
    '<i>Niere</i> in Alexejew, Hamburgisches Bauordnungsrecht, 31.&nbsp;Lfg., Stand\n' +
    'Mai&nbsp;2020, §&nbsp;11, Rn.&nbsp;9.<o:p></o:p></p>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '<!--EndFragment-->\n' +
    '</body>\n' +
    '\n' +
    '</html>'
  return test
    // Strip line breaks
    .replace(/(&nbsp;|\r|\n)/gmi, ' ')
    // Strip head
    .replace(/<head>(.|\n|\r)*?<\/head>/mi, '')
    // Strip html wrapper and remove conentless and non html like elements "<o:p>"
    .replace(/<(\/)?(html|o:p)[^>]*>/gmi, '')
    /*
     * Remove Microsoft IF comments and replace it with empty spans holding the data, that it can be processed later on
     * to determine if that one listStyleType may be part of an ordered or unordered list.
     */
    .replace(/<!\[if !(.*?)\]>(.*?)<span(.*?)style='mso-list:Ignore'>(.*?)<!\[endif\]>/gmi, (match, p1, p2, p3, p4) => {
      // Try to remove spacing spans
      const listStyleType = p4
        .replace(/<span[^>]*>/gmi, '')
        .replace(/<\/span>/gmi, '')
        .replace(/(&nbsp;|\s|\\r|\\n|\r|\n)/gmi, '')
      return `<span data-val-${p1}="${listStyleType}" />`
    })
}

/**
 * Parses Clippboard content from Word to fix List ordering.
 *
 * @param slice{String}
 *
 * @return {string}
 */
function handleWordPaste (slice) {
  const isMso = checkIfMso(slice)
  const isOffice365 = checkIfOffice365(slice)

  if ((isMso || isOffice365) === false) {
    return slice
  }

  // Strip meta though its not closed and would break the parser
  slice = slice.replace(/<meta[^>]*>/mi, '')

  // If its Mso-Content: Before the parser can be applied, some noise has to be reduced
  if (isMso) {
    slice = prepareDataBeforeParsingMso(slice)
  }
  // For a better handling all the Stuff gets converted to html
  const parser = new DOMParser()
  const parsedDom = parser.parseFromString(slice, 'text/html')

  const listItemObjects = createLists(parsedDom, isMso)

  /**
   * After collecting the list, we go to each list and add a well formatted list before the found one.
   * Until that we need the old list as dom hook to paste the new one, afterwards it is removed.
   */
  Object.keys(listItemObjects).forEach(listId => {
    // Get the first Element of current List
    const context = parsedDom.querySelector('[data-list-indicator="' + listId + '"]')

    // Instert new List before the original one
    if (context.parentElement.nodeName.toLowerCase() === 'ul' || context.parentElement.nodeName.toLowerCase() === 'ol') {
      context.parentElement.before(buildListAsHtmlString(listItemObjects[listId]))
    } else {
      context.before(buildListAsHtmlString(listItemObjects[listId]))
    }

    // Remove old Elements
    parsedDom
      .querySelectorAll('[data-list-indicator="' + listId + '"]')
      .forEach(el => {
        if (el.parentElement.nodeName.toLowerCase() === 'ul' || el.parentElement.nodeName.toLowerCase() === 'ol') {
          el.parentElement.remove()
        } else {
          el.remove()
        }
      })
  })

  // Clear List item collection for the next run.
  return parsedDom.documentElement.outerHTML
    .replace(/&gt;/gmi, '>')
    .replace(/&lt;/gmi, '<')
    // Remove empty list wrapper
    .replace(/<div[^>]*?class="ListContainerWrapper[^>]*?><ul[^>]*?><\/ul><\/div>/gm, '')
    .replace(/<ul[^>]*?><\/ul>/gm, '')
}

export { handleWordPaste }
