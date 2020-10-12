'use strict';

(function () {
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
  const mapPinXSecondCoordinate = 960;
  const mapPinYFirstCoordinate = 130;
  const mapPinYSecondCoordinate = 630;

  // переменные для метки объявлений
  const template = document.querySelector('#pin').content;

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

  const generateRandomCoordinate = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
        x: generateRandomCoordinate(mapPinXFirstCoordinate, mapPinXSecondCoordinate),
        y: generateRandomCoordinate(mapPinYFirstCoordinate, mapPinYSecondCoordinate)
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

  const renderDomElements = (object) => {
    const domElement = template.cloneNode(true);
    domElement.querySelector('.map__pin').style.left = `${object.location.x}px`;
    domElement.querySelector('.map__pin').style.top = `${object.location.y}px`;
    domElement.querySelector('.map__pin img').src = object.author.avatar;
    domElement.querySelector('.map__pin').alt = object.offer.title;

    return domElement;
  };

  window.data = {
    generateArrayOfHotels: generateArrayOfHotels,
    generatedHotels: generatedHotels,
    renderDomElements: renderDomElements,
  };

})();
