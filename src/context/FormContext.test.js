import { formReducer, initialState } from './FormContext';
import { ACTIONS } from '../constants';

describe('formReducer', () => {
  it('SET_STEP updates currentStep', () => {
    const action = { type: ACTIONS.SET_STEP, payload: 3 };
    const newState = formReducer(initialState, action);
    expect(newState.currentStep).toBe(3);
  });

  it('UPDATE_STEP_DATA merges data into the correct step', () => {
    const action = {
      type: ACTIONS.UPDATE_STEP_DATA,
      payload: { step: 'facilityDetails', data: { facilityType: 'Critical Access' } }
    };
    const newState = formReducer(initialState, action);
    expect(newState.facilityDetails.facilityType).toBe('Critical Access');
    // Other step data should be untouched
    expect(newState.dnvQuoteRequest.legalEntityName).toBe('');
  });

  it('throws on unknown action type', () => {
    expect(() => formReducer(initialState, { type: 'FAKE_ACTION' })).toThrow();
  });
});