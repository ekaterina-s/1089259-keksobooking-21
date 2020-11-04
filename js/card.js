'use strict';

(() => {
  const template = document.querySelector('#card').content;

  const map = document.querySelector('.map');
  const mapFiltersContainer = document.querySelector('.map__filters-container');
  const hotelOfferTypes = {
    'flat': 'Квартира',
    'bungalow': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  const featuresClasses = {
    'wifi': 'popup__feature--wifi',
    'dishwasher': 'popup__feature--dishwasher',
    'parking': 'popup__feature--parking',
    'washer': 'popup__feature--washer',
    'elevator': 'popup__feature--elevator',
    'conditioner': 'popup__feature--conditioner'
  };

  const renderCard = (hotel) => {
    const cardTemplate = template.cloneNode(true);
    const popupFeatures = cardTemplate.querySelector('.popup__features');
    const popupPhotos = cardTemplate.querySelector('.popup__photos');

    cardTemplate.querySelector('.popup__title').textContent = hotel.offer.title;
    cardTemplate.querySelector('.popup__text--address').textContent = hotel.offer.address;
    cardTemplate.querySelector('.popup__text--price').textContent = `${hotel.offer.price} ₽/ночь`;

    cardTemplate.querySelector('.popup__type').textContent = hotelOfferTypes[hotel.offer.type];

    cardTemplate.querySelector('.popup__text--capacity').textContent =
    `${hotel.offer.rooms} комнаты для ${hotel.offer.guests} гостей`;

    cardTemplate.querySelector('.popup__text--time').textContent =
    `Заезд после ${hotel.offer.checkin}, выезд до ${hotel.offer.checkout}`;

    popupFeatures.innerHTML = '';
    hotel.offer.features.map((feature) => {
      const li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add(featuresClasses[feature]);
      li.textContent = feature;
      return popupFeatures.appendChild(li);
    });

    cardTemplate.querySelector('.popup__description').textContent = hotel.offer.description;

    popupPhotos.innerHTML = '';
    hotel.offer.photos.map((photo) => {
      const imgClone = template.querySelector('.popup__photo').cloneNode(true);
      imgClone.src = photo;

      return popupPhotos.appendChild(imgClone);
    });

    cardTemplate.querySelector('.popup__avatar').src = hotel.author.avatar;

    const popupClose = cardTemplate.querySelector('.popup__close');

    popupClose.addEventListener('click', () => {
    });

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

