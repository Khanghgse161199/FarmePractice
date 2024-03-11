async function SignUp() {
    document.getElementById("preloader").style.display = "flex";
    var namefirst = document.getElementById("username1").value;
    var namelast = document.getElementById("username2").value;
    var name = namefirst + " " + namelast;
    var username = document.getElementById("usernamemain").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("mail").value;
    var account = {
        "username": username,
        "password": password
    }
    var merchant = {
        "name": name,
        "email": email
    }
    var user = {
        account,
        merchant
    }
    if (user != null) {
        var url = "https://agriculture.cosplane.asia/api/Merchant/Signup";
        var repone = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        if (repone.ok) {
            alert("Success !!")
            location.replace("SignUpSuccess/SignUpSuccess.html")
        } else {
            announced();
        }
    }
}

function announced() {
    // document.getElementById('btn-login').addEventListener("click",function(event){
    iziToast.error({
        title: 'User name or PassWord',
        message: 'is already or not enought',
        position: 'topRight'
    });
};
