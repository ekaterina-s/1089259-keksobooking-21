'use strict';

(() => {
  const template = document.querySelector('#card').content;
  const map = document.querySelector('.map');
  const mapFiltersContainer = document.querySelector('.map__filters-container');

  const renderCard = (hotel) => {
    const cardTemplate = template.cloneNode(true);

    cardTemplate.querySelector('.popup__title').textContent = hotel.offer.title;
    cardTemplate.querySelector('.popup__text--address').textContent = hotel.offer.address;
    cardTemplate.querySelector('.popup__text--price').textContent = `${hotel.offer.price} ₽`;

    let hotelOfferTypes = {
      'flat': 'Квартира',
      'bungalow': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец'
    };
    cardTemplate.querySelector('.popup__type').textContent = hotelOfferTypes[hotel.offer.type];

    cardTemplate.querySelector('.popup__text--capacity').textContent =
    `${hotel.offer.rooms} комнаты для ${hotel.offer.guests} гостей`;

    cardTemplate.querySelector('.popup__text--time').textContent =
    `Заезд после ${hotel.offer.checkin}, выезд до ${hotel.offer.checkout}`;

    const popupFeatures = {
      'wifi': 'wi-fi',
      'dishwasher': 'dishwasher',
      'parking': 'parking',
      'washer': 'washer',
      'elevator': 'elevator',
      'conditioner': 'conditioner'
    };

    for (let i = 0; i < hotel.offer.features.length; i++) {
      const li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add(popupFeatures[hotel.offer.features[i]]);
      cardTemplate.querySelectorAll('.popup__features li')[i].textContent = popupFeatures[hotel.offer.features[i]];
    }

    cardTemplate.querySelector('.popup__description').textContent = hotel.offer.description;

    cardTemplate.querySelector('.popup__photos').innerHTML = '';
    hotel.offer.photos.map((photo) => {
      const imgClone = template.querySelector('.popup__photo').cloneNode(true);
      imgClone.src = photo;

      return cardTemplate.querySelector('.popup__photos').appendChild(imgClone);
    });

    cardTemplate.querySelector('.popup__avatar').src = hotel.author.avatar;

    return cardTemplate;
  };

  const addRenderedСard = (element) => {
    const card = renderCard(element);
    map.insertBefore(card, mapFiltersContainer);
  };

  window.card = {
    addRenderedСard
  };
})();
