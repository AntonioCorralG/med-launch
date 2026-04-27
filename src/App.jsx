import { FormProvider } from "./context/FormContext";
import { useFormContext } from "./hooks/useFormContext";
import Header from "./components/Header/Header";
import "./App.css";
import { STEP_LABELS, STEP_TITLES } from "./constants";
import BottomBar from "./components/BottomBar/BottomBar";
import StepNav from "./components/StepNav/StepNav";

import DnvQuoteRequest from "./steps/DnvQuoteRequest/DnvQuoteRequest";
import FacilityDetails from "./steps/FacilityDetails/FacilityDetails";
import LeadershipContacts from "./steps/LeadershipContacts/LeadershipContacts";
import SiteInformation from "./steps/SiteInformation/SiteInformation";
import ServicesCertifications from "./steps/ServicesCertifications/ServicesCertifications";
import ReviewSubmit from "./steps/ReviewSubmit/ReviewSubmit";

export const STEPS = [
  DnvQuoteRequest,
  FacilityDetails,
  LeadershipContacts,
  SiteInformation,
  ServicesCertifications,
  ReviewSubmit,
];

function FormShell() {
  const { currentStep, nextStep, prevStep } = useFormContext();

  const StepComponent = STEPS[currentStep];
  const formId = `step-${currentStep}-form`;

  const handleSave = () => {
    console.log("Form Data Saved!");
  };


  const handleSubmit = () => {
    console.log("Form Submitted!");
  };

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <div className="app__title-row">
          <h1 className="app__title">{STEP_TITLES[currentStep]}</h1>
          <span className="app__step-counter">
            Step {currentStep + 1} of {STEPS.length}
          </span>
        </div>
        <StepNav />
        <div className="app__step-component">
          <StepComponent formId={formId} />
        </div>
      </main>
      <BottomBar
        formId={formId}
        onSave={handleSave}
        // onContinue={handleContinue}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

function App() {
  return (
    <FormProvider>
      <FormShell />
    </FormProvider>
  );
}

export default App;
