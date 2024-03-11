
async function login() {
    document.getElementById("preloader").style.display = "flex";
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var user = {
        "username": username,
        "password": password
    }
    if (user != null) {
        var url = "https://agriculture.cosplane.asia/api/Merchant/Login";
        var repone = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        if (repone.ok) {
            var Merchant = await repone.text();
            var Merchant2 = JSON.parse(Merchant);
            localStorage.setItem("token", Merchant2.token);
            location.replace("index.html");
        } else {
            announceerror();
        }
    }
}
function movePage(){
    location.replace("../SignUpMerchant.html");
}
function announceerror() {
    iziToast.error({
        title: 'UserName Or Password',
        message: 'is Wrong',
        position: 'topRight'
    });
};