/** Fonction récupération de l'ID */
function getId() {
  let params = new URLSearchParams(document.location.search);
  return params.get("id");
}
getId();

/** Affichage du produit */
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

/** Fonction qui empêche l'utilisateur de rentrer des caractères innapropriés dans la quantité  */
function nombresSeulement() {
  let itemQuantityInput = document.querySelector("#quantity");
  itemQuantityInput.setAttribute(
    "onkeydown",
    "return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))"
  );
}
nombresSeulement();

/** Fonction Stockage/Chargement Panier */

let panier = [];

function chargementPanier() {
  panier = JSON.parse(localStorage.getItem("Panier"));
}
if (localStorage.getItem("Panier")) {
  chargementPanier();
}

/** Fonction d'ajout au panier */
const boutonPanier = document.querySelector("#addToCart");

/**
 * Crée un objet article
 * @param {{qte: quantité, id: string, color: couleur }}
 */

boutonPanier.onclick = function () {
  const infoArticle = {
    qte: document.querySelector("#quantity").value,
    id: getId(),
    color: document.querySelector("#colors").value,
  };
  let existeDeja = false;
  /** Si l'article est déjà présent avec même id et même couleur alors la quantité sera ajouter seulement */

  if (infoArticle.qte > 0 && infoArticle.color != "") {
    panier.forEach(function (article) {
      if (
        article.id === infoArticle.id &&
        article.color === infoArticle.color
      ) {
        article.qte = Number(article.qte) + Number(infoArticle.qte);
        existeDeja = true;
      }
    });

    /** S'il est pas dans le panier il ajoute le contenu */

    if (!existeDeja) {
      panier.push(infoArticle);
    }
    /** On ajoute le contenu du panier au localstorage sous forme de Json */
    localStorage.setItem("Panier", JSON.stringify(panier));
    console.log(panier);
  } else {
    /** Sinon on retourne une erreur */
    console.log("Vous devez choisir une quantité et une couleur !");
  }
};
