// app/layout.js
import "./globals.css";

export const metadata = {
  title: "Bug Tracking System",
  description: "A simple bug tracking system using Next.js 13",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-blue-300 to-blue-600 min-h-screen">
        {children}
      </body>
    </html>
  );
}
