function ask(word, id) {
    chrome.runtime.sendMessage({ "type": "wordRequest", "word": word, "id": id });
    requests++;
}

/* var isHTML = new RegExp(/<\/?[a-z][\s\S]*>/gi); */
const bannedKeyWords = ["function()", "@media", "{"]


function respectsList(thing, list) {
    for (i in list) {
        if (thing.innerText.includes[list[i]]) {
            console.log(list[i]);
            console.log("bad word")
            return false;
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
            e.ids.forEach((id) => {
                idMap[id] = e;
                if (!idMap[id].completePhrase) {
                    idMap[id].completePhrase = [];
                }
            })
        }
    }
}


/* } */

function convertElement(e) {
    e.ids = [];
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
        })
    }
    e.ids.forEach((id) => {
        /* console.log(words[id]) */
        ask(words[id], id);
    })
}

//          Mutation Observer

const observer = new MutationObserver((records) => {
    /* buildIdMap(); */
    records.forEach((record) => {
        if (!record.target.modifiedByWord2Vec) {
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



const keys = Object.keys(words);
for (var i = 0; i < keys.length; i++) {
    const key = keys[i];
    const word = words[key];
    ask(word, key);
}
var usedKeys = []
var calls = 0;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    callbacks++;
    if (request.word) {
        console.log(request.originalWord, request.word[0].word)
        if (idMap[request.key]) {
            var elementId = idMap[request.key].ids.indexOf(parseFloat(request.key));
            /* console.log(idMap[request.key]) */
            var craziness = Math.floor(Math.random() * 10);
            craziness = 9;
            /* idMap[request.key].completePhrase[elementId] = "<i>" + request.word[craziness].word + "</i>"; */
            idMap[request.key].completePhrase[elementId] = request.word[craziness].word;
            /* console.log(request.key) */

            if (!idMap[request.key].modifiedByWord2Vec) {
                idMap[request.key].oldText = idMap[request.key].innerText
                idMap[request.key].modifiedByWord2Vec = true;
            }


            const newText = replaceWithBase(idMap[request.key].innerText.split(" "), idMap[request.key].completePhrase);
            /* console.log(newText) */
            /* const newText = "waer" */
            if (idMap[request.key].children) { console.log(idMap[request.key].children) }
            idMap[request.key].innerText = newText
            usedKeys.push(idMap[request.key])
                /* console.log(usedKeys.length); */

            /* console.log(usedKeys) */

        }
    }
    calls++;
    /* console.log(callbacks + " out of " + requests + " received"); */
})

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