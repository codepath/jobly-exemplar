import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback
} from "react";
import { apiClient } from "services";
import { apiRequest } from "context/apiRequest";

const AuthContext = createContext(null);

const AuthActionTypes = {
  LOGOUT_USER: "LOGOUT_USER",
  LOGIN_USER: "LOGIN_USER",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",
  LOGIN_USER_FAILURE: "LOGIN_USER_FAILURE",
  SIGNUP_USER: "SIGNUP_USER",
  SIGNUP_USER_SUCCESS: "SIGNUP_USER_SUCCESS",
  SIGNUP_USER_FAILURE: "SIGNUP_USER_FAILURE",
  FETCH_USER_FROM_TOKEN: "FETCH_USER_FROM_TOKEN",
  FETCH_USER_FROM_TOKEN_SUCCESS: "FETCH_USER_FROM_TOKEN_SUCCESS",
  FETCH_USER_FROM_TOKEN_FAILURE: "FETCH_USER_FROM_TOKEN_FAILURE",
  UPDATE_USER_PROFILE: "UPDATE_USER_PROFILE",
  UPDATE_USER_PROFILE_SUCCESS: "UPDATE_USER_PROFILE_SUCCESS",
  UPDATE_USER_PROFILE_FAILURE: "UPDATE_USER_PROFILE_FAILURE"
};

const initialState = {
  isLoading: false,
  isUpdating: false,
  isAuthenticated: false,
  user: null,
  error: null,
  hasAttemptedAuthentication: false
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case AuthActionTypes.LOGIN_USER:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case AuthActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: null,
        user: {
          ...(state.user || {}),
          ...action.data.user
        }
      };
    case AuthActionTypes.LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        hasAttemptedAuthentication: true
      };
    case AuthActionTypes.SIGNUP_USER:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case AuthActionTypes.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: null,
        user: {
          ...(state.user || {}),
          ...action.data.user
        }
      };
    case AuthActionTypes.SIGNUP_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        hasAttemptedAuthentication: true
      };
    case AuthActionTypes.FETCH_USER_FROM_TOKEN:
      return {
        ...state,
        isLoading: true
      };
    case AuthActionTypes.FETCH_USER_FROM_TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.data.user,
        isAuthenticated: true,
        error: null,
        hasAttemptedAuthentication: true
      };
    case AuthActionTypes.FETCH_USER_FROM_TOKEN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        hasAttemptedAuthentication: true
      };
    case AuthActionTypes.UPDATE_USER_PROFILE:
      return {
        ...state,
        isUpdating: true,
        error: null
      };
    case AuthActionTypes.UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        error: null,
        user: {
          ...state.user,
          ...action.data.user
        }
      };
    case AuthActionTypes.UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        isUpdating: false,
        error: action.error
      };
    case AuthActionTypes.LOGOUT_USER:
      return { ...initialState, hasAttemptedAuthentication: true };
    default:
      return state;
  }
}

export const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  console.debug({ authState });

  const loginUser = useCallback(
    async credentials =>
      await apiRequest({
        dispatch,
        types: {
          REQUEST: AuthActionTypes.LOGIN_USER,
          SUCCESS: AuthActionTypes.LOGIN_USER_SUCCESS,
          FAILURE: AuthActionTypes.LOGIN_USER_FAILURE
        },
        promise: async () => await apiClient.loginUser(credentials)
      }),
    []
  );

  const signupUser = useCallback(
    async credentials =>
      await apiRequest({
        dispatch,
        types: {
          REQUEST: AuthActionTypes.SIGNUP_USER,
          SUCCESS: AuthActionTypes.SIGNUP_USER_SUCCESS,
          FAILURE: AuthActionTypes.SIGNUP_USER_FAILURE
        },
        promise: async () => await apiClient.signupUser(credentials)
      }),
    []
  );

  const fetchUserFromToken = useCallback(
    async () =>
      await apiRequest({
        dispatch,
        types: {
          REQUEST: AuthActionTypes.FETCH_USER_FROM_TOKEN,
          SUCCESS: AuthActionTypes.FETCH_USER_FROM_TOKEN_SUCCESS,
          FAILURE: AuthActionTypes.FETCH_USER_FROM_TOKEN_FAILURE
        },
        promise: async () => await apiClient.fetchUserFromToken()
      }),
    []
  );

  const updateUserProfile = useCallback(
    async profileUpdates =>
      await apiRequest({
        dispatch,
        types: {
          REQUEST: AuthActionTypes.UPDATE_USER_PROFILE,
          SUCCESS: AuthActionTypes.UPDATE_USER_PROFILE_SUCCESS,
          FAILURE: AuthActionTypes.UPDATE_USER_PROFILE_FAILURE
        },
        promise: async () => await apiClient.updateUserProfile(profileUpdates)
      }),
    []
  );

  const logoutUser = useCallback(async () => {
    await apiClient.logoutUser();
    dispatch({ type: AuthActionTypes.LOGOUT_USER });
  }, []);

  const value = useMemo(
    () => ({
      authState,
      loginUser,
      signupUser,
      fetchUserFromToken,
      updateUserProfile,
      logoutUser
    }),
    [
      authState,
      loginUser,
      signupUser,
      fetchUserFromToken,
      updateUserProfile,
      logoutUser
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      <>{children}</>
    </AuthContext.Provider>
  );
};

/* Select authenticated user from context state */
export const selectUserFromAuthState = authState => authState?.user;

export const useAuthContext = () => useContext(AuthContext);
