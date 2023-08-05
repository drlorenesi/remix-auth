import { Outlet } from "@remix-run/react";
// Bootstrap
import Container from "react-bootstrap/Container";
// Components
import Navigation from "~/components/Navigation";
import Footer from "~/components/Footer";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Dash() {
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
