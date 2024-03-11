window.onload = async function () {
    await CheckToken();
    var token = localStorage.getItem("token");
    var url = 'https://agriculture.cosplane.asia/api/Employee/CheckToken';
    var resspon = await fetch(url,
        {
            method: 'POST',
            headers: {
                'token': token,
            },
        }
    );
    if (resspon.ok) {
        var ttexts = await resspon.text();
        var tpTexts = JSON.parse(ttexts);
        await getListCategory();
        await loadOrders(token);
    } else {
        location.replace('loginEmployee.html');
    }
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
async function loadOrders(token) {
    var url = "https://agriculture.cosplane.asia/api/Order/ByStatus?status=SHIPPING";
    var request = new Request(url);
    var resultFetch = await fetch(url, {
        method: 'GET',
        headers: {
            'token': token,
        }
    })
    if (resultFetch.ok) {
        var texts = await resultFetch.text();
        var pTexts = JSON.parse(texts);
        pTexts.forEach(element => {
            document.getElementById('tbodyy').innerHTML += `<tr>
            <td><a style="text-decoration:none" href="OrdersDetail.html?id=${element.id}">Order Detail</a></td>
            <td>${element.customerId}</td>
            <td>${element.quantity}</td>
            <td>${element.total}</td>
            <td>${element.createdAt}</td>
            <td>${element.status}</td>
            <td ><button onclick="confirmShipDone('${element.id}')"  type="button" class="btn btn-success confirmPayment">DONE CONFIRM</button</td>
        </tr> `
        });
    }
}

async function cancelOrder(id) {
    var token = localStorage.getItem("token");
    console.log(token)
    var url = "https://agriculture.cosplane.asia/api/Order/CancelOrder?orderId=" + id;
    var resquest = new Request(url);
    var resultFet = await fetch(url,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Token': token,
            },
        }
    );
    if (resultFet.ok) {
        alert("Da Huy Order ")
        location.replace('shippingDone.html');

    } else {
        alert("not ok")
    }
}
async function confirmShipDone(id) {
    var token = localStorage.getItem("token");
    console.log(token)
    var url = "https://agriculture.cosplane.asia/api/Order/DoneShipping?orderId=" + id;
    var resquest = new Request(url);
    var resultFet = await fetch(url,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Token': token,
            },
        }
    );
    if (resultFet.ok) {
        alert("Ship Done  ")
        location.replace('shippingDone.html');

    } else {
        alert("not ok")
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
