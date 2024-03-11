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

window.onload = async function () {
  var link = "https://agriculture.cosplane.asia/api/Product/OfMerchant";
  var token = localStorage.getItem("token");
  if (token != null) {
    var repone = await fetch(link, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
    });
    if (repone.ok) {
      var text = await repone.text();
      var list = JSON.parse(text);
      list.forEach(element => {
        document.getElementById("tbd").innerHTML += "<tr><th scope='row'>" + element.productName + "</th><td>" + element.categoryName + "</td><td>" + element.price + "</td><td>" + element.unit + "</td><td>" + "<img style='width: 30%;'  src=" + element.imageUrl + ">" + "</td><td><button onclick='Detail("+JSON.stringify(element.productId)+")' class='btn btn-dark'>Detail</button></td></tr>"
      });
    } else {
      alert("error repone");
    }
  }

}
function Detail(id){
  localStorage.setItem("idProduct",id);
  location.replace("ProductDetail.html");
}