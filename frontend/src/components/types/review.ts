export interface Review {
  _id: string;
  name: string;
  description: string;
  date: string;
  rating: number;
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  _id: string;
  carId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  car: {
    _id: string;
    make: string;
    model: string;
    image: string;
  };
}
