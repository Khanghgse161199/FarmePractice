const body = document.querySelector('body'),
sidebar = body.querySelector('nav'),
toggle = body.querySelector(".toggle"),
searchBtn = body.querySelector(".search-box"),
modeSwitch = body.querySelector(".toggle-switch"),
modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click" , () =>{
sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click" , () =>{
body.classList.toggle("dark");

if(body.classList.contains("dark")){
  modeText.innerText = "Light mode";
}else{
  modeText.innerText = "Dark mode";
  
}
});

function addPicture(){
    document.getElementById("divAddPicture").innerHTML += " <input type='text' id='image'>"

}

window.onload = async function getProfile(){
  checkToken();
  var url = "https://agriculture.cosplane.asia/api/Merchant/PrivateProfile";
  var token = localStorage.getItem("token");
  if(token != null){
    var repone =  await fetch(url,{
      method:"GET",
      headers:{
        'Content-Type': 'application/json',
        'token': token
      },
    })
    if(repone.ok){
      var user = await repone.text();
      var Merchant = JSON.parse(user);
      document.getElementById("name").value = Merchant.name;
      document.getElementById("mail").value = Merchant.email;
      document.getElementById("username").value = Merchant.username;
      document.getElementById("joinDate").value = Merchant.joinDate;
      document.getElementById("lastestUpdate").value = Merchant.lastestUpdate;
    }else{
      alert("Error Repone !!");
    }
  }
}

async function checkToken() {
  var url = "https://agriculture.cosplane.asia/api/Merchant/CheckToken";
  var token = localStorage.getItem("token");
  var roleID = localStorage.getItem("roleId");
  if (token != null) {
      var repone = await fetch(url, {
          method: "POST",

          headers: {
              'Content-Type': 'application/json',
              'token': token
          },
      })
      if(repone.ok){
          announce();
      }else{
        location.replace("../../LoginMerchant/LoginMerchant.html");
      }
  }else{
      location.replace("../../LoginMerchant/LoginMerchant.html");
  }
  
}
function announce(){
  // document.getElementById('btn-login').addEventListener("click",function(event){
  iziToast.success({
      title:'WelCome',
      message:'Profile',
      position:'topRight' 
  });
};