fetch('data/all-items.json')
  .then(response => response.json())
  .then(json => {
    const products = json.data;
    const container = document.getElementById('card-container');
    const filterProducts = products
      .filter(product => product.is_new);

    filterProducts.forEach(product => {
      let prop = '';
      if (product.ingredients_ratio) {
        prop = product.ingredients_ratio
          .map(ing => `${ing.ingredient} ${ing.percentage}%`)
          .join(' | ');
      }

      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <div class="card-image">
        <img src="${product.imagem_url}" alt="${product.name}">
        </div>
        <div class="card-text">
        <h3>${product.name}</h3>
        <p>${prop}</p>
        <div class="price">$${product.price.toFixed(2)}</div>
        </div>
        <button class="btn-card">Order Now</button>
      `;

      container.appendChild(card);
    });
});



$(document).ready(function () {
  $.getJSON('data/feedbacks 1.json', function (response) {
    const feedbacks = response.data;
    const $carousel = $('.feedbacks-carousel');

    feedbacks.forEach(function (item) {
      const slide = `
          <div class="feedbacks-carousel-slide">
            <p class="feedbacks-carousel-quote"><span class= quote-quote>"</span><br>${item.message}</p>
            <h3 class="feedbacks-carousel-name">${item.full_name}</h3>
            <p class="feedbacks-carousel-profession">${item.profession}</p>
            <img src="${item.image_url}" alt="${item.full_name}" class="feedbacks-carousel-photo">
          </div>
        `;
      $carousel.append(slide);
    });

    $carousel.slick({
      arrows: true,
      speed: 350,
      fade: true,
      infinite: true,
      draggable: false,
      cssEase: 'linear',
      prevArrow: '<button class="btn-prev"><</button>',
      nextArrow: '<button class="btn-next">></button>',
      adaptiveHeight: false,
    });
  });
});

const tableSelector = document.querySelector(".table-rows");
function renderTable(item) {
  const row = document.createElement("div");
  row.classList.add("table-row");
    row.innerHTML += `
    <p>${item.name}</p>
    <p>${item.type}</p>
    <p>$${item.price.toFixed(2)}</p>
  `
    tableSelector.appendChild(row);
}

async function returnData() {
  try{
    const res = await fetch('data/all-items.json') 
    const data = await res.json()
    return data.data
    }
    catch(error) {
      console.log(error)
    }
}

const filters = document.getElementById("filters")
const buttons = filters.querySelectorAll("button")

async function clicked(type){
const productsNew = await returnData()
  buttons.forEach((buttom) => {
    buttom.classList.remove("selected-button")
  })
  tableSelector.innerHTML = "";
  if (type.id == "All") {
    const buttom = document.getElementById("All")
    buttom.classList.add("selected-button")
    productsNew.forEach((item) => {
      renderTable(item);
    })
  }

  if (type.id == "Warm") {
    const buttom = document.getElementById("Warm")
    buttom.classList.add("selected-button")
    const productsWarm = productsNew.filter((item) => item.type == "Hot Beverage")
    productsWarm.forEach((item) => {
      renderTable(item);
    })
  }

  if (type.id == "Cold") {
    const buttom = document.getElementById("Cold")
    buttom.classList.add("selected-button")
    const productsCold = productsNew.filter((item) => item.type == "Cold Beverage")
    productsCold.forEach((item) => {
      renderTable(item);
    })
  }

  if (type.id == "Snack") {
    const buttom = document.getElementById("Snack")
    buttom.classList.add("selected-button")
    const productsSnack = productsNew.filter((item) => item.type == "Savory Snack")
    productsSnack.forEach((item) => {
      renderTable(item);
    })
  }

  if (type.id == "Dessert") {
    const buttom = document.getElementById("Dessert")
    buttom.classList.add("selected-button")
    const productsDessert = productsNew.filter((item) => item.type == "Bakery")
    productsDessert.forEach((item) => {
      renderTable(item);
    })
  }
}

(async () => {
  const productsNew = await returnData()
  tableSelector.innerHTML = "";
    productsNew.forEach((item) => {
      renderTable(item);
    })
})()
