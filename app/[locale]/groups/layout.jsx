import AppBar from "@/components/layout/AppBar";

export default async function LocaleLayout({ children }) {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
}
