// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Event listner for clicks on links in a browser action popup.
// Open the link in a new tab of the current window.

var historyResults = [];
var datePicked;
start = new Date().getTime() - 1000 * 60 * 60 * 24;
end = new Date().getTime();

function onAnchorClick(event) {
  chrome.tabs.create({
    selected: true,
    url: event.srcElement.href,
  });
  return false;
}

function deleteDivs() {
  $(".site_bar").remove();
  historyResults.length = 0;
}

$(function dateOfToday() {
  $('[type="date"]').prop("max", function () {
    return new Date().toJSON().split("T")[0];
  });
  $('[type="date"]').prop("value", function () {
    return new Date().toJSON().split("T")[0];
  });
});

// Given an array of URLs, build a DOM list of those URLs in the
// browser action popup.
function buildHistoryDivs() {
  for (var i = 1; i < historyResults[0].length; ++i) {
    //create bar divs
    var $div = $("<div>", { id: [i] });
    $("#main").append($div);
    $div.addClass("site_bar");
    $div.addClass("hoverable");

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    const scale = (num, in_min, in_max, out_min, out_max) => {
      return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    // var randomColorHue = Math.floor(randomInRange(0, 260));
    // var randomColorSat = Math.floor(randomInRange(50, 90));
    // var randomColorLum = Math.floor(randomInRange(35, 98));
    
    var randomColorHue = Math.floor(randomInRange(0, 260));;
     var visitCount = historyResults[0][i].visitCount;
     if (visitCount > 50){
      visitCount = 50;
     }
     var randomColorSat = Math.floor(randomInRange(60, 90));
    var randomColorLum = Math.floor(randomInRange(35, 98));

    $(".site_bar:nth-child(" + [i] + ")").css(
      "width",
      historyResults[0][i].visitCount * 5 + "vw"
    );

    

    $(".site_bar:nth-child(" + [i] + ")").css(
      "background-color",
      "hsl(" +
        randomColorHue +
        "," +
        randomColorSat +
        "%," +
        randomColorLum +
        "%"
    );
    $(".site_bar:nth-child(" + [i] + ")").append(
      "<a target='_blank' href='" +
        historyResults[0][i].url +
        "'>" +
        historyResults[0][i].title +
        "</a>"
    );
    $(".site_bar:nth-child(" + [i] + ")").attr(
      "site_title",
      historyResults[0][i].title
    );
    // $(".site_bar:nth-child(" + [i] + ")").attr(
    //   "site_visits",
    //   historyResults[0][i].visitCount
    // );
    $(".site_bar:nth-child(" + [i] + ")").attr(
      "site_link",
      historyResults[0][i].url
    );
    $(".site_bar:nth-child(" + [i] + ")").attr("last_visit", day);

    var myDate = new Date(historyResults[0][i].lastVisitTime);
    var day = myDate.toLocaleString('fr-FR', {hour: '2-digit', minute: '2-digit'});
    // var day = myDate.toLocaleString("fr-FR");
  }


  $(".site_bar").hover(function () {
    $("#site_title").text($(this).attr("site_title"));
    // $("#site_visits").text($(this).attr("site_visits"));
    $("#site_url").text($(this).attr("site_link"));
    $("#url_src").attr("href", $(this).attr("site_link"));
    $("#site_time").text($(this).attr("last_visit"));
  });

 
  
}


$( document ).ready(function() {
  window.resizeTo(600, screen.height);

  $("#valiDate").click(function () {
    var date = new Date($("#datePicker").val());
    datePicked = date.getTime() / 1000;
    deleteDivs();
    start = datePicked * 1000 - 1000 * 60 * 60 * 25;
    end = datePicked * 1000;
    getHistory();
  });

  

  const $bigBall = document.querySelector('.cursor__ball--big');
  const $smallBall = document.querySelector('.cursor__ball--small');
  const $hoverables = document.querySelectorAll('.hoverable');
  
  // Listeners
  document.body.addEventListener('mousemove', onMouseMove);
  for (let i = 0; i < $hoverables.length; i++) {
    $hoverables[i].addEventListener('mouseenter', onMouseHover);
    $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
  }
  
  // Move the cursor
  function onMouseMove(e) {
    TweenMax.to($bigBall, .4, {
      x: e.pageX - 15,
      y: e.pageY - 15
    })
    TweenMax.to($smallBall, .1, {
      x: e.pageX - 5,
      y: e.pageY - 7
    })
  }
  
  // Hover an element
  function onMouseHover() {
    TweenMax.to($bigBall, .3, {
      scale: 2
    })
  }
  function onMouseHoverOut() {
    TweenMax.to($bigBall, .3, {
      scale: 1
    })
  }





});



function getHistory() {
  historyItem = [];
  chrome.history.search(
    {
      text: "", // Return every history item....
      startTime: start,
      endTime: end,
      maxResults: 1000,
    },
    function (historyItem) {
      historyResults = [];
      historyResults.push(historyItem);
      console.log(historyResults);
      buildHistoryDivs();
    }
  );
}

document.addEventListener("DOMContentLoaded", function () {
  getHistory();
});
