import { useFormContext } from "../../hooks/useFormContext";
import { useForm } from "react-hook-form";
import { FACILITY_TYPES } from "../../constants";
import FormCard from "../../components/FormCard/FormCard";
import FormField from "../../components/FormField/FormField";
import "./FacilityDetails.css";

function FacilityDetails({ formId }) {
  const { state, updateStepData, nextStep } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: state.facilityDetails });

  const onValid = (data) => {
    updateStepData("facilityDetails", data);
    nextStep();
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onValid)} noValidate>
      <FormCard title="Facility Details" formId={formId}>
        <h2  className="form-card__section-title">Facility and Organization Type</h2>
        <FormField label="Facility Type"  required error={errors.facilityType?.message}>
          <div role="radiogroup" aria-label="Facility Type">
            {FACILITY_TYPES.map((type) => (
              <label key={type} className="radio-label">
                <input
                  type="radio"
                  className="radio-input"
                  {...register("facilityType", {
                    required: "Select a facility type",
                  })}
                  value={type}
                />
                {type}
              </label>
            ))}
          </div>
        </FormField>
      </FormCard>
    </form>
  );
}

export default FacilityDetails;
