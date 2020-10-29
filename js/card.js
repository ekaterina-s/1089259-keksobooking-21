'use strict';

(() => {
  const template = document.querySelector('#card').content;

  const renderCards = (hotel) => {
    const cardTemplate = template.cloneNode(true);

    cardTemplate.querySelector('.popup__title').textContent = hotel.offer.title;
    cardTemplate.querySelector('.popup__text--address').textContent = hotel.offer.address;
    cardTemplate.querySelector('.popup__text--price').textContent = `${hotel.offer.price} ₽`;

    let hotelOfferType = '';
    switch (hotel.offer.type) {
      case 'flat': hotelOfferType = 'Квартира';
        break;
      case 'bungalow': hotelOfferType = 'Бунгало';
        break;
      case 'house': hotelOfferType = 'Дом';
        break;
      case 'palace': hotelOfferType = 'Дворец';
        break;
    }
    cardTemplate.querySelector('.popup__type').textContent = hotelOfferType;

    cardTemplate.querySelector('.popup__text--capacity').textContent =
    `${hotel.offer.rooms} комнаты для ${hotel.offer.guests} гостей`;

    cardTemplate.querySelector('.popup__text--time').textContent =
    `Заезд после ${hotel.offer.checkin}, выезд до ${hotel.offer.checkout}`;

    for (let i = 0; i < hotel.offer.features.length; i++) {
      cardTemplate.querySelector('.popup__features li').textContent = hotel.offer.features[i];
    }

    cardTemplate.querySelector('.popup__description').textContent = hotel.offer.description;

    for (let i = 0; i < hotel.offer.photos.length; i++) {
      const newImg = document.createElement('img');
      cardTemplate.querySelector('.popup__photos').appendChild(newImg).src = hotel.offer.photos[i];
    }

    cardTemplate.querySelector('.popup__avatar').src = hotel.author.avatar;

    return cardTemplate;
  };

  const addRenderedСards = (element) => {
    const fragmentCard = document.createDocumentFragment();
    fragmentCard.appendChild(renderCards(element));
    const renderedCards = document.querySelector('.map__pins').appendChild(fragmentCard);
    document.querySelector('.map').insertBefore(renderedCards, document.querySelector('.map__filters-container'));

    return renderedCards;
  };

  window.card = {
    addRenderedСards
  };
})();
