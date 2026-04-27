import { useEffect } from "react";
import { useFormContext } from "../../hooks/useFormContext";
import { Form, useForm } from "react-hook-form";
import { isValidEmail } from "../../utils/helpers";
import FormCard from "../../components/FormCard/FormCard";
import FormField from "../../components/FormField/FormField";
import "./DnvQuoteRequest.css";

function DnvQuoteRequest({ formId }) {
  const { state, updateStepData, nextStep } = useFormContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: state.DnvQuoteRequest });

  const dbaIsSameAsLegal = watch("dbaIsSameAsLegal");
  const legalEntityName = watch("legalEntityName");

  useEffect(() => {
    if (dbaIsSameAsLegal) {
      setValue("dbaName", legalEntityName, { shouldValidate: true });
    } else {
      setValue("dbaName", "");
    }
  }, [dbaIsSameAsLegal, legalEntityName, setValue]);

  const onValid = (data) => {
    updateStepData("DnvQuoteRequest", data);
    nextStep();
  };

  const onInvalid = (data) => {
    console.log("Validation Errors:", data);
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onValid, onInvalid)} noValidate>
      <FormCard>
        <h2 classname="form-card__title">Identify Healthcare Organization</h2>
        <FormField
          label="Legal Entity Name"
          required
          error={errors.legalEntityName?.message}
        >
          <input
            type="text"
            className={
              'form-input ${errors.legalEntityName ? "form-input--error" : ""}'
            }
            {...register("legalEntityName", {
              required: "Legal Entity Name is required",
            })}
          />
        </FormField>
        <FormField
          label="Doing Business As (d/b/a) Name"
          required
          error={errors.dbaName?.message}
        >
          <input
            className={
              'form-input ${errors.dbaName ? "form-input--error" : ""}'
            }
            disabled={dbaIsSameAsLegal}
            {...register("dbaName", {
              required: dbaIsSameAsLegal
                ? false
                : "Doing Business As (d/b/a) Name is required",
            })}
          />
        </FormField>
        <label className="checkbox-label">
          <input
            type="checkbox"
            className="checkbox-input"
            {...register("dbaIsSameAsLegal")}
          />
          <span>Same as Legal Entity Name</span>
        </label>

        <h2 classname="form-card__title">Primary Contact Information</h2>
        <p className="form-card__section-subtitle">
          Primary contact receives all DNV Healthcare official communications
        </p>
        <div className="form-row">
          <FormField
            label="First Name"
            required
            error={errors.primaryContact?.firstName?.message}
          >
            <input
              className={
                'form-input ${errors.primaryContact?.firstName ? "form-input--error" : ""}'
              }
              type="text"
              {...register("primaryContact.firstName", {
                required: "First Name is required",
              })}
            />
          </FormField>
          <FormField
            label="Last Name"
            required
            error={errors.primaryContact?.lastName?.message}
          >
            <input
              className={
                'form-input ${errors.primaryContact?.lastName ? "form-input--error" : ""}'
              }
              type="text"
              {...register("primaryContact.lastName", {
                required: "Last Name is required",
              })}
            />
          </FormField>
        </div>

        <FormField
          label="Title"
          required
          error={errors.primaryContact?.title?.message}
        >
          <input
            className={
              'form-input ${errors.primaryContact?.title ? "form-input--error" : ""}'
            }
            type="text"
            {...register("primaryContact.title", {
              required: "Title is required",
            })}
          />
        </FormField>
        <div className="form-row">
          <FormField
            label="Work Phone"
            required
            error={errors.primaryContact?.workPhone?.message}
          >
            <input
              className={
                'form-input ${errors.primaryContact?.workPhone ? "form-input--error" : ""}'
              }
              type="tel"
              {...register("primaryContact.workPhone", {
                required: "Work Phone is required",
                minLength: {
                  value: 10,
                  message: "Enter a valid phone number",
                },
              })}
            />
          </FormField>
          <FormField
            label="Cell Phone"
            error={errors.primaryContact?.cellPhone?.message}
          >
            <input
              className={
                'form-input ${errors.primaryContact?.cellPhone ? "form-input--error" : ""}'
              }
              type="tel"
              {...register("primaryContact.cellPhone", {
                minLength: {
                  value: 10,
                  message: "Enter a valid phone number",
                },
              })}
            />
          </FormField>

          <FormField
            label="Email"
            required
            error={errors.primaryContact?.email?.message}
          >
            <div>
              <input className={`form-input ${errors.primaryContact?.email ? 'form-input--error' : ''}`} />
            </div>
          </FormField>
          <div className="email-verification-row">
            <button type="button" className="btn btn--outlined btn--sm">
             Send Verification Email
            </button>
            <span className="badge badge--warning">Not Verifified</span>
          </div>
        </div>
      </FormCard>
    </form>
  );
}

export default DnvQuoteRequest;
