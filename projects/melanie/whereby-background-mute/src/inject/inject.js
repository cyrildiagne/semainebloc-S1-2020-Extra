

chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      console.log("STARTED");
      answer();
      openShutter();
    
      

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
  let elem = document.createElement("div");
  elem.classList.add(`answerSquare`);
  document.body.appendChild(elem);
 
  var y = document.createTextNode("Which website are you surfing on ?");
  elem.appendChild(y);

  addAnswer();
  validationButton();
}


function addAnswer(){
  let addText = document.createElement("div");
  addText.classList.add(`textDiv`);

  let write = document.createElement("INPUT")
  write.setAttribute("fillText","textDiv");
  // document.body.appendChild(write);
  document.body.appendChild(addText);
}





let button = validationButton("I got it !", "button");

function validationButton(text){
  let button = document.createElement("div");
  button.classList.add(`button`);
  button.textContent = text;
  document.body.appendChild(button);
}




function openShutter () {
  let backShutter = document.createElement("div");
  shutter = document.createTextNode("div");
  backShutter.appendChild(shutter);

  document.body.appendChild(backShutter);
  
  // var element = document.querySelector(".door");
  // element.addEventListener("click", toggleDoor);
}
// function toggleDoor() {
//   element.classList.toggle("doorOpen");
// }

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
  
