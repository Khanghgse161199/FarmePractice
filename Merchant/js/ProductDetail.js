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
  var id = localStorage.getItem("idProduct");
  var link = "https://agriculture.cosplane.asia/api/Product/Detail?prodId=" + id;
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
      document.getElementById("name").value = list.name
      document.getElementById("category").value = list.categoryName
      document.getElementById("price").value = list.price
      document.getElementById("floatingTextarea").value = list.description
      document.getElementById("unit").value = list.unit
      document.getElementById("step").value = list.step
      document.getElementById("createdAt").value = list.createdAt
      var listImage = list.images;
      var i = 0;
      // var stop = listImage.length / 3;
      var redundant = listImage.length % 3
    if(redundant == 0){
      if(listImage.length == 3){
        document.getElementById("col1").innerHTML += "<div class='container text-center'><div class='row'><div class='col-lg-4'>"+"<button  onclick='getlinkImgae("+JSON.stringify(listImage[i])+")' style='height: 100%;' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i]+"  alt="+"></button></div>"+"<div class='col-lg-4'>"+"<button  style='height: 100%;' onclick='getlinkImgae("+JSON.stringify(listImage[i+1])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+1]+"  alt="+"></button>"+"</div><div class='col-lg-4'>"+"<button  style='height: 100%;'onclick='getlinkImgae("+JSON.stringify(listImage[i+2])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+2]+"  alt="+"></button>"+"</div></div></div>"
      }else if(listImage.length == 6){
        document.getElementById("col1").innerHTML += "<div class='container text-center'><div class='row'><div class='col-lg-4'>"+"<button  onclick='getlinkImgae("+JSON.stringify(listImage[i])+")' style='height: 100%;' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i]+"  alt="+"></button></div>"+"<div class='col-lg-4'>"+"<button  style='height: 100%;' onclick='getlinkImgae("+JSON.stringify(listImage[i+1])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+1]+"  alt="+"></button>"+"</div><div class='col-lg-4'>"+"<button  style='height: 100%;'onclick='getlinkImgae("+JSON.stringify(listImage[i+2])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+2]+"  alt="+"></button>"+"</div></div></div>"
        document.getElementById("col1").innerHTML += "<div class='container text-center'><div class='row'><div class='col-lg-4'>"+"<button  onclick='getlinkImgae("+JSON.stringify(listImage[i+3])+")' style='height: 100%;' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+3]+"  alt="+"></button></div>"+"<div class='col-lg-4'>"+"<button  style='height: 100%;' onclick='getlinkImgae("+JSON.stringify(listImage[i+4])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+4]+"  alt="+"></button>"+"</div><div class='col-lg-4'>"+"<button  style='height: 100%;'onclick='getlinkImgae("+JSON.stringify(listImage[i+5])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+5]+"  alt="+"></button>"+"</div></div></div>"
      }
    }else if(redundant == 1){
      if(listImage.length == 1){
        document.getElementById("col1").innerHTML += "<div class='container text-center'><div class='row'><div class='col-lg-4'>"+"<button  onclick='getlinkImgae("+JSON.stringify(listImage[i])+")' style='height: 100%;' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i]+"  alt="+"></button></div>"+"</div></div>"
      }else if(listImage.length == 4){
        document.getElementById("col1").innerHTML += "<div class='container text-center'><div class='row'><div class='col-lg-4'>"+"<button  onclick='getlinkImgae("+JSON.stringify(listImage[i])+")' style='height: 100%;' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i]+"  alt="+"></button></div>"+"<div class='col-lg-4'>"+"<button  style='height: 100%;' onclick='getlinkImgae("+JSON.stringify(listImage[i+1])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+1]+"  alt="+"></button>"+"</div><div class='col-lg-4'>"+"<button  style='height: 100%;'onclick='getlinkImgae("+JSON.stringify(listImage[i+2])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+2]+"  alt="+"></button>"+"</div></div></div>"
        document.getElementById("col1").innerHTML += "<div class='container text-center'><div class='row'><div class='col-lg-4'>"+"<button  onclick='getlinkImgae("+JSON.stringify(listImage[i+3])+")' style='height: 100%;' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+3]+"  alt="+"></button></div>"+"</div></div>"
      }else if(listImage.length == 7){
        document.getElementById("col1").innerHTML += "<div class='container text-center'><div class='row'><div class='col-lg-4'>"+"<button  onclick='getlinkImgae("+JSON.stringify(listImage[i])+")' style='height: 100%;' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i]+"  alt="+"></button></div>"+"<div class='col-lg-4'>"+"<button  style='height: 100%;' onclick='getlinkImgae("+JSON.stringify(listImage[i+1])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+1]+"  alt="+"></button>"+"</div><div class='col-lg-4'>"+"<button  style='height: 100%;'onclick='getlinkImgae("+JSON.stringify(listImage[i+2])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+2]+"  alt="+"></button>"+"</div></div></div>"
        document.getElementById("col1").innerHTML += "<div class='container text-center'><div class='row'><div class='col-lg-4'>"+"<button  onclick='getlinkImgae("+JSON.stringify(listImage[i+3])+")' style='height: 100%;' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+3]+"  alt="+"></button></div>"+"<div class='col-lg-4'>"+"<button  style='height: 100%;' onclick='getlinkImgae("+JSON.stringify(listImage[i+4])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+4]+"  alt="+"></button>"+"</div><div class='col-lg-4'>"+"<button  style='height: 100%;'onclick='getlinkImgae("+JSON.stringify(listImage[i+5])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+5]+"  alt="+"></button>"+"</div></div></div>"
        document.getElementById("col1").innerHTML += "<div class='container text-center'><div class='row'><div class='col-lg-4'>"+"<button  onclick='getlinkImgae("+JSON.stringify(listImage[i+6])+")' style='height: 100%;' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+6]+"  alt="+"></button></div>"+"</div></div>"

      }
    }else if(redundant == 2){
      if(listImage.length == 2){
        document.getElementById("col1").innerHTML += "<div class='container text-center'><div class='row'><div class='col-lg-4'>"+"<button  onclick='getlinkImgae("+JSON.stringify(listImage[i])+")' style='height: 100%;' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i]+"  alt="+"></button></div>"+"<div class='col-lg-4'>"+"<button  style='height: 100%;' onclick='getlinkImgae("+JSON.stringify(listImage[i+1])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+1]+"  alt="+"></button>"+"</div></div></div>"
      }else if(listImage.length == 5){
        document.getElementById("col1").innerHTML += "<div class='container text-center'><div class='row'><div class='col-lg-4'>"+"<button  onclick='getlinkImgae("+JSON.stringify(listImage[i])+")' style='height: 100%;' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i]+"  alt="+"></button></div>"+"<div class='col-lg-4'>"+"<button  style='height: 100%;' onclick='getlinkImgae("+JSON.stringify(listImage[i+1])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+1]+"  alt="+"></button>"+"</div><div class='col-lg-4'>"+"<button  style='height: 100%;'onclick='getlinkImgae("+JSON.stringify(listImage[i+2])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+2]+"  alt="+"></button>"+"</div></div></div>"
        document.getElementById("col1").innerHTML += "<div class='container text-center'><div class='row'><div class='col-lg-4'>"+"<button  onclick='getlinkImgae("+JSON.stringify(listImage[i+3])+")' style='height: 100%;' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+3]+"  alt="+"></button></div>"+"<div class='col-lg-4'>"+"<button  style='height: 100%;' onclick='getlinkImgae("+JSON.stringify(listImage[i+4])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+4]+"  alt="+"></button>"+"</div></div></div>"
      }else if(listImage.length == 8){
        document.getElementById("col1").innerHTML += "<div class='container text-center'><div class='row'><div class='col-lg-4'>"+"<button  onclick='getlinkImgae("+JSON.stringify(listImage[i])+")' style='height: 100%;' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i]+"  alt="+"></button></div>"+"<div class='col-lg-4'>"+"<button  style='height: 100%;' onclick='getlinkImgae("+JSON.stringify(listImage[i+1])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+1]+"  alt="+"></button>"+"</div><div class='col-lg-4'>"+"<button  style='height: 100%;'onclick='getlinkImgae("+JSON.stringify(listImage[i+2])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+2]+"  alt="+"></button>"+"</div></div></div>"
        document.getElementById("col1").innerHTML += "<div class='container text-center'><div class='row'><div class='col-lg-4'>"+"<button  onclick='getlinkImgae("+JSON.stringify(listImage[i+3])+")' style='height: 100%;' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+3]+"  alt="+"></button></div>"+"<div class='col-lg-4'>"+"<button  style='height: 100%;' onclick='getlinkImgae("+JSON.stringify(listImage[i+4])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+4]+"  alt="+"></button>"+"</div><div class='col-lg-4'>"+"<button  style='height: 100%;'onclick='getlinkImgae("+JSON.stringify(listImage[i+5])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+5]+"  alt="+"></button>"+"</div></div></div>"
        document.getElementById("col1").innerHTML += "<div class='container text-center'><div class='row'><div class='col-lg-4'>"+"<button  onclick='getlinkImgae("+JSON.stringify(listImage[i+6])+")' style='height: 100%;' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+6]+"  alt="+"></button></div>"+"<div class='col-lg-4'>"+"<button  style='height: 100%;' onclick='getlinkImgae("+JSON.stringify(listImage[i+7])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+7]+"  alt="+"></button>"+"</div></div></div>"

      }
    }
      for(var i = 0; i < number; i++){
        document.getElementById("col1").innerHTML += "<div class='container text-center'><div class='row'><div class='col-lg-4'>"+"<button  onclick='getlinkImgae("+JSON.stringify(listImage[i])+")' style='height: 100%;' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i]+"  alt="+"></button></div>"+"<div class='col-lg-4'>"+"<button  style='height: 100%;' onclick='getlinkImgae("+JSON.stringify(listImage[i+1])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+1]+"  alt="+"></button>"+"</div><div class='col-lg-4'>"+"<button  style='height: 100%;'onclick='getlinkImgae("+JSON.stringify(listImage[i+2])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+2]+"  alt="+"></button>"+"</div></div></div>"
      }
        // var number = stop - redundant
    
      // while(true){
      //   if(i == stop){
      //     break;
      //   }
      //   document.getElementById("col1").innerHTML += "<div class='container text-center'><div class='row'><div class='col-lg-4'>"+"<button  onclick='getlinkImgae("+JSON.stringify(listImage[i])+")' style='height: 100%;' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i]+"  alt="+"></button></div>"+"<div class='col-lg-4'>"+"<button  style='height: 100%;' onclick='getlinkImgae("+JSON.stringify(listImage[i+1])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+1]+"  alt="+"></button>"+"</div><div class='col-lg-4'>"+"<button  style='height: 100%;'onclick='getlinkImgae("+JSON.stringify(listImage[i+2])+")' class='btn btn-light' data-bs-toggle='modal'data-bs-target='#exampleModal'><img style='width: 100%;height: 100%;' src="+listImage[i+2]+"  alt="+"></button>"+"</div></div></div>"
      //   i++;
      // }
    //  listImage.forEach(element => {
    //   document.getElementById("imgpd").innerHTML += " <div style='border-radius: 20px;max-height: 10%;' class='carousel-item active col-lg-6'><img style='border-radius: 20px;max-height: 20%;' src='"+element+"' class='d-block w-100' alt='...'></div>"
    //  });
    } else {
      alert("error repone");
    }
  }

}
function getlinkImgae(id){
  document.getElementById("imagePost").setAttribute("src",id);
}