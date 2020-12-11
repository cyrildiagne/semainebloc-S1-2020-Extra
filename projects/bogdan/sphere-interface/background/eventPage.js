console.log("eventPage");

const contextMenuItem = chrome.contextMenus.create({
  id: "searchPhoto",
  title: "Search Photo",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((clickData) => {
  const inputString = clickData.selectionText;
  console.log(inputString);
});
