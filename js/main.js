'use scrict';

const generatedhotels = [];

const generateHotels = () => {
  const hotel = {
    author: {
      avatar: `img/avatars/user02.png`,
    },
    offer: {
      title: `Объявление`,
      address: "600, 350",
      price: 100,
      type: `flat`,
      rooms: 2,
      guests: 4,
      checkin: `12:00`,
      checkout: `12:00`,
      features: ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
      description: `двухкомнатная квартира в самой сердце города`,
      photos: [
        "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
        "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
        "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
      ],
    },
    location: {
      x: Math.floor(Math.random() * 630) + 130,
      y: Math.floor(Math.random() * 630) + 130
    }
  };
  return hotel;
};

for (let i = 0; i < 8; i++) {
  generateHotels();
  generatedhotels.push(generateHotels());
}
console.log(generatedhotels);

const map = document.querySelector('.map');
map.classList.remove('map--faded');

const mapPins = document.querySelector('.map__pins');

const template = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
console.log(template);

const renderDomElements = () => {
  const domElement = template.cloneNode(true);
  domElement.querySelector('.pin--main').
  style = "left: {location.x + 570}px; top: {location.y + 375}px;";
  domElement.querySelector('.pin--main').src = "{author.avatar}";
  domElement.querySelector('.pin--main').alt = "{offer.title}";

  return domElement;

};

const fragment = document.createDocumentFragment();

const addRenderedDomElementsToTheCode = (x, y, z) => {
  for (let j = 0; j < y.length; j++) {
    x.appendChild(renderDomElements(y[j]));
  }
  z.appendChild(x);
};

addRenderedDomElementsToTheCode(fragment, generatedhotels, mapPins);

