import Form from "react-bootstrap/Form";

export default function TextareaField({
  type,
  name,
  placeholder,
  defaultValue,
  isInvalid,
  errorMsg,
  ...props
}) {
  return (
    <>
      <Form.Control
        as="textarea"
        rows={3}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        isInvalid={isInvalid}
        {...props}
      />
      <Form.Control.Feedback type="invalid">{errorMsg}</Form.Control.Feedback>
    </>
  );
}
