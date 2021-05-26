function CalculatePercent(number){
    var top = document.getElementById("top"+number).value;
    var bottom = document.getElementById("bottom"+number).value;
    var Percent = 0
    if(bottom == "" || top == ""|| bottom == "0"){
    Percent = "N/A"
    }else{
    Percent = top/bottom;
    Percent = Math.round(Percent*100)+"%"
    }
    document.getElementById("precent"+number).textContent = Percent
}