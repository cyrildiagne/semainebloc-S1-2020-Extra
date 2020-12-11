const menu = chrome.contextMenus.create({
  id: "searchPhoto",
  title: "Look up: %s",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((clickData) => {
  const inputString = clickData.selectionText
  console.log(inputString)
});
