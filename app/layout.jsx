import "./globals.css";

export const metadata = {
  title: "SplitApp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <header className="bg-white shadow p-4">
          <h1 className="text-xl font-semibold">SplitApp</h1>
        </header>
        <main className="flex-1 container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
