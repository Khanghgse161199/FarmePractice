// Other important pens.
// Map: https://codepen.io/themustafaomar/pen/ZEGJeZq
// Navbar: https://codepen.io/themustafaomar/pen/VKbQyZ

'use strict'
async function getListCategory() {
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
  } else {
    console.log("error list category");
  }
}
function moveProductByCategory(id) {
  location.replace("Products.html?id="+id);
}
window.onload = async function getProducts() {
  await CheckToken();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const ProductDetail = urlParams.get('id');
  var url = 'https://agriculture.cosplane.asia/api/Product/ByCategory?categoryId=' + ProductDetail;
  console.log(url);
  var repone = await fetch(url,
    {
      method: 'GET',
    }
  );
  if (repone.ok) {
    var ttexts = await repone.text();
    var tpTexts = JSON.parse(ttexts);
    tpTexts.forEach(element => {
      document.getElementById("tbodyy").innerHTML += "  <tr><td style='padding-top: 1.2%;'>"+ "<button  class='btn btn-light' onclick='detail("+ JSON.stringify(element.productId) +")'>"+element.productName+"</button>" +"</td><td style='padding-top: 2%;'>"+element.categoryName+"</td><td style='padding-top: 2%;'>"+element.merchantName+"</td><td style='padding-top: 2%;'>"+element.minAmount+"</td><td style='padding-top: 2%;'>"+element.unit+"</td><td style='padding-top: 2%;'>"+element.price+"</td><td style='width: 20%;height: 50%;'><img src='"+element.imageUrl+"' style='width: 50%;height: 30%;'></td></tr>"
    });
    await getListCategory();
  } else {
    alert("error repone")
  }
}
function detail(id){
  location.replace("ProductDetail.html?id="+id);
}

function $(selector) {
  return document.querySelector(selector)
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

