function getId() {
  let params = new URLSearchParams(document.location.search);
  return params.get("id");
}

async function chargementProduit() {
  let r = await fetch(`http://localhost:3000/api/products/${getId()}`);
  r = await r.json();

  let itemImg = document.querySelector(".item__img");
  itemImg.innerHTML = `<img src="${r.imageUrl}" alt="${r.altTxt}"></img>`;

  let itemTitle = document.querySelector("#title");
  itemTitle.innerText = r.name;

  let itemPrice = document.querySelector("#price");
  itemPrice.innerText = r.price;

  let itemDescription = document.querySelector("#description");
  itemDescription.innerText = r.description;

  let itemColors = document.querySelector("#colors");
  for (let allColors in r.colors) {
    let color = r.colors[allColors];

    itemColors.innerHTML += `<option value=${color}>${color}</option>`;
  }
}
chargementProduit();
