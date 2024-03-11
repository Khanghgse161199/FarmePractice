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
window.onload = async function GetOrderDetail(){
  var id = localStorage.getItem("IdOderDetail");
  var link = "https://agriculture.cosplane.asia/api/Order/Detail?orderId=" + id;
  console.log(link);
  var token = localStorage.getItem("token");
  if(token != null){
    var repone = await fetch(link,{
      method : "GET",
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
    })
    if(repone.ok){
     var text = await repone.text();
     var object = JSON.parse(text);
     document.getElementById("idOrder").value = object.id;
     document.getElementById("sl").value = object.productQuantity;
     document.getElementById("tong").value = object.total;
     document.getElementById("trangthai").value = object.status;
     var day = formatDate(object.times.createdAt);
     document.getElementById("time").value = day;
     document.getElementById("nameCustomer").value = object.customer.customerName;
     document.getElementById("phoneNumber").value = object.customer.customerPhone;
     document.getElementById("email").value = object.customer.customerEmail;
     document.getElementById("address").value = object.customer.customerAddress;
     document.getElementById("bio").value = null;
    //  document.getElementById("idOrder").value = object.id;
    //  document.getElementById("idOrder").value = object.id;
    var ShipTime = formatDate(object.times.shipTime);
    document.getElementById("ShipTime").value = ShipTime;
    var PartialPaidTime = formatDate(object.times.partialPaidTime);
    document.getElementById("PartialPaidTime").value = PartialPaidTime;
    var FinishTime = formatDate(object.times.finishTime);
    document.getElementById("FinishTime").value = FinishTime;
    var FullPaidTimes = formatDate(object.times.fullPaidTime);
    document.getElementById("FullPaidTimes").value = FullPaidTimes;
    var CancelledTime = formatDate(object.times.cancelledTime);
    document.getElementById("CancelledTime").value = CancelledTime;
    var ShippingDoneTime = formatDate(object.times.shippingDoneTime);
    document.getElementById("ShippingDoneTime").value = ShippingDoneTime;
    var list = object.orderDetails; 
    list.forEach(element => {
      document.getElementById("tbodyDiv").innerHTML += "<tr><th scope='row'>1</th><td>"+element.productName+"</td><td>"+element.price+"</td><td>"+element.productQuantity+"</td><td>"+element.totalPrice+"</td></tr>"   
    });
    document.getElementById("totalF").innerText = object.total;
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
    title: 'Repone',
    message: 'error',
    position: 'topRight'
  });
};
