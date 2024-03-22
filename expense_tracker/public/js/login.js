 const publicIp='http://localhost:3000';
 //const publicIp='http://16.170.219.126:3000';


document.getElementById("login-form").addEventListener("submit", async (e) => {
  try{
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  if (!email.trim() || !password.trim()) {
    document.querySelector("#errorAlert").innerText = `All fields are mandatory..!`;
    alertAwakeSleep();
    return;
  }
  else{
    const obj={email,password}
    const response =await axios.post(`${publicIp}/user/login`, obj);
    //window.location.href = "../view/home.html";
    if (response.status === 200 && response.data.token!=='' && response.data.token!== undefined) {
      alert(response.data.message);
      localStorage.setItem('token',response.data.token)
      window.location.href = "../view/home.html";
     e.target.email.value = "";
     e.target.password.value = "";
    } else {
      throw new Error("Error in credentials");
    }
  }
}catch (err) {
  document.querySelector("#errorAlert").innerText = `${err.response.data.message}`;
  alertAwakeSleep();
  throw new Error(err);
} 
});



// function to awake/sleep error alert
function alertAwakeSleep() {
  document.querySelector("#errorAlert").classList.toggle("hidden");
  setTimeout(function () {
    document.getElementById("errorAlert").classList.toggle("hidden");
  }, 3000);
}


// function to awake/sleep success alert
function successAlertAwakeSleep() {
  document.querySelector("#successAlert").classList.toggle("hidden");
  setTimeout(function () {
    document.getElementById("successAlert").classList.toggle("hidden");
  }, 3000);
}


