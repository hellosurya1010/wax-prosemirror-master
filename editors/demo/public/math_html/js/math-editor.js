/*
 MLQ - WYSIWYG MathML editor
 All rights reserved. CQRL Bits LLP © 2023 (cqrlbits@gmail.com)
*/
var yedit_caps_lock = false;
var capsKeyPressConfig = {
    "keys"          : "caps_lock",
    "is_solitary"  : true,
    "on_keyup"      : function(event) {
	yedit_caps_lock = !yedit_caps_lock;
    }
};

function gid(id) {
    return document.getElementById(id);
}

function addCopyCutMathMLEvent() {
    function copyMathMLtoClipboard(event) {
	sel = window.getSelection();
	range = sel.getRangeAt(0);
	commonAncestor = range.commonAncestorContainer;
	let mtag = commonAncestor.nodeName;
	let otag = "<" + mtag + ">";
	let etag = "</" + mtag + ">";
	let mml = commonAncestor.innerHTML.replace(/<mi id[^<>]+>/g,"<mi>");
	mml = otag + mml + etag;
	event["clipboardData"].setData("text/plain", mml);
    }
    math = document.querySelector(".output");
    math.addEventListener("copy", (event) => {
	copyMathMLtoClipboard(event);
	event.preventDefault();
    });
    math.addEventListener("cut", (event) => {
	const sel = document.getSelection();
	copyMathMLtoClipboard(event);
	sel.deleteFromDocument();
	event.preventDefault();
    });
}


function addMessageListenerFromParentFrame() {
    const mis = "<mi>&nbsp;</mi>";
    window.addEventListener(
	"message",
	(event) => {
	    // Do we trust the sender of this message?  (might be
	    // different from what we originally opened, for example).
	    //console.log("message received from:",event.origin);
	    //console.log("message:",event.data);
	    if (event.origin == "http://localhost:8080") {
		// event.source is popup
		//console.log("message from localhost:8080:",event.data);
		mathml = event.data.replace(/(<\/math>)/, mis + "$1");
		document.querySelector(".output").innerHTML = mathml;
	    }
	},
	false
    );
}

// Define keypress events
function initKeypressEvents() {
    var el = document.body.querySelector(".output");
    var listener = new window.keypress.Listener(el);
    /*=======Track-changes=====================*/
    const track_changes = getTrackChangesKeyPressConfig();
    listener.register_many(track_changes);
}

function getTrackChangesKeyPressConfig() {
    var track_changes = [];
    const ascii = getAsciiKeyCmds();
    track_changes.push(capsKeyPressConfig);
    ascii.forEach(function(item,i) {
        track_changes.push(getKeyPressConfig(item));
    });
    return track_changes;
}

function getMathTagName(c) {
    tc = "mi";
    if(/^[\p{Letter}]+$/u.test(c)) {
	tc = "mi";
    }
    else if(/^[0-9]$/.test(c)) {
	tc = "mn";
    }
    else if(/^<m/.test(c)) {
	tc = "mrow";
    }
    else {
	tc = "mo";
    }
    return tc;
}

function getKeyPressConfig(key) {
    var chr = getCharFromKey(key);
    const cfg = {
        "keys": key,
	"is_solitary"  : true,
        "on_keyup"      : function(event) {
	    event.preventDefault();
	},
        "on_keydown"      : function(event) {
	    //console.log(key,chr,yedit_caps_lock);
	    if(yedit_caps_lock && !(/^shift/.test(key))) { chr = chr.toUpperCase();  }
	    if(yedit_caps_lock && (/^shift/.test(key))) { chr = chr.toLowerCase();  }
	    if(!yedit_caps_lock && !(/^shift/.test(key))) { chr = chr.toLowerCase();  }
	    if(!yedit_caps_lock && (/^shift/.test(key))) { chr = chr.toUpperCase();  }
	    event.preventDefault();
	    insertInMathML(chr);
	    addClickEvent();
        }
    };
    return cfg;
}

function escapedMathMLtoTags(c) {
    return c.replace(/\&lt;(m[a-z]+[^\&]*)\&gt;/g,"<$1>").replace(/\&lt;\/(m[a-z]+)\&gt;/g,"</$1>").replace(/\&amp;([^&;]+);/g,"&$1;");
}

function insertInMathML(c) {
    if(c == "-") {
	c = "−";
    }
    let snode = gid("__cursor__");
    var sel = window.getSelection();
    var txt = sel.anchorNode.textContent;
    let selflag = false;
    if(/<selected>$/.test(c)) {
	c = c.replace(/<selected>$/,"");
	c = c.replace(/<mi>&square;<\/mi>/,"<mi>" + txt + "</mi>");
	selflag = true;
    }
    if(snode) {
	document.execCommand('insertText',false, "__" + c + "__");
	if(/^__(.+)__$/.test(snode.textContent)) {
	    snode.innerHTML = c;
	    var range = document.createRange();
	    var sel = window.getSelection();
	    range.setStart(snode, 1);
	    range.setEnd(snode, 1);
	    range.collapse(true);
	    sel.removeAllRanges();
	    sel.addRange(range);
	    snode.setAttribute('data-cursor-offset','1')
	}
	else {
	    let loc = setCursorPosition();
	    const mi_html = snode.innerHTML;
	    const mrgxp = /^(.*)__(.+)__(.*)$/;
	    const string_before = mi_html.replace(mrgxp,"$1");
	    mi_char = escapedMathMLtoTags(mi_html.replace(mrgxp,"$2"));
	    snode.innerHTML = escapedMathMLtoTags(mi_html.replace(mrgxp,"$1$3"));
	    const mtag = getMathTagName(mi_char);
	    let mi = document.createElement(mtag);
	    if(mtag != "mrow") {
		mi.id = "__cursor__";
		mi.setAttribute('data-cursor-offset',loc);
	    }
	    mi.innerHTML = mi_char;
	    if (/^[\p{Ps}\p{Pe}]$/u.test(c)) {
		mi.setAttribute("stretchy","false");
	    }
	    if(loc > 0) {
		snode.after(mi);
	    }
	    else {
		snode.before(mi);
	    }
	    if(txt == "□" || selflag) {
		snode.remove();
	    }
	    let cursor = gid("__cursor__");
	    if(cursor) {
		cursor.removeAttribute('id');
		cursor.removeAttribute('data-cursor-offset');
	    }
	    var math = document.querySelector(".output > math");
	    let mhtml = math.innerHTML;
	    let cursor_mark = "<mi>&nbsp;</mi>";
	    if(mtag == "mrow") {
		cursor_mark = "<mi id='__cursor__' data-cursor-offset='0'>&nbsp;</mi>";
	    }
	    mhtml = mhtml.replace(/<mi>&nbsp;<\/mi>/g,"") + cursor_mark;
	    math.innerHTML = mhtml;
	    setCursorPosition();
	}
    }
}

function restoreMath() {
    const math = document.querySelector(".output");
    empty_mrows = document.querySelectorAll(".output mathml mrow");
    empty_mrows.forEach(function(item,i) {
	if(item.childNodes.length == 0) {
	    item.innerHTML = "<mi>&nbsp;</mi>";
	}
    });
    empty_others = document.querySelectorAll(".output mathml mfrac, .output mathml msub, .output mathml msup, .output mathml msubsup, .output mathml munder, .output mathml mover, .output mathml munderover");
    empty_others.forEach(function(item,i) {
	if(item.childNodes.length == 0) {
	    item.innerHTML = "<mrow><mi>&nbsp;</mi></mrow>";
	}
    });
    var brs = math.querySelectorAll("br");
    brs.forEach(function(item,i) {
	var txt = document.createTextNode(" ");
	item.replaceWith(txt);
    });
    var els = math.querySelectorAll(".output math *");
    els.forEach(function(item,i) {
	if(item.textContent.trim() == "") {
	    item.remove();
	}
    });
    const cursor_mark = "<mi id='__cursor__' data-cursor-offset='0'>&nbsp;</mi>";
    const m = document.querySelector(".output math");
    let mml = math.innerHTML.trim();
    if(!/^<math/.test(mml) || m.textContent.trim() == "") {
	math.innerHTML = "<math displaystyle='true'>" + cursor_mark + "</math>";
    }
}

function removeSquareClassWithoutSquare() {
    mrowsquares = document.querySelectorAll(".output mrow");
    mrowsquares.forEach(function(item,i) {
	if(item.textContent != "□" && item.textContent != "&square;") {
	    item.classList.remove("square");
	}
    });
}

function setCursorPosition() {
    let startOffset = 0;
    let cursor = gid("__cursor__");
    if(cursor) {
	startOffset = parseInt(cursor.getAttribute('data-cursor-offset'));
    }
    mis = document.querySelectorAll(".output mi");
    let startNode = null;
    mis.forEach(function(item,i) {
	if(item.textContent == "□" && startNode == null) {
	    startNode = item;
	}
    });
    if(startNode != null) {
	var rangeobj = document.createRange();
	var selectobj = window.getSelection();
	rangeobj.setStart(startNode,0);
	rangeobj.setEnd(startNode,1);
	//rangeobj.collapse(true);
	selectobj.removeAllRanges();
	selectobj.addRange(rangeobj);
	insertCursorMarkerInMathML(null);
    }
    else {
	if(cursor && cursor.childNodes.length > 0) {
	    startNode = cursor.childNodes[0];
	    var rangeobj = document.createRange();
	    var selectobj = window.getSelection();
	    rangeobj.setStart(startNode, startOffset);
	    rangeobj.setEnd(startNode, startOffset);
	    rangeobj.collapse(true);
	    selectobj.removeAllRanges();
	    selectobj.addRange(rangeobj);
	}
    }
    return startOffset;
}

function insertCursorMarkerInMathML(evt) {
	console.log(evt);
    let sel = window.getSelection();
    range = sel.getRangeAt(0);
    let lc = range.startOffset;
    if(sel && sel.anchorNode) {
	let snode = sel.anchorNode;
	if(snode.nodeType == 3) {
	    snode = snode.parentNode;
	}
	if(snode.closest(".output")) {
	    const cursor_id = "__cursor__";
	    let psnode = gid(cursor_id);
	    if(psnode) {
		psnode.removeAttribute('id');
		psnode.removeAttribute('data-cursor-offset');
	    }
	    snode.id = cursor_id;
	    snode.setAttribute('data-cursor-offset',lc);
	    if(snode.textContent == "□") {
		range.setStart(snode,0);
		range.setEnd(snode,1);
	    }
	}
    }
}

function getAsciiKeyCmds() {
    return ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","shift a","shift b","shift c","shift d","shift e","shift f","shift g","shift h","shift i","shift j","shift k","shift l","shift m","shift n","shift o","shift p","shift q","shift r","shift s","shift t","shift u","shift v","shift w","shift x","shift y","shift z", "0","1","2","3","4","5","6","7","8","9","-","=","+","[","]","\\",";","\'",",",".","/","shift 0","shift 1","shift 2","shift 3","shift 4","shift 5","shift 6","shift 7","shift 8","shift 9","shift -","shift =","shift +","shift [","shift ]","shift \\","shift ;","shift \'","shift ,","shift .","shift /","shift (","shift )","arrowright","arrowleft"];
}

function getCharFromKey(key) {
    var chr = key;
    const rgxp_shift_letters = /^shift +([a-z])$/;
    const rgxp_shift_others = /^shift +([^a-z])$/;    
    if(rgxp_shift_letters.test(key)) {
	chr = key.replace(rgxp_shift_letters,"$1");
    }
    else if(rgxp_shift_others.test(key)) {
	var ch = key.replace(rgxp_shift_others,"$1");
	const skeys = {
	    "`": "~",
	    "1": "!",
	    "2": "@",
	    "3": "#",
	    "4": "$",
	    "5": "%",
	    "6": "^",
	    "7": "&",
	    "8": "*",
	    "9": "(",
	    "0": ")",
	    "-": "_",
	    "=": "+",
	    "[": "{",
	    "]": "}",
	    "\\": "|",
	    ",": ":",
	    "\'": "\"",
	    ",": "<",
	    ".": ">",
	    "/": "?"
	}
	chr = skeys[ch];
	if(!chr) {
	    chr = key.replace(/^shift /,"");
	}
    }
    return chr;
}

function addPasteEvent() {
    var el = document.body.querySelector(".output");
    el.addEventListener('paste', function(event) {
	let sel = window.getSelection();
	let snode = sel.anchorNode.parentNode;
	let txt = (event.clipboardData || window.clipboardData).getData('text');
	event.preventDefault();
	insertInMathML(txt);
    });
}

function addClickEvent() {
    var el = document.body.querySelector(".output");
    el.addEventListener('click', function(event) {
	insertCursorMarkerInMathML(event);
    });
}


function setSelectionAtCursorMarker() {
    const cursor = gid("__cursor__");
    let sel = window.getSelection();
    range = sel.getRangeAt(0);
    var L = cursor.textContent.length;
    if(L > 0) {
	L = L-1
    }
    range.setStart(cursor,L);
    range.setEnd(cursor,L);
}

function closeAllOpenMenus() {
    let uls = document.querySelectorAll(".menus ul");
    uls.forEach(function(ul,i) {
	ul.remove();
    });
}

function sendMathML() {
    let pwin = window.parent;
    let mathml = document.querySelector(".output").innerHTML;
    if(window.self !== window.top) {
	pwin.postMessage(mathml,"*");
	console.log("mathml:",mathml);
    }
    else {
	let mathmlcode = document.querySelector("#mathmlcode");
	mathmlcode.style.display = "block";
	mathmlcode.value = mathml;
    }
}

function addDropMenuEvents() {
    ls = {};
    ls["subsup"] = ["sub","sup","subsup","multiscripts"];
    ls["frac"] = ["frac","frac0"];
    ls["underover"] = ["underover","under","over"];
    ls["text"] = ["text"];
    ls["root"] = ["sqrt","root"];
    ls["matrix"] = ["fence","options","matrix"];
    ls["greek"] = ["alpha","beta","gamma","Gamma","epsilon","delta","Delta","pi","Pi","phi","Phi",'omega',"Omega","theta","Theta"];
    ls["math"] = ["sum","integral","partial","cup","cap","infin","forall","isin","notin","subset","supset","plusmn"];
    var menus = ["subsup","root","frac","underover","matrix","greek","math","text"];
    menus.forEach(function(id,i) {
	var el = document.body.querySelector("#" + id);
	el.addEventListener('click', function(event) {
	    let ulx = el.querySelector("ul");
	    if(ulx) {
		ulx.remove();
	    }
	    else {
		closeAllOpenMenus();
		//console.log("id:",id);
		var lss = ls[id];
		var ul = document.createElement("ul");
		lss.forEach(function(li,i) {
		    var list = document.createElement("li");
		    list.classList.add("button");
		    list.classList.add("button-primary");
		    list.title = li;
		    list.addEventListener('click', function(event) {
			if(id == "text") {
			    let text = prompt("Enter text here", "");
			    let mhtml = "<mtext>" + text + "</mtext>";
			    let output = document.body.querySelector(".output");
			    output.focus();
			    setSelectionAtCursorMarker();
			    insertInMathML(mhtml);
			}
			else if(id == "greek" || id == "math") {
			    let chr = mathFragments[li].replace(/<[^<>]+>/g,"");
			    insertInMathML(chr);
			    //document.execCommand('insertText',false,chr);
			    //let snode = gid("__cursor__");
			    //snode.innerHTML = snode.innerHTML.replace(/&amp;([#A-za-z0-9]+;)/g,"&$1"); 
			}
			else {
			    let mhtml = mathFragments[li];
			    if(window.getSelection().toString() != "") {
				mhtml += "<selected>";
			    }
			    let output = document.body.querySelector(".output");
			    output.focus();
			    setSelectionAtCursorMarker();
			    //console.log("mhtml:",mhtml);
			    insertInMathML(mhtml);
			}
		    });
		    var p = document.createElement("p");
		    p.innerHTML = "<math>" + mathFragments[li] + "</math>";
		    list.appendChild(p);
		    ul.appendChild(list);
		});
		el.appendChild(ul);
	    }
	});
    });
}

function addAboutUs() {
    aboutus = document.querySelector("#aboutus");
    aboutus.addEventListener("click", function() {
	alert("MLQ - WYSIWYG MathML Equation Editor\n" + "All rights reserved. CQRL Bits LLP © 2023\n"+ "(cqrlbits@gmail.com)");
    });
}

jQuery(document).ready(function($) {
    initKeypressEvents();
    addPasteEvent();
    addDropMenuEvents();
    addClickEvent();
    addMessageListenerFromParentFrame();
    addCopyCutMathMLEvent();
    addAboutUs();
    var el = document.querySelector(".output");
    el.addEventListener('keyup', function(event) {
	const el = document.querySelector(".output");
	const keyname = event.key;
	//console.log("keyname:",keyname);
	const arrows = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];
	//console.log("keyname:",keyname);
	if(keyname == "Delete" || keyname == "Backspace") {
	    restoreMath();
	}
	if(arrows.includes(keyname)) {
	    insertCursorMarkerInMathML(event);
	}
    });
});
