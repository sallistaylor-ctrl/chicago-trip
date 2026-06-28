"use client";

import { useEffect, useState } from "react";

// Trip dates we want to highlight (YYYY-MM-DD).
const TRIP_DATES = [
  "2026-07-12",
  "2026-07-13",
  "2026-07-14",
  "2026-07-15",
  "2026-07-16",
  "2026-07-17",
];

// WMO weather code -> emoji + short label.
function describe(code) {
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

function shortDay(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

export default function Weather() {
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=41.8781&longitude=-87.6298" +
      "&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature" +
      "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
      "&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FChicago&forecast_days=16";

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const days = [];
        const dd = data.daily;
        if (dd && dd.time) {
          TRIP_DATES.forEach((date) => {
            const i = dd.time.indexOf(date);
            if (i !== -1) {
              days.push({
                date,
                code: dd.weather_code[i],
                max: Math.round(dd.temperature_2m_max[i]),
                min: Math.round(dd.temperature_2m_min[i]),
              });
            }
          });
        }
        setState({
          status: "ok",
          current: data.current,
          days,
        });
      })
      .catch(() => setState({ status: "error" }));
  }, []);

  if (state.status === "loading") {
    return (
      <div className="weather">
        <p className="weather-loading">Loading live Chicago weather…</p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="weather">
        <p className="weather-loading">
          Couldn&apos;t load live weather right now. Chicago in mid-July is
          typically warm — highs in the low-to-mid 80s°F. Try refreshing.
        </p>
      </div>
    );
  }

  const c = state.current;
  const [icon, label] = describe(c.weather_code);

  return (
    <div className="weather">
      <div className="weather-top">
        <div className="weather-now">
          <span className="weather-ico" aria-hidden>
            {icon}
          </span>
          <div>
            <div className="weather-temp">{Math.round(c.temperature_2m)}°F</div>
            <div className="weather-meta">
              <strong>{label}</strong> · feels {Math.round(c.apparent_temperature)}°
            </div>
          </div>
        </div>
        <div className="weather-meta">
          Chicago, IL right now
          <br />
          Humidity {c.relative_humidity_2m}% · Wind{" "}
          {Math.round(c.wind_speed_10m)} mph
        </div>
      </div>

      {state.days.length > 0 ? (
        <div className="weather-days">
          {state.days.map((d) => {
            const [ic] = describe(d.code);
            return (
              <div className="wday" key={d.date}>
                <div className="d">{shortDay(d.date)}</div>
                <div className="i" aria-hidden>
                  {ic}
                </div>
                <div className="t">
                  {d.max}°<span> / {d.min}°</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="weather-days" style={{ gridTemplateColumns: "1fr" }}>
          <p className="weather-loading" style={{ margin: 0 }}>
            The day-by-day forecast for July 12–17 will appear here automatically
            as the trip gets closer (about two weeks out).
          </p>
        </div>
      )}
    </div>
  );
}
