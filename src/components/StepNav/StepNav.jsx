import "./StepNav.css";
import { useFormContext } from "../../hooks/useFormContext";
import { STEP_LABELS } from "../../constants";

function StepNav() {
  const { currentStep, goToStep } = useFormContext();

  return (
    <nav className="step-nav" aria-label="Form Progress">
      <div className="step-nav__bar">
        {STEP_LABELS.map((label, index) => {
          const isComplete = index < currentStep;
          const isActive = index === currentStep;
          return (
            <div
              key={label}
              className={[
                "step-nav__step",
                isComplete ? "step-nav__segment--complete" : "",
                isActive ? "step-nav__segment--active" : "",
              ].join(" ")}
            />
          );
        })}
      </div>
      <div className="step-nav__labels">
        {STEP_LABELS.map((label, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;
          return (
            <span
              key={label}
              className={[
                'step-nav__label',
                isActive ? "step-nav__label--active" : "",
                isComplete ? "step-nav__label--complete" : "",
              ].join(" ")}

            >
              {label}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
export default StepNav;
