import Link from "next/link";
import Weather from "./components/Weather";
import { TRIP, days, events, ideas, dining } from "./lib/data";
import { mapsUrl } from "./lib/util";

function Skyline() {
  // Simple decorative skyline silhouette for the hero.
  return (
    <svg
      className="hero-skyline"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        fill="#0f2740"
        d="M0,120 L0,78 L40,78 L40,60 L70,60 L70,82 L110,82 L110,40 L120,30 L130,40 L130,84 L175,84 L175,66 L210,66 L210,86 L250,86 L250,50 L262,50 L262,38 L274,50 L274,88 L320,88 L320,72 L355,72 L355,30 L365,30 L365,18 L375,30 L375,90 L430,90 L430,64 L470,64 L470,84 L505,84 L505,54 L545,54 L545,86 L590,86 L590,70 L600,70 L600,44 L612,44 L612,70 L640,70 L640,90 L690,90 L690,60 L700,52 L710,60 L710,92 L760,92 L760,74 L795,74 L795,48 L835,48 L835,88 L880,88 L880,66 L915,66 L915,36 L925,36 L925,24 L935,36 L935,90 L985,90 L985,70 L1020,70 L1020,52 L1060,52 L1060,86 L1105,86 L1105,62 L1140,62 L1140,82 L1180,82 L1180,46 L1192,46 L1192,34 L1204,46 L1204,84 L1250,84 L1250,68 L1290,68 L1290,40 L1300,40 L1300,28 L1310,40 L1310,88 L1360,88 L1360,72 L1400,72 L1400,60 L1440,60 L1440,120 Z"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <header className="hero">
        <div className="hero-inner">
          <p className="eyebrow">Our Family Trip</p>
          <h1>{TRIP.title}</h1>
          <p className="dates">{TRIP.subtitle}</p>
          <p className="intro">{TRIP.intro}</p>
        </div>
        <Skyline />
      </header>

      <nav className="nav">
        <div className="nav-inner">
          <a className="chip" href="#weather">
            Weather
          </a>
          <a className="chip" href="#itinerary">
            Itinerary
          </a>
          <a className="chip" href="#ideas">
            More Ideas
          </a>
          <a className="chip" href="#dining">
            Dinner & Dining
          </a>
        </div>
      </nav>

      <main className="wrap">
        {/* Weather */}
        <section id="weather">
          <div className="section-head">
            <div>
              <h2>Weather</h2>
              <p>Live conditions and the forecast for our dates.</p>
            </div>
          </div>
          <Weather />
        </section>

        {/* Itinerary */}
        <section id="itinerary">
          <div className="section-head">
            <div>
              <h2>The Plan</h2>
              <p>Tap any item for details, maps, tickets, and links.</p>
            </div>
          </div>

          {days.map((day) => (
            <div className="day" key={day.date}>
              <div className="day-head">
                <div className="day-date">
                  <span className="day-weekday">{day.weekday}</span>
                  <span className="day-label">{day.label}</span>
                </div>
                <p className="day-title">{day.title}</p>
                <div className="day-tags">
                  <span className="tag">{day.group}</span>
                </div>
                {day.note && <p className="day-note">{day.note}</p>}
              </div>

              <div className="day-events">
                {day.eventSlugs.map((slug) => {
                  const ev = events[slug];
                  return (
                    <Link className="ev" href={`/event/${slug}`} key={slug}>
                      <span className="ev-ico" aria-hidden>
                        {ev.emoji}
                      </span>
                      <span className="ev-body">
                        <span className="ev-title">{ev.title}</span>
                        <span className="ev-sub">{ev.venue}</span>
                      </span>
                      <span className="ev-time">{ev.time}</span>
                      <span className="ev-arrow" aria-hidden>
                        ›
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Ideas */}
        <section id="ideas">
          <div className="section-head">
            <div>
              <h2>More Ideas</h2>
              <p>
                First-timer favorites picked for easy walking, lots of seating,
                and mostly flat or indoor.
              </p>
            </div>
          </div>
          <div className="grid">
            {ideas.map((it) => (
              <a
                className="card"
                key={it.title}
                href={it.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="card-emoji" aria-hidden>
                  {it.emoji}
                </span>
                <h3>{it.title}</h3>
                <p>{it.blurb}</p>
                <div className="card-foot">
                  <span className="pill">{it.why}</span>
                  <span className="link-out">Visit site ↗</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Dining */}
        <section id="dining">
          <div className="section-head">
            <div>
              <h2>Dinner & Dining</h2>
              <p>
                Affordable spots that can usually seat 6–7 on shorter notice.
                Call ahead for the big-group nights.
              </p>
            </div>
          </div>
          <div className="grid">
            {dining.map((d) => (
              <div className="card" key={d.title}>
                <span className="card-emoji" aria-hidden>
                  {d.emoji}
                </span>
                <div className="where">
                  {d.area} · {d.cuisine}
                </div>
                <h3>{d.title}</h3>
                <p>{d.blurb}</p>
                <div className="card-foot">
                  <span className="pill">{d.price}</span>
                  <span>
                    <a
                      className="link-out"
                      href={mapsUrl(d.mapQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Map
                    </a>
                    {"  "}
                    <a
                      className="link-out"
                      href={d.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Site ↗
                    </a>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="footer">
          Made with love for the Chicago crew · July 12–17, 2026
          <br />
          Weather data by Open-Meteo · Tap any plan item for full details.
        </footer>
      </main>
    </>
  );
}
