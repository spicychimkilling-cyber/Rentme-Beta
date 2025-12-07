export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string[];
  location: string;
  ownerId: string;
  ownerName: string;
  availability: boolean;
  features: string[];
}

export interface Booking {
  id: string;
  itemId: string;
  itemTitle: string;
  itemImage: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  ownerId: string;
  renterId: string;
}

export const categories = [
  { name: 'Electronics', icon: 'Laptop'},
  { name: 'Vehicles', icon: 'Car'},
  { name: 'Tools', icon: 'Wrench'},
  { name: 'Rooms', icon: 'Home'},
  { name: 'Photography', icon: 'Camera'},
  { name: 'Music', icon: 'Music'},
  { name: 'Sports', icon: 'Bike'},
  { name: 'Party', icon: 'PartyPopper'},
];

export const locations = [
  'Gelephu Town',
  'Pelrithang',
  'Surey',
  'Taklai',
  'Lhamoidzingkha',
  'Samtenling',
];

  export const mockItems: Item[] = [
    {
    id: 'room_1',
    title: 'Hotel Room',
    description: 'Spacious room with 2 triple-size beds, suitable for up to 4 people. Includes a private toilet and essential amenities. Located in the heart of Gelephu Town.',
    category: 'Rooms',
    price: 1500,
    images: [
  "/room1-1.png"
  ],
    location: 'Gelephu Town',
    ownerId: 'owner_1',
    ownerName: 'Hotel',
    availability: true,
    features: [
      'Two triple-size beds',
      'Private toilet',
      '4-person capacity',
      'WiFi',
      'TV'
    ],
  },

  {
  id: 'room_2',
  title: 'Hotel Room',
  description: 'A clean and comfortable single room with a queen-size bed suitable for up to two people. Includes attached toilet and essential amenities.',
  category: 'Rooms',
  price: 2000,
  images: ["/s1.jpg", "/toilet-1.jpg"],
  location: 'Gelephu Market Area',
  ownerId: 'owner_2',
  ownerName: 'Pema Properties',
  availability: true,
  features: [
    'Queen-size bed',
    '2 persons allowed',
    'Attached toilet',
    'WiFi',
    'Parking'
  ],
},

  {
  id: 'room_3',
  title: 'Hotel Room',
  description: 'Comfortable single room featuring a queen-size bed and a private attached toilet. Ideal for solo travelers seeking an affordable and clean stay.',
  category: 'Rooms',
  price: 800,
  images: ["/s2.jpg", "/queen.jpg"],
  location: 'Gelephu Town',
  ownerId: 'owner_3',
  ownerName: 'Karma Guest House',
  availability: true,

  features: [
    'Queen-size bed',
    'Single room',
    'Attached toilet',
    'WiFi',
    'Hot water',
    'Clean linens'
  ],
},

 {
  id: 'room_4',
  title: 'Hotel Room',
  description: 'A comfortable and spacious room suitable for up to three guests, featuring double-size beds, a TV, and an attached toilet. Perfect for small groups or families.',
  category: 'Rooms',
  price: 3500,
  images: ["/room2-1.jpg"],
  location: 'Gelephu Town',
  ownerId: 'owner_4',
  ownerName: 'Mountain View Resort',
  availability: true,
  features: [
    'Double-size beds',
    'Fits 3 people',
    'Attached toilet',
    'Television',
    'WiFi',
    'Hot water',
    'Clean linens'
  ],
},
];