window.addEventListener("load", function (e) {
  const rentalRequest = fetch("./js/data.json");
  let store = [];
  rentalRequest
    .then((response) => response.json())
    .then((data) => {
      store = [...data];
      const rentals = createMarkup();    
    })
    .catch((error) => console.warn(`Error: ${error}`));

  const createMarkup = function () {
    const rentalDisplay = document.querySelector('.rentals')    
    const markup = store.map(function (rental) {
      const rating = rental.starRating.split('(')      
      const imagePath = `./img/thumbnails/${rental.thumbnail}`;
      const template = `                  
          <aside class="rental">            
            <header>
              <img
                class="thumbnail"
                src="${imagePath}"
                width="290"
                height="168"
                alt="rental accomidation"
              />
            </header>            
            <ul class="details">
                <li class="location">${rental.location}</li>
                <li class="type">${rental.rentalType}</li>
                <li class="price"><span>$${rental.dailyRate}</span> ${rental.currency}</li>
                <li class="desciption">${rental.description}</li>
                <li class="rating">
                <img src="img/icons/rating.svg" alt="star rating" width="16" height="16">
                <span>${rating[0]}</span>
                <span>(${rating[1]}</span>                
                </li>
          </ul>
        </aside>
        `
        
        rentalDisplay.insertAdjacentHTML('afterbegin', template)
    });
  };
}); // end of load listener event
