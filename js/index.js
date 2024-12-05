var user = document.querySelector(".user");
var email = document.querySelector(".email");
var emailsign = document.querySelector(".email-sign");
var pass = document.querySelector(".pass");
var passsign = document.querySelector(".pass-sign");
var submit = document.querySelector(".submit");
var login = document.querySelector(".login");
var username = document.querySelector(".username");
var logout = document.querySelector(".btn-outline-warning");
var par = document.querySelector(".par");

if (logout != null){
    logout.addEventListener('click', function(){
        location.href="signin.html"
        localStorage.removeItem("name")
    })
}

var allarray = [];
if (localStorage.getItem("allarray") == null){
    allarray =[];
}else{
    allarray =JSON.parse(localStorage.getItem("allarray"));
}


function validmail(){
    var emailregex =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    var testing = emailregex.test(email.value);
    if(testing=== true){
        email.style.color="green";
        return true;
    }else{
        return false;
    }
}

// function savedata(){
//     if(user.value ==="" || email.value === "" || pass.value ===""){
//         par.innerText ="All inputs required";
//         par.classList.add("red");
//     }else if (localStorage.getItem(email.value)) {
//         par.innerText = "Email already registered.";
//         par.classList.add("red");
//     } else if(user.value !== null && email.value !== null && pass.value !== null && validmail()){
//         var element ={
//             user:user.value, email:email.value, pass:pass.value
//         }
//         par.innerText ="success";
//         par.classList.remove("red");
//         par.classList.add("green");
//         allarray.push(element);
//         localStorage.setItem("allarray", JSON.stringify(allarray));
//         window.location.href="signin.html"
//     }
//     else{
//         par.innerText="incorrect email";
//         par.classList.add("red");
//     }
// }

function savedata() {
    if (user.value.trim() === "" || email.value.trim() === "" || pass.value.trim() === "") {
        par.innerText = "All inputs required";
        par.classList.add("red");
    } else if (allarray.some(element => element.email.toLowerCase() === email.value.toLowerCase())) { 
        par.innerText = "Email already registered. Please use a different email.";
        par.classList.add("red");
    } else if (validmail()) {
        var element = {
            user: user.value.trim(),
            email: email.value.trim(),
            pass: pass.value.trim(),
        };
        par.innerText = "Success!";
        par.classList.remove("red");
        par.classList.add("green");
        allarray.push(element);
        localStorage.setItem("allarray", JSON.stringify(allarray));
        window.location.href = "signin.html";
    } else {
        par.innerText = "Incorrect email. Please enter a valid email address.";
        par.classList.add("red");
    }
}

if(submit !=null){
    submit.addEventListener('click', function(){
        savedata()
    });
}

function checkperson(){
    if(emailsign.value != "" || passsign.value != ""){
        par.innerText="";
        if(check()){
            location.href="home.html";
        }else{
            par.innerText="incorrect email or password";
            par.classList.add("red");
        }
    }else{
        par.innerText="all inputs required";
            par.classList.add("red");
    }
}

function check(){
    for( var i =0 ; i<allarray.length; i++){
        if(allarray[i].email.toLowerCase() === emailsign.value.toLowerCase() &&allarray[i].pass.toLowerCase() === passsign.value.toLowerCase()){
            localStorage.setItem("name",JSON.stringify(allarray[i].user))
            return true;
        }    }
}

if(login !=null){
    login.addEventListener('click', function(){
        checkperson();
    });
}


  // Function to display username
  function addname() {
    var storedName = JSON.parse(localStorage.getItem("name")); 
    var usernameElement = document.querySelector("#username"); 
    if (storedName && usernameElement) {
        usernameElement.innerHTML = `Welcome, ${storedName}`; 
    }
}

// Call the function on page load
window.onload = addname();

