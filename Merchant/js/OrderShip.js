const body = document.querySelector('body'),
  sidebar = body.querySelector('nav'),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");


toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeText.innerText = "Light mode";
  } else {
    modeText.innerText = "Dark mode";

  }
});

async function getOrders() {
    var token = localStorage.getItem("token");
    if (token != null) {
    await GetPARTIALPAIDCONFIRMED();ss
    //   var url = "https://agriculture.cosplane.asia/api/Order/ByStatusForMerchant?status=new";
    //   var repone = await fetch(url, {
    //     method: "GET",
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'token': token
    //     },
    //   })
    //   if (repone.ok) {
    //    var texts = await repone.text();
    //    var list = JSON.parse(texts);
    //    list.forEach(element => {
        
    //    });
    //   } else {
    //     alert("Error Repone !!")
    //   }
    }
}
window.onload = async function GetPARTIALPAIDCONFIRMED(){
  var token = localStorage.getItem("token");
  if (token != null) {
    var url = "https://agriculture.cosplane.asia/api/Order/ByStatusForMerchant?status=PARTIALPAIDCONFIRMED";
    var repone = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
    })
    if (repone.ok) {
     var texts = await repone.text();
     var list = JSON.parse(texts);
     list.forEach(element => {
      var day = formatDate(element.createdAt);
      document.getElementById("tableGetData").innerHTML += " <tr><td>"+element.id+"</td><td>"+element.status+"</td><td>"+day+"</td><td>"+element.quantity+"</td><td>"+element.total+"</td><td>"+element.customerId+"</td><td><button class='button-30' role='button' onclick='ShippingOrder("+JSON.stringify(element.id)+")'>Ship</button></td></tr>";
     });
     $(document).ready(function(){
      $('#example').DataTable();
  })
    } else {
      alert("Error Repone !!")
    }
  }
}
async function ShippingOrder(id){
  var link = "https://agriculture.cosplane.asia/api/Order/ShipOrder?orderId=" + id;
  var token = localStorage.getItem("token");
  if(token != null){
    var repone = await fetch(link,{
      method : "PUT",
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
    })
    if(repone.ok){
      announce();
      setTimeout(() => {
        document.location.reload();
      }, 2000);
    
    }else{
      announceError();
    }
  }
}

async function CancelOrder(id){
  console.log(id);
  var link = "http://agriculture.cosplane.asia/api/Order/CancelOrder?orderId=" + id;
  var token = localStorage.getItem("token");
  if(token != null){
    var repone = await fetch(link,{
      method : "PUT",
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
    })
    if(repone.ok){
      announceB();
      setTimeout(() => {
        document.location.reload();
      }, 2000);
    
    }else{
      announceError();
    }
  }
}
function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;

  return [year, month, day].join('-');
}

function announce() {
  // document.getElementById('btn-login').addEventListener("click",function(event){
  iziToast.success({
    title: 'Confirm',
    message: 'Success',
    position: 'topRight'
  });
};
function announceB() {
  // document.getElementById('btn-login').addEventListener("click",function(event){
  iziToast.success({
    title: 'Cancel',
    message: 'Success',
    position: 'topRight'
  });
};
function announced() {
  // document.getElementById('btn-login').addEventListener("click",function(event){
  iziToast.success({
    title: 'Update',
    message: 'Profile Success',
    position: 'topRight'
  });
};
function announceError() {
  // document.getElementById('btn-login').addEventListener("click",function(event){
  iziToast.error({
    title: 'Confirm',
    message: 'error',
    position: 'topRight'
  });
};
