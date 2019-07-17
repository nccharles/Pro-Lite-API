import moment from 'moment'
const proData = {
    usersList: [
      
      {
        id: 1,
        email: 'claver@gmail.com',
        first_name: 'Claver',
        last_name: 'NDAYISABA',
        password: '$2b$08$H.lDbqrIiB6GELxajFIYcOdWa3Boe9Z7zmOTpIG4IviafKsBMF7/.',
        phoneNumber: '0784603404',
        address: 'KG 632 ST, Kimihurura',
        isAdmin: false
      },
      {
        id: 2,
        email: 'nccharles1@gmail.com',
        first_name: 'Charles',
        last_name: 'NDAYISABA',
        password: '$2b$08$H.lDbqrIiB6GELxajFIYcOdWa3Boe9Z7zmOTpIG4IviafKsBMF7/.',
        phoneNumber: '0784603404',
        address: 'KK 15 Road, Kicukiro',
        isAdmin: true
      },
      {
        id: 3,
        email: 'axelkid@gmail.com',
        first_name: 'Axel',
        last_name: 'NDAYISABA',
        password: '$2b$08$H.lDbqrIiB6GELxajFIYcOdWa3Boe9Z7zmOTpIG4IviafKsBMF7/.',
        phoneNumber: '0784603404',
        address: 'KK 15 Road, Kicukiro',
        isAdmin: true
      }
    ],
    propertyList: [
      {
        owner: 3,
        id: 1,
        price: 145000000,
        state: 'Rwanda',
        city: 'Bugesera',
        type: 'Apartment',
        address: 'Bugesera center',
        image_url: 'https://images.io/123',
        created_on: moment.now(),
        status: 'Available'
      },
      {
        owner: 1,
        id: 2,
        price: 23000000,
        state: 'Rwanda',
        city: 'Muhanga',
        type: '2-bedroom',
        address: 'Muhanga Stadium',
        image_url: 'https://img.burner.com/2727647vcgdsgc',
        created_on: moment.now(),
        status: 'Available'
      },
      {
        owner: 2,
        id: 3,
        price: 145000000,
        state: 'Rwanda',
        city: 'Rubavu',
        type: 'Miniflat',
        address: 'KK 15 Rd,Kicukiro',
        image_url: 'https://images.io/123',
        created_on: moment.now(),
        status: 'Available'
      }
    ]
  };
  export default proData;
  