var str = location.href;
var url = new URL(str);
var idOrder = url.searchParams.get("orderID");

let giveId = document.getElementById("orderId");
giveId.innerText = idOrder;
