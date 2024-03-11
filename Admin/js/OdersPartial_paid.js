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
window.onload = async function() {
  await CheckToken();
  var token = localStorage.getItem("token");
  if (token != null) {
    var url = 'https://agriculture.cosplane.asia/api/Order/ByStatus?status=PARTIALPAIDCONFIRMED';
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
      for(var i = 0 ; i < tpTexts.length ; i++){
        var time = formatDate(tpTexts[i].createdAt);
        document.getElementById("tbody2").innerHTML += "<tr><td></td><td><input type='checkbox' name='Id'></td><td>"+tpTexts[i].id+"</td><td>"+tpTexts[i].status+"</td><td>"+time+"</td><td>"+tpTexts[i].quantity+"</td><td>"+tpTexts[i].total+"</td><td><a  type='btn' class='btn btn-primary'>"+"<i style='text-align: center;' class='bx bx-chevrons-up bx-rotate-90' onclick='IdOrder("+JSON.stringify(tpTexts[i].id)+")'></i>"+"</a></td></tr>"
      }
      await getListCategory();
    } else {
      alert("Error Repone !!!")
    }
  }
}
function IdOrder(id){
  location.replace("OrderDetail.html?id="+id);
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
