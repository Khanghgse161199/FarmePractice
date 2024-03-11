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
window.onload = async function getProfile() {
  var check = await checkToken();
  if (check) {
    announce();
    var url = "https://agriculture.cosplane.asia/api/Merchant/PrivateProfile";
    var token = localStorage.getItem("token");
    if (token != null) {
      var repone = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
      })
      if (repone.ok) {
        var user = await repone.text();
        var Merchant = JSON.parse(user);
        document.getElementById("name").value = Merchant.name;
        document.getElementById("phone").value = Merchant.phone;
        document.getElementById("Address").value = Merchant.address;
        document.getElementById("bio").value = Merchant.bio;
        document.getElementById("mail").value = Merchant.email;
        document.getElementById("username").value = Merchant.username;
        document.getElementById("joinDate").value = Merchant.joinDate;
        document.getElementById("lastestUpdate").value = Merchant.lastestUpdate;
        list = Merchant.images;
        if(list.length >= 5){
          document.getElementById("addMore").style.display = "none";
        }
        localStorage.setItem("countImageFirst",list.length);
        localStorage.setItem("countImage",list.length);
       
        for (var i = 0; i < list.length; i++) {
          if (i < 3) {
            document.getElementById("trExist1").innerHTML += "<td>" + "<div class='card' style='width: 20rem;'>" + "<img src='" + list[i] + "' class='card-img-top' + alt='...' >" + "<div class='card-body'>" + "<button type='button' class='btn btn-outline-dark'>Delete</button>" + "</div>" + "</div>" + "</td>";
          } else{
            document.getElementById("trExist2").innerHTML += "<td>" + "<div class='card' style='width: 20rem;'>" + "<img src='" + list[i] + "' class='card-img-top' + alt='...'  >" + "<div class='card-body'>" + "<button type='button' class='btn btn-outline-dark'>Delete</button>" + "</div>" + "</div>" + "</td>";

          }
        }
        
      } else {
        alert("Error Repone !!")
      }
    }
  } else {
    location.replace("../../LoginMerchant/LoginMerchant.html");
  }
}



function addPicture() {
  var ImageID = localStorage.getItem("countImage");
  if(ImageID >= 5){
    document.getElementById("addMore").style.display = "none";
  }
  ImageID++;
  document.getElementById("divAddPicture").innerHTML += " <input type='text' id= " + "'" + "image" + ImageID + "'" + ">"
  localStorage.setItem("countImage",ImageID);

}

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
    location.replace("../../LoginMerchant/LoginMerchant.html");
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
    title: 'Update',
    message: 'error - infor is not enough',
    position: 'topRight'
  });
};

async function updateProfile() {
  var url = "https://agriculture.cosplane.asia/api/Merchant/UpdateBasic";
  var token = localStorage.getItem("token");
  var address = document.getElementById("Address").value;
  var bio = document.getElementById("bio").value;
  var phone = document.getElementById("phone").value;
  var Profile = {
    "address": address,
    "bio": bio,
    "phone": phone,
  }
  if (address != null && bio != null && phone != null && token != null) {
    var repone = await fetch(url, {
      method: "PUT",

      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify(Profile),
    })
    if (repone.ok) {
      announced();
    } else {
      announceError()

    }
  } else {
    announceError();
  }
}

async function updateImages() {
  var url = "https://agriculture.cosplane.asia/api/Merchant/UploadImage";
  var token = localStorage.getItem("token");
  var list2 = [];
  var countImage = localStorage.getItem("countImageID");
  var countImagePrev = localStorage.getItem("countImagePrev");
  var iFirst = localStorage.getItem("countImageFirst");
  var iLast = localStorage.getItem("countImage");
  iFirst++;
  for (var i = iFirst; i <= iLast; i++) {
    var link = document.getElementById("image" + i).value
    list2.push(link);
  }
  var images = {
    "imageUrls": list2,
  }
  if (token != null && list != null) {
    var repone = await fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
      body: JSON.stringify(images),
    })
    if (repone.ok) {
      announced();
      location.reload();
    } else {
      announceError();
    }
  }
}

async function UpdatebusinessLicens() {
  var url = "https://agriculture.cosplane.asia/api/Merchant/UploadBussinessLicense";
  var token = localStorage.getItem("token");
  var link = document.getElementById("imagebusinessLicense").value;
  var image = {
    "businessLicense":link,
  }
  if (token != null) {
    var repone = await fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
      body: JSON.stringify(image),
    })
    if (repone.ok) {
      announced();
      location.reload();
    } else {
      announceError();
    }
  }
}