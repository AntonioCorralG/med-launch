

// STEP NAVIGATION
// The display label for each step in the progress bar.
// Index matches the step number (0 = Step 1).
export const STEP_LABELS = [
  'DNV Quote Request',
  'Facility Details',
  'Leadership Contacts',
  'Site Information',
  'Services & Certifications',
  'Review & Submit',
];
export const STEPS = [
  DnvQuoteRequest,
  FacilityDetails,
  LeadershipContacts,
  SiteInformation,
  ServicesCertifications,
  ReviewSubmit,
];

// The page title shown above the progress bar for each step.
export const STEP_TITLES = [
  'New DNV Quote Request',
  'Facility Details',
  'Leadership Contacts',
  'Site Information',
  'Services & Certifications',
  'Review & Submit',
];

export const TOTAL_STEPS = 6;
export const FIRST_STEP  = 0;
export const LAST_STEP   = TOTAL_STEPS - 1;

// FACILITY TYPES
export const FACILITY_TYPES = [
  'Short-Term Acute Care',
  'Long-Term Acute Care',
  'Critical Access',
  "Children's",
  'Free-Standing Psychiatric',
  'Other',
];

// SITE INFORMATION
export const LOCATION_TYPES = {
  SINGLE:   'single',
  MULTIPLE: 'multiple',
};

export const INPUT_METHODS = {
  UPLOAD: 'upload',
};

// SERVICES & CERTIFICATIONS
export const SERVICE_TABS = [
  'All Services',
  'Clinical',
  'Surgical',
  'Diagnostic',
  'Rehabilitation',
  'Specialty',
];

export const SERVICES = {
  'Emergency & Critical Care': [
    'Emergency Department',
    'Neonatal Intensive Care Services',
    'Pediatric Intensive Care Services',
  ],
  'Cardiac Services': [
    'Cardiac Catheterization Laboratory',
    'Open Heart',
  ],
  'Diagnostic Services': [
    'Magnetic Resonance Imaging (MRI)',
    'Diagnostic Radioisotope Facility',
    'Lithotripsy',
  ],
  'Rehabilitation Services': [
    'Physical Rehabilitation Services',
    'Physical Therapy',
    'Occupational Therapy',
    'Speech/Language Therapy',
    'Audiology',
  ],
};

// US STATES for dropdown (AI generated)
export const US_STATES = [
  { label: 'Alabama',        value: 'AL' },
  { label: 'Alaska',         value: 'AK' },
  { label: 'Arizona',        value: 'AZ' },
  { label: 'Arkansas',       value: 'AR' },
  { label: 'California',     value: 'CA' },
  { label: 'Colorado',       value: 'CO' },
  { label: 'Connecticut',    value: 'CT' },
  { label: 'Delaware',       value: 'DE' },
  { label: 'Florida',        value: 'FL' },
  { label: 'Georgia',        value: 'GA' },
  { label: 'Hawaii',         value: 'HI' },
  { label: 'Idaho',          value: 'ID' },
  { label: 'Illinois',       value: 'IL' },
  { label: 'Indiana',        value: 'IN' },
  { label: 'Iowa',           value: 'IA' },
  { label: 'Kansas',         value: 'KS' },
  { label: 'Kentucky',       value: 'KY' },
  { label: 'Louisiana',      value: 'LA' },
  { label: 'Maine',          value: 'ME' },
  { label: 'Maryland',       value: 'MD' },
  { label: 'Massachusetts',  value: 'MA' },
  { label: 'Michigan',       value: 'MI' },
  { label: 'Minnesota',      value: 'MN' },
  { label: 'Mississippi',    value: 'MS' },
  { label: 'Missouri',       value: 'MO' },
  { label: 'Montana',        value: 'MT' },
  { label: 'Nebraska',       value: 'NE' },
  { label: 'Nevada',         value: 'NV' },
  { label: 'New Hampshire',  value: 'NH' },
  { label: 'New Jersey',     value: 'NJ' },
  { label: 'New Mexico',     value: 'NM' },
  { label: 'New York',       value: 'NY' },
  { label: 'North Carolina', value: 'NC' },
  { label: 'North Dakota',   value: 'ND' },
  { label: 'Ohio',           value: 'OH' },
  { label: 'Oklahoma',       value: 'OK' },
  { label: 'Oregon',         value: 'OR' },
  { label: 'Pennsylvania',   value: 'PA' },
  { label: 'Rhode Island',   value: 'RI' },
  { label: 'South Carolina', value: 'SC' },
  { label: 'South Dakota',   value: 'SD' },
  { label: 'Tennessee',      value: 'TN' },
  { label: 'Texas',          value: 'TX' },
  { label: 'Utah',           value: 'UT' },
  { label: 'Vermont',        value: 'VT' },
  { label: 'Virginia',       value: 'VA' },
  { label: 'Washington',     value: 'WA' },
  { label: 'West Virginia',  value: 'WV' },
  { label: 'Wisconsin',      value: 'WI' },
  { label: 'Wyoming',        value: 'WY' },
];


export const ACTIONS = {
  SET_STEP:         'SET_STEP',
  UPDATE_STEP_DATA: 'UPDATE_STEP_DATA',
};