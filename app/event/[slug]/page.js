import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "../../lib/data";
import { mapsUrl } from "../../lib/util";

export function generateStaticParams() {
  return Object.keys(events).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const ev = events[params.slug];
  if (!ev) return { title: "Not found" };
  return {
    title: `${ev.title} · Chicago 2026`,
    description: ev.short,
  };
}

export default function EventPage({ params }) {
  const ev = events[params.slug];
  if (!ev) notFound();

  return (
    <main className="wrap" style={{ maxWidth: 720 }}>
      <Link className="back" href="/#itinerary">
        ‹ Back to itinerary
      </Link>

      <div className="detail-head">
        <span className="detail-ico" aria-hidden>
          {ev.emoji}
        </span>
        <div>
          <h1>{ev.title}</h1>
          <div className="detail-venue">{ev.venue}</div>
        </div>
      </div>

      <div className="detail-tags">
        <span className="tag">{ev.category}</span>
        <span className="tag">{ev.time}</span>
        <span className="tag">{ev.price}</span>
      </div>

      <div className="detail-body">
        <p className="lead">{ev.long}</p>

        {ev.address && (
          <div className="meta-row">
            <span className="k">Where</span>
            <span className="v">{ev.address}</span>
          </div>
        )}
        <div className="meta-row">
          <span className="k">When</span>
          <span className="v">{ev.time}</span>
        </div>
        <div className="meta-row">
          <span className="k">Cost</span>
          <span className="v">{ev.price}</span>
        </div>

        {ev.tips && ev.tips.length > 0 && (
          <div className="tips">
            <h4>Good to know</h4>
            <ul>
              {ev.tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="btn-row">
          {ev.ticket && (
            <a
              className="btn primary"
              href={ev.ticket}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tickets / Book
            </a>
          )}
          {ev.website && (
            <a
              className="btn"
              href={ev.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website ↗
            </a>
          )}
          {ev.mapQuery && (
            <a
              className="btn"
              href={mapsUrl(ev.mapQuery)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Maps
            </a>
          )}
        </div>
      </div>

      <footer className="footer">
        <Link href="/" className="link-out">
          ‹ Back to the full trip guide
        </Link>
      </footer>
    </main>
  );
}
