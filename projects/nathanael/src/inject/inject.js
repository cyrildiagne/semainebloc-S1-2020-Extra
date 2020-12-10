var mouseX, mouseY;
mouseX = mouseY = 0;
var modal;
var modalOffset = { x: 0, y: -20 }
const bannedWords = ["why", "my", "is", "a", "an", "the", "be", "of", "and", "that", "to", "from"]

document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    const elem = e.target
    if (modal) {
        /* modal.style.left = mouseX + modalOffset.x + "px"; */
        modal.style.top = mouseY + modalOffset.y + "px";
        modalOffset.y = (modal.clientHeight / 2 + 10) * (mouseY - modal.clientHeight < 0 ? 1 : -1)
            /* console.log(modalOffset) */
            // WHY OUR PAISEH HEAR THEY WIN SHALL COWL ANOTHER FAINTED TRENDY-ASS CORDUROY CARPET WHERE I HOVER AROUND WHICH DESPERATE METAL BODY SHIT? UH ???
            //                                                                                                          this comment about the code was brought to you by word2vec ✨
    }
    if (!elem.alteredByCursor && !checkForTags(elem.tagName) && elem.innerText /* && elem.modifiedByWord2Vec */ ) {
        registerMouseEvent(elem);
        console.log(elem)
    } else {
        findAlterableChild(elem)
    }
}

function registerMouseEvent(elem) {
    /* console.log(elem) */
    if (modal) {

    } else {
        modal = document.createElement("div");
        if (elem.oldText) {
            modal.innerText = elem.oldText;
        } else { modal.innerText = elem.innerText }

        modal.style.position = "fixed";
        modal.style.height = "fit-content"
        modal.style.fontFamily = "Helvetica"
        modal.style.transform = "translate(-50%)"
        modal.style.backdropFilter = "blur(10px)"
        modal.style.borderRadius = "20px"
        modal.style.pointerEvents = "none"
            /* modal.style.width = "fit-content" */
        modal.style.paddingLeft = "15px"
        modal.style.paddingRight = "15px"
        modal.style.paddingTop = "10px"
        modal.style.paddingBottom = "10px"
            /* try {
                modal.style.fontFamily = elem.style.fontFamily;
                modal.style.fontSize = elem.size.fontSize;
            } catch {} */
        modal.style.transform = "translate(0, -50%)";
        /* modal.style.left = mouseX + modalOffset.x + "px"; */
        modal.style.left = "20px"
        modal.style.right = "fit-content"
        modal.style.margin.right = "20px"
        modal.style.top = mouseY + modalOffset.y + "px";
        modal.style.position = "fixed";
        modal.style.zIndex = 999999
        modal.classList.add("word2vec-modal")
        document.body.appendChild(modal)
            /* console.log(modal); */
    }

    /* elem.alteredContent = elem.innerHTML; */
    /* console.log(elem.oldText) */
    /* elem.innerHTML = elem.oldText; */
    elem.alteredByCursor = true;
    elem.onmouseleave = (e) => {
        /* elem.innerHTML = elem.alteredContent */
        elem.removeEventListener("mouseleave", elem.onmouseleave);
        try {
            var modals = document.getElementsByClassName("word2vec-modal");
            /* console.log(modals) */
            modals[0].parentNode.removeChild(modals[0]);
            modal = null;
            /*             console.log("removed modal") */
            elem.alteredByCursor = false;
        } catch {}
    }
}

function getOffset(el) {
    var position = {
        top: el.offsetTop,
        left: el.offsetLeft
    };
    if (el.offsetParent) {
        var parentPosition = getOffset(el.offsetParent);
        position.top += parentPosition.top;
        position.left += parentPosition.left;
    }
    return position;

}

function findAlterableChild(elem) {
    /* console.log(elem) */
}
/* try {
    
    e.target.currentHTML = e.target.
    e.target.onmouseleave = () => {
        e.target.style.backgroundColor = e.target.originalColor;
        console.log(e.target.originalColor)
        console.log("removed")
        e.target.removeEventListener("mouseleave", e.onmouseleave);
    }
} catch {
    console.log("could not execute mouse move")
} */

var loadbar = document.createElement("div");
var loadbar_bar = document.createElement("div");
loadbar.style.width = "100%";
loadbar.style.height = "3px";
loadbar.style.backgroundColor = "lightgrey";
loadbar.style.position = "fixed";
loadbar.style.top = "0px";
loadbar.style.left = "0px"
loadbar.style.margin = "0px";
loadbar.style.padding = "0px"
loadbar.style.zIndex = 99999;



loadbar_bar.style = loadbar.style;
loadbar_bar.style.width = "0px";
loadbar_bar.style.backgroundColor = "#b0ffc5";
loadbar_bar.style.zIndex = 100000;
loadbar_bar.style.height = "3px";
loadbar_bar.style.position = "fixed";
loadbar_bar.style.top = "0px";
loadbar_bar.style.left = "0px"
loadbar_bar.style.margin = "0px";
loadbar_bar.style.padding = "0px"

loadbar.classList.add("word2vec_loadbar")
loadbar_bar.classList.add("word2vec_loadbar")
document.body.appendChild(loadbar);
document.body.appendChild(loadbar_bar);



function existsInIdMap(e) {
    const keys = Object.keys(idMap);
    for (var i = 0; i < keys.length; i++) {
        const thing = idMap[keys[i]];
        if (e == thing) {
            return true;
        }
    }
    return false;
}

function refreshCraziness(craziness) {
    /* const keys = Object.keys(idMap); */
    usedKeys.forEach(key => {
        const idx = idMap[key].ids.indexOf(parseFloat(key)) // index of word in array
        const newWord = idMap[key].words[idx][craziness].word;
        /* console.log(idMap[key].completePhrase)
        console.log(newWord); */
        idMap[key].completePhrase[idx] = newWord;
        const newText = replaceWithBase(idMap[key].innerText.split(" "), idMap[key].completePhrase);
        idMap[key].innerText = newText;
    })
}

var partialRefreshIndex = 0;

function refreshSome(howMany) {
    while (partialRefreshIndex < partialRefreshIndex + howMany && partialRefreshIndex < usedKeys.length) {
        const key = usedKeys[partialRefreshIndex];
        const idx = idMap[key].ids.indexOf(parseFloat(key)) // index of word in array
        const craziness = Math.floor(Math.random() * 10);
        const newWord = idMap[key].words[idx][craziness].word;
        console.log(idMap[key].completePhrase)
        console.log(newWord);
        idMap[key].completePhrase[idx] = newWord;
        const newText = replaceWithBase(idMap[key].innerText.split(" "), idMap[key].completePhrase);
        idMap[key].innerText = newText;
    }
}


function ask(word, id) {
    /* if (!respectsList(word, bannedWords)) {
        console.log(word)
    } */
    chrome.runtime.sendMessage({ "type": "wordRequest", "word": word, "id": id });
    requests++;
}

/* var isHTML = new RegExp(/<\/?[a-z][\s\S]*>/gi); */
const bannedKeyWords = ["function()", "@media", "{"]


function respectsList(thing, list) {
    for (i in list) {
        if (typeof(thing) == "string") {
            if (thing.includes[list[i]]) {
                console.log(list[i]);
                console.log("bad word")
                return false;
            }

        } else {
            if (thing.innerText.includes[list[i]]) {
                console.log(list[i]);
                console.log("bad word")
                return false;
            }
        }
    }
    return true;
}

function isHTML(thing) {
    if (thing.innerText != "" && !thing.innerText.includes("function()") && !thing.innerText.includes("@media") && !thing.innerText.includes("<")) {
        if (respectsList(thing, bannedKeyWords)) {
            return false;
        }
    }
    return true;
}

function checkForTags(string) {
    if (string[0] == "<" || string[0] == "(" || string[0] == "{") {
        return true;
    }
    const last = string[string.length - 1];
    if (last == ">" || last == ")" || last == "}") {
        return true;
    }
    return false;
}

function findChildrenWithText(e) {
    var children = [];
    for (var i = 0; i < e.children.length; i++) {
        var child = e.children[i];
        if (!checkForTags(child.innerHTML)) { //problem

            children.push(child);
        } else {
            var subChildren = findChildrenWithText(child);
            subChildren.forEach((subChild) => { children.push(subChild) })
        }
    }
    return children;
}

function hasChildren(thing) {
    var occurences = 0;
    if (thing.children.length > 0) {
        return true;
    }
    /*  if (thing.children) {
         console.log(thing.children)

         for (var i = 0; i < a.length; i++) {
             var e = a[i];
             for (var j = 0; j < thing.children.length; j++) {
                 var c = thing.children[j];
                 if (e == c) {
                     occurences++;
                     return true;
                 }
             }
         }
     } */
    return false;
}

function passesBanList(e) {
    var fails = 0;
    bannedTags.forEach((tag) => {
        if (e.tagName == tag) {
            return false;
        }
    })
    if (fails == 0) {
        return true;
    }
}

var a = document.getElementsByTagName("*");
console.log(a)
const bannedTags = ["SCRIPT", "STYLE", "TEXTAREA", "svg", "path", "g", "circle", "VIDEO", "IMG", "HEAD"]
sanitizeDOMList();

function sanitizeDOMList() {
    var result = []
    for (var i = 0; i < a.length; i++) {
        /* console.log(a[i].tagName) */
        if (hasChildren(a[i])) {
            a[i].skip = true;
        }
        var fails = 0;
        bannedTags.forEach((tag) => {
            if (a[i].tagName == tag) {
                fails++
            }
        })
        if (fails == 0) {
            result.push(a[i])
        }
    }
    a = result;
}


console.log(a)

function UUID() {
    var val = Math.floor(Math.random() * (Math.pow(2, 32)));
    val += Math.floor(Math.random() * Math.pow(2, 16));
    val += Math.floor(Math.random() * Math.pow(2, 8));
    val += Math.floor(Math.random() * Math.pow(2, 4));
    return val;
}

var idMap = {}
    //DOM elements and the words they correspond to

function buildIdMap() {
    /* for (var j = 0; j < a.length; j++) { */
    /* var html = a[j]; */
    /* console.log(html) */
    var html = a;
    for (var i = 0; i < html.length; i++) {
        const e = html[i];
        /* console.log(e) */
        if (e.ids && !e.modifiedByWord2Vec) {
            e.originalContent = e.innerHTML;
            e.oldText = e.innerText;
            e.ids.forEach((id) => {
                idMap[id] = e;
                if (!idMap[id].completePhrase) {
                    idMap[id].completePhrase = [];
                }
                if (!idMap[id].words) {
                    idMap[id].words = []
                }
            })
        }
    }
}

/* } */

function convertElement(e) {
    /* return false; */
    e.ids = [];
    e.originalContent = e.innerHTML;
    var theseWords = e.innerText.split(" ");
    theseWords.forEach((word) => {
        if (!checkForTags(word)) {
            var id = UUID();
            if (words[id]) {
                console.log("uuid not unique");
                id = UUID();
            }
            words[id] = word
            e.ids.push(id);
        }
    })

    if (e) {
        e.ids.forEach((id) => {
            idMap[id] = e;
            if (!idMap[id].completePhrase) {
                idMap[id].completePhrase = [];
            }
            if (!idMap[id].words) {
                idMap[id].words = []
            }
        })
    }
    e.ids.forEach((id) => {
        /* console.log(words[id]) */
        if (!e.classList.contains("word2vec-modal")) {
            ask(words[id], id);
        }
    })
}

//          Mutation Observer

const observer = new MutationObserver((records) => {
    /* buildIdMap(); */
    records.forEach((record) => {
        if (!record.target.modifiedByWord2Vec && !record.target.classList.contains("word2vec-modal")) {
            record.addedNodes.forEach((elem) => {
                if (elem.children) {
                    for (var i = 0; i < elem.children.length; i++) {
                        var e = elem.children[i];
                        if (passesBanList(e)) {
                            if (e.children) {
                                var children = findChildrenWithText(e)
                                children.forEach((child) => {
                                    /* child.innerHTML = "sauce béarnaise" */
                                    if (child.innerText) {
                                        /* console.log(child) */
                                        convertElement(child)
                                    }
                                })
                            }

                        }
                    }
                } /* else { console.log(elem) } */
                if (elem.innerText && elem.children.length < 1) {
                    convertElement(elem);
                }
                /* console.log(elem.ids) */
            });
        }
    });
});

observer.observe(document.body, {
    attributes: false,
    childList: true,
    characterData: false,
    subtree: true,
});

var requests = 0;
var callbacks = 0;

var words = {};
for (var j = 0; j < a.length; j++) {
    var html = a[j];
    /* for (var i = 0; i < html.length; i++) { */
    if (html.innerText && html.children.length < 1 && !html.modifiedByWord2Vec) {
        var e = html;
        /* console.log(e) */
        e.ids = [];
        e.originalContent = e.innerHTML;
        var theseWords = e.innerText.split(" ");
        theseWords.forEach((word) => {
            if (!checkForTags(word)) {
                /* console.log(word); */
                var id = UUID();
                if (words[id]) {
                    console.log("uuid not unique")
                    id = UUID();
                }
                words[id] = word;
                e.ids.push(id);
            }
        })
    } else if (html.skip) {
        /* console.log(html.children) */
    }
    /* } */
}
/* console.log(words) */
buildIdMap();
/* console.log(idMap); */



let re = /^[a-z0-9]+$/i;
const keys = Object.keys(words);
for (var i = 0; i < keys.length; i++) {
    const key = keys[i];
    const word = words[key];
    if (re.test(word)) {

        /* console.log(word) */
        ask(word, key);
    }
}
var usedKeys = []
var calls = 0;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    callbacks++;
    if (request.word) {
        /* console.log("original: " + request.originalWord + " modded: " + request.word[0].word, idMap[request.key]) */
        if (idMap[request.key]) {
            var elementId = idMap[request.key].ids.indexOf(parseFloat(request.key));
            /* console.log(idMap[request.key]) */
            var craziness = Math.floor(Math.random() * 10);
            craziness = 0;
            /* idMap[request.key].completePhrase[elementId] = "<i>" + request.word[craziness].word + "</i>"; */
            idMap[request.key].words[elementId] = request.word;
            idMap[request.key].completePhrase[elementId] = request.word[craziness].word;
            /* console.log(request.key) */

            if (!idMap[request.key].modifiedByWord2Vec) {
                idMap[request.key].originalContent = idMap[request.key].innerHTML
                idMap[request.key].oldText = idMap[request.key].innerText
                idMap[request.key].modifiedByWord2Vec = true;
            }


            const newText = replaceWithBase(idMap[request.key].innerText.split(" "), idMap[request.key].completePhrase);
            /* console.log(newText) */
            /* const newText = "waer" */
            /* if (idMap[request.key].children) { console.log(idMap[request.key].children) } */
            idMap[request.key].innerText = newText
            usedKeys.push(request.key)
                /* console.log(usedKeys.length); */

            /* console.log(usedKeys) */

        }
    }
    calls++;
    if (callbacks % 25 == 0 || callbacks == requests) {
        console.log(callbacks + " out of " + requests + " received");
        /* refreshCraziness(Math.ceil(Math.random() * 9)) */
    }
    loadbar_bar.style.width = Math.floor((callbacks / requests) * innerWidth) + "px"
    console.log(loadbar_bar.style.width)

})

function readCorpus() {
    const keys = Object.keys(idMap)
    var corpus = ""
    keys.forEach(key => {
        idMap[key].completePhrase.forEach(word => {
            corpus += word;
            corpus += " "
        })
    })
    return corpus
}

function replaceWithBase(base, mod) {

    /* console.log(mod) */
    for (var i = 0; i < base.length; i++) {
        const e = mod[i];
        if (e == null) {
            mod[i] = base[i]
                /* console.log(mod[i], base[i], e) */
        }
    }
    /* console.log(mod.join(" ")) */
    return mod.join(" ");
}

function exists(arr, e) {
    var occurences = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == e) {
            occurences++;
        }
    }
    return occurences;
}

function checkDoublesIdMap() {
    var idKeys = Object.keys(idMap);
    console.log(idKeys)
    for (key in idKeys) {
        console.log(exists(idKeys, idKeys[key]))
    }
}

function deleteDoubles(arr) {
    var result = []
    for (var i = 0; i < arr.length; i++) {
        var e = arr[i];
        if (!result.includes(e)) {
            result.push(e);
        }
    }
    return result
}