// Other important pens.
// Map: https://codepen.io/themustafaomar/pen/ZEGJeZq
// Navbar: https://codepen.io/themustafaomar/pen/VKbQyZ

window.onload = async function ListAllUnit() {
  //await CheckToken();
  var token = localStorage.getItem("token");
  var url = 'https://agriculture.cosplane.asia/api/Unit/AdminGet';
  var resspon = await fetch(url,
    {
      method: 'GET',
      headers: {
        'token': token,
      },
    }
  );
  if (resspon.ok) {
    await getListCategory();
    await GetTransport();
    var ttexts = await resspon.text();
    var tpTexts = JSON.parse(ttexts);
    tpTexts.forEach(element => {
      document.getElementById("tbody2").innerHTML += "<tr><td>" + element.name + "</td><td>" + "<div style='padding-left: 34%;'><button type='button' class='btn btn-light' data-bs-toggle='modal' data-bs-target='#exampleModal3'  onclick='postIdUnit(" + JSON.stringify(element.id) + ")'>Update</button></div>" + "</td></tr>"
    });

  } else {
    console.log("error list Unit");
  }
}


'use strict'
async function getListCategory() {
  var token = localStorage.getItem("token");
  var url = 'https://agriculture.cosplane.asia/api/Category/AdminGet';
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
      document.getElementById("tbody").innerHTML += "<tr><td>" + element.name + "</td><td>" + "<div style='padding-left: 25%;'><button type='button' class='btn btn-light' data-bs-toggle='modal' data-bs-target='#exampleModal2'  onclick='postIDcategory(" + JSON.stringify(element.id) + ")'>Update</button></div>" + "</td></tr>"
      document.getElementById("categoryNav").innerHTML += " <li><a href='#' onclick='moveProductByCategory(" + JSON.stringify(element.id) + ")'>Products - " + element.name + "</a></li>"
    });
  } else {
    console.log("error list category");
  }
}
function moveProductByCategory(id) {
  location.replace("Products.html?id=" + id);
}
function postIDcategory(id) {
  localStorage.setItem("IdCategoryUpdate", id);
}
function postIdUnit(id) {
  localStorage.setItem("IdUnit", id);
}

async function updateActCategory() {
  var id = localStorage.getItem("IdCategoryUpdate");
  var token = localStorage.getItem("token");
  if (token != null) {
    var url = 'https://agriculture.cosplane.asia/api/Category/Update'
    var check = document.getElementById("flexSwitchCheckChecked1").checked;
    var transportId = document.getElementById("selectTransport").value;
    var listTranspot2 = localStorage.getItem("listTranspot");
    var list = JSON.parse(listTranspot2);
    list.forEach(element => {
      if (element.id == transportId) {
        document.getElementById("selectTransport").value = element.name;
      }
    });
    var update = {
      "categoryId": id,
      "isActivated": check,
      "transportId": transportId
    }
    console.log(update);
    var resspon = await fetch(url,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify(update),
      }
    );
    if (resspon.ok) {
      alert("Update Success");
      location.reload();
    } else {
      console.log("error list category");
    }
  }
}
async function GetTransport() {
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
      count = 1;
      localStorage.setItem("listTranspot", JSON.stringify(tpTexts));
      tpTexts.forEach(element => {
        document.getElementById("selectTransport").innerHTML += " <option value='" + element.id + "' >" + element.name + "</option>"
      });
    } else {
      alert("Wrong token")
      location.replace("loginEmployee.html");
    }
  }
}
async function updateUnit() {
  var id = localStorage.getItem("IdUnit");
  var token = localStorage.getItem("token");
  if (token != null) {
    var url = 'https://agriculture.cosplane.asia/api/Unit/Update'
    var check = document.getElementById("flexSwitchCheckChecked2").checked;
    var update = {
      "unitId": id,
      "isActivated": check
    }
    var resspon = await fetch(url,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify(update),
      }
    );
    if (resspon.ok) {
      alert("Update Success");
      location.reload();
    } else {
      console.log("error list category");
    }
  }
}
async function createCategory() {
  var token = localStorage.getItem("token");
  if (token != null) {
    var url = 'https://agriculture.cosplane.asia/api/Category/Create';
    var name = document.getElementById("nameCategory").value;
    var nameObj = {
      "name": name,
    }
    var resspon = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify(nameObj),
      }
    );
    if (resspon.ok) {
      alert("Create Success");
      location.reload();
    } else {
      alert("Error Repone");
    }
  }
}
async function createUnit() {
  var token = localStorage.getItem("token");
  if (token != null) {
    var url = 'https://agriculture.cosplane.asia/api/Unit/Create';
    var name = document.getElementById("nameUnit").value;
    var nameObj = {
      "name": name,
    }
    var resspon = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify(nameObj),
      }
    );
    if (resspon.ok) {
      alert("Create Success");
      location.reload();
    } else {
      alert("Error Repone");
    }
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

