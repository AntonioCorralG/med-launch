import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormContext } from "../../hooks/useFormContext";
import { US_STATES } from "../../constants";
import { isValidEmail } from "../../utils/helpers";
import FormCard from "../../components/FormCard/FormCard";
import FormField from "../../components/FormField/FormField";
import "./LeadershipContacts.css";

function LeadershipContacts({ formId }) {
  const { state, updateStepData, nextStep } = useFormContext();

  const primaryContact = state.dnvQuoteRequest.primaryContact;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: state.leadershipContacts,
  });

  // Watch all three "same as primary" checkboxes simultaneously
  const ceoSameAsPrimary = watch("ceo.sameAsPrimary");
  const doqSameAsPrimary = watch("directorOfQuality.sameAsPrimary");
  const invoiceSameAsPrimary = watch("invoicingContact.sameAsPrimary");

  // ── CEO auto-fill ──────────────────────────────────────────
  useEffect(() => {
    if (ceoSameAsPrimary) {
      setValue("ceo.firstName", primaryContact.firstName);
      setValue("ceo.lastName", primaryContact.lastName);
      setValue("ceo.phone", primaryContact.workPhone);
      setValue("ceo.email", primaryContact.email);
    } else {
      setValue("ceo.firstName", "");
      setValue("ceo.lastName", "");
      setValue("ceo.phone", "");
      setValue("ceo.email", "");
    }
  }, [ceoSameAsPrimary, primaryContact, setValue]);

  // ── Director of Quality auto-fill ─────────────────────────
  useEffect(() => {
    if (doqSameAsPrimary) {
      setValue("directorOfQuality.firstName", primaryContact.firstName);
      setValue("directorOfQuality.lastName", primaryContact.lastName);
      setValue("directorOfQuality.phone", primaryContact.workPhone);
      setValue("directorOfQuality.email", primaryContact.email);
    } else {
      setValue("directorOfQuality.firstName", "");
      setValue("directorOfQuality.lastName", "");
      setValue("directorOfQuality.phone", "");
      setValue("directorOfQuality.email", "");
    }
  }, [doqSameAsPrimary, primaryContact, setValue]);

  // ── Invoicing Contact auto-fill ────────────────────────────
  useEffect(() => {
    if (invoiceSameAsPrimary) {
      setValue("invoicingContact.firstName", primaryContact.firstName);
      setValue("invoicingContact.lastName", primaryContact.lastName);
      setValue("invoicingContact.phone", primaryContact.workPhone);
      setValue("invoicingContact.email", primaryContact.email);
    } else {
      setValue("invoicingContact.firstName", "");
      setValue("invoicingContact.lastName", "");
      setValue("invoicingContact.phone", "");
      setValue("invoicingContact.email", "");
    }
  }, [invoiceSameAsPrimary, primaryContact, setValue]);

  const onValid = (data) => {
    updateStepData("leadershipContacts", data);
    nextStep();
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onValid)} noValidate>
      <FormCard>
        <div className="contact-sub-card">
          <h3 className="contact-sub-card__title">
            Chief Executive Officer (CEO)
          </h3>

          <label className="checkbox-label">
            <input
              type="checkbox"
              className="checkbox-input"
              {...register("ceo.sameAsPrimary")}
            />
            <span>Same as Primary Contact entered in Step 1</span>
          </label>

          <div className="form-row">
            <FormField
              label="First Name"
              required
              error={errors.ceo?.firstName?.message}
            >
              <input
                className={`form-input ${errors.ceo?.firstName ? "form-input--error" : ""}`}
                type="text"
                disabled={ceoSameAsPrimary}
                {...register("ceo.firstName", {
                  required: "First Name is required",
                })}
              />
            </FormField>

            <FormField
              label="Last Name"
              required
              error={errors.ceo?.lastName?.message}
            >
              <input
                className={`form-input ${errors.ceo?.lastName ? "form-input--error" : ""}`}
                type="text"
                disabled={ceoSameAsPrimary}
                {...register("ceo.lastName", {
                  required: "Last Name is required",
                })}
              />
            </FormField>
          </div>

          <FormField label="Phone" required error={errors.ceo?.phone?.message}>
            <input
              className={`form-input ${errors.ceo?.phone ? "form-input--error" : ""}`}
              type="tel"
              disabled={ceoSameAsPrimary}
              {...register("ceo.phone", {
                required: "Phone is required",
                minLength: { value: 10, message: "Enter a valid phone number" },
              })}
            />
          </FormField>

          <FormField label="Email" required error={errors.ceo?.email?.message}>
            <input
              className={`form-input ${errors.ceo?.email ? "form-input--error" : ""}`}
              type="email"
              disabled={ceoSameAsPrimary}
              {...register("ceo.email", {
                required: "Email is required",
                validate: (value) =>
                  isValidEmail(value) || "Enter a valid email address",
              })}
            />
          </FormField>
        </div>

        <div className="contact-sub-card">
          <h3 className="contact-sub-card__title">Director of Quality</h3>

          <label className="checkbox-label">
            <input
              type="checkbox"
              className="checkbox-input"
              {...register("directorOfQuality.sameAsPrimary")}
            />
            <span>Same as Primary Contact entered in Step 1</span>
          </label>

          <div className="form-row">
            <FormField
              label="First Name"
              error={errors.directorOfQuality?.firstName?.message}
            >
              <input
                className="form-input"
                type="text"
                disabled={doqSameAsPrimary}
                {...register("directorOfQuality.firstName")}
              />
            </FormField>

            <FormField
              label="Last Name"
              error={errors.directorOfQuality?.lastName?.message}
            >
              <input
                className="form-input"
                type="text"
                disabled={doqSameAsPrimary}
                {...register("directorOfQuality.lastName")}
              />
            </FormField>
          </div>

          <FormField
            label="Phone"
            error={errors.directorOfQuality?.phone?.message}
          >
            <input
              className="form-input"
              type="tel"
              disabled={doqSameAsPrimary}
              {...register("directorOfQuality.phone", {
                minLength: { value: 10, message: "Enter a valid phone number" },
              })}
            />
          </FormField>

          <FormField
            label="Email"
            error={errors.directorOfQuality?.email?.message}
          >
            <input
              className="form-input"
              type="email"
              disabled={doqSameAsPrimary}
              {...register("directorOfQuality.email", {
                validate: (value) =>
                  // Only validate format if something was actually typed
                  !value ||
                  isValidEmail(value) ||
                  "Enter a valid email address",
              })}
            />
          </FormField>
        </div>


        <div className="contact-sub-card">
          <h3 className="contact-sub-card__title">Invoicing Contact</h3>

          <label className="checkbox-label">
            <input
              type="checkbox"
              className="checkbox-input"
              {...register("invoicingContact.sameAsPrimary")}
            />
            <span>Same as Primary Contact entered in Step 1</span>
          </label>

          <div className="form-row">
            <FormField
              label="First Name"
              required
              error={errors.invoicingContact?.firstName?.message}
            >
              <input
                className={`form-input ${errors.invoicingContact?.firstName ? "form-input--error" : ""}`}
                type="text"
                disabled={invoiceSameAsPrimary}
                {...register("invoicingContact.firstName", {
                  required: "First Name is required",
                })}
              />
            </FormField>

            <FormField
              label="Last Name"
              required
              error={errors.invoicingContact?.lastName?.message}
            >
              <input
                className={`form-input ${errors.invoicingContact?.lastName ? "form-input--error" : ""}`}
                type="text"
                disabled={invoiceSameAsPrimary}
                {...register("invoicingContact.lastName", {
                  required: "Last Name is required",
                })}
              />
            </FormField>
          </div>

          <FormField
            label="Phone"
            required
            error={errors.invoicingContact?.phone?.message}
          >
            <input
              className={`form-input ${errors.invoicingContact?.phone ? "form-input--error" : ""}`}
              type="tel"
              disabled={invoiceSameAsPrimary}
              {...register("invoicingContact.phone", {
                required: "Phone is required",
                minLength: { value: 10, message: "Enter a valid phone number" },
              })}
            />
          </FormField>

          <FormField
            label="Email"
            required
            error={errors.invoicingContact?.email?.message}
          >
            <input
              className={`form-input ${errors.invoicingContact?.email ? "form-input--error" : ""}`}
              type="email"
              disabled={invoiceSameAsPrimary}
              {...register("invoicingContact.email", {
                required: "Email is required",
                validate: (value) =>
                  isValidEmail(value) || "Enter a valid email address",
              })}
            />
          </FormField>

          {/* ── Billing Address ── */}
          <h4 className="billing-address__title">Billing Address</h4>

          <FormField
            label="Street Address"
            required
            error={errors.invoicingContact?.billingAddress?.street?.message}
          >
            <input
              className={`form-input ${errors.invoicingContact?.billingAddress?.street ? "form-input--error" : ""}`}
              type="text"
              {...register("invoicingContact.billingAddress.street", {
                required: "Street Address is required",
              })}
            />
          </FormField>

          <div className="form-row form-row--address">
            <FormField
              label="City"
              required
              error={errors.invoicingContact?.billingAddress?.city?.message}
            >
              <input
                className={`form-input ${errors.invoicingContact?.billingAddress?.city ? "form-input--error" : ""}`}
                type="text"
                {...register("invoicingContact.billingAddress.city", {
                  required: "City is required",
                })}
              />
            </FormField>

            <FormField
              label="State"
              required
              error={errors.invoicingContact?.billingAddress?.state?.message}
            >
              <select
                className={`form-input form-select ${errors.invoicingContact?.billingAddress?.state ? "form-input--error" : ""}`}
                {...register("invoicingContact.billingAddress.state", {
                  required: "State is required",
                })}
              >
                <option value="">Select State</option>
                {US_STATES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="ZIP Code"
              required
              error={errors.invoicingContact?.billingAddress?.zip?.message}
            >
              <input
                className={`form-input ${errors.invoicingContact?.billingAddress?.zip ? "form-input--error" : ""}`}
                type="text"
                maxLength={5}
                {...register("invoicingContact.billingAddress.zip", {
                  required: "ZIP Code is required",
                  pattern: {
                    value: /^\d{5}$/,
                    message: "Enter a valid 5-digit ZIP code",
                  },
                })}
              />
            </FormField>
          </div>
        </div>
      </FormCard>
    </form>
  );
}

export default LeadershipContacts;
