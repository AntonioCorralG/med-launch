import { useFormContext } from "../../hooks/useFormContext";
import { useEffect } from "react";
import { US_STATES } from "../../constants";
import { useForm } from "react-hook-form";
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

  const ceoSameAsPrimary = watch("ceo.sameAsPrimary");
  const directorSameAsPrimary = watch("directorOfQuality.sameAsPrimary");
  const invoicingSameAsPrimary = watch("invoicingContact.sameAsPrimary");

  useEffect(() => {
    if (ceoSameAsPrimary) {
      setValue("ceo.firstName", primaryContact.firstName);
      setValue("ceo.lastName", primaryContact.lastName);
      setValue("ceo.email", primaryContact.email);
      setValue("ceo.phone", primaryContact.workPhone);
    } else {
      setValue("ceo.firstName", "");
      setValue("ceo.lastName", "");
      setValue("ceo.email", "");
      setValue("ceo.phone", "");
    }
  }, [ceoSameAsPrimary, primaryContact, setValue]);

  const onValid = (data) => {
    updateStepData("leadershipContacts", data);
    nextStep();
  };
  return (
    <form id={formId} onSubmit={handleSubmit(onValid)} noValidate>
      <FormCard title="Leadership Contacts">
        <h2>Contact Information</h2>
        <div className="contact-sub-card">
          <h3>Chief Executive Officer  (CEO)</h3>
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
              className={`form-input ${errors.ceo?.firstName ? 'form-input--error' : ''}`}
                type="text"
                disabled={ceoSameAsPrimary}
                {...register("ceo.firstName", {
                  required: "First Name is Required",
                })}
              />
            </FormField>

              <FormField
              label="Last Name"
              required
              error={errors.ceo?.lastName?.message}
            >
              <input
              className={`form-input ${errors.ceo?.lastName ? 'form-input--error' : ''}`}
                type="text"
                disabled={ceoSameAsPrimary}
                {...register("ceo.lastName", {
                  required: "Last Name is Required",
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
