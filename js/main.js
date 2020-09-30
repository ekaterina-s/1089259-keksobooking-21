'use strict';

const generatedHotels = [];
const generatedObjectsAmount = 8;
const features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const photos = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];
const accomodationTypes = ['palace', 'flat', 'house', 'bungalow'];
const checkInOuts = ['12:00', '13:00', '14:00'];

const mapFaded = document.querySelector('.map').classList.remove('map--faded');
const mapPins = document.querySelector('.map__pins');
const template = document.querySelector('#pin').content;
const mapPin = template.querySelector('.map__pin img');
const fragment = document.createDocumentFragment();

const MAP_PIN_WIDTH = mapPin.width;
const MAP_PIN_HEIGHT = mapPin.height;

const MAP_PIN_FROM_LEFT = 200;
const MAP_PIN_FROM_TOP = 400;
const mapPinXPosittion = MAP_PIN_FROM_LEFT - MAP_PIN_WIDTH / 2;
const mapPinYPosittion = MAP_PIN_FROM_TOP - MAP_PIN_HEIGHT;

const generateRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateRandomArrayLength = (array) => {
  const arrayResult = [];
  const l = [];
  l.length = Math.floor(Math.random() * array.length) + 0;

  for (let i = 0; i < l.length; i++) {
    arrayResult.push(array[Math.floor(Math.random() * array.length) + 0]);
  }
  return arrayResult;
};

const generateObject = (index) => {
  const hotel = {
    author: {
      avatar: `img/avatars/user0${index + 1}.png`,
    },
    offer: {
      title: 'Объявление',
      address: {
        x: Math.floor(Math.random() * MAP_PIN_WIDTH) + 0,
        y: Math.floor(Math.random() * 630) + 130
      },
      price: 100,
      type: generateRandomArrayElement(accomodationTypes),
      rooms: 2,
      guests: 4,
      checkin: generateRandomArrayElement(checkInOuts),
      checkout: generateRandomArrayElement(checkInOuts),
      features: generateRandomArrayLength(features),
      description: 'описание',
      photos: generateRandomArrayLength(photos),
    },
    location: {
      x: Math.floor(Math.random() * MAP_PIN_WIDTH) + 0,
      y: Math.floor(Math.random() * 630) + 130
    }
  };
  return hotel;
};

const generateArrayOfHotels = () => {
  for (let i = 0; i < generatedObjectsAmount; i++) {
    generatedHotels.push(generateObject(i));
  }
};

generateArrayOfHotels();

const renderDomElements = (object) => {
  const domElement = template.cloneNode(true);
  domElement.querySelector('.map__pin').style.left = object.location.x + mapPinXPosittion + 'px';
  domElement.querySelector('.map__pin').style.top = object.location.y + mapPinYPosittion + 'px';
  domElement.querySelector('.map__pin').src = object.avatar;
  domElement.querySelector('.map__pin').alt = object.offer.title;

  return domElement;
};

const addRenderedDomElementsToTheCode = (createdFragment, array, space) => {
  for (let i = 0; i < array.length; i++) {
    createdFragment.appendChild(renderDomElements(array[i]));
  }
  space.appendChild(createdFragment);
};

addRenderedDomElementsToTheCode(fragment, generatedHotels, mapPins);
