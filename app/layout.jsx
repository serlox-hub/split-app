import { Provider } from "@/components/ui/provider";

export default function RootLayout(props) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
