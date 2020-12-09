// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Event listner for clicks on links in a browser action popup.
// Open the link in a new tab of the current window.

var historyResults = [];
function createDivs(divName){
  for (var i = 0, len = divName.length; i < len; i++) {
    var $div = $("<div>", { id: divName[i] });
    $("#main").append($div);
    $div.addClass("site_bar");
  }
}



function onAnchorClick(event) {
  chrome.tabs.create({
    selected: true,
    url: event.srcElement.href
  });
  return false;
}
// Given an array of URLs, build a DOM list of those URLs in the
// browser action popup.
function buildPopupDom(divName, urlToCount) {
  var keys = Object.keys(urlToCount);
  var timesVisited = Object.values(urlToCount);
  

  // console.log(urlArray);
  // console.log(urlArray[0]);

  for (var i = 0, ie = historyResults[0].length; i < ie; ++i) {
    createDivs([i]);
    function randomInRange(min, max) {  
      return Math.random() * (max - min) + min; 
  } 
    var randomColorHue = Math.floor(randomInRange(0,260));
    var randomColorSat = Math.floor(randomInRange(50,90));
    var randomColorLum = Math.floor(randomInRange(35,100));
    
     
    $(".site_bar:nth-child(" +[i] + ")").css('width',historyResults[0][i].visitCount + "vw");
    $(".site_bar:nth-child(" +[i] + ")").css('background-color', "hsl(" + randomColorHue + ","+ randomColorSat+"%,"+ randomColorLum+"%");
    console.log(randomColorSat, randomColorHue);
    $(".site_bar:nth-child(" +[i] + ")").append("<a href='" + historyResults[0][i].url +"'>" + historyResults[0][i].title + "</a>");
    // $(".site_bar:nth-child(" +[i] + ")").append("<p class='site_name marquee'><span>" + keys[i] +"</span></p>");
  }
}


// Search history to find up to ten links that a user has typed in,
// and show those links in a popup.
function buildTypedUrlList(divName) {
  // To look for history items visited in the last week,
  // subtract a week of microseconds from the current time.
  var microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
  var microsecondsPerYear = 1000 * 60 * 60 * 24 * 7 * 52;
  var startTime = (new Date).getTime() - microsecondsPerYear;
  // Track the number of callbacks from chrome.history.getVisits()
  // that we expect to get.  When it reaches zero, we have all results.
  var numRequestsOutstanding = 0;
  chrome.history.search({
      'text': '',              // Return every history item....
      'startTime': startTime,
      'maxResults' : 500  // that was accessed less than one week ago.
    },
    function(historyItems) {
      
      // For each history item, get details on all visits.
      for (var i = 0; i < historyItems.length; ++i) {
        var url = historyItems[i].url;
        var title = historyItems[i].title;
        var visitCount = historyItems[i].visitCount;
        var processVisitsWithUrl = function(url) {
          // We need the url of the visited item to process the visit.
          // Use a closure to bind the  url into the callback's args.
          return function(visitItems) {
            processVisits(url,visitItems);
          };
        };
        chrome.history.getVisits({url: url}, processVisitsWithUrl(url));
        numRequestsOutstanding++;
      }
      if (!numRequestsOutstanding) {
        onAllVisitsProcessed();
      }
      historyResults.push(historyItems);
      
    });
   
    
  // Maps URLs to a count of the number of times the user typed that URL into the omnibox.
  var urlToCount = {};
  // Callback for chrome.history.getVisits().  Counts the number of times a user visited a URL by typing the address.
  var processVisits = function(url,visitItems) {
    for (var i = 0, ie = visitItems.length; i < ie; ++i) {
      // Ignore items unless the user typed the URL.
      if (visitItems[i].transition != 'link' ) {
        continue;
      }
      if (!urlToCount[url]) {
        urlToCount[url] = 0;
      }
      urlToCount[url]++;
    }
    // If this is the final outstanding call to processVisits(), then we have the final results.  Use them to build the list
    // of URLs to show in the popup.
    if (!--numRequestsOutstanding) {
      onAllVisitsProcessed();
    }
  };
  // This function is called when we have the final list of URls to display.
  var onAllVisitsProcessed = function() {
    // Get the top scorring urls.
     urlArray = [];
    for (var url in urlToCount) {
      urlArray.push(url);
    }
 
    
    // Sort the URLs by the number of times the user typed them.
    urlArray.sort(function(a, b) {
      return urlToCount[b] - urlToCount[a];
    });

    buildPopupDom(divName, urlArray);
  };
}

document.addEventListener('DOMContentLoaded', function () {
  buildTypedUrlList("typedUrl_div");
});


