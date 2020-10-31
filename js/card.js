'use strict';

(() => {
  const template = document.querySelector('#card').content;
  const map = document.querySelector('.map');
  const mapFiltersContainer = document.querySelector('.map__filters-container');

  const renderCards = (hotel) => {
    const cardTemplate = template.children[0].cloneNode(true);

    cardTemplate.querySelector('.popup__title').textContent = hotel.offer.title;
    cardTemplate.querySelector('.popup__text--address').textContent = hotel.offer.address;
    cardTemplate.querySelector('.popup__text--price').textContent = `${hotel.offer.price} ₽`;

    // let hotelOfferType = '';
    let hotelOfferType = {
      'flat': 'Квартира',
      'bungalow': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец'
    };

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
    cardTemplate.querySelector('.popup__type').textContent = hotelOfferType.value;

    cardTemplate.querySelector('.popup__text--capacity').textContent =
    `${hotel.offer.rooms} комнаты для ${hotel.offer.guests} гостей`;

    cardTemplate.querySelector('.popup__text--time').textContent =
    `Заезд после ${hotel.offer.checkin}, выезд до ${hotel.offer.checkout}`;

    cardTemplate.querySelector('.popup__features li').textContent = hotel.offer.features.map((index) => {
      return index;
    });

    cardTemplate.querySelector('.popup__description').textContent = hotel.offer.description;

    const imgFragment = document.createDocumentFragment();
    for (let i = 0; i < hotel.offer.photos.length; i++) {
      const imgClone = template.querySelector('.popup__photo').cloneNode(true);
      console.log(imgClone);
      imgClone.src = hotel.offer.photos[i];
      imgFragment.appendChild(imgClone);
    }
    console.dir(imgFragment);
    template.querySelector('.popup__photos').innerHTML = '';
    template.querySelector('.popup__photos').appendChild(imgFragment);

    cardTemplate.querySelector('.popup__avatar').src = hotel.author.avatar;

    return cardTemplate;
  };

  const addRenderedСards = (element) => {
    const card = renderCards(element);
    console.dir(document.querySelector('.map__filters-container'));
    document.querySelector('.map').insertBefore(card, document.querySelector('.map__filters-container'));
  };

  window.card = {
    addRenderedСards
  };
})();
