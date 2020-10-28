'use strict';

(() => {
  const MAX_PINS_ON_MAP_AMOUNT = 5;
  const mapPin = document.getElementsByClassName('map__pin');

  const filterHotels = (type, hotels) => {
    const fragmentPin = document.createDocumentFragment();
    const fragmentCard = document.createDocumentFragment();

    while (mapPin[0]) {
      mapPin[0].parentNode.removeChild(mapPin[0]);
    }

    const filteredHotels = hotels.filter((hotel) => {
      if (type === 'any') {
        return hotel;
      }
      return hotel.offer.type === type;
    });

    for (let i = 0; i < MAX_PINS_ON_MAP_AMOUNT & i < filteredHotels.length; i++) {
      fragmentPin.appendChild(window.pin.renderPins(filteredHotels[i]));
      fragmentCard.appendChild(window.card.renderCards(filteredHotels[i]));
    }

    const renderedPins = document.querySelector('.map__pins').appendChild(fragmentPin);
    const renderedCards = document.querySelector('.map__pins').appendChild(fragmentCard);

    document.querySelector('.map').insertBefore(renderedCards, document.querySelector('.map__filters-container'));

    return {
      renderedPins: renderedPins,
      renderedCards: renderedCards
    };
  };

  window.filter = {
    filterHotels
  };
})();
