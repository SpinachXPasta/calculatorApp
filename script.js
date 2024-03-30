/* WRITE YOUR JAVASCRIPT CODE HERE */
var hist = 0;
var stack = [];
var decStack = [];
var decLock = 0;
var oppList = ["*","+","-","/"];
var disp = 0;
var firstInput = false;
var eqLock = false;
var err = false;



var opps = document.querySelectorAll(".operator");
var nums = document.querySelectorAll(".number");
var calcHist = document.getElementById("history");
var calcDisp = document.getElementById("display");
var clear = document.getElementById("C");
var eq = document.getElementById("equal");


function calcEval(fn) {
    return new Function('return ' + fn)();
  }
  


function isError(){
    if (disp == "Infinity"){
        calcDisp.innerText = "Error";
        calcHist.innerText = "Error";
        hist = 0;
        stack = [];
        decStack = [];
        decLock = 0;
        disp = 0;
        firstInput = false;
        var err = false;

    } else if (String(disp).length > 12){
        calcDisp.innerText = "Max Space";
        calcHist.innerText = "Max Space";
        hist = 0;
        stack = [];
        decStack = [];
        decLock = 0;
        disp = 0;
        firstInput = false;
        var err = false;
    }  
}



function doCalc(x){
    //
    if (!(oppList.includes(x))){
        if (!firstInput ){
            disp = x;
        } else if (oppList.includes(hist[hist.length - 2])){
            disp = x;
        }else {
            disp = disp + x;
        }
        
    } else {
        if (stack.length == 2){
            disp = calcDisp.innerText;
        } else {
            console.log(hist.substring(0,hist.length - 1))
            disp = calcEval(hist.substring(0,hist.length - 1));
        }
         
    }

    calcDisp.innerText = disp;
    

}



function histFunc(overide=false, fInput=false){
    if (!overide){
        let idx = stack.length - 1;
        if (decLock == 0){
            if (!firstInput){
                hist = String(stack[idx]);
                doCalc(stack[idx]);
            } else {
                hist = String(hist) + String(stack[idx]);
                doCalc(stack[idx]);
            }
        } else {
            let idxDec = decStack.length - 1;
            hist = String(hist) + String(decStack[idxDec]);
            doCalc(decStack[idxDec]);

        }
        if (fInput){
            firstInput = true;
        }
        calcHist.innerText = hist;
    } else {
        calcHist.innerText = 0;
        calcDisp.innerText = 0;
    }

    isError();
    
    
}

eq.addEventListener("click", function(){
    if (!eqLock){
        if (!(oppList.includes(hist[hist.length - 1]))){
            disp = calcEval(hist.substring(0,hist.length));
            calcDisp.innerText = disp;
            hist = disp;
            calcHist.innerText = disp;
            eqLock = true;
            isError();
            
        };
    }
})



clear.addEventListener("click", function(){
    hist = 0;
    stack = [];
    decStack = [];
    decLock = 0;
    disp = 0;
    firstInput = false;
    histFunc(overide=true, fInput=firstInput);

})


for (let i of opps){
    i.addEventListener(
        "click", function(){
            // if the first insert is operator dont allow it also 
            if (firstInput){
                //don't allow if last input was opp
                if (!(oppList.includes(stack[stack.length-1]) && decStack.length == 0)){
                    if (eqLock){
                        eqLock = false;
                    }

                        // if there are decimals being inserted then do
                    if (decStack.length > 0){
                        stack.push(decStack.join(""));
                        decStack = [];
                    }
                    //histlay the operator
                    stack.push(i.innerText);
                    decLock = 0;
                    histFunc(overide=false,fInput=true);

                }
                    
            }           
});
}


for (let i of nums){
    i.addEventListener(
        "click", function(){

            if (eqLock){
                hist = 0;
                stack = [];
                decStack = [];
                decLock = 0;
                disp = 0;
                firstInput = false;
                stack.push(i.innerText);
                histFunc(overide=false,fInput=true);  
                eqLock = false;
            } else if (i.innerText != "." && decLock == 0){
                stack.push(i.innerText);
                histFunc(overide=false,fInput=true);  
            } else {
                if (stack.length == 0 && decStack.lenth == 0){
                    
                    decStack.push(0);
                    decStack.push(".");
                    decLock = 1;
                    histFunc(overide=false,fInput=true);  
                } else if (decLock == 0 && oppList.includes(stack.length-1)) {
                    
                    decStack.push(0);
                    decStack.push(".");
                    decLock = 1;
                    histFunc(overide=false,fInput=true);  
                } else if (decLock == 0 && !(oppList.includes(stack.length-1))){
                    //traverse back until non number is found
                    let revNum = [];
                    let stkLen = stack.length -1;
                    for (let j = stkLen; j >= 0; j--){
                        //console.log("jj")
                        //console.log(stack[j])
                        if (!oppList.includes(stack[j])){
                            revNum.splice(0,0,stack[j]);
                            stack.pop();
                        } else {
                            break;
                        }
                    }
                    decStack.push(revNum.join(""));
                    decStack.push(i.innerText);
                    decLock = 1;
                    histFunc(overide=false,fInput=true);  

                
                } else {
                    if (i.innerText != "."){
                        decStack.push(i.innerText);
                        decLock = 1;
                        histFunc(overide=false,fInput=true);  
                    }
                    
                }
            }
                      
             
});
}


