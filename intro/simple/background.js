<<<<<<< HEAD

=======
function onClicked(tab) {
  chrome.windows.create({
    url: chrome.runtime.getURL("popup.html"),
    type: "popup",
    focused: true,
  });
}

chrome.browserAction.onClicked.addListener(onClicked);
<<<<<<< HEAD
>>>>>>> 5ea4e4640eb511ddcdab6d146721b86c55af82b3
=======
>>>>>>> 1443bda0ef80d8025a8b2184647885bee9fb5b94
