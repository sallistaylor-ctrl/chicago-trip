import "./globals.css";

export const metadata = {
  title: "Chicago 2026 · Family Visit",
  description:
    "Our go-to guide for the Chicago family trip, July 12–17 — itinerary, weather, things to do, and places to eat.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1b3a5b",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
