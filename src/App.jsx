import { FormProvider } from "./context/FormContext";
import { useFormContext } from "./hooks/useFormContext";
import Header from "./components/Header/Header";
import "./App.css";
import { STEP_LABELS, STEP_TITLES, STEPS } from "./constants";

function FormShell() {
  const { currentStep, nextStep, prevStep } = useFormContext();

  const StepComponent = STEPS[currentStep];

  const handleSave = () => {
    console.log("Form Data Saved!");
  };

  const handleContinue = () => {
    nextStep();
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
        </div>
      </main>
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
