// Shared Chicago weather loader. Fetches once and caches, so the main
// weather panel and each day's badge all share a single API call.

const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=41.8781&longitude=-87.6298" +
  "&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature" +
  "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
  "&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FChicago&forecast_days=16";

let _promise = null;

// Returns a Promise of { current, byDate } where byDate maps "YYYY-MM-DD"
// to { code, max, min }. Cached for the life of the page.
export function loadForecast() {
  if (_promise) return _promise;
  _promise = fetch(API_URL)
    .then((r) => r.json())
    .then((data) => {
      const byDate = {};
      const dd = data.daily;
      if (dd && dd.time) {
        dd.time.forEach((date, i) => {
          byDate[date] = {
            code: dd.weather_code[i],
            max: Math.round(dd.temperature_2m_max[i]),
            min: Math.round(dd.temperature_2m_min[i]),
          };
        });
      }
      return { current: data.current, byDate };
    });
  return _promise;
}

// WMO weather code -> [emoji, label]
export function describe(code) {
  if (code === 0) return ["☀️", "Clear"];
  if (code === 1) return ["🌤️", "Mostly sunny"];
  if (code === 2) return ["⛅", "Partly cloudy"];
  if (code === 3) return ["☁️", "Cloudy"];
  if (code === 45 || code === 48) return ["🌫️", "Fog"];
  if (code >= 51 && code <= 57) return ["🌦️", "Drizzle"];
  if (code >= 61 && code <= 67) return ["🌧️", "Rain"];
  if (code >= 71 && code <= 77) return ["🌨️", "Snow"];
  if (code >= 80 && code <= 82) return ["🌧️", "Showers"];
  if (code >= 95) return ["⛈️", "Storms"];
  return ["🌡️", "—"];
}
