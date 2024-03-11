
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

window.onload = async function () {
  await CheckToken();
  var token = localStorage.getItem("token");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const UserId = urlParams.get('id');
  var link = "https://agriculture.cosplane.asia/api/User/User?userId=" + UserId;
  var repone = await fetch(link, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'token': token,
    },
  })
  if (repone.ok) {
    var text = await repone.text();
    var User = JSON.parse(text);
    document.getElementById("exampleModalLabel").innerText = User.user.fullName;
    document.getElementById("name").innerText = User.user.fullName;
    document.getElementById("phone").innerText = User.user.phone;
    document.getElementById("email").innerText = User.user.email;
    document.getElementById("Address").innerText = User.user.address;

    var day = formatDate(User.user.joinTime);
    document.getElementById("joinDate").innerText = day;
    if (User.user.isActivated) {
      document.getElementById("flexSwitchCheckDefault1").setAttribute("checked", true);
      document.getElementById("flexSwitchCheckDefault7").setAttribute("checked", true);
    }
    if (User.account.accessActivated) {
      document.getElementById("flexSwitchCheckDefault2").setAttribute("checked", true);
    }
    if (User.user.phoneConfirmed) {
      document.getElementById("flexSwitchCheckDefault3").setAttribute("checked", true);
    }
    if (User.user.citizenConfirmed) {
      document.getElementById("flexSwitchCheckDefault4").setAttribute("checked", true);
    }
    if (User.user.isOrderAllow) {
      document.getElementById("flexSwitchCheckDefault5").setAttribute("checked", true);
    }
    var d = formatDate(User.user.latestUpdate);
    document.getElementById("lastestUpdate").innerText = d;
    document.getElementById("fullName").innerText = User.user.fullName
    var list = User.user.images;
    for (var i = 0; i < list.length; i++) {
      document.getElementById("imgAvatar").setAttribute("src", list[i]);
    }
    await getListCategory();
  }
}
function postImage(id) {
  var linkImg = document.getElementById(id).src;
  document.getElementById("imageappear").innerHTML = "<img style='max-width:100%;z-index:-1;' src='" + linkImg + "' />"
}
function PostUpdateAct() { }
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

async function UpdateUser() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  var link = "https://agriculture.cosplane.asia/api/User/AdminUpdate";
  var token = localStorage.getItem("token");
  var d1 = document.getElementById("flexSwitchCheckDefault6").checked;
  var d3 = document.getElementById("flexSwitchCheckDefault7").checked;
  if (token != null) {
    var update = {
      "userId": id,
      "isOrderAllow": d1,
      "isActivated": d3,
    }
    var repone = await fetch(link, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
      body: JSON.stringify(update),
    });
    if (repone.ok) {
      alert("Update Success");
      location.reload();
    }
  }
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

