function setup () {
 var types = ["hiragana", "katakana"];
 for(var i=0;i<types.length;i++){
  (function() {
  var type = types[i];
  var e = document.querySelectorAll("." + type + ".table td");
  for(var j=0;j<e.length;j++){
    (function(){
    var elem = e[j];
    var charName = elem.innerHTML;
    if(!charName){
     return;
    }
    elem.innerHTML = "";
    var small = loadKana(charName, type, "gif", "small");
    var img = small.querySelector('img');
    img.addEventListener("mouseover", function() {hover(charName, type);});
    elem.appendChild(small);
    var anim = loadKana(charName, type, "gif", "anim");
    elem.appendChild(anim);
   }());
  }
  }());
 }
}

function loadKana(char, type, format, style) {
 var directory = '/static/img/' + type + "/" + style + "/";
 var imgSrc = directory + char + "." + format;
 var newE = document.createElement("img");
 newE.setAttribute("src", imgSrc);
 var newDiv = document.createElement("div");
 newDiv.setAttribute("class", type+" "+style);
 newDiv.appendChild(newE);
 return newDiv;
}

function hover(charName, type){
 var elem = document.getElementById('large-display-image');
 var imgSrc = '/static/img/' + type + "/" + "big" + "/" + charName + ".png";
 elem.setAttribute('src', imgSrc);
}

document.addEventListener("DOMContentLoaded", function() {setup()});

