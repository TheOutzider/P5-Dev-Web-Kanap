/**
 * crée un element HTML représentant un article
 * @param {{color: Array, _id: string, canapName: string, price: number, imageUrl : url, description: string, alt, string}} post
 * @return {HTMLElement}
 */

function createArticles(post) {
  const article = document.createElement("article");
  article.innerHTML = `a href="./product.html?id=${post._id}">
    <article>
    <img src="${post.imageUrl}" alt="${post.alt}, ${post.canapName}">
    <h3 class="productName">${post.canapName}</h3>
    <p class="productDescription">${post.description}</p>
    </article>
    </a>
    `;
  return article;
}

async function chargementDeProduits() {
  const wrapper = document.querySelector("#items");
  const loader = document.createElement("p");

  loader.innerText = "Chargement...";

  wrapper.append(loader);
  try {
    const r = await fetch(`http://localhost:3000/api/products`);
    {
      headers: {
        Accept: "application/json";
      }
    }
    if (!r.ok) {
      throw new Error("Impossible de contacter le serveur");
      return;
    }

    const produits = await r.json();

    loader.remove();
    for (let post of produits) {
      wrapper.append(createArticles(post));
    }
  } catch (e) {
    loader.innerText = "Impossible de charger les produits";
    loader.style.color = "red";
  }
}

chargementDeProduits();
