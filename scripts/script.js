//  menu header
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  const burger = document.querySelector(".ham_menu");
  menu?.classList.toggle("active");
  burger?.classList.toggle("active");
}


function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  // Menü schließen
  toggleMenu();
}




//Cart mobil open

function openCart() {
  const basket = document.querySelector(".basket");
  basket.classList.add("open");
}

function cartClose() {
  const basket = document.querySelector(".basket");
  basket.classList.remove("open");
}
function openCart() {
  document.getElementsByClassName("basket")[0].classList.add("open");
  document.getElementsByClassName("content")[0].classList.add("content_open");
}

function cartClose() {
  document.getElementsByClassName("basket")[0].classList.remove("open");
  document.getElementsByClassName("content")[0].classList.remove("content_open");
}

//order btn
function createOrderButton() {
  document.getElementById("order_mode").innerHTML =
    `<button id="order_btn" class="order_btn_switch">Abholung</button>`;
}
function switchOrderMode() {
  const btn = document.getElementById("order_btn");

  if (btn.classList.contains("active")) {

    btn.classList.remove("active");
    btn.textContent = "Abholung";
    setDeliveryCost(0);
  } else {

    btn.classList.add("active");
    btn.textContent = "Lieferung";
    setDeliveryCost(4.99);
  }
}
function setDeliveryCost(cost) {
  deliveryCost = cost;
  document.getElementById("delivery_summe").textContent =
    cost ? cost.toFixed(2) + " €" : "";
  renderSummary();
}

createOrderButton();
document.getElementById("order_btn").onclick = switchOrderMode;

 