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
window.onload = async function getProductDetail() {
  await CheckToken();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idProduct = urlParams.get('id');
  var url = 'https://agriculture.cosplane.asia/api/Product/Detail?prodId='+ idProduct;
  var repone = await fetch(url,
    {
      method: 'GET',
    }
  );
  if (repone.ok) {
    var ttexts = await repone.text();
    var tpTexts = JSON.parse(ttexts);
    document.getElementById("name").innerText = tpTexts.name;
    document.getElementById("id").value = "Id :"+ tpTexts.id;
    document.getElementById("category").value ="Category :"+ tpTexts.categoryName;
    document.getElementById("merchantName").value ="Merchant :"+ tpTexts.merchantName;
    document.getElementById("price").value ="Price :"+ tpTexts.price;
    document.getElementById("minAmount").value ="MinAmount :"+ tpTexts.minAmount;
    document.getElementById("description").value ="Description :"+ tpTexts.description;
    document.getElementById("unit").value ="Unit :"+ tpTexts.unit;
    document.getElementById("step").value = "Step :" +tpTexts.step;
    var dayS = formatDate(tpTexts.createdAt)
    document.getElementById("createdAt").value ="CreatedAt :"+ dayS; 
    var list = tpTexts.images;
        for (var i = 0; i < list.length; i++) {
            document.getElementById("images").innerHTML += '<div class="col-lg-6">  <button  onclick="postImage(' + i + ')" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">  <img id=' + i + ' style="max-width:100%" src="' + list[i] + '"/></button></div>'
        }
        await getListCategory();
  } else {
    alert("error repone")
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
function postImage(id) {
  var linkImg = document.getElementById(id).src;
  document.getElementById("imageappear").innerHTML = "<img style='max-width:100%;z-index:-1;' src='" + linkImg + "' />"
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

