
import axios from 'axios';
import moment from 'jalali-moment';
import i18n from '../i18n';


const getLang = (): 'fa' | 'en' => {
  return i18n.language === 'fa' ? 'fa' : 'en';
};


type City = { en: string; fa: string; lat: number; lng: number };

const CITIES: City[] = [
  { en: "Tehran", fa: "تهران", lat: 35.6892, lng: 51.389 },
  { en: "London", fa: "لندن", lat: 51.5074, lng: -0.1278 },
  { en: "New York", fa: "نیویورک", lat: 40.7128, lng: -74.006 },
  { en: "Tokyo", fa: "توکیو", lat: 35.6895, lng: 139.6917 },
  { en: "Sydney", fa: "سیدنی", lat: -33.8688, lng: 151.2093 },
  { en: "Dubai", fa: "دوبی", lat: 25.276987, lng: 55.296249 },
  { en: "Paris", fa: "پاریس", lat: 48.8566, lng: 2.3522 },
  { en: "Berlin", fa: "برلین", lat: 52.52, lng: 13.405 },
  { en: "Moscow", fa: "مسکو", lat: 55.7558, lng: 37.6173 },
  { en: "Rio de Janeiro", fa: "ریو دو ژانیرو", lat: -22.9068, lng: -43.1729 },
  { en: "Toronto", fa: "تورنتو", lat: 43.65107, lng: -79.347015 },
  { en: "Bangkok", fa: "بانکوک", lat: 13.7563, lng: 100.5018 },
  { en: "Copenhagen", fa: "کپنهاگ", lat: 55.6761, lng: 12.5683 },
  { en: "Madrid", fa: "مادرید", lat: 40.4168, lng: -3.7038 },
  { en: "Kuala Lumpur", fa: "کوالالامپور", lat: 3.139, lng: 101.6869 },
];


export interface MonthlyTempData {
  month: string;
  monthEn: string;
  temp: number;
}

export interface CurrentWeather {

  cityFa: string;
  date: string;
  time: string;
  dayOfWeek: string;


  cityEn: string;
  dateEn: string;
  timeEn: string;
  dayOfWeekEn: string;

  temp: number;
  feelsLike: number;
  minTemp: number;
  maxTemp: number;
  precipitation: number;
  precipProbability: number;
}

export interface DailyForecast {
  dayOfWeek: string;
  dayOfWeekEn: string;
  temp: number;
  isRainy: boolean;
  precipProbability: number;
}


const formatDate = (isoDate: string, lang: 'fa' | 'en'): string => {
  if (lang === 'fa') {
    return moment(isoDate).locale('fa').format('YYYY/MM/DD');
  }
  return isoDate;
};

const formatDayOfWeek = (isoDate: string, lang: 'fa' | 'en'): string => {
  const m = moment(isoDate);
  if (lang === 'fa') {
    m.locale('fa');
    const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    return days[m.day()];
  }
  return m.locale('en').format('dddd');
};


const getDateEn = (isoDate: string): string => isoDate;
const getTimeEn = (): string => {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
const getDayOfWeekEn = (isoDate: string): string => {
  return moment(isoDate).locale('en').format('dddd');
};
const getShortDayEn = (isoDate: string): string => {
  if (isToday(isoDate)) {
    return 'Today';
  }
  return moment(isoDate).locale('en').format('ddd');
};


const isToday = (isoDate: string): boolean => {
  const today = new Date().toISOString().split('T')[0];
  return isoDate === today;
};


const formatShortDay = (isoDate: string, lang: 'fa' | 'en'): string => {
  if (isToday(isoDate)) {
    return 'امروز';
  }

  const m = moment(isoDate);
  if (lang === 'fa') {
    m.locale('fa');
    const short = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    return short[m.day()];
  }
  return m.locale('en').format('ddd');
};


export const getWeatherData = async (cityInput: string): Promise<{
  current: CurrentWeather;
  forecast: DailyForecast[];
}> => {
  const lang = getLang();


  const city = CITIES.find(c => c.fa === cityInput || c.en === cityInput);
  if (!city) throw new Error('شهر یافت نشد');


  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}` +
    `&current=temperature_2m,apparent_temperature,precipitation,precipitation_probability` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
    `&timezone=Asia/Tehran&forecast_days=14`;

  const { data } = await axios.get(url);

  const today = data.daily.time[0];
  const currentTemp = Math.round(data.current.temperature_2m);


  const faTime = new Date().toLocaleTimeString('fa-IR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const current: CurrentWeather = {
    cityFa: city.fa,
    date: formatDate(today, lang),
    time: lang === 'fa' ? faTime : getTimeEn(),
    dayOfWeek: formatDayOfWeek(today, lang),

    cityEn: city.en,
    dateEn: getDateEn(today),
    timeEn: getTimeEn(),
    dayOfWeekEn: getDayOfWeekEn(today),

    temp: currentTemp,
    feelsLike: Math.round(data.current.apparent_temperature),
    minTemp: Math.round(data.daily.temperature_2m_min[0]),
    maxTemp: Math.round(data.daily.temperature_2m_max[0]),
    precipitation: data.current.precipitation,
    precipProbability: data.current.precipitation_probability ?? 0,
  };


  const forecast: DailyForecast[] = data.daily.time.map((date: string, i: number) => {
    const isToday = i === 0;
    const min = Math.round(data.daily.temperature_2m_min[i]);
    const max = Math.round(data.daily.temperature_2m_max[i]);

    return {
      dayOfWeek: formatShortDay(date, lang),
      dayOfWeekEn: getShortDayEn(date),
      temp: isToday ? currentTemp : Math.round((min + max) / 2),
      isRainy: (data.daily.precipitation_probability_max[i] ?? 0) > 30,
      precipProbability: data.daily.precipitation_probability_max[i] ?? 0,
    };
  });

  return { current, forecast };
};


export const getMonthlyTemperatureData = async (
  cityInput: string,
): Promise<MonthlyTempData[]> => {
  const city = CITIES.find(c => c.fa === cityInput || c.en === cityInput);
  if (!city) throw new Error('شهر یافت نشد');

  const startDate = `${2024}-01-01`;
  const endDate = `${2024}-12-31`;

  const url = `https://archive-api.open-meteo.com/v1/archive?` +
    `latitude=${city.lat}&longitude=${city.lng}` +
    `&start_date=${startDate}&end_date=${endDate}` +
    `&daily=temperature_2m_mean&timezone=Asia/Tehran`;

  const { data } = await axios.get(url);

  if (!data.daily?.time || !data.daily?.temperature_2m_mean) {
    throw new Error('داده‌های دما در دسترس نیست');
  }

  
  const monthly: { [key: string]: number[] } = {};

  data.daily.time.forEach((date: string, i: number) => {
    const monthKey = date.split('-')[1]; // "01", "02", ...
    if (!monthly[monthKey]) monthly[monthKey] = [];
    monthly[monthKey].push(data.daily.temperature_2m_mean[i]);
  });

  const persianMonthOrder = [
    '04', '05', '06', '07', '08', '09',
    '10', '11', '12', '01', '02', '03'
  ];

  const result: MonthlyTempData[] = [];

  persianMonthOrder.forEach((monthKey) => {
    const temps = monthly[monthKey] || [];
    if (temps.length === 0) return;

    const avg = temps.reduce((a, b) => a + b, 0) / temps.length;

    
    const gregorianDate = `${2024}-${monthKey}-01`;
    const fa = moment(gregorianDate).locale('fa').format('MMM');
    const en = moment(gregorianDate).locale('en').format('MMM');

    result.push({
      month: fa,
      monthEn: en,
      temp: Math.round(avg),
    });
  });

  return result;
};