chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      console.log("Hello. This message was sent from scripts/inject.js");
      // ----------------------------------------------------------
    }
  }, 10);
});

// recursirve
// function getLastDescendants(elem, lastDescendants = []) {
//   const children = elem.children;
//   if (children.length === 0) {
//     lastDescendants.push(elem);
//   } else {
//     for (let i = 0; i < children.length; i++) {
//       let child = children[i];
//       getLastDescendants(child, lastDescendants);
//     }
//   }

//   return lastDescendants;
// }

// function getSmallDoms(elem, area = 100, lastDescendants = []) {
// 	const children = elem.children;

// 	let bounds = elem.getBoundingClientRect();

// 	let elemArea = bounds.width * bounds.height;

// 	if (elemArea <= area) {
// 	  lastDescendants.push(elem);
// 	  return lastDescendants;
// 	} else if(children.length > 0) {

// 	  for (let i = 0; i < children.length; i++) {
// 		let child = children[i];
// 		getSmallDoms(child, area, lastDescendants);
// 	  }

// 	}
  
// 	return lastDescendants;
//   }
  
