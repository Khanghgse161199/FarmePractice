// Other important pens.
// Map: https://codepen.io/themustafaomar/pen/ZEGJeZq
// Navbar: https://codepen.io/themustafaomar/pen/VKbQyZ

'use strict'
window.onload = async function getListCategory() {
  await CheckToken();
  var token = localStorage.getItem("token");
  var url = 'https://agriculture.cosplane.asia/api/Category';
  var resspon = await fetch(url,
    {
      method: 'GET',
      headers: {
        'token': token,
      },
    }
  );
  if (resspon.ok) {
    var ttexts = await resspon.text();
    var tpTexts = JSON.parse(ttexts);
    tpTexts.forEach(element => {
      document.getElementById("categoryNav").innerHTML += " <li><a href='#' onclick='moveProductByCategory(" + JSON.stringify(element.id) + ")'>Products - " + element.name + "</a></li>"
    });
    GetOrderDetail();
  } else {
    console.log("error list category");
  }
}
async function GetOrderDetail(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  var link = "https://agriculture.cosplane.asia/api/Order/Detail?orderId=" + id;
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
     document.getElementById("IdCustomer").value = object.customer.customerId;
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
      document.getElementById("tbodyDiv").innerHTML += "<tr><th scope='row'>1</th><td>"+element.productName+"</td><td>"+element.price+"</td><td>"+element.productQuantity+"</td></tr>"   

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
function moveProductByCategory(id) {
  location.replace("Products.html?id="+id);
}
function postIDcategory(id) {
  localStorage.setItem("IdCategoryUpdate", id);
}
function postIdUnit(id) {
  localStorage.setItem("IdUnit", id);
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
function $(selector) {
  return document.querySelector(selector)
}

function find(el, selector) {
  let finded
  return (finded = el.querySelector(selector)) ? finded : null
}

function siblings(el) {
  const siblings = []
  for (let sibling of el.parentNode.children) {
    if (sibling !== el) {
      siblings.push(sibling)
    }
  }
  return siblings
}

const showAsideBtn = $('.show-side-btn')
const sidebar = $('.sidebar')
const wrapper = $('#wrapper')

showAsideBtn.addEventListener('click', function () {
  $(`#${this.dataset.show}`).classList.toggle('show-sidebar')
  wrapper.classList.toggle('fullwidth')
})

if (window.innerWidth < 767) {
  sidebar.classList.add('show-sidebar');
}
window.addEventListener('resize', function () {
  if (window.innerWidth > 767) {
    sidebar.classList.remove('show-sidebar')
  }
})
// dropdown menu in the side nav
var slideNavDropdown = $('.sidebar-dropdown');

$('.sidebar .categories').addEventListener('click', function (event) {
  event.preventDefault()

  const item = event.target.closest('.has-dropdown')

  if (!item) {
    return
  }

  item.classList.toggle('opened')

  siblings(item).forEach(sibling => {
    sibling.classList.remove('opened')
  })

  if (item.classList.contains('opened')) {
    const toOpen = find(item, '.sidebar-dropdown')

    if (toOpen) {
      toOpen.classList.add('active')
    }

    siblings(item).forEach(sibling => {
      const toClose = find(sibling, '.sidebar-dropdown')

      if (toClose) {
        toClose.classList.remove('active')
      }
    })
  } else {
    find(item, '.sidebar-dropdown').classList.toggle('active')
  }
})

$('.sidebar .close-aside').addEventListener('click', function () {
  $(`#${this.dataset.close}`).classList.add('show-sidebar')
  wrapper.classList.remove('margin')
})


