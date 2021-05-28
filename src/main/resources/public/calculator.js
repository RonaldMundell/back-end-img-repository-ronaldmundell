var CalcArr = new Array(4);
var Rows = 4;
function CalculatePercent(number){
    var top = document.getElementById("top"+number).value;
    var bottom = document.getElementById("bottom"+number).value;
    var Percent = 0
    if(bottom == "" || top == ""|| bottom == "0"){
    Percent = "N/A"
    }else{
    Percent = top/bottom;
    Percent = (Percent*100)+""
    Percent = Percent.slice(0,4)+"%";
    CalcArr[(number-1)] = Percent
    }
    document.getElementById("top"+number).value = top;
    document.getElementById("bottom"+number).value = bottom;
    document.getElementById("precent"+number).textContent = Percent
}
function CalculateMean(){
    var Result = ""
    var FinalNum = 0;
    var count = 0;
    for(var i = 0; i < Rows; i++){
        if(CalcArr[i] == undefined||CalcArr[i] == "N/A"||CalcArr[i] == ""){
        }else{
            count++;
            Result += "A"+(i+1)+" "+CalcArr[i]+", "
            FinalNum += parseFloat(CalcArr[i].slice(0, CalcArr[i].length-1))
        }
    }
    
    Result = Result.slice(0, Result.length-2)+":"
    FinalNum = (FinalNum/count)+"";
    FinalNum = FinalNum.slice(0,4)+"%";
    var Result2 = "Mean: "+FinalNum;
    if(Result == ":"){
        document.getElementById("result1").textContent = "Please insert grade values";
        document.getElementById("result2").textContent = "";
    }else{
    document.getElementById("result1").textContent = Result;
    document.getElementById("result2").textContent = Result2;
    }
}
function CalculateWeight(){
    var Result = ""
    var FinalNum = 0;
    var count = 0;
    for(var i = 0; i < Rows; i++){
        var weight = document.getElementById("weight"+(i+1)).value
        if(CalcArr[i] == undefined||CalcArr[i] == "N/A"|| weight == ""){
        }else{
            count += parseInt(weight);
            Result += "A"+(i+1)+" "+CalcArr[i]+", "
            FinalNum += parseFloat(CalcArr[i].slice(0, CalcArr[i].length-1))*weight
        }
    }
    
    Result = Result.slice(0, Result.length-2)+":"
    FinalNum = (FinalNum/count)+"";
    FinalNum = FinalNum.slice(0,4)+"%";
    var Result2 = "Weight: "+FinalNum;
    if(Result == ":"){
        document.getElementById("result1").textContent = "Please insert weight and grade values";
        document.getElementById("result2").textContent = "";
    }else{
    document.getElementById("result1").textContent = Result;
    document.getElementById("result2").textContent = Result2;
    }
}

function newRow(){
    CalcArr.push("")
    Rows++;
    var tablerow = document.getElementById("T"+(Rows-1));
   tablerow.insertAdjacentHTML("afterend","<tr id=T"+Rows+"><td>Activity "+Rows+"</td><td>A"+Rows+"</td><td>"+
   '<input id="weight'+Rows+'" class="TextBox" type="number"/></td>'+
   '<td><input id="top'+Rows+'" class="TextBox" type="number" onchange="CalculatePercent('+Rows+')"/> <b>/</b>'+
   '<input id="bottom'+Rows+'" class="TextBox" type="number" onchange="CalculatePercent('+Rows+')"/></td>'+
  '<td><p id="precent'+Rows+'"></p></td></tr>')
}
function deleteRow(){
    if(Rows == 1){}else{
    var tablerow = document.getElementById("T"+Rows);
    CalcArr.pop();
    Rows--;
    tablerow.remove()
    }
}