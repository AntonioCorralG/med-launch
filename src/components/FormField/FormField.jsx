import "./FormField.css";

function FormField({ label, required, error, children, htmlFor }) {
  return (
    <div className="form-field">
      {label && (
        <label className="form-field__label" htmlFor={htmlFor}>
          {label} {required && <span className="form-field__required">*</span>}
        </label>
      )}
      {children}
      {error && (
        <div className="form-field__error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default FormField;
