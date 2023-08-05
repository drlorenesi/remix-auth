import Form from "react-bootstrap/Form";

export default function InputField({
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
        type={type}
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
