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
  choose: "Auswählen",
  computer: 'Computer',
  contextualHelp: 'Kontexthilfe',
  editor: {
    bold: 'Fett',
    cut: 'Ausschneiden (Strg + X)',
    italic: 'Kursiv',
    link: {
      edit: 'Link bearbeiten',
      insert: 'Link einfügen',
      hint: 'URLs sollten mit \'https://\' beginnen.'
    },
    paste: {
      wordPasteExplanation: 'Um Text aus Word einzufügen, benutzen Sie bitte die Tastenkombination "Strg + Umschalt + v".'
    },
    redo: 'Wiederholen',
    underline: 'Unterstrichen',
    undo: 'Rückgängig'
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
    delete: 'Löschen',
    deselect: {
      all: 'Auswahl aufheben'
    },
    new: 'Neu',
    none: 'Keine',
    save: "Speichern",
    select: {
      all: 'Alle auswählen',
      placeholder: 'Bitte wählen Sie einen Eintrag aus.'
    },
    update: 'Aktualisierung'
  },
  placeholderAutoSuggest: "Suchbegriff...",
  tab: {
    openNew: 'in neuem Tab öffnen'
  },
  table: {
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
  upload: {
    failed: 'Fehler beim Upload von Datei %{file}',
    select: {
      image(maxUploadSize) { return `Bild zum Upload hierher ziehen oder vom %{browse} auswählen (max. ${maxUploadSize})` },
      pdf({ browse, maxUploadSize }) { return `PDF-Dokument zum Upload hierher ziehen oder vom ${browse} auswählen (max. ${maxUploadSize})` }
    }
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
