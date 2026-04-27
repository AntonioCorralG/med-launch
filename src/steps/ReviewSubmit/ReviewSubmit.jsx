import { useState } from 'react';
import { useFormContext } from '../../hooks/useFormContext';
import FormCard from '../../components/FormCard/FormCard';
import './ReviewSubmit.css';

function AccordionSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="accordion">
      <div className="accordion__header">
        <button
          type="button"
          className="accordion__toggle"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="accordion__chevron">{isOpen ? '▲' : '▼'}</span>
          <span>{title}</span>
        </button>

        {/* Right side — Edit text button (non-functional for now) */}
        <button
          type="button"
          className="accordion__edit-btn"
          onClick={() => console.log(`Edit ${title} clicked`)}
        >
          Edit
        </button>
      </div>

      {isOpen && <div className="accordion__body">{children}</div>}
    </div>
  );
}

function ReviewRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="review-row">
      <span className="review-row__label">{label}</span>
      <span className="review-row__value">{value}</span>
    </div>
  );
}

function ReviewSubmit({ formId }) {
  const { state } = useFormContext();
  const [isCertified, setIsCertified] = useState(false);
  const [certError, setCertError] = useState(false);

  const {
    dnvQuoteRequest,
    facilityDetails,
    leadershipContacts,
    siteInformation,
    servicesCertifications,
  } = state;

  const { primaryContact } = dnvQuoteRequest;
  const { ceo, directorOfQuality, invoicingContact } = leadershipContacts;
  const { billingAddress } = invoicingContact;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCertified) {
      setCertError(true);
      return;
    }
    setCertError(false);
    console.log('Form submitted — full payload:', state);
  };

  return (
    <form id={formId} onSubmit={handleSubmit}>

      <FormCard>
        <h2 className="form-card__section-title">Hospital Information</h2>

        {/* ── Basic Information ── */}
        <AccordionSection title="Basic Information">
          <ReviewRow
            label="Legal Entity Name"
            value={dnvQuoteRequest.legalEntityName}
          />
          <ReviewRow
            label="d/b/a Name"
            value={dnvQuoteRequest.dbaName}
          />
          <div className="review-row">
            <span className="review-row__label">Primary Contact</span>
            <div className="review-row__value">
              <p>{`${primaryContact.firstName} ${primaryContact.lastName}`}</p>
              <p>{primaryContact.title}</p>
              <p>
                {primaryContact.workPhone && `Work: ${primaryContact.workPhone}`}
                {primaryContact.cellPhone && ` | Cell: ${primaryContact.cellPhone}`}
              </p>
              <p>{primaryContact.email}</p>
            </div>
          </div>
        </AccordionSection>


        <AccordionSection title="Facility Details">
          <ReviewRow
            label="Facility Type"
            value={facilityDetails.facilityType}
          />
        </AccordionSection>


        <AccordionSection title="Leadership Contacts">
          <div className="review-row">
            <span className="review-row__label">CEO</span>
            <div className="review-row__value">
              <p>{`${ceo.firstName} ${ceo.lastName}`}</p>
              <p>{ceo.phone && `Phone: ${ceo.phone}`}</p>
              <p>{ceo.email && `Email: ${ceo.email}`}</p>
            </div>
          </div>

          <div className="review-row">
            <span className="review-row__label">Director of Quality</span>
            <div className="review-row__value">
              <p>{`${directorOfQuality.firstName} ${directorOfQuality.lastName}`}</p>
              <p>{directorOfQuality.phone && `Phone: ${directorOfQuality.phone}`}</p>
              <p>{directorOfQuality.email && `Email: ${directorOfQuality.email}`}</p>
            </div>
          </div>

          <div className="review-row">
            <span className="review-row__label">Invoicing Contact</span>
            <div className="review-row__value">
              <p>{`${invoicingContact.firstName} ${invoicingContact.lastName}`}</p>
              <p>{invoicingContact.phone && `Phone: ${invoicingContact.phone}`}</p>
              <p>{invoicingContact.email && `Email: ${invoicingContact.email}`}</p>
              {billingAddress.street && (
                <p>
                  {`Billing Address: ${billingAddress.street}, ${billingAddress.city}, ${billingAddress.state} ${billingAddress.zip}`}
                </p>
              )}
            </div>
          </div>
        </AccordionSection>


        <AccordionSection title="Site Information">
          <ReviewRow
            label="Site Configuration"
            value={siteInformation.locationType}
          />
        </AccordionSection>


        <AccordionSection title="Services & Certifications">
          <ReviewRow
            label="Services Provided"
            value={
              servicesCertifications.selectedServices.length > 0
                ? servicesCertifications.selectedServices.join(', ')
                : 'None selected'
            }
          />
          <ReviewRow
            label="Standards to Apply"
            value={servicesCertifications.standardsToApply}
          />
          <ReviewRow
            label="Date of Application"
            value={servicesCertifications.dateOfApplication}
          />
          <ReviewRow
            label="Stroke Cert Expiration"
            value={servicesCertifications.strokeCertExpiration}
          />
        </AccordionSection>
      </FormCard>

      <FormCard>
        <h2 className="form-card__section-title">Ready to Submit?</h2>

        <label className="cert-checkbox-label">
          <input
            type="checkbox"
            className="checkbox-input"
            checked={isCertified}
            onChange={(e) => {
              setIsCertified(e.target.checked);
              if (e.target.checked) setCertError(false);
            }}
          />
          <span>
            I certify that all information provided is accurate and complete
            to the best of my knowledge
          </span>
        </label>

        {certError && (
          <span className="form-field__error" role="alert">
            You must certify the information before submitting
          </span>
        )}

        <p className="submit-terms">
          By submitting this form, you agree to our terms and conditions. DNV
          will review your application and contact you within 2–3 business days.
        </p>

        {/* Action buttons row */}
        <div className="submit-actions">
          <button
            type="button"
            className="btn btn--outlined"
            onClick={() => console.log('Download as PDF — stub')}
          >
            Download as PDF
          </button>
          <button
            type="button"
            className="btn btn--outlined"
            onClick={() => console.log('Export to CSV — stub')}
          >
            Export to CSV
          </button>
        </div>
      </FormCard>

    </form>
  );
}

export default ReviewSubmit;