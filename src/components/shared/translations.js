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
  editor: {
    bold: 'Fett',
    cut: 'Ausschneiden (Strg + X)',
    fullscreen: 'Vollbild',
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
    placeholder: '[An dieser Stelle wird ihr Bild angezeigt]'
  },
  input: {
    text: {
      exactlength({ requiredlength, cssClass, count }) { return `Geben Sie exakt ${requiredlength} Zeichen ein. Aktuell sind <span class="${cssClass}"> ${count} </span> Zeichen eingegeben.` },
      maxlength({ cssClass, count, max }) { return `Noch <span class="${cssClass}"> ${count} </span> von maximal ${max} Zeichen verfügbar.`},
      minlength({ cssClass, count, min }) { return `Noch <span class="${cssClass}"> ${count} </span> um ${min} Zeichen zu erreichen.`}
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
    save: "Speichern",
    select: {
      all: 'Alle auswählen',
      placeholder: 'Bitte wählen Sie einen Eintrag aus.'
    },
    open: 'ausklappen',
    update: 'Aktualisierung'
  },
  pager: {
    amountMultipleOf: 'von',
    amountMultipleLabel: 'Wählen Sie, wieviele von insgesamt {results} {items} pro Seite ausgegeben werden sollen.',
    amountMultipleItems: 'Einträgen',
    gotoPageFromPages ({ page, total }) { return `Gehe zu Seite ${page} von ${total}` },
    label: 'Seitennavigation',
    next: 'Nächste Seite',
    pageFromPagesCurrentPage ({ page, total }) { return `Seite ${page} von ${total}, aktuelle Seite` },
    perPage: 'Einträge anzeigen',
    previous: 'Vorherige Seite'
  },
  placeholderAutoSuggest: "Suchbegriff...",
  search: 'Suche',
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
      image(maxUploadSize) { return `Bild zum Upload hierher ziehen oder vom %{browse} auswählen (max. ${maxUploadSize})` },
      pdf({ browse, maxUploadSize }) { return `PDF-Dokument zum Upload hierher ziehen oder vom ${browse} auswählen (max. ${maxUploadSize})` }
    },
    uploadedFiles: 'Hochgeladene Dateien',
  },
  validation: {
    error: {
      city: 'Bitte verwenden Sie ausschließlich Buchstaben und Leerzeichen.',
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
