import { useContext } from "react";
import { FormStateContext, FormDispatchContext } from "../context/FormContext";
import { ACTIONS } from "../constants";

export function useFormContext() {
  // custom hook to access both form state and dispatch
  const state = useContext(FormStateContext);
  const dispatch = useContext(FormDispatchContext);

  if (state === null || dispatch === null) {
    throw new Error("useFormContext must be used within a FormProvider");
  }

  const goToStep = (stepIndex) => {
    dispatch({ type: ACTIONS.SET_CURRENT_STEP, payload: stepIndex });
  };

  const nextStep = () => {
    dispatch({
      type: ACTIONS.SET_CURRENT_STEP,
      payload: state.currentStep + 1,
    });
  };

  const prevStep = () => {
    dispatch({
      type: ACTIONS.SET_CURRENT_STEP,
      payload: state.currentStep - 1,
    });
  };

  const updateStepData = (step, data) => {
    dispatch({ type: ACTIONS.UPDATE_STEP_DATA, payload: { step, data } });
  };

  return {
    state,
    dispatch,
    goToStep,
    nextStep,
    prevStep,
    currentStep: state.currentStep,
  };
}
