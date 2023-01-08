


var mydiv = document.getElementById("mydiv") ;
var mydiv1 = document.getElementById("mydiv1") ;
var mydiv2 = document.getElementById("mydiv2") ;
var mydiv3 = document.getElementById("mydiv3") ;
var mydiv4 = document.getElementById("mydiv4") ;
var mydiv5 = document.getElementById("mydiv5") ;
var mydiv6 = document.getElementById("mydiv6") ;
var mydiv7 = document.getElementById("mydiv7") ;
var mydiv8 = document.getElementById("mydiv8") ;
var mydiv9 = document.getElementById("mydiv9") ;
var mydiv10 = document.getElementById("mydiv10") ;
var mydiv11 = document.getElementById("mydiv11") ;
var c = 1 ;


dragElement(mydiv);
dragElement(mydiv1) ; 
dragElement(mydiv2);
dragElement(mydiv3);
dragElement(mydiv4);
dragElement(mydiv5);
dragElement(mydiv6);
dragElement(mydiv7) ; 
dragElement(mydiv8);
dragElement(mydiv9);
dragElement(mydiv10);
dragElement(mydiv11);


function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}




function dragElement(elmnt) {
   
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var a=elmnt.style.top ;
  var b=elmnt.style.left ;
  elmnt.onmousedown = dragMouseDown;
    
  function dragMouseDown(e) {
    
    e = e || window.event;
    e.preventDefault();
    elmnt.style.zIndex=++c;
    
  
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    document.onmouseup = closeDragElement;
   
 
    document.onmousemove = elementDrag;
  }


  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
   
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
   
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    
    
    document.onmouseup = null;
    document.onmousemove = null;

    //elmnt.style.top=a ;
    //elmnt.style.left =b ;
    

    

  }


}




/*
var curs = document.getElementById("breadUp");
curs.addEventListener("mousemove",
function(e){
    var x = e.clientX ; 
    var y = e.clientY ; 

        var trans = "translate(" + x +"px ," + y +"px )";
        curs.style.transform = trans ;  
    }
}

)
*/