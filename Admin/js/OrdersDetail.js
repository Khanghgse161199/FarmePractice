window.onload = async function () {
  await CheckToken();
  await getListCategory();
  await loadOrderDetails();
}
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
async function loadOrderDetails() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const test = urlParams.get('id');
  var token = localStorage.getItem("token");
  var url = "https://agriculture.cosplane.asia/api/Order/Detail?orderId=" + test;
  var response = await fetch(url,
    {
      headers: {
        'token': token
      }
    })
  if (response.ok) {
    var texts = await response.text();
    var pTexts = JSON.parse(texts);
    document.getElementById('orderid').value = pTexts.id
    document.getElementById('customername').value = pTexts.customer.customerName
    document.getElementById('customerphone').value = pTexts.customer.customerPhone
    document.getElementById('merchanname').value = pTexts.merchant.merchantName
    document.getElementById('merchanphone').value = pTexts.merchant.merchantPhone
    document.getElementById('datecreate').value = pTexts.times.createdAt
    document.getElementById('dateship').value = pTexts.times.shipTime
    document.getElementById('datedone').value = pTexts.times.shippingDoneTime
    document.getElementById('totalprice').value = pTexts.payment.totalPrice
    var imgs = [pTexts.orderDetails.length];
    for (let i = 0; i < pTexts.orderDetails.length; i++) {
      imgs[i] = await loadProduct(pTexts.orderDetails[i].productId);
    }
    var count = 0;
    pTexts.orderDetails.forEach(element => {
      var img = imgs[count]
      document.getElementById('renProduct').innerHTML += `<div class="groupProduct">
          <div class="imgP">
              <img style="height: 100%;border-radius: 30px;width: 105px;overflow: hidden;"
                  src="${img}"
                  alt="">
          </div>
          <div class="nameProduct">
              <div class="nameProduct1">
                  <a class="aStyle" href="./productDetail.html?id=${element.productId}">${element.productName}</a>
              </div>
              <div class="quantityP">

              </div>
          </div>
          <div class="priceProduct">
              <div class="groupPrice1">
                  <div class="price1">
                      Quantity:
                  </div>
                  <div class="price2">
                      ${element.productQuantity}
                  </div>
              </div>
              <div class="groupPrice1">
                  <div class="price1">
                      Price:
                  </div>
                  <div class="price2">
                      ${element.price}
                  </div>
              </div>
             
          </div>
      </div>
      <div style="width: 100%;display: flex;justify-content: center">
          <hr style="color: antiquewhite;width: 94%;;">
      </div>`
      count++;
    });
  }
}
async function loadProduct(id) {
  var url = "https://agriculture.cosplane.asia/api/Product/Detail?prodId=" + id;
  var request = new Request(url);
  var resultFetch = await fetch(request);
  if (resultFetch.ok) {
    var texts = await resultFetch.text();
    var pTexts = JSON.parse(texts);
    var tempp = pTexts.images[0];
    return tempp;
  }
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
