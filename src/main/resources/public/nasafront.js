//API key = OXWLPEj2POXEsm7TxkfnDaTaDG7XICADb71cXxY7;
const api = 'https://api.nasa.gov/planetary/apod?api_key=OXWLPEj2POXEsm7TxkfnDaTaDG7XICADb71cXxY7';
function checkLike(id){
  var lbutton = document.getElementById("like"+id);
  if(lbutton.value == "Like"){
      lbutton.value = "Unlike";
  }else{
      lbutton.value = "Like";
  }
}

function generateNasaImgnum(){
var number = document.getElementById("number");
generateNasaImgs(number.value);
}

function generateNasaImgs(Range){
    var apiuse = "";
    document.getElementById("MainBox").innerHTML = "";
   if(Range == ""){
       apiuse = api;
   }else{
    if(Range < 1){
    window.alert("Please select a value greater than or equal to 1");
    apiuse = api;
   }else if(100< Range){
    window.alert("Please select a value less than or equal to 100");
    apiuse = api;
   }else{
    apiuse = api+"&count="+Range;
    }
   
}

    fetch(apiuse).then((Response) => {return Response.json();}).then(data=>{   
        var length = 1; 
        var dlen = false;
        if(data.length != null){
            length = data.length;
            dlen = true;
        }
       
    for(var i = 0; i < length; i++){
        if(dlen){
        const {media_type, url, title, date, explanation} = data[i];
        const div = document.createElement('div');
        div.className = "imgSection";
        if(media_type == "video"){
        const vid = document.createElement('iframe');
        vid.src = url;
        vid.className = "imgstyle";
        div.appendChild(vid);
        }else{ 
        const img = document.createElement("img");
        img.src = url;
        img.className = "imgstyle";
        div.appendChild(img);
        }
        const div2 = document.createElement('div');
        div2.className = "textSection";
        div.appendChild(div2);
        const p = document.createElement("p");
        const p2 = document.createElement("p");
        p.innerHTML = "<b>"+title+" - "+date+"<b>";
        p2.textContent = explanation;
        div2.appendChild(p);
        div2.appendChild(p2);
        const br = document.createElement("br");
        div2.appendChild(br);
        const button = document.createElement("input");
        button.type = "button";
        button.className= "buttonstyle";
        button.id = "like"+i;
        button.value = "Like";
        button.addEventListener("click",function() {
            if(button.value == "Like"){
                button.value = "Unlike";
            }else{
                button.value = "Like";
            }
           });
        div2.appendChild(button);
        document.getElementById("MainBox").appendChild(div);
        document.getElementById("MainBox").appendChild(br);
        }else{
        const {media_type, url, title, date, explanation} = data;
        const div = document.createElement('div');
        div.className = "imgSection";
        if(media_type == "video"){
        const vid = document.createElement('iframe');
        vid.src = url;
        vid.className = "imgstyle";
        div.appendChild(vid);
        }else{ 
        const img = document.createElement("img");
        img.src = url;
        img.className = "imgstyle";
        div.appendChild(img);
        }
           const div2 = document.createElement('div');
           div2.className = "textSection";
           div.appendChild(div2);
           const p = document.createElement("p");
           const p2 = document.createElement("p");
           p.innerHTML = "<b>"+title+" - "+date+"<b>";
           p2.textContent = explanation;
           div2.appendChild(p);
           div2.appendChild(p2);
           const br = document.createElement("br");
           div2.appendChild(br);
           const button = document.createElement("input");
           button.type = "button";
           button.className= "buttonstyle";
           button.id = "like"+i;
           button.value = "Like";
           button.addEventListener("click", function() {
            if(button.value == "Like"){
                button.value = "Unlike";
            }else{
                button.value = "Like";
            }
           });
           div2.appendChild(button);
           document.getElementById("MainBox").appendChild(div);
           document.getElementById("MainBox").appendChild(br);
        }
    }
    });


    
}