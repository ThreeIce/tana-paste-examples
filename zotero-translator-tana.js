{
  "translatorID":"dda092d2-a257-46af-b9a3-2f04a55cb04f",
  "translatorType":2,
  "label":"Tana Metadata Export",
  "creator":"Stian Håklev based on Joel Chan's work",
  "target":"md",
  "minVersion":"2.0",
  "maxVersion":"",
  "priority":200,
  "inRepository":false,
  "lastUpdated":"2022-09-07 - 10:15"
  }
   
  function doExport() {
    Zotero.write('%%tana%%\n');
    var item;
    while (item = Zotero.nextItem()) {
      // ref
      Zotero.write('- ' + item.title + ' #Reference\n');
      
      Zotero.write('  - Title:: ' + item.title + '\n');

      // authors
      if (item.creators.length > 0) {
        Zotero.write('  - Authored by:: \n');
        // write authors as indented nodes
        for (var i = 0; i < item.creators.length; i++) {
          var creator = item.creators[i];
          var name = creator.lastName;
          if (creator.firstName) name = creator.firstName + ' ' + name;
          Zotero.write('    - [[' + name + ' #Entity]]\n');
        }
        Zotero.write('\n');
      }
   
      // year
      var date = Zotero.Utilities.strToDate(item.date);
      var dateS = (date.year) ? date.year : item.date;
      if (dateS) {
        Zotero.write('  - Year:: ' + dateS + '\n');
      }
      
      // publication
      if (item.publicationTitle) {
        Zotero.write('  - Publication:: [[' + item.publicationTitle + ' #Publication]]\n');
      }
   
      // zotero link
      var library_id = item.libraryID ? item.libraryID : 0;
      var itemLink = 'zotero://select/items/' + library_id + '_' + item.key;
   
      Zotero.write('  - Zotero link:: [Zotero Link](' + itemLink + ')\n');
   
      // url with citation
      if (item.url) {
        Zotero.write('  - URL:: ' + '[' + item.url + '](' + item.url + ')\n');
      }
      
      if (item.abstractNote) {
        Zotero.write('  - Abstract:: \n');
        var lines = item.abstractNote.split(/\r?\n/);
        for (var i = 0; i < lines.length; i++) {
          if (lines[i].trim().length > 0) {
            Zotero.write('    - ' + lines[i] + '\n');
          }
        }
      }

      // notes (暂时不可用,导入格式有问题)
      // if (item.notes && item.notes.length > 0) {
      //   for (var i = 0; i < item.notes.length; i++) {
      //     var note = item.notes[i];
      //     var noteContent = note.note || note;
      //     var noteTitle = note.title || 'Note';
          
      //     // Basic HTML cleanup
      //     var text = noteContent.replace(/<\/p>|<br\s*\/?>/gi, '\n');
      //     text = text.replace(/<[^>]+>/g, '');
      //     text = text.replace(/&nbsp;/g, ' ').replace(/</g, '<').replace(/>/g, '>').replace(/&/g, '&').replace(/"/g, '"');
          
      //     var lines = text.split(/\r?\n/);
      //     var validLines = [];
      //     for (var j=0; j<lines.length; j++) {
      //        if (lines[j].trim().length > 0) validLines.push(lines[j]);
      //     }
          
      //     if (validLines.length > 0) {
      //        Zotero.write('  - ' + noteTitle + '\n');
      //        for (var j=0; j<validLines.length; j++) {
      //            var line = validLines[j];
      //            var match = line.match(/^\s*[-*]\s+(.*)/);
      //            if (match) {
      //                Zotero.write('      - ' + match[1] + '\n');
      //            } else {
      //                Zotero.write('    - ' + line + '\n');
      //            }
      //        }
      //     }
      //   }
      // }

    }
  }
  
