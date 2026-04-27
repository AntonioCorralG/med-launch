import "./BottomBar.css";
import { useFormContext } from "../../hooks/useFormContext";
import { LAST_STEP } from "../../constants";
import { UserPen } from "lucide-react";
function BottomBar({ formId, onSave, onSubmit }) {
  const { currentStep, prevStep } = useFormContext();

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === LAST_STEP;

  const handleExit = () => {
    console.log("Exit clicked");
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
            Previous
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
            <button type="submit" form={formId} className="btn btn--primary">
              Continue
            </button>
          </>
        )}

        {isLastStep && (
          <button form={formId} type="submit" className="btn btn--primary" >
            Submit Application
          </button>
        )}

        <button type="button" className="btn btn--support">
          <UserPen size={16} />
          Support Chat
        </button>
      </div>
    </div>
  );
}

export default BottomBar;
