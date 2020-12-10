chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      console.log("STARTED");
      answer();

            let allElements = document.querySelectorAll('body > *');
            for (let i = 0; i < allElements.length; i++) {
                allElements[i].addEventListener("click", elemClicked);
                allElements[i].style.opacity = 1;
                //allElements[i].classList.remove("hidden");
            };
    }
  }, 10);
});

function elemClicked(e) {
  elemClicked = e.target;
  elemClicked.style.opacity = 0;
  //elemClicked.classList.add("hidden");
  
  console.log("element clicked");
}


function answer(){
  let answerDiv = document.createElement("div");
  answerDiv.classList.add(`answerSquare`);
  document.body.appendChild(answerDiv);
  console.log("div ajoutée");
}



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
  
