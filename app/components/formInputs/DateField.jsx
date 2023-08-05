import Form from "react-bootstrap/Form";

export default function DateField({
  type,
  name,
  placeholder,
  defaultValue,
  isInvalid,
  errorMsg,
  ...props
}) {
  const date = new Date();

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    .toISOString()
    .split("T")[0];

  const formatDateISOLocal = (date) => {
    let z = date ? date.getTimezoneOffset() * 60 * 1000 : null;
    let local = new Date(date - z).toISOString().split("T")[0];
    return local;
  };

  return (
    <>
      <Form.Control
        type="date"
        name={name}
        placeholder={placeholder}
        defaultValue={
          defaultValue ? formatDateISOLocal(defaultValue) : firstDay
        }
        isInvalid={isInvalid}
        {...props}
      />
      <Form.Control.Feedback type="invalid">{errorMsg}</Form.Control.Feedback>
    </>
  );
}
