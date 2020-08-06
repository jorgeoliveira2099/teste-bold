const apiUrl = "https://raw.githubusercontent.com/jsvini/desafio-frontend/master/assets/api.json"

let data = [];
const cardsContainer = document.querySelector("#cards");

async function fetchCards() {
  try {
    let response =  await fetch(apiUrl)
    return await response.json()
  } catch {
    // Create error handling logic
    console.log("Error")
  }
}

function renderCards(cards) {
  cardsContainer.innerHTML = "";
  cards.map(renderCard).filter(renderCard); 
}

function renderCard(card) {
  const div = document.createElement("div");
  div.style.width = "20rem";
  div.style.margin = "2rem";
  div.className = "card";  
  div.innerHTML = `
  <img src="${card.advertisementAssets.advertisementThumbnails.inventory_m.url}" class="card-img-top" alt="foto aqui" />
  <div class="card-body">
    <h5 class="card-title">${card.realestateSummary.address.fullAddress}</h5>
    <p class="card-text">
      ${card.realestateSummary.address.postalCode} 
      ${card.realestateSummary.address.street} /
      ${card.realestateSummary.address.city}
    </p>
    <p class="card-text">
   <strong> ${card.advertisementPrice.sellPrice} €</strong>
   &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp ${card.realestateSummary.address.number} 
   ${card.realestateSummary.address.city} | ${Math.round(card.realestateSummary.space)} m<sup>2</sup>
  </p>
  </div>
`;
  cardsContainer.appendChild(div);
}

async function main() {
  data = await fetchCards();
    console.log(data.data.filter(e => e.purpose !== 0 &&
    e.advertisementPrice.sellPrice !== undefined && 
    e.realestateSummary.address.fullAddress !== undefined && 
    e.advertisementAssets.advertisementThumbnails.inventory_m.url !== undefined && 
    e.advertisementPrice.sellPrice < 1000000 &&
    e.realestateSummary.address.city === 'Berlin'))
  if(data.data) {
    renderCards(data.data.filter(e => e.purpose !== 0 &&
      e.advertisementPrice.sellPrice !== undefined && 
      e.realestateSummary.address.fullAddress !== undefined && 
      e.advertisementAssets.advertisementThumbnails.inventory_m.url !== undefined && 
      e.advertisementPrice.sellPrice < 1000000 &&
      e.realestateSummary.address.city === 'Berlin'));
  }
}

main();