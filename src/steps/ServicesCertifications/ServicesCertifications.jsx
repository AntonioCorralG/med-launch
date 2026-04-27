import { useForm } from "react-hook-form";
import { useFormContext } from "../../hooks/useFormContext";
import { SERVICES } from "../../constants";
import FormCard from "../../components/FormCard/FormCard";
import FormField from "../../components/FormField/FormField";
import "./ServicesCertifications.css";

function ServicesCertifications({ formId }) {
  const { state, updateStepData, nextStep } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: state.servicesCertifications,
  });

  const onValid = (data) => {
    updateStepData("servicesCertifications", data);
    nextStep();
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onValid)} noValidate>
      {/* ── Section 1: Service Offering ── */}
      <FormCard>
        <h2 className="form-card__section-title">Service Offering</h2>
        <p className="form-card__section-subtitle">
          Primary Site Service offering
        </p>

        <div className="services-grid">
          {Object.entries(SERVICES).map(([category, services]) => (
            <div key={category} className="service-category">
              <h3 className="service-category__title">{category}</h3>
              {services.map((service) => (
                <label key={service} className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    value={service}
                    {...register("selectedServices")}
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>
          ))}
        </div>

        <h2 className="form-card__section-title">Standards to Apply</h2>

        <FormField
          label="Select Standard(s)"
          error={errors.standardsToApply?.message}
        >
          <select
            className="form-input form-select"
            {...register("standardsToApply")}
          >
            <option value="">Select Standard(s)</option>
            <option value="emergency_department">Emergency Department</option>
            <option value="inpatient_acute_care">Inpatient Acute Care</option>
            <option value="general_anesthesia">
              General Anesthetizing Location
            </option>
            <option value="diagnostic_services">Diagnostic Services</option>
            <option value="therapy_services">Therapy Services</option>
          </select>
        </FormField>

        {/* ── Date fields ── */}
        <div className="form-row">
          <FormField
            label="Expiration Date of Current Stroke Certification"
            error={errors.strokeCertExpiration?.message}
          >
            <input
              className="form-input"
              type="date"
              {...register("strokeCertExpiration")}
            />
          </FormField>

          <FormField
            label="Date of Application"
            error={errors.dateOfApplication?.message}
          >
            <input
              className="form-input"
              type="date"
              {...register("dateOfApplication")}
            />
          </FormField>
        </div>

        <FormField label="Dates of last twenty-five thrombolytic administrations">
          <input
            className="form-input"
            type="text"
            placeholder="mm/dd/yyyy, mm/dd/yyyy"
            disabled
          />
          <span className="form-field__hint">
            Multi-date input — coming soon
          </span>
        </FormField>

        <FormField label="Dates of last fifteen thrombectomies">
          <input
            className="form-input"
            type="text"
            placeholder="mm/dd/yyyy, mm/dd/yyyy"
            disabled
          />
          <span className="form-field__hint">
            Multi-date input — coming soon
          </span>
        </FormField>
      </FormCard>
    </form>
  );
}

export default ServicesCertifications;
