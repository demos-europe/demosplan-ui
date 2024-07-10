const de = {
  anonymization: {
    mark: 'Markierung anonymisieren',
    unmark: 'Anonymisierung aufheben'
  },
  altText: {
    default: 'Alternativer Text'
  },
  aria: {
    deselect: {
      all: 'Auswahl für alle Elemente aufheben',
      element: 'Auswahl für Element aufheben'
    },
    select: {
      all: 'Alle Elemente auswählen',
      element: 'Element auswählen'
    },
    collapse: {
      all: 'Alle Elemente zuklappen',
      element: 'Element zuklappen'
    },
    expand: {
      all: 'Alle Elemente ausklappen',
      element: 'Element ausklappen'
    },
  },
  autocompleteNoResults: 'Keine Suchtreffer.',
  choose: "Auswählen",
  computer: 'Computer',
  contextualHelp: 'Kontexthilfe',
  dropdown: {
    close: "Einklappen",
    open: "Ausklappen"
  },
  editor: {
    bold: 'Fett',
    cut: 'Ausschneiden (Strg + X)',
    fullscreen: 'Vollbild',
    headingLevel (level) {
      return `Überschrift ${level}`
    },
    italic: 'Kursiv',
    link: {
      edit: 'Link bearbeiten',
      editOrInsert: 'Link einfügen/bearbeiten',
      insert: 'Link einfügen',
      hint: 'URLs sollten mit \'https://\' beginnen.'
    },
    orderedList: 'Nummerierte Liste',
    redo: 'Wiederholen',
    underline: 'Unterstrichen',
    undo: 'Rückgängig',
    unorderedList: 'Aufzählung'
  },
  entrySelected: "Eintrag ausgewählt",
  entriesSelected: "Einträge ausgewählt",
  error: {
    mandatoryFields: {
      default: 'Bitte füllen Sie alle Pflichtfelder korrekt aus. Erst dann können Sie Ihre Angaben speichern.',
      intro: 'Bitte korrigieren Sie Ihre Eingabe in folgenden Feldern: ',
      outro: '. Erst dann können Sie Ihre Angaben speichern.'
    }
  },
  expandAll: "Alle Elemente ausklappen",
  explanationNoentries: "Es sind keine Einträge vorhanden.",
  file: {
    remove: 'Datei entfernen'
  },
  hint: {
    dismiss: 'Hinweis ausblenden',
    show: 'Hinweis einblenden'
  },
  image: {
    alt: {
      editHint: 'Strg + Klick, um den alternativen Text zu bearbeiten',
      explanation: 'Ein Screenreader liest diesen Text anstelle des Bildes vor.',
      placeholder: 'Hier können Sie Ihren alternativen Text einfügen.'
    },
    edit: 'Bild bearbeiten',
    insert: 'Bild einfügen',
    placeholder: '[An dieser Stelle wird ihr Bild angezeigt]',
    preview: 'Bildvorschau'
  },
  input: {
    text: {
      exactlength({ requiredlength, cssClass, count }) {
        return `Geben Sie exakt ${requiredlength} Zeichen ein. Aktuell sind <span class="${cssClass}"> ${count} </span> Zeichen eingegeben.`
      },
      maxlength({ cssClass, count, max }) {
        return `Noch <span class="${cssClass}"> ${count} </span> von maximal ${max} Zeichen verfügbar.`
      },
      minlength({ cssClass, count, min }) {
        return `Noch <span class="${cssClass}"> ${count} </span> um ${min} Zeichen zu erreichen.`
      }
    }
  },
  item: {
    lockedForSelection: "Element kann nicht ausgewählt werden",
  },
  link: {
    text: 'Linktext'
  },
  loadingData: 'Daten werden geladen...',
  obscure: {
    title: 'Dieser Text wurde als geschwärzt markiert, um Datenschutzrichtlinien zu entsprechen.'
  },
  operations: {
    abort: "Abbrechen",
    add: 'Hinzufügen',
    close: 'einklappen',
    delete: 'Löschen',
    deselect: {
      all: 'Auswahl aufheben'
    },
    insert: 'Einfügen',
    new: 'Neu',
    none: 'Keine',
    remove: 'Entfernen',
    save: "Speichern",
    select: {
      all: 'Alle auswählen',
      placeholder: 'Bitte wählen Sie einen Eintrag aus.'
    },
    open: 'ausklappen',
    update: 'Aktualisierung'
  },
  pager: {
    multipleOf: 'von',
    multipleItems: 'Einträgen',
    goToPageOfPages ({ page, total }) {
      return `Gehe zu Seite ${page} von ${total}`
    },
    selectNumberOfItems ({ results, items }) {
      return `Wählen Sie, wieviele von insgesamt ${results} ${items} pro Seite ausgegeben werden sollen.`
    },
    label: 'Seitennavigation',
    next: 'Nächste Seite',
    currentPageOfPages ({ page, total }) {
      return `Seite ${page} von ${total}, aktuelle Seite`
    },
    showEntries: 'Einträge anzeigen',
    previous: 'Vorherige Seite'
  },
  placeholderAutoSuggest: "Suchbegriff...",
  search: {
    noResults (searchterm) {
      return `Für den Suchbegriff <span style=\"background-color: yellow;\">${searchterm}</span> konnten keine Einträge gefunden werden.`
    },
    searching: 'Suchen',
    text: 'Suche',
  },
  tab: {
    openNew: 'in neuem Tab öffnen'
  },
  table: {
    colsSort: 'Spalten sortieren nach',
    colsSelect: 'Spalten auswählen'
  },
  tag: {
    create: "Tag erstellen",
  },
  text: {
    deleted: 'Dieser Text wurde entfernt',
    inserted: 'Dieser Text wurde hinzugefügt',
    marked: 'markierter Text'
  },
  url: 'URL',
  upload: {
    failed: 'Fehler beim Upload von Datei %{file}',
    files: 'Dateien hochladen',
    select: {
      image(maxUploadSize) {
        return `Bild zum Upload hierher ziehen oder vom %{browse} auswählen (max. ${maxUploadSize})`
      },
      pdf({ browse, maxUploadSize }) {
        return `PDF-Dokument zum Upload hierher ziehen oder vom ${browse} auswählen (max. ${maxUploadSize})`
      }
    },
    uploadedFiles: 'Hochgeladene Dateien',
  },
  validation: {
    error: {
      city: 'Bitte verwenden Sie ausschließlich Buchstaben und Leerzeichen.',
      fileUpload: 'Beim Upload der Datei ist ein Fehler aufgetreten.',
      email: 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
      format: 'Bitte verwenden Sie das korrekte Format.',
      zipCode: 'Bitte geben Sie genau 5 Zahlen ein (z.B. \'12345\').'
    }
  },
  window: {
    close: 'Fenster schließen'
  }
}

export { de }
