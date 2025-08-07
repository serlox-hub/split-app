import AppBar from "@/components/layout/AppBar";

export default function InnerLayout({ children }) {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
}
