import "./globals.css";
import AuthProvider from "./components/Provider/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

   <html lang="en">

  <body suppressHydrationWarning>

    <AuthProvider>

      {children}

    </AuthProvider>

  </body>

</html>

  );
}