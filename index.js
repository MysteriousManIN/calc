"use strict";

$(()=>{

    const KEYPAD_CHAR = {
        "_Backspace":"C",
        "_^":"^",
        "_!":"!",
        "_/":"÷_16",
        "_7":"7",
        "_8":"8",
        "_9":"9",
        "_*":"*_16",
        "_4":"4",
        "_5":"5",
        "_6":"6",
        "_-":"-_16",
        "_1":"1",
        "_2":"2",
        "_3":"3",
        "_+":"+_16",
        "_Delete":"AC",
        "_0":"0",
        "_.":".",
        "_Enter":"=_16"
    };

    let expression = "";
    let calcHistory = [];

    function expressionForDisplay(exp){
    
    const OP = {
        "*": "_*",
        "/": "_/",
        "+": "_+",
        "-": "_-"
    };

    let str = "";

    for(let i in exp.toString().split("")){
        if(Object.keys(OP).includes(exp[i])){ str += `<i class="vi_fsxx" >${KEYPAD_CHAR[OP[exp[i]]]}</i>`; }
        else{ str += exp[i]; }
    }

    return str;
    
    }

    function keypadBtnTask(btnName){

        const OP = {
            "_*": "*",
            "_/": "/",
            "_+": "+",
            "_-": "-"
        };

        if(btnName === "_Delete"){ expression = ""; }
        else if(btnName === "_Backspace"){ expression = expression.substr(0, expression.length - 1); }
        else if(Object.keys(OP).includes(btnName)){ expression += OP[btnName]; }
        else if(btnName !== "_Enter"){ expression += KEYPAD_CHAR[btnName]; }

        let { expression:newExp, result } = Math.calc(expression);
        expression = newExp;

        if(btnName === "_Enter"){
            if(expression != result){
                calcHistory.push({ expression:expression, result:result });
                $("#history").prepend(`<div><span>${expressionForDisplay(expression)}</span><span>${result}</span></div>`);
            }
            expression = result.toString(); 
            result = "";
        }

        $("#expression").html(expressionForDisplay(expression));
        $("#result").html(result);

    }


    for(let key in KEYPAD_CHAR){
        
        let btn = $("<button>", {
            type:"button",
            name:key
        }).text(KEYPAD_CHAR[key]);

        $(btn).on("click", function(){ keypadBtnTask(this.name); });

        if([ "_*", "_/", "_+", "_-", "_Enter" ].includes(key)) btn.addClass("vi_fsxx");

        $("#keypad").append(btn);

    }

    $(document).on("keyup", (e)=>{

        if(Object.keys(KEYPAD_CHAR).includes("_" + e.key)){
            keypadBtnTask("_" + e.key);
        }

    });

    $("#historyBtn").on("click", ()=>{
        $("#keypad").toggleClass("is_down");
        $("#historyBtn").toggleClass("is_active");
    });

    function themeChange(matches){
        if(matches){
            $("link[name='theme']").attr("href", "light.css");
            $("meta[name='theme-color']").attr("content", "#ebebeb");
            $("#darkModeBtn").text("dark_mode");
            $("#darkModeBtn").val("dark");
            document.cookie = "theme=light";
        }else{
            $("link[name='theme']").attr("href", "dark.css");
            $("meta[name='theme-color']").attr("content", "#1f1f1f");
            $("#darkModeBtn").text("light_mode");
            $("#darkModeBtn").val("light");
            document.cookie = "theme=dark";
        }
    }

    document.cookie.split(";").forEach(cookie => {
        let [key, value] = cookie.split("=");
        if(key === "theme"){
            if(value === "dark") themeChange(false);
        }else{
            window.matchMedia("(prefers-color-scheme:light)").matches ? themeChange(true) : themeChange(false);
        }
    });



    $("#darkModeBtn").on("click", function(){
        if($(this).val() === "dark"){
            themeChange(false);
        }else{
            themeChange(true);
        }
    });


});