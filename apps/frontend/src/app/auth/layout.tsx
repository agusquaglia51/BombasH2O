import Provider from "../providers/provider";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Provider>
          <div
            style={{
              display: "flex",
              minHeight: "100vh",
              alignItems: "center",
              justifyContent: "center",
              background: "#e0f7fa",
            }}
          >
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
