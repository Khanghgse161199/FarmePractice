'use strict'
async function CreaterAccount() {
  var token = localStorage.getItem("token");
  if (token != null) {
    var url = 'https://agriculture.cosplane.asia/api/Employee/Create';
    var fullName = document.getElementById("FullName").value;
    var email = document.getElementById("Email").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("Address").value;
    var citizenID = document.getElementById("CitizenID").value;
    var dateOfBirth = document.getElementById("DateOfBirth").value;
    var day = formatDate(dateOfBirth);
    var username = document.getElementById("Username").value;
    var password = document.getElementById("Password").value;
    var passwordCf = document.getElementById("ConfrimPassword").value;
    if(password == passwordCf){
      var Employee = {
        "employee": {
          "fullName": fullName,
          "email": email,
          "phone": phone,
          "address": address,
          "citizenID": citizenID,
          "dateOfBirth": day
        },
        "account": {
          "username": username,
          "password": password
        }
      }  
    var resspon = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body:JSON.stringify(Employee),
      }
    );
    if (resspon.ok) {
     alert("Create Success!")
     location.reload();
    } else {
      alert("Eror Reopne")
    }
    }else{
      alert("PassWord and PassWordCf is not alike");
    }
  }
}
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
  } else {
    console.log("error list category");
  }
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

