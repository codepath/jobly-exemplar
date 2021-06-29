import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback
} from "react";
import { apiClient } from "services";
import { apiRequest } from "context/apiRequest";

const ApplicationsContext = createContext(null);

const ApplicationsActionTypes = {
  APPLY_FOR_JOB: "APPLY_FOR_JOB",
  APPLY_FOR_JOB_SUCCESS: "APPLY_FOR_JOB_SUCCESS",
  APPLY_FOR_JOB_FAILURE: "APPLY_FOR_JOB_FAILURE",
  SET_USER_JOBS_APPLIED_FOR: "SET_USER_JOBS_APPLIED_FOR"
};

const initialState = {
  isLoading: false,
  error: false,
  data: {}
};

export default function applicationsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ApplicationsActionTypes.APPLY_FOR_JOB:
      return {
        ...state,
        isLoading: true
      };
    case ApplicationsActionTypes.APPLY_FOR_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: {
          ...state.data,
          [action.data.applied]: true
        }
      };
    case ApplicationsActionTypes.APPLY_FOR_JOB_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case ApplicationsActionTypes.SET_USER_JOBS_APPLIED_FOR:
      return {
        ...state,
        data: {
          ...(action.jobs.reduce((acc, c) => {
            acc[c] = true;
            return acc;
          }, {}) || {})
        }
      };
    default:
      return state;
  }
}

export const ApplicationsContextProvider = ({ children }) => {
  const [applicationsState, dispatch] = useReducer(
    applicationsReducer,
    initialState
  );

  const applyForJob = useCallback(
    async jobId =>
      await apiRequest({
        dispatch,
        types: {
          REQUEST: ApplicationsActionTypes.APPLY_FOR_JOB,
          SUCCESS: ApplicationsActionTypes.APPLY_FOR_JOB_SUCCESS,
          FAILURE: ApplicationsActionTypes.APPLY_FOR_JOB_FAILURE
        },
        promise: async () => await apiClient.applyForJob(jobId)
      }),
    []
  );

  const setUserJobsAppliedFor = useCallback(jobs => {
    dispatch({ type: ApplicationsActionTypes.SET_USER_JOBS_APPLIED_FOR, jobs });
  }, []);

  const value = useMemo(
    () => ({ applicationsState, applyForJob, setUserJobsAppliedFor }),
    [applicationsState, applyForJob, setUserJobsAppliedFor]
  );

  return (
    <ApplicationsContext.Provider value={value}>
      <>{children}</>
    </ApplicationsContext.Provider>
  );
};

/* Select job ids user has applied for from context state */
export const selectJobIdsAppliedFor = applicationsState =>
  Object.keys(applicationsState.data).map(Number);

export const useApplicationsContext = () => useContext(ApplicationsContext);
