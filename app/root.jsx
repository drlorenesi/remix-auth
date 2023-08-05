import { cssBundleHref } from "@remix-run/css-bundle";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  useNavigate,
} from "@remix-run/react";
// Bootstrap
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
// Styles
import bootstrapStylesUrl from "bootstrap/dist/css/bootstrap.min.css";
import additionalStyles from "~/styles/index.css";

export const links = () => [
  ...(cssBundleHref
    ? [{ rel: "stylesheet", href: cssBundleHref }]
    : [
        { rel: "stylesheet", href: bootstrapStylesUrl },
        { rel: "stylesheet", href: additionalStyles },
      ]),
];

function Document({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {/* Added */}
        <meta name="apple-mobile-web-app-status-bar" content="#aa7700" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/img/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/img/apple-touch-icon-120x120.png"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

// ErrorBoundary (v2)
// -----------------
// Add later: <title>Unhandled Thrown Response!</title>
export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <div className="overflow-x-auto my-4 mx-4">
          <Alert variant="danger">
            <Alert.Heading>
              <samp>{error.status}</samp> - {error.statusText}
            </Alert.Heading>
            <p>{error.data}</p>
          </Alert>
          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              onClick={() => navigate("/", { replace: true })}
              className="mx-2"
            >
              Regresar a Inicio
            </Button>{" "}
            <Button
              variant="outline-primary"
              onClick={() => navigate(-1)}
              className="mx-2"
            >
              a Página Anterior
            </Button>
          </div>
        </div>
      </Document>
    );
  } else if (error instanceof Error) {
    return (
      <Document>
        <div className="overflow-x-auto my-4 mx-4">
          <Alert variant="danger">
            <Alert.Heading>Application Error</Alert.Heading>
            <pre>{error.message}</pre>
            <p>The stack trace is:</p>
            <pre>{error.stack}</pre>
          </Alert>
        </div>
      </Document>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
