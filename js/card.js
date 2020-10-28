'use strict';

(() => {
  const template = document.querySelector('#card').content;

  const renderCards = (card) => {
    const cardTemplate = template.cloneNode(true);

    cardTemplate.querySelector('.popup__title').textContent = card.offer.title;
    cardTemplate.querySelector('.popup__text--address').textContent = card.offer.address;
    cardTemplate.querySelector('.popup__text--price').textContent = `${card.offer.price}₽/ночь`;

    switch (card.offer.type) {
      case 'flat':
        cardTemplate.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'bungalow':
        cardTemplate.querySelector('.popup__type').textContent = 'Бунгало';
        break;
      case 'house':
        cardTemplate.querySelector('.popup__type').textContent = 'Дом';
        break;
      case 'palace':
        cardTemplate.querySelector('.popup__type').textContent = 'Дворец';
        break;
    }
    cardTemplate.querySelector('.popup__text--capacity').textContent =
    `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
    cardTemplate.querySelector('.popup__text--time').textContent =
    `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
    cardTemplate.querySelector('.popup__features').textContent = card.offer.features;
    cardTemplate.querySelector('.popup__description').textContent = card.offer.description;
    cardTemplate.querySelector('.popup__photos').src = card.offer.photos;
    cardTemplate.querySelector('.popup__avatar').src = card.author.avatar;

    return cardTemplate;
  };

  window.card = {
    renderCards
  };
})();
