import { createContext, useReducer } from "react";
import { ACTIONS } from '../constants';
export const initialState = {
  currentStep: 0,
  dnvQuoteRequest: {
    legalEntityName: "",
    dbaName: "",
    dbaIsSameAsLegal: false,
    primaryContact: {
      firstName: "",
      lastName: "",
      title: "",
      workPhone: "",
      cellPhone: "",
      email: "",
      emailVerified: false,
    },
  },
  facilityDetails: {
    facilityType: "",
  },
  leadershipContacts: {
    ceo: {
      sameAsPrimary: false,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
    directorOfQuality: {
      sameAsPrimary: false,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
    invoicingContact: {
      sameAsPrimary: false,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      billingAddress: { street: "", city: "", state: "", zip: "" },
    },
  },
siteInformation: {
  locationType: '',  // 'single' | 'multiple'
  multipleLocations: {
    inputMethod: 'upload',  // only multiple locations support upload as per figma
    uploadedFiles: [],
  },
},
  servicesCertifications: {
    selectedServices: [],
    otherServices: [],
    standardsToApply: [],
    strokeCertExpiration: "",
    dateOfApplication: "",
    thrombolyticDates: [],
    thrombectomyDates: [],
  },
};

export function formReducer(state, action) {
  switch (action.type) {
    // hndle action types to update state
    case ACTIONS.SET_CURRENT_STEP:
      return { ...state, currentStep: action.payload };
    // update step specific data
    case ACTIONS.UPDATE_STEP_DATA:
      const { step, data } = action.payload;
      return { ...state, [step]: { ...state[step], ...data } };
    default:
      // throw an error for unknown actions
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

// create context to prevent prop drilling
// separate contexts to prevent unecessary re-renders
export const FormStateContext = createContext(null);
export const FormDispatchContext = createContext(null);

export function FormProvider({ children }) {
 // useReducer to manage form state and dispatch
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormStateContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormStateContext.Provider>
  );
}
