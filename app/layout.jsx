import "./globals.css";

export const metadata = {
  title: "Op het gezicht geschreven?",
  description: "Project voor gebruik op een Holobox",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
