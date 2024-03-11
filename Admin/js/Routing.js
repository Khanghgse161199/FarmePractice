async function CheckToken() {
    var url = "https://agriculture.cosplane.asia/api/Employee/CheckToken";
    var token = localStorage.getItem("token");
    console.log(token);
    if (token != null) {
        var repone = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            }
        });
        if (repone.ok) {
            var title = document.getElementById("title");
            if(title != null){
                var titleText = title.innerText;
                if(titleText == "Home"){
                    announce();
                }
            }
        } else {
            location.replace("loginEmployee.html");
        }
    } else {
        location.replace("loginEmployee.html");
    }
}
function announce() {
    // document.getElementById('btn-login').addEventListener("click",function(event){
    iziToast.success({
        title: 'WelCome',
        message: 'Admin',
        position: 'topCenter'
    });
};
function MovePageHome() {
    location.replace("index.html");
}
function MovePageMerchantList() {
    location.replace("MerchantList.html");
}
function MovePageUserList() {
    location.replace("UserList.html");
}
function MovePageMerCreateEmployee() {
    location.replace("CreateEmployee.html");
}
function MovePageProduct() {
    location.replace("Products.html");
}
function MovePageTransport() {
    location.replace("Transport.html");
}
function MovePageOthersNew() {
    location.replace("OdersByNew.html");
}
function MovePageOthersOderFinish() {
    location.replace("OderFinish.html");
}
function MovePageOthersOdersFull_paid() {
    location.replace("OdersFull_paid.html");
}
function MovePageOthersOdersPartial_paid() {
    location.replace("OdersPartial_paid.html");
}
function MovePageOthersOdersShippingDone() {
    location.replace("OdersShippingDone.html");
}
function MovePageOthersOrdersCancel() {
    location.replace("OrdersCancel.html");
}
function MovePageOthersOrderShipping() {
    location.replace("OrderShipping.html");
}
function MovePageOthersConfirmPartial_paid() {
    location.replace("partialPay.html");
}
function MovePageOthersConfirmFullPartial_paid() {
    location.replace("confirmFullPay.html");
}
function MovePageOthersConfirmShippingDone() {
    location.replace("shippingDone.html");
}
function MovePageOthersConfirmFinish() {
    location.replace("finishOrder.html");
}