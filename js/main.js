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

// координаты ограничений
const mapPinXFirstCoordinate = 0;
const mapPinYFirstCoordinate = 130;
const mapPinYSecondCoordinate = 630;

// переменные для метки объявлений
const template = document.querySelector('#pin').content;
const mapPin = template.querySelector('.map__pin img');
const mapPinWidth = mapPin.width;
const mapPinHeight = mapPin.height;

//  константы для метки объявлений
const MAP_PIN_FROM_LEFT = 200;
const MAP_PIN_FROM_TOP = 400;
const mapPinXPosition = MAP_PIN_FROM_LEFT - mapPinWidth / 2;
const mapPinYPosition = MAP_PIN_FROM_TOP - mapPinHeight;

//  ищем в разметке элементы для активного/неактивного режима
// const adformHeaderDisabled = document.querySelector('.ad-form-header');
const formElements = document.querySelectorAll('.map__filters, .ad-form-header, .ad-form__element');
console.log(formElements);
// const mapFiltersForm = document.querySelector('.map__filters');

const mapPinMain = document.querySelector('.map__pin--main');
const imgMapPinMain = mapPinMain.querySelector('img');

const MAP_PIN_MAIN_FROM_LEFT = 570;
const MAP_PIN_MAIN_FROM_TOP = 375;

const imgMapPinMainWidth = imgMapPinMain.width;
const imgMapPinMainHeight = imgMapPinMain.height;

// координаты гл метки для неактива
const mapPinMainXPositionInactive = MAP_PIN_MAIN_FROM_LEFT + imgMapPinMainWidth / 2;
const mapPinMainYPositionInactive = MAP_PIN_MAIN_FROM_TOP + imgMapPinMainHeight / 2;

// координаты гл метки для актива
const mapPinMainXPositionActive = MAP_PIN_MAIN_FROM_LEFT + imgMapPinMainWidth / 2;
const mapPinMainYPositionActive = MAP_PIN_MAIN_FROM_TOP + imgMapPinMainHeight;

//  ищем поле адрес
const addressField = document.querySelector('.ad-form__element #address');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

//  генерируем какой то массив случайных элементов
const generateRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

//  генерируем какой то массив случайной длины
const generateRandomArrayLength = (array) => {
  const arrayResult = [];
  const newArray = [];
  newArray.length = Math.floor(Math.random() * array.length);

  for (let i = 0; i < newArray.length; i++) {
    arrayResult.push(array[Math.floor(Math.random() * array.length)]);
  }
  return arrayResult;
};

//  генерируем объект
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

//  пишем функцию для генерации какого то количества массивов с объектами
const generateArrayOfHotels = (amount) => {
  for (let i = 0; i < amount; i++) {
    generatedHotels.push(generateObject(i));
  }
};

//  вызываем выше объявленную функцию, чтобы сгенерировать нужное нам в задаче количество массивов
generateArrayOfHotels(GENERATED_OBJECTS_AMOUNT);

//  пишем функцию отрисовки dom элементов в клон шаблона с объектом-параметром
const renderDomElements = (object) => {
  const domElement = template.cloneNode(true);
  domElement.querySelector('.map__pin').style.left = `${object.location.x + mapPinXPosition}px`;
  domElement.querySelector('.map__pin').style.top = `${object.location.y + mapPinYPosition}px`;
  domElement.querySelector('.map__pin img').src = object.author.avatar;
  domElement.querySelector('.map__pin').alt = object.offer.title;

  return domElement;
};

//  пишем функцию добавления отрисованных элементов во фрагмент кода с параметром массивом с пом appendChild
//  в функции вызываем  функцию отрисовки dom элементов в клон шаблона с аргументом элементом массива
const addRenderedPins = (array) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(renderDomElements(array[i]));
  }
  return document.querySelector('.map__pins').appendChild(fragment);
};

const enableOrDisableForm = (element) => {
  if (element.length > 1) {
    for (let i = 0; i < element.length; i++) {
      if (element[i].hasAttribute('disabled')) {
        element[i].removeAttribute("disabled");
      } else {
        element[i].setAttribute("disabled", "true");
      }
    }
  } else {
    if (element.hasAttribute('disabled')) {
      element.removeAttribute("disabled");
    } else {
      element.setAttribute("disabled", "true");
    }
  }

  return (element);
};

enableOrDisableForm(formElements);

//  объявляем фу-ю добавления координат метки в неактивном сост в поле ввода
const fillinInputFieldInactive = (input) => {
  input.value = `${mapPinMainXPositionInactive}px, ${mapPinMainYPositionInactive}px`;

  return input;
};

fillinInputFieldInactive(addressField);
//  объявляем фу-ю добавления координат метки в активном сост в поле ввода
const fillinInputFieldActive = (input) => {
  input.value = `${mapPinMainXPositionActive}px, ${mapPinMainYPositionActive}px`;

  return input;
};

//  объявляем фу-ю вкл актив режима
const turnOnActiveMode = () => {
  document.querySelector('.map').classList.remove('map--faded');

  enableOrDisableForm(formElements);

  //  вызываем функцию добавления отрисованных элементов во фрагмент кода
  addRenderedPins(generatedHotels);
};

mapPinMain.addEventListener('mousedown', (evt) => {
  if (evt.which === 1) {
    turnOnActiveMode();
    //  вызываем фу-ю заполнения адреса в активе
    fillinInputFieldActive(addressField);
  }
});

mapPinMain.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter') {
    turnOnActiveMode();
  }
});

const setDefaultChoice = () => {
  capacity.value = "1";
  capacity[0].setAttribute("disabled", "true");
  capacity[1].setAttribute("disabled", "true");
  capacity[3].setAttribute("disabled", "true");
};

setDefaultChoice();

roomNumber.addEventListener('change', () => {
  if (roomNumber.value === "1") {
    capacity.value = "1";
    capacity[0].setAttribute("disabled", "true");
    capacity[3].setAttribute("disabled", "true");
    capacity[1].setAttribute("disabled", "true");
    capacity[2].removeAttribute("disabled", "true");
  }

  if (roomNumber.value === "2") {
    capacity.value = "2";
    capacity[0].setAttribute("disabled", "true");
    capacity[3].setAttribute("disabled", "true");
    capacity[1].removeAttribute("disabled", "true");
    capacity[2].removeAttribute("disabled", "true");
  }
  if (roomNumber.value === "3") {
    capacity.value = "3";
    capacity[3].setAttribute("disabled", "true");
    capacity[0].removeAttribute("disabled", "true");
    capacity[1].removeAttribute("disabled", "true");
    capacity[2].removeAttribute("disabled", "true");
  }
  if (roomNumber.value === "100") {
    capacity.value = "0";
    capacity[3].removeAttribute("disabled", "true");
    capacity[0].setAttribute("disabled", "true");
    capacity[1].setAttribute("disabled", "true");
    capacity[2].setAttribute("disabled", "true");
  }
});
