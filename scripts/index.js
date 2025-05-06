fetch('data/all-items.json')
  .then(response => response.json())
  .then(json => {
    const products = json.data;
    const container = document.getElementById('card-container');
    const filterProducts = products
    .filter (product => product.is_new);
    

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
        <div class="price">R$${product.price.toFixed(2)}</div>
        </div>
        <button class="btn-card">Order Now</button>
      `;

      container.appendChild(card);
    });
  })

  

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
        draggable:false,
        cssEase:'linear',
        prevArrow: '<button class="btn-prev"><</button>',
        nextArrow: '<button class="btn-next">></button>',
        adaptiveHeight: false,
      });
    });
  });
