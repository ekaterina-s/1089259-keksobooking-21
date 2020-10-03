'use strict';

const GENERATED_OBJECTS_AMOUNT = 8;
const FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const PHOTOS = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];
const ACCOMODATION_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const CHECKS_IN_OUTS = ['12:00', '13:00', '14:00'];

const generatedHotels = [];
const template = document.querySelector('#pin').content;
const mapPin = template.querySelector('.map__pin img');

const mapPinWidth = mapPin.width;
const mapPinHeight = mapPin.height;

const MAP_PIN_FROM_LEFT = 200;
const MAP_PIN_FROM_TOP = 400;
const mapPinXPosition = MAP_PIN_FROM_LEFT - mapPinWidth / 2;
const mapPinYPosition = MAP_PIN_FROM_TOP - mapPinHeight;

const mapPinXFirstCoordinate = 0;
const mapPinYFirstCoordinate = 130;
const mapPinYSecondCoordinate = 630;

const generateRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateRandomArrayLength = (array) => {
  const arrayResult = [];
  const newArray = [];
  newArray.length = Math.floor(Math.random() * array.length);

  for (let i = 0; i < newArray.length; i++) {
    arrayResult.push(array[Math.floor(Math.random() * array.length)]);
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
      address: 'location.x, location.y',
      price: 100,
      type: generateRandomArrayElement(ACCOMODATION_TYPES),
      rooms: 2,
      guests: 4,
      checkin: generateRandomArrayElement(CHECKS_IN_OUTS),
      checkout: generateRandomArrayElement(CHECKS_IN_OUTS),
      features: generateRandomArrayLength(FEATURES),
      description: 'описание',
      photos: generateRandomArrayLength(PHOTOS),
    },
    location: {
      x: Math.floor(Math.random() * mapPinWidth) + mapPinXFirstCoordinate,
      y: Math.floor(Math.random() * mapPinYSecondCoordinate) + mapPinYFirstCoordinate
    }
  };
  return hotel;
};

const generateArrayOfHotels = (amount) => {
  for (let i = 0; i < amount; i++) {
    generatedHotels.push(generateObject(i));
  }
};

generateArrayOfHotels(GENERATED_OBJECTS_AMOUNT);

document.querySelector('.map').classList.remove('map--faded');

const renderDomElements = (object) => {
  const domElement = template.cloneNode(true);
  domElement.querySelector('.map__pin').style.left = `${object.location.x + mapPinXPosition}px`;
  domElement.querySelector('.map__pin').style.top = `${object.location.y + mapPinYPosition}px`;
  domElement.querySelector('.map__pin img').src = object.author.avatar;
  domElement.querySelector('.map__pin').alt = object.offer.title;

  return domElement;
};

const addRenderedPins = (array) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(renderDomElements(array[i]));
  }
  return document.querySelector('.map__pins').appendChild(fragment);
};

addRenderedPins(generatedHotels);
