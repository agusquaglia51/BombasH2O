import Provider from "./providers/provider";
import { Header } from "@ui/components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es">
      <body>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
