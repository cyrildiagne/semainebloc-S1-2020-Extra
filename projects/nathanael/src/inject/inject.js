function ask(word, id) {
    chrome.runtime.sendMessage({ "type": "wordRequest", "word": word, "id": id });
}

var a = [];
a.push(document.getElementsByTagName("p"))
a.push(document.getElementsByTagName("div"))
a.push(document.getElementsByTagName("h1"))
a.push(document.getElementsByTagName("h2"))


function UUID() {
    var val = Math.floor(Math.random() * (Math.pow(2, 32)));
    val += Math.floor(Math.random() * Math.pow(2, 16));
    val += Math.floor(Math.random() * Math.pow(2, 8));
    val += Math.floor(Math.random() * Math.pow(2, 4));
    return val;
}

var idMap = {}

function buildIdMap() {
    a.forEach((html) => {
        /* console.log(html) */
        for (var i = 0; i < html.length; i++) {
            const e = html[i];
            e.ids.forEach((id) => {
                idMap[id] = e;
                if (!idMap[id].completePhrase) {
                    idMap[id].completePhrase = [];
                }
            })
        }
    })
}

var words = {};
a.forEach((html) => {
        for (var i = 0; i < html.length; i++) {
            var e = html[i];
            e.ids = [];
            var theseWords = e.innerText.split(" ");
            /* console.log(e); */
            theseWords.forEach((word) => {
                if (word != "" && word[0] != "<") {
                    var id = UUID();
                    if (words[id]) {
                        console.log("uuid not unique")
                        id = UUID();
                    }
                    words[id] = word;
                    e.ids.push(id);
                }
            })
        }
    })
    /* console.log(words) */
buildIdMap();
console.log(idMap);



const keys = Object.keys(words);
for (var i = 0; i < keys.length; i++) {
    const key = keys[i];
    const word = words[key];
    ask(word, key);
}
var usedKeys = []
var calls = 0;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.word) {
        if (idMap[request.key]) {
            var elementId = idMap[request.key].ids.indexOf(parseFloat(request.key));
            /* console.log(idMap[request.key]) */
            idMap[request.key].completePhrase[elementId] = request.word[Math.floor(Math.random() * 10)].word;
            console.log(idMap[request.key].textContent)

            const newText = replaceWithBase(idMap[request.key].innerText.split(" "), idMap[request.key].completePhrase);
            /* console.log(newText) */
            /* const newText = "waer" */
            idMap[request.key].innerText = newText
            usedKeys.push(idMap[request.key])
            console.log(usedKeys.length);

            console.log(usedKeys)

        }
    }
    calls++;
    /* console.log(calls); */
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