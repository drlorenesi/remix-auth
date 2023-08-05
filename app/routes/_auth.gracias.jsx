import { Link } from "@remix-run/react";
import Button from "react-bootstrap/Button";

export default function Gracias() {
  return (
    <>
      <div className="login-form">
        <h2 className="text-center p-2">!Gracias por Registrarte 👍!</h2>
        <p className="text-center">
          Tu usuario ha sido creado. Ahora podrás acceder al sistema la próxima
          vez que intentes.
        </p>
        <Link to="/login">
          <div className="d-grid">
            <Button variant="primary">Regresar</Button>
          </div>
        </Link>
      </div>
    </>
  );
}
