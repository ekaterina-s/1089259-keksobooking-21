'use strict';

(() => {
  const template = document.querySelector('#card').content;
  let card;

  const remove = (evt) => {
    if (card !== undefined) {
      let mapPinActive = document.querySelector('.map__pin--active');
      if (evt) {
        evt.target.removeEventListener('click', remove);
      } else {
        card.querySelector('.popup__close').removeEventListener('click', remove);
      }
      if (mapPinActive !== null) {
        mapPinActive.classList.remove('map__pin--active');
      }
      card.remove();
    }
  };

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
    card = template.children[0].cloneNode(true);
    const popupFeatures = card.querySelector('.popup__features');
    const popupPhotos = card.querySelector('.popup__photos');

    card.querySelector('.popup__title').textContent = hotel.offer.title;
    card.querySelector('.popup__text--address').textContent = hotel.offer.address;
    card.querySelector('.popup__text--price').textContent = `${hotel.offer.price} ₽/ночь`;

    card.querySelector('.popup__type').textContent = hotelOfferTypes[hotel.offer.type];

    card.querySelector('.popup__text--capacity').textContent =
    `${hotel.offer.rooms} комнаты для ${hotel.offer.guests} гостей`;

    card.querySelector('.popup__text--time').textContent =
    `Заезд после ${hotel.offer.checkin}, выезд до ${hotel.offer.checkout}`;

    popupFeatures.innerHTML = '';
    hotel.offer.features.map((feature) => {
      const li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add(featuresClasses[feature]);
      li.textContent = feature;
      return popupFeatures.appendChild(li);
    });

    card.querySelector('.popup__description').textContent = hotel.offer.description;

    popupPhotos.innerHTML = '';
    hotel.offer.photos.map((photo) => {
      const imgClone = template.querySelector('.popup__photo').cloneNode(true);
      imgClone.src = photo;

      return popupPhotos.appendChild(imgClone);
    });

    card.querySelector('.popup__avatar').src = hotel.author.avatar;

    card.querySelector('.popup__close').addEventListener('click', remove);

    const escape = document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        remove();
      }
    });

    document.removeEventListener('keydown', escape);

    return card;
  };

  const add = (element) => {
    renderCard(element);
    map.insertBefore(card, mapFiltersContainer);
  };

  window.card = {
    add,
    remove
  };
})();
