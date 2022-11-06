/** Récupération du panier */
let panier = [];
function chargementDeProduit() {
  panier = JSON.parse(localStorage.getItem("panier"));
}
if (localStorage.getItem("panier")) {
  chargementDeProduit();
}
chargementDeProduit();
console.log(panier);

/** Fonction calcul du total d'article dans le panier */
function qteTotal(panier) {
  let qteTotale = 0;
  for (let article of panier) {
    qteTotale += article.qte;
  }
  return qteTotale;
}
/** Fonction calcul du total du prix du panier */
function prixTotal(panier) {
  let prixTotale = 0;
  for (let article of panier) {
    prixTotale += article.qte * article.prix;
  }
  return prixTotale;
}
/** Affichage des articles dans le Panier */
async function articleDuPanier() {
  for (let i in panier) {
    let chaqueArticle = panier[i];
    let articleData = await fetch(
      "http://localhost:3000/api/products/" + chaqueArticle.id
    );
    articleData = await articleData.json();
    let grillePanier = document.getElementById("cart__items");
    let grilleArticle = document.createElement("article");
    grilleArticle.classList.add("cart__item");
    grilleArticle.innerHTML = `
    <div class="cart__item__img">
                                    <img src="${articleData.imageUrl}" alt="${articleData.altTxt}">
                                    </div>
                                    <div class="cart__item__content">
                                    <div class="cart__item__content__description">
                                        <h2>${articleData.name}</h2>
                                        <p>${chaqueArticle.color}</p>
                                        <p>${articleData.description}</p>
                                        <p>${articleData.price} €</p>
                                    </div>
                                    <div class="cart__item__content__settings">
                                        <div class="cart__item__content__settings__quantity">
                                        <p>Qté : </p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${chaqueArticle.qte}">
                                        </div>
                                        <div class="cart__item__content__settings__delete">
                                        <p class="deleteItem">Supprimer</p>
                                        </div>
                                    </div>
                                    </div>
    `;
    grillePanier.appendChild(grilleArticle);
    /* Modification de la quantité à la volée */
    grilleArticle
      .querySelector(".itemQuantity")
      .addEventListener("click", function () {
        let newQty = parseInt(
          grilleArticle.querySelector(".itemQuantity").value
        );
        chaqueArticle.qte = newQty;
        document.getElementById("totalQuantity").innerHTML = `<span>${qteTotal(
          panier
        )}<\span>`;
        document.getElementById("totalPrice").innerHTML = `<span>${prixTotal(
          panier
        )}<\span>`;
        let nouveauPanier = JSON.stringify(panier);
        localStorage.panier = nouveauPanier;
      });
    /* Suppréssion des article */
    grilleArticle
      .querySelector(".deleteItem")
      .addEventListener("click", function () {
        panier.splice(i, 1);
        let nouveauPanier = JSON.stringify(panier);
        localStorage.panier = nouveauPanier;
        console.log(i);
        grilleArticle.remove();
        document.getElementById("totalQuantity").innerHTML = `<span>${qteTotal(
          panier
        )}<\span>`;
        document.getElementById("totalPrice").innerHTML = `<span>${prixTotal(
          panier
        )}<\span>`;
      });
  }

  document.getElementById("totalQuantity").innerHTML = `<span>${qteTotal(
    panier
  )}<\span>`;

  document.getElementById("totalPrice").innerHTML = `<span>${prixTotal(
    panier
  )}<\span>`;
}
articleDuPanier();

/** Listes de variables pratiques pour le formulaire + RegEx pour limiter les fautes d'entrées */

const prenom = document.querySelector("#firstName");
const mauvaisPrenom = document.querySelector("#firstNameErrorMsg");
let prenomValide = false;
const nom = document.querySelector("#lastName");
const mauvaisNom = document.querySelector("#lastNameErrorMsg");
let nomValide = false;

const adresse = document.querySelector("#address");
const mauvaisAdresse = document.querySelector("#addressErrorMsg");
let adresseValide = false;

const ville = document.querySelector("#city");
const mauvaisVille = document.querySelector("#cityErrorMsg");
let villeValide = false;

const mail = document.querySelector("#email");
const mauvaisMail = document.querySelector("#emailErrorMsg");
let mailValide = false;

const mailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]+[a-zA-Z0-9]+[.]+[a-z]+$");
const formRegExp = new RegExp("^[a-zA-Z0-9 ,.'-]+$");
const sansChiffreRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
const commande = document.querySelector("#order");

/** Fonctions d'écoutes de bonne entrées */

prenom.addEventListener("change", function () {
  let formeCorrecte = prenom.value.trim();
  if (sansChiffreRegExp.test(formeCorrecte)) {
    prenomValide = true;
    mauvaisPrenom.innerText = " ";
  } else {
    mauvaisPrenom.innerText = "Veuillez rentrer un prénom correct";
  }
});

nom.addEventListener("change", function () {
  let formeCorrecte = nom.value.trim();
  if (sansChiffreRegExp.test(formeCorrecte)) {
    nomValide = true;
    mauvaisNom.innerText = "";
  } else {
    mauvaisNom.innerText = "Veuillez rentrer un nom correct";
  }
});

adresse.addEventListener("change", function () {
  let formeCorrecte = adresse.value.trim();
  if (formRegExp.test(formeCorrecte)) {
    adresseValide = true;
    mauvaisAdresse.innerText = "";
  } else {
    mauvaisAdresse.innerText = "Veuillez rentrer une adresse correcte";
  }
});

ville.addEventListener("change", function () {
  let formeCorrecte = ville.value.trim();
  if (sansChiffreRegExp.test(formeCorrecte)) {
    villeValide = true;
    mauvaisVille.innerText = "";
  } else {
    mauvaisVille.innerText = "Veuillez rentrer une ville correcte";
  }
});

mail.addEventListener("change", function () {
  let formeCorrecte = mail.value.trim();
  if (mailRegExp.test(formeCorrecte)) {
    mailValide = true;
    mauvaisMail.innerText = "";
  } else {
    mauvaisMail.innerText = "Veuillez rentrer une adresse mail correcte";
  }
});

/** Envoie de la commande au serveur web */

const commandeComplete = document.querySelector("form.cart__order__form");
commandeComplete.addEventListener("submit", async function (envoiCommande) {
  envoiCommande.preventDefault();
  if (
    !prenomValide ||
    !nomValide ||
    !adresseValide ||
    !villeValide ||
    !mailValide
  ) {
    return;
  }
  const donnees = {};
  donnees.contact = {};
  donnees.contact.firstName = prenom.value;
  donnees.contact.lastName = nom.value;
  donnees.contact.address = adresse.value;
  donnees.contact.city = ville.value;
  donnees.contact.email = mail.value;

  donnees.products = [];
  let toutLesProduits = JSON.parse(localStorage.panier);

  for (let i in toutLesProduits) {
    let lignePannier = toutLesProduits[i];
    donnees.products.push(lignePannier.id);
  }

  let r = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(donnees),
    headers: { "Content-Type": "application/json" },
  });

  r = await r.json();
  sessionStorage.setItem("idCommande", JSON.stringify(r.orderId));

  let numeroCommande = [];
  if (sessionStorage.idCommande) {
    numeroCommande = JSON.parse(sessionStorage.idCommande);
    console.log(numeroCommande);
  }

  /** Effacement du panier post-envoi */

  if (panier) {
    localStorage.removeItem("panier");
  }
  /** Inscription de la commande sur la page de confirmation et création d'un ID et envoi de l'utilisateur vers la page de confirmation */
  document.location = "confirmation.html?orderID=" + numeroCommande;
});
