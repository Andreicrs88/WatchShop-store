// utils
import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

function inputStateReducer(state, action) {
  switch (action.type) {
    case "INPUT":
      return {
        value: action.payload,
        isTouched: state.isTouched,
      };
    // when the the user leaves the input field
    case "BLUR":
      return {
        value: state.value,
        isTouched: true,
      };
    case "RESET":
      return {
        value: "",
        isTouched: false,
      };
    default:
      return initialInputState;
  }
}

// validateInputFn is a function that contains the validation logic for the input value
function useInput(validateInputFn) {
  const [inputState, dispatchFn] = useReducer(inputStateReducer, initialInputState);

  const valueIsValid = validateInputFn(inputState.value);
  // if the input is touched (is clicked on) and the input is not valid, the error appears
  // we use the isTouched state beacause we don't want to show the error if the input was not clicked on (the input is empty)
  const hasError = !valueIsValid && inputState.isTouched;

  function handleChangeInputValue(event) {
    dispatchFn({ type: "INPUT", payload: event.target.value });
  }

  function handleInputBlur() {
    dispatchFn({ type: "BLUR" });
  }

  function handleInputReset() {
    dispatchFn({ type: "RESET" });
  }

  return {
    value: inputState.value,
    valueIsValid,
    hasError,
    handleChangeInputValue,
    handleInputBlur,
    handleInputReset,
  };
}

export default useInput;
