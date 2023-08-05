import { Outlet } from "@remix-run/react";
// Bootstrap
import Container from "react-bootstrap/Container";
// Components
import Footer from "~/components/Footer";
import Navigation from "~/components/Navigation";

export const meta = () => {
  return [
    { title: "Remix App" },
    { description: "A cool App built with Remix" },
    { keywords: "remix, react, javascript, typescript" },
  ];
};

export default function Index() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <Container className="flex-shrink-0 mb-3" fluid>
        <Outlet />
      </Container>
      <footer className="mt-auto py-3 bg-light">
        <Footer />
      </footer>
    </div>
  );
}
