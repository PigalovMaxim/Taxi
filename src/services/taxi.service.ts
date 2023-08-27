import { Taxi } from "../redux/slices/taxiSlice";

type AvailableCrewAnswer = {
  code: number;
  descr: string;
  data: { crews_info: Taxi[] };
};

type OrderAnswer = {
  code: number;
  descr: string;
  data: {
    order_id: number;
  };
};

const DRIVER_NAMES = ['Петров', 'Антонов', 'Какойнибудь', 'Зачтомнеэто', 'Ещёфамилия', 'Бобов'];
const CAR_MARKS = ['Toyota', 'Ford', 'Chevrolet', 'Honda', 'Nissan', 'Jeep', 'BMW', 'Mercedes-Benz'];
const CAR_MODELS = ["Camry", "Mustang", "Corvette", "Civic", "Altima", "Wrangler", "X5", "S-Class", "A4", "Elantra"];
const CAR_COLORS = ['Синий', 'Красный', 'Чёрный', 'Белый', 'Серый', 'Радужный'];

const generateRandomKey = () => {
  let key = "";
  const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * possibleChars.length);
    key += possibleChars.charAt(randomIndex);
  }
  return key;
}

const getRandomValueInArray = (arr: string[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Спасибо ChatGPT
const generateRandomPoint = (lat: number, lon: number) => {
  const R = 6371000; // радиус Земли в метрах
  const d = Math.random() * 900 + 100; // случайное расстояние от 100 до 1000 м
  const theta = Math.random() * Math.PI * 2; // случайный угол от 0 до 2π
  const lat1 = lat * Math.PI / 180; // переводим широту в радианы
  const lon1 = lon * Math.PI / 180; // переводим долготу в радианы
  const lat2 = Math.asin(Math.sin(lat1)*Math.cos(d/R) + Math.cos(lat1)*Math.sin(d/R)*Math.cos(theta));
  const lon2 = lon1 + Math.atan2(Math.sin(theta)*Math.sin(d/R)*Math.cos(lat1), Math.cos(d/R)-Math.sin(lat1)*Math.sin(lat2));
  return {
    lat: lat2 * 180 / Math.PI, // переводим широту обратно в градусы
    lon: lon2 * 180 / Math.PI // переводим долготу обратно в градусы
  };
}

export const findAvailableCrew = async (_lat: number, _lon: number): Promise<AvailableCrewAnswer> => {
  const crew: Taxi[] = [];

  for (let i = 0; i < Math.round(Math.random() * 8 + 2); i++) {
    const { lat, lon } = generateRandomPoint(_lat, _lon);
    crew.push({
      crew_id: Math.round(Math.random() * 10000 + 10),
      car_mark: getRandomValueInArray(CAR_MARKS),
      car_model: getRandomValueInArray(CAR_MODELS),
      car_color: getRandomValueInArray(CAR_COLORS),
      car_number: generateRandomKey(),
      driver_name: getRandomValueInArray(DRIVER_NAMES),
      driver_phone: "7788",
      lat,
      lon,
      distance: Math.round(Math.random() * 1000 + 100),
    });
  }

  await new Promise((res) => {
    setTimeout(() => res(true), 1500);
  });

  return {
    code: 0,
    descr: "OK",
    data: {
      crews_info: crew,
    },
  };
};

export const orderCar = async (
  addressName: string,
  coords: [number, number],
  time: string,
  id: number
): Promise<OrderAnswer> => {
  await new Promise((res) => {
    setTimeout(() => res(true), 1500);
  });

  return {
    code: 0,
    descr: 'OK',
    data: {
      order_id: 123456
    }
  }
};
