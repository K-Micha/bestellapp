let cart = [];
let deliveryCost = 0;

function getDish(id) {
  return (
    data.mainDishes.find(d => d.id === id) ||
    data.slideDishes.find(d => d.id === id) ||
    data.drinks.find(d => d.id === id)
  );
}

function dishCardHTML(dish) {
  return `
    <button data-id="${dish.id}" onclick="
      addItem('${dish.id}');
      updateMenuButtons();
    " class="dishes_btn icon_btn">➕</button>

    <h3>${dish.name}</h3>
    <p>${dish.description}</p>
    <p class='price'>${dish.price.toFixed(2)} €</p>
  `;

}

function renderCategory(list, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  list.forEach(dish => {
    const card = document.createElement("article");
    card.classList.add("menu_container");
    card.innerHTML = dishCardHTML(dish);
    container.appendChild(card);
  });

  updateMenuButtons();
}

renderCategory(data.mainDishes, "main_dishes");
renderCategory(data.slideDishes, "slide_dishes");
renderCategory(data.drinks, "drinks");



function addItem(id) {
  const dish = getDish(id);
  if (!dish) return;

  let item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ id: dish.id, name: dish.name, price: dish.price, qty: 1 });
  }

  renderCart();
  updateMenuButtons();
}

//cart

function renderCart() {
  renderCartItems();
  renderSummary();
}

// add delete items
function renderCartItems() {
  const box = document.querySelector(".item_cart");
  if (!box) return;


  clearCartBox(box);
  if (cart.length === 0) return;

  cart.forEach(item => addCartRow(box, item));

}
function clearCartBox(box) {
  box.innerHTML = "";
}

// add items
function addCartRow(box, item) {
  box.innerHTML += `
    <div class="cart_row">
      <p class="item_name">${item.name}</p>
      <div class="cart_controls">
        <button class="minus btn" onclick="changeQty('${item.id}', -1)">➖</button>
        <span>${item.qty}</span>
        <button class="plus btn" onclick="changeQty('${item.id}', 1)">➕</button>
        <p class="item_sum">${(item.price * item.qty).toFixed(2)} €</p>
        <button class="remove btn" onclick="removeItem('${item.id}')">🗑️</button>
      </div>
    </div>
  `;
}

// add items
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  renderCart();
  updateMenuButtons();
}

// remove items
function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
  updateMenuButtons();
}

//summe

function renderSummary() {
  const subtotalEl = document.getElementById("subtotal_summe");
  const deliveryEl = document.getElementById("delivery_summe");
  const totalEl = document.getElementById("total_summe");

  if (!subtotalEl || !deliveryEl || !totalEl) return;

  if (cart.length === 0) {
    subtotalEl.textContent = "";
    deliveryEl.textContent = "";
    totalEl.textContent = "";
    return;
  }

  const sub = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  subtotalEl.textContent = sub.toFixed(2) + " €";
  deliveryEl.textContent = deliveryCost.toFixed(2) + " €";
  totalEl.textContent = (sub + deliveryCost).toFixed(2) + " €";
}

// order number

function updateMenuButtons() {

  document.querySelectorAll(".dishes_btn").forEach(btn => {
    btn.innerText = "➕";
  });


  cart.forEach(item => {
    const btn = document.querySelector(`.dishes_btn[data-id="${item.id}"]`);
    if (btn) btn.innerText = item.qty;
  });
}

function updateMenuButtons() {
  document.querySelectorAll(".dishes_btn").forEach(btn => {
    const id = btn.dataset.id;
    const item = cart.find(i => i.id === id);


    if (item) {
      btn.textContent = item.qty;
    }
    else {
      btn.textContent = "➕";
    }
  });
}

//cart masage
function finalizeOrder() {
  const message = document.getElementById("order_message");
  if (!message) return;

  message.style.display = "block";

  if (cart.length === 0) {
    message.textContent = "Der Warenkorb ist leer.";
    message.style.color = "#c0392b";
  } else {
    message.textContent = "Bestellung erfolgreich!";
    message.style.color = "#27ae60";
    resetCart();
  }

  setTimeout(() => {
    message.textContent = "";
    message.style.display = "none";
  }, 4000);
}


function resetCart() {
  cart = [];
  renderCart();
  updateMenuButtons();
} 