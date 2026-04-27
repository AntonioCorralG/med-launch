import { useState } from "react";
import { useFormContext } from "../../hooks/useFormContext";
import { LOCATION_TYPES } from "../../constants";
import FormCard from "../../components/FormCard/FormCard";
import { CloudUpload } from 'lucide-react';
import "./SiteInformation.css";

function SiteInformation({ formId }) {
  const { state, updateStepData, nextStep } = useFormContext();

  const [locationType, setLocationType] = useState(
    state.siteInformation.locationType,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!locationType) return;
    updateStepData("siteInformation", { locationType });
    nextStep();
  };

  return (
    <form id={formId} onSubmit={handleSubmit} noValidate>
      <FormCard>
        <h2 className="form-card__section-title">
          Do you have multiple sites or locations?
        </h2>

        <div className="location-cards">
          <button
            type="button"
            className={`location-card ${locationType === LOCATION_TYPES.SINGLE ? "location-card--selected" : ""}`}
            onClick={() => setLocationType(LOCATION_TYPES.SINGLE)}
          >
            <span className="location-card__title">Single Location</span>
            <span className="location-card__subtitle">
              We operate from one facility only
            </span>
          </button>

          <button
            type="button"
            className={`location-card ${locationType === LOCATION_TYPES.MULTIPLE ? "location-card--selected" : ""}`}
            onClick={() => setLocationType(LOCATION_TYPES.MULTIPLE)}
          >
            <span className="location-card__title">Multiple Locations</span>
            <span className="location-card__subtitle">
              We have multiple facilities or practice locations
            </span>
          </button>
        </div>

        {!locationType && (
          <span className="form-field__error" role="alert">
            Please select a location type
          </span>
        )}

        {locationType === LOCATION_TYPES.MULTIPLE && (
          <div className="upload-section">
            <h2 className="form-card__section-title">
              How would you like to add your site information?
            </h2>

            <div className="upload-method-card">
              <span className="upload-method-card__title">
                Upload CSV / Excel
              </span>
              <span className="upload-method-card__subtitle">
                Upload a spreadsheet with all site information
              </span>
            </div>

            <div className="dropzone">
              <CloudUpload />
              <p className="dropzone__title">Upload Site Information</p>
              <p className="dropzone__subtitle">
                Drag and drop your CSV or Excel file here, or click to select
              </p>
              <button type="button" className="btn btn--primary btn--sm">
                Select file
              </button>
              <button type="button" className="dropzone__template-link">
                Download CSV Template
              </button>
            </div>
          </div>
        )}
      </FormCard>
    </form>
  );
}

export default SiteInformation;
