// utils
import { useState } from "react";

// components
import { FiAlertCircle } from "react-icons/fi";

// styles
import styles from "./FormInputElement.module.css";

function FormInputElement(props) {
  const [isFocused, setIsFocused] = useState(false);
  const { label, errorMessage, id, type, required, onChange, options, ...inputProps } = props;

  function handleFocus() {
    setIsFocused(true);
  }

  let inputElement;

  switch (type) {
    case "textarea": {
      inputElement = (
        <textarea
          className={styles.textarea}
          rows="7"
          {...inputProps}
          id={id}
          required={required}
          onChange={onChange}
          onBlur={handleFocus}
          data-focused={isFocused.toString()}
        />
      );
      break;
    }
    case "select": {
      inputElement = (
        <select
          id={id}
          className={styles.select}
          onChange={onChange}
          {...inputProps}
        >
          {options.map((option) => (
            <option
              key={option.id}
              value={option.value}
            >
              {option.value}
            </option>
          ))}
        </select>
      );
      break;
    }
    default: {
      inputElement = (
        <input
          className={styles.input}
          {...inputProps}
          id={id}
          type={type}
          required={required}
          onChange={onChange}
          onBlur={handleFocus}
          data-focused={isFocused.toString()}
        />
      );
    }
  }

  return (
    <div className={styles["form-input-container"]}>
      <label
        className={styles.label}
        htmlFor={id}
      >
        {label}
        {required && <b> *</b>}
      </label>
      {inputElement}
      <span className={styles["warning-text"]}>
        <FiAlertCircle />
        {errorMessage}
      </span>
    </div>
  );
}

export default FormInputElement;
