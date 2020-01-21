function sendDiscord(strSubject) {
  var postUrl = 'https://discordapp.com/api/webhooks/とーくん';
  
  var jsonData = {
    "content" : strSubject
  };
  var payload = JSON.stringify(jsonData);
  var options = {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };
  UrlFetchApp.fetch(postUrl, options);
}

function getMail() {
  // https://tonari-it.com/gas-gmail-search-thread/ 参考
  var FindSubject = 'subject:たいとる';
  var myThreads = GmailApp.search(FindSubject, 0, 20); 
  var myMessages = GmailApp.getMessagesForThreads(myThreads);

  for(var i in myMessages){
    for(var j in myMessages[i]){
      //スターがないメッセージのみ処理 => スターをつける
      if(!myMessages[i][j].isStarred()){ 
        var strSubject　=　myMessages[i][j].getSubject();
        sendDiscord(strSubject);
        myMessages[i][j].star(); 
      }
    }
  }
}