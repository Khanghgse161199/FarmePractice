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
window.onload = async function GetTransport() {
  //await CheckToken();
  var token = localStorage.getItem("token");
  if (token != null) {
    var url = 'https://agriculture.cosplane.asia/api/Transport/All';
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
        document.getElementById("tbody").innerHTML += "  <td style='color: white;'>" + element.name + "</td><td style='color: white;'>" + element.fee + "</td><td>" + "<button type='button' class='btn btn-light' data-bs-toggle='modal' data-bs-target='#exampleModal2'  onclick='postIdTransport(" + JSON.stringify(element.id) + ")' data-bs-toggle='modal'data-bs-target='#exampleModal2' >Update</button>" + "</td>"
      });
      await getListCategory();
    } else {
      alert("Wrong token")
    }
  }
}
async function UPdateTransport() {
  var token = localStorage.getItem("token");
  var NewFee = document.getElementById("NewFee").value;
  var checkAtive = document.getElementById("flexSwitchCheckDefault7").checked;
  var IdTransport = localStorage.getItem("IdTransport");
  var Transport = {
    "id": IdTransport,
    "fee": NewFee,
    "isActivated": checkAtive,
  }

  if (token != null) {
    var url = 'https://agriculture.cosplane.asia/api/Transport/Update';
    var resspon = await fetch(url,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify(Transport),
      }
    );
    if (resspon.ok) {
      location.reload();
    } else {
      alert("Error Repone")
    }
  }
}
async function getTransportById() {
  var token = localStorage.getItem("token");

  if (token != null) {
    var url = 'https://agriculture.cosplane.asia/api/Transport/ById?id=';
    var id = localStorage.getItem("IdTransport");
    var link = url + id;
    var resspon = await fetch(link,
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
      IdTransport = tpTexts.id;
    } else {
      alert("Error Repone !!!")
    }
  }
}
function postIdTransport(id) {
  localStorage.setItem("IdTransport", id);
}
async function CreateTransport() {
  var token = localStorage.getItem("token");
  if (token != null) {
    var url = 'https://agriculture.cosplane.asia/api/Transport/Create';
    var nameTransport = document.getElementById("nameTransport").value;
    var Fee = document.getElementById("Fee").value;
    var Transport = {
      "name": nameTransport,
      "fee": Fee
    }
    console.log(nameTransport);
    console.log(Fee);
    var resspon = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify(Transport),
      }
    );
    if (resspon.ok) {
      // announce();
      location.reload();
    } else {
      announced();
    }
  }
}
function announce() {
  // document.getElementById('btn-login').addEventListener("click",function(event){
  iziToast.success({
    title: 'Create',
    message: 'Success',
    position: 'topRight'
  });
};
function announced() {
  // document.getElementById('btn-login').addEventListener("click",function(event){
  iziToast.error({
    title: 'Create',
    message: 'error',
    position: 'topRight'
  });
};
function $(selector) {
  return document.querySelector(selector)
}

function find(el, selector) {
  let finded
  return (finded = el.querySelector(selector)) ? finded : null
}

function $(selector) {
  return document.querySelector(selector)
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