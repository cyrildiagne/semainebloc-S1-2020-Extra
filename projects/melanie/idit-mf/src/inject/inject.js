let pointsCounter = 0;

chrome.extension.sendMessage({event: "get_forbidden_words"}, function (response) {

  

  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);

      console.log('STARTED');

      getWords(response).forEach(word => {
        replaceText(word, '');
      });


      // answer();
      
      // console.log(findCurrentWebsite());

      // window.location.split(' ').forEach(word => {
      //   replaceText(word, 'HIDDEN');
      // });

      openShutter();

      let allElements = document.querySelectorAll('*');
      for (let i = 0; i < allElements.length; i++) {
        allElements[i].addEventListener('click', elemClicked);
        // allElements[i].style.opacity = 1;
        //allElements[i].classList.remove("hidden");
      }
    }
  }, 10);
});

function getWords(url) {
  // let result;

  for (let website of urls) {
    if(website.url === url) {
      result = website
      break;
    }
  }

  return result.hideWords;
}

function elemClicked(e) {
  e.stopPropagation();
  e.preventDefault();

  let el = e.target;
  while (el) {
    el.classList.add('show');
    el = el.parentElement;
  }
  // elemClicked.style.opacity = 0;
  //elemClicked.classList.add("hidden");

  console.log('element clicked');

  // urlPrecedente = urlActuelle;
  // urlActuelle = window.location.href;

  chrome.extension.sendMessage({ event: 'click_score' });

  // if (urlActuelle == urlPrecedente) {
  //     compteurDeClick++;
  // } else {
  //     compteurDeClick = 0;
  // }
}

function replaceText(searchText, replaceText) {
  const reg = new RegExp(`${searchText}`, 'ig')
  document.body.innerHTML = document.body.innerHTML.replace(reg, replaceText);
}

function openShutter() {
  let backShutter = document.createElement('div');
  shutter = document.createTextNode('div');
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
