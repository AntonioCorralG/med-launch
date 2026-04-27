import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { RotateCw } from "lucide-react";
import { useFormContext } from "../../hooks/useFormContext";
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
  } = useForm({
    defaultValues: state.dnvQuoteRequest,
  });

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
    updateStepData("dnvQuoteRequest", data);
    nextStep();
  };

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  return (
    <form id={formId} onSubmit={handleSubmit(onValid)} noValidate>
      <FormCard>
        <h2 className="form-card__section-title">
          Identify Healthcare Organization
        </h2>

        <FormField
          label="Legal Entity Name"
          htmlFor="legalEntityName"
          required
          error={errors.legalEntityName?.message}
        >
          <input
            ref={firstInputRef}
            className={`form-input ${errors.legalEntityName ? "form-input--error" : ""}`}
            type="text"
            {...register("legalEntityName", {
              required: "Legal Entity Name is required",
            })}
          />
        </FormField>
        <FormField
          label="Doing Business As (d/b/a) Name"
          required
          error={errors.dbaName?.message}
          htmlFor="dbaName"
        >
          <input
            className={`form-input ${errors.dbaName ? "form-input--error" : ""}`}
            type="text"
            disabled={dbaIsSameAsLegal}
            {...register("dbaName", {
              required: dbaIsSameAsLegal ? false : "DBA Name is required",
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
        <h2 className="form-card__section-title">
          Primary Contact Information
        </h2>
        <p className="form-card__section-subtitle">
          Primary contact receives all DNV Healthcare official communications
        </p>

        <div className="form-row">
          <FormField
            label="First Name"
            required
            error={errors.primaryContact?.firstName?.message}
            htmlFor="primaryContact.firstName"
          >
            <input
              className={`form-input ${errors.primaryContact?.firstName ? "form-input--error" : ""}`}
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
            htmlFor="primaryContact.lastName"
          >
            <input
              className={`form-input ${errors.primaryContact?.lastName ? "form-input--error" : ""}`}
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
          htmlFor="primaryContact.title"
        >
          <input
            className={`form-input ${errors.primaryContact?.title ? "form-input--error" : ""}`}
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
            htmlFor="primaryContact.workPhone"
          >
            <input
              className={`form-input ${errors.primaryContact?.workPhone ? "form-input--error" : ""}`}
              type="tel"
              {...register("primaryContact.workPhone", {
                required: "Work Phone is required",
                minLength: { value: 10, message: "Enter a valid phone number" },
              })}
            />
          </FormField>
          <FormField
            label="Cell Phone"
            error={errors.primaryContact?.cellPhone?.message}
            htmlFor="primaryContact.cellPhone"
          >
            <input
              className={`form-input ${errors.primaryContact?.cellPhone ? "form-input--error" : ""}`}
              type="tel"
              {...register("primaryContact.cellPhone", {
                minLength: { value: 10, message: "Enter a valid phone number" },
              })}
            />
          </FormField>
        </div>
        <div className="form-field">
          <div className="email-label-row">
            <label className="form-field__label" htmlFor="primaryContact.email">
              Email <span className="form-field__required">*</span>
            </label>
            <RotateCw size={15} className="email-icon" />
          </div>
          <input
            className={`form-input ${errors.primaryContact?.email ? "form-input--error" : ""}`}
            type="email"
            {...register("primaryContact.email", {
              required: "Email is required",
              validate: (value) =>
                isValidEmail(value) || "Enter a valid email address",
            })}
          />

          {errors.primaryContact?.email && (
            <span className="form-field__error" role="alert">
              {errors.primaryContact.email.message}
            </span>
          )}
        </div>

        <div className="email-verification-row">
          <button type="button" className="btn btn--outlined btn--sm">
            Send Verification Email
          </button>
          <span className="badge badge--warning">Not Verified</span>
        </div>
      </FormCard>
    </form>
  );
}

export default DnvQuoteRequest;
