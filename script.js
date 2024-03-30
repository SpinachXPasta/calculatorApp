/* WRITE YOUR JAVASCRIPT CODE HERE */
var hist = 0;
var stack = [];
var decStack = [];
var decLock = 0;
var oppList = ["*","+","-","/"];
var disp = 0;



var opps = document.querySelectorAll(".operator");
var nums = document.querySelectorAll(".number");
var calcHist = document.getElementById("history");
var calcDisp = document.getElementById("display");
var clear = document.getElementById("C");
var eq = document.getElementById("equal");

// 1 + 1 + 1 + 1 +

function doCalc(x){
    //
    if (!(oppList.includes(x))){
        if (disp == 0 ){
            disp = x;
        }else {
            disp = disp + x;
        }
        
    } else {
       disp = disp; 
    }

    
    

}









function histFunc(overide=false){
    let idx = stack.length - 1;
    if (decLock == 0){
        if (hist == 0){
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
    if (!overide){
        calcHist.innerText = hist;
    } else {
        hist = 0
        disp = 0;
        calcHist.innerText = 0;
    }
    
    
}


clear.addEventListener("click", function(){
    hist = 0;
    stack = [];
    decStack = [];
    decLock = 0;
    disp = 0;
    histFunc(overide=true);

})


for (let i of opps){
    i.addEventListener(
        "click", function(){
            // if the first insert is operator dont allow it also 
            if (hist != 0){
                //don't allow if last input was opp
                if (!(oppList.includes(stack[stack.length-1]) && decStack.length == 0)){
                        // if there are decimals being inserted then do
                    if (decStack.length > 0){
                        stack.push(decStack.join(""));
                        decStack = [];
                    }
                    //histlay the operator
                    stack.push(i.innerText);
                    decLock = 0;


                    console.log(stack);
                    console.log(decStack);
                    console.log(decLock);
                    histFunc();

                }
                    

            }
            
            
});
}


for (let i of nums){
    i.addEventListener(
        "click", function(){

            if (i.innerText != "." && decLock == 0){
                stack.push(i.innerText);
                histFunc();  
            } else {
                if (stack.length == 0 && decStack.lenth == 0){
                    console.log("here3")
                    decStack.push(0);
                    decStack.push(".");
                    decLock = 1;
                    histFunc();  
                } else if (decLock == 0 && oppList.includes(stack.length-1)) {
                    console.log("here2")
                    decStack.push(0);
                    decStack.push(".");
                    decLock = 1;
                    histFunc();  
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
                    histFunc();  

                
                } else {
                    if (i.innerText != "."){
                        decStack.push(i.innerText);
                        decLock = 1;
                        histFunc();  
                    }
                    
                }
            }
            
            console.log(stack);
            console.log(decStack);
            console.log(decLock);
                      
             
});
}


