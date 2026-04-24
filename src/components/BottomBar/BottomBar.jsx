import "./BottomBar.css";
import { useFormContext } from "../../hooks/useFormContext";
import { LAST_STEP, FIRST_STEP } from "../../constants";

function BottomBar({ onSave, onContinue, onSubmit }) {
  const { currentStep, prevStep } = useFormContext();

  const isFirstStep = currentStep === FIRST_STEP;
  const isLastStep = currentStep === LAST_STEP;

  const handleExit = () => {
    console.log("Exiting form...", "would clear or prompt");
  };

  return (
    <div className="bottom-bar">
      <div className="bottom-bar__left">
        {isFirstStep ? (  
          <button
            type="button"
            className="btn btn--outlined"
            onClick={handleExit}
          >
            Exit
          </button>
        ) : (
          <button
            type="button"
            className="btn btn--outlined"
            onClick={prevStep}
          >
            Back
          </button>
        )}
      </div>
      <div className="bottom-bar__right">
        {!isLastStep && (
          <>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onSave}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={onContinue}
            >
              Continue
            </button>
          </>
        )}
        {isLastStep && (
          <button type="button" className="btn btn--primary" onClick={onSubmit}>
            Submit
          </button>
        )}
        <button type="button" className="btn btn--support">
          Support Chat
        </button>
      </div>
    </div>
  );
}

export default BottomBar;
