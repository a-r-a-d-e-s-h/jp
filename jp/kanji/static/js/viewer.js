var imageSize = [109, 109];

function strokeImg(val) {
 var e = document.createElement('div');
 e.setAttribute('class', 'stroke-image');
 e.setAttribute('id', 'kanji_' + val['number']);
 if(val.hasOwnProperty('comment')){
     e.setAttribute('title', val['comment']);
 }
 var src = "url('/kanji/character/" + val['number'] + ".png')";
 e.style['background-image'] = src;
 this.elem = e;
 var bgPos = [imageSize[0], 0];
 this.translate = function (x, y) {
  bgPos[0] += x;
  bgPos[1] += y;
  e.style['background-position'] = bgPos[0] + 'px ' + bgPos[1] + 'px';
 }
 this.translate(0, 0);
}

function naviLinks(img) {
 var e = document.createElement('div');
 e.setAttribute('class', 'navi-links');
 e.appendChild(naviButton('<', 1, img));
 e.appendChild(naviButton('>', -1, img));
 return e;
}

function naviButton(text, direction, img) {
 var button = document.createElement('div');
 var container = document.createElement('div');
 button.setAttribute('class', 'navi-button');
 container.setAttribute('class', 'navi-button-container');
 function move(d) {
  return function (event) {
   event.preventDefault();
   img.translate(imageSize[0]*d, 0);
  }
 }
 button.addEventListener('click', move(direction));
 var t = document.createElement('a');
 t.setAttribute('href', '');
 t.innerHTML = text;
 button.appendChild(t);
 container.appendChild(button);
 return container;
}



function kanjiContainer(){
 var e = document.createElement('div');
 e.setAttribute('class', 'kanji-container');
 return e;
}

function kanjiItem(val) {
    var container = kanjiContainer();
    var img = new strokeImg(val);
    var links = naviLinks(img);
    container.appendChild(img.elem);
    container.appendChild(links);
    return container;
}

document.addEventListener("DOMContentLoaded", function() {
    var item = kanjiItem({number: 20001, comment: "..."});
    var elem = document.getElementById("character-view");
    elem.appendChild(item);

    var form = document.getElementById("update-form");
    form.onsubmit = getNewCharacter;
});

function getNewCharacter(e){
    e.preventDefault();
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200)
            console.log(request.responseText);
    }
    request.open("POST", "/kanji/touch_character", {'a': 123});
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.withCredentials = true;

    console.log(e.target);
    var form = e.target;
    var inputs = form.querySelectorAll("input");
    var data = "";
    for(var i=0;i<inputs.length;i++){
        data += encodeURIComponent(inputs[i].getAttribute('name')) + '=' + encodeURIComponent(inputs[i].value);
        if (i < inputs.length - 1)
            data += '&';
    }
    request.send(data);
}
