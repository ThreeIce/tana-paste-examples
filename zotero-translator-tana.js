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
  
      // author
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
        Zotero.write('  - Abstract:: '+ item.abstractNote + '\n');
      }
    }
  }
  
