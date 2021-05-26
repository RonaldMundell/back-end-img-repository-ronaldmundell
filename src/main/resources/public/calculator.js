var CalcArr = new Array();
function CalculatePercent(number){
    var top = document.getElementById("top"+number).value;
    var bottom = document.getElementById("bottom"+number).value;
    var Percent = 0
    if(bottom == "" || top == ""|| bottom == "0"){
    Percent = "N/A"
    }else{
    Percent = top/bottom;
    Percent = Math.round(Percent*100)+"%"
    CalcArr[(number-1)] = Percent
    }
    document.getElementById("precent"+number).textContent = Percent
}
function CalculateMean(){
    var Result = ""
    var FinalNum = 0;
    var count = 0;
    for(var i = 0; i < 4; i++){
        if(CalcArr[i] == undefined||CalcArr[i] == "N/A"){
        }else{
            count++;
            Result += "A"+(i+1)+" "+CalcArr[i]+", "
            FinalNum += parseInt(CalcArr[i].slice(0, CalcArr[i].length-1))
        }
    }
    
    Result = Result.slice(0, Result.length-2)+":"
    var Result2 = "Mean: "+Math.round(FinalNum/count)+"%"
    document.getElementById("result1").textContent = Result;
    document.getElementById("result2").textContent = Result2;
}
function CalculateWeight(){
    var Result = ""
    var FinalNum = 0;
    var count = 0;
    for(var i = 0; i < 4; i++){
        var weight = document.getElementById("weight"+(i+1)).value
        if(CalcArr[i] == undefined||CalcArr[i] == "N/A"|| weight == ""){
        }else{
            count += parseInt(weight);
            Result += "A"+(i+1)+" "+CalcArr[i]+", "
            FinalNum += parseInt(CalcArr[i].slice(0, CalcArr[i].length-1))*weight
        }
    }
    
    Result = Result.slice(0, Result.length-2)+":"
    var Result2 = "Weight: "+Math.round(FinalNum/count)+"%"
    document.getElementById("result1").textContent = Result;
    document.getElementById("result2").textContent = Result2;
}