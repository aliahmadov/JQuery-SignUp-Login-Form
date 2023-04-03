

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function setCookie(name, value, seconds) {
    const d = new Date();
    d.setTime(d.getTime() + seconds * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}


function getCookie(key) {
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function ChangeNextColor(index, array) {
    var itemObjects = $.map(array, function (element) {

        return $(element);
    });
    for (let i = index + 1; i < itemObjects.length; i++) {
        const element = itemObjects[i];

        $(element).css("background-color", "rgb(187,184,184)");
    }
}


let login = document.getElementById("login");
let users = "";
let user="";
cases = { name: false, email: false, password: false, agree: false };

function validateForm() {

    if (cases.name && cases.email && cases.password && cases.agree) {
        // All fields are valid, submit the form
        return true;
    } else {
        // At least one field is invalid, show an error message
        return false;
    }


}
$(document).ready(function () {

    $("#loginbtn").click(function () {


        $("#login").removeClass("fadeOut");
        $("#signup").removeClass("fade");

        $("#errormsg").removeClass("fademsg");
        $("#successmsg").removeClass("fademsg");

    });


    $("#signupbtn").click(function () {

        $("#login").addClass("fadeOut");
        $("#signup").addClass("fade");
    });


    users=getCookie('MyUsers');
    
    $("#signsubmit").click(function () {
        
        users = getCookie('MyUsers');
        console.log(users);

        let name="";
        let email="";
        let password="";

        if (isValidEmail($("#semail").val())) {
            cases.name = true;
            $("#emailerror").text("");
            email=$("#semail").val()+" ";
        }
        else {
            $("#emailerror").text("Provided email is not valid");
        }
        if ($("#sname").val().toString().length >= 3) {
            cases.email = true;
            $("#nameerror").text("");
            name=$("#sname").val()+" ";
        }
        else {
            $("#nameerror").text("It requires at least 3 characters");
        }

        if ($("#spassword").val().toString().length >= 2) {
            cases.password = true;
            password=$("#spassword").val();
        }

        if ($("#agree").is(":checked")) {
            cases.agree = true;
            $("#agreeerror").text("");
        } else {
            $("#agreeerror").text("Make sure you agree with terms and conditions");
        }



        if (validateForm()) {
            user=name+email+password;
            console.log("submitted");
            $("#errormsg").removeClass("fademsg");
            $("#successmsg").addClass("fademsg");

            users+=user+",";
            setCookie('MyUsers',users,3600);
            
        }
        else {
            $("#successmsg").removeClass("fademsg")
            $("#errormsg").toggleClass("fademsg");
            
        }
        
    });



    $("#lgnbtn").click(function(){

        let logusers=users.split(',');

        let email=$("#lemail").val();
        let password=$("#lpassword").val();

        logusers.forEach(element=>{

            let loguser=element.split(' ');

            if(loguser[1]==email && loguser[2]==password)
            {
                alert("Login success");
            }
            else{
                alert("Wrong username or password")
            }
            

        });

    });
    
    
    $("#spassword").on("input", function () {
        let password = $("#spassword").val().toString();
        let items = $(".item");
        if (password.length <= 3 && password.length > 0) {
            $(items[0]).css("background-color", "red");
            ChangeNextColor(0, items);
        }
        else if (password.length >= 4 && password.length <= 7) {
            $(items[1]).css("background-color", "orange");
            ChangeNextColor(1, items);
            console.log("orange");
        }
        else if (password.length >= 8 && password.length <= 10) {
            $(items[2]).css("background-color", "yellow");
            ChangeNextColor(2, items);
            console.log("yellow");
        }
        else if (password.length >= 11) {
            $(items[3]).css("background-color", "darkgreen");
            console.log("red");
        }
        else if (password.length == 0) {
            $.each(items, function (index, element) {
                $(element).css("background-color", "rgb(187,184,184)");
            });
        }
    });
});






