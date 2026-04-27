import "./StepNav.css";
import { useFormContext } from "../../hooks/useFormContext";
import { STEP_LABELS } from "../../constants";

function StepNav() {
  const { currentStep, goToStep } = useFormContext();

  return (
    <nav className="step-nav" aria-label="Form progress">
      <div className="step-nav__bar">
        {STEP_LABELS.map((label, index) => {
          const isComplete = index < currentStep;
          const isActive   = index === currentStep;

          return (
            <div
              key={label}
              className={[
                "step-nav__segment",
                isComplete ? "step-nav__segment--complete" : "",
                isActive   ? "step-nav__segment--active"   : "",
              ].join(" ")}
              onClick={() => isComplete && goToStep(index)}
              role={isComplete ? "button" : undefined}
              tabIndex={isComplete ? 0 : undefined}
            >
              <span
                className={[
                  "step-nav__label",
                  isActive   ? "step-nav__label--active"   : "",
                  isComplete ? "step-nav__label--complete" : "",
                ].join(" ")}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export default StepNav;