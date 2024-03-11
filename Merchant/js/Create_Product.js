const body = document.querySelector('body'),
  sidebar = body.querySelector('nav'),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");


toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeText.innerText = "Light mode";
  } else {
    modeText.innerText = "Dark mode";

  }
});
var list = [];
var countImage;


async function checkToken() {
  var url = "https://agriculture.cosplane.asia/api/Merchant/CheckToken";
  var token = localStorage.getItem("token");
  if (token != null) {
    var repone = await fetch(url, {
      method: "POST",

      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
    })
    if (repone.ok) {
      return true;
    } else {
      return false;
    }
  } else {
    location.replace("LoginMerchant.html");
  }

}
function announce() {
  // document.getElementById('btn-login').addEventListener("click",function(event){
  iziToast.success({
    title: 'WelCome',
    message: 'Profile',
    position: 'topRight'
  });
};
function announced() {
  // document.getElementById('btn-login').addEventListener("click",function(event){
  iziToast.success({
    title: 'Update',
    message: 'Profile Success',
    position: 'topRight'
  });
};
function announceError() {
  // document.getElementById('btn-login').addEventListener("click",function(event){
  iziToast.error({
    title: 'May be:',
    message: 'price must be between 500 and 999999999',
    position: 'topRight'
  });
};
window.onload = async function GetCategory() {
  var token = localStorage.getItem("token");
  var url = 'https://agriculture.cosplane.asia/api/Category';
  var resspon = await fetch(url);
  if (resspon.ok) {
    await GetUnit();
    await checkToken();
    var ttexts = await resspon.text();
    var tpTexts = JSON.parse(ttexts);
    tpTexts.forEach(element => {
      document.getElementById("colorselector").innerHTML += "<option value=" + element.id + ">" + element.name + "</option>"
    });
  } else {
    localStorage.replace("LoginMerchant.html")
  }
}

async function PostProduct() {
  var link = "https://agriculture.cosplane.asia/api/Product/Create";
  var token = localStorage.getItem("token");
  var name = document.getElementById("name").value;
  var Amount = document.getElementById("Amount").value;
  var Price = document.getElementById("Price").value;
  var listImg = [];
  var number = localStorage.getItem("countImageProduct");
  for (var i = 1; i < number; i++) {
    var imgaePd = document.getElementById("Image" + i).value;
    listImg.push(imgaePd);
  }
  var category = document.getElementById("colorselector").value;
  var unit = document.getElementById("colorselector2").value;
  var Step = document.getElementById("Step").value;
  var Description = document.getElementById("Description").value;
  var product = {
    "categoryId": category,
    "price": Price,
    "minAmount": Amount,
    "name": name,
    "description": Description,
    "unitId": unit,
    "step": Step,
    "imageUrls": listImg,
  }
  if (token != null) {

    var resspon = await fetch(link,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify(product),
      }
    );
    if (resspon.ok) {
      alert("Create Success !");
      location.reload();
    } else {
      announceError();
    }
  }
}
var count = 1;
function addPicture() {
  if(count <= 10){
    document.getElementById("addimg").innerHTML += "<div class='field field_v3'><label for='email' class='ha-screen-reader'>Image Url</label><input id='Image" + count + "' class='field__input' placeholder='e.g. abcxyz.png'><span class='field__label-wrap' aria-hidden='true'><span class='field__label'>Image Url</span></span></div>"
  }
  if(count > 10){
    document.getElementById("addMore").style.display = "none";
  }
  count++;
  localStorage.setItem("countImageProduct", count);
}

async function GetUnit() {
  var token = localStorage.getItem("token");
  var url = 'https://agriculture.cosplane.asia/api/Unit';
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
      document.getElementById("colorselector2").innerHTML += "<option value=" + element.id + ">" + element.name + "</option>"
    });

  } else {
    console.log("error list Unit");
  }
}


