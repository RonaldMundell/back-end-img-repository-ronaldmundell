
function generateImages(imgs){
var body = document.getElementById("imgtable");
var i = 1;
var Innertable = "<tr>"
var v = 4;
imgs.forEach(img => {
  if(img != null){
    if(i == v){
        "</tr><tr>"
        v = v+3;
    }
    Innertable += '<td><div class="imgbox"><b class="ititle">'+img.imgname
    +'</b><img src="'+img.imgurl+'" alt="'+img.alttext+'"/>'
    +'<a href="/delete'+i+'" ><input type="button" value="Delete"/></a>'
    +'</td>';
  }else{
    if(i <= v){
    Innertable += '<td><div class="imgbox"></td>'; 
    }
  }
  i++;
});
body.innerHTML(Innertable+"</tr>");

}