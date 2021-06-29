import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback
} from "react";

const UiContext = createContext(null);

const UiActionTypes = {
  ADD_TOAST: "ADD_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST"
};

const initialState = {
  toastList: []
};

export default function uiReducer(state = initialState, action = {}) {
  switch (action.type) {
    case UiActionTypes.ADD_TOAST:
      return {
        ...state,
        toastList: state.toastList.map(t => t.id).includes(action.toast.id)
          ? state.toastList
          : [...state.toastList, action.toast]
      };
    case UiActionTypes.REMOVE_TOAST:
      return {
        ...state,
        toastList: state.toastList.filter(toast => toast.id !== action.toastId)
      };
    default:
      return state;
  }
}

export const UiContextProvider = ({ children }) => {
  const [uiState, dispatch] = useReducer(uiReducer, initialState);

  const addToast = useCallback(
    toast => dispatch({ type: UiActionTypes.ADD_TOAST, toast }),
    []
  );
  const removeToast = useCallback(
    toast => dispatch({ type: UiActionTypes.REMOVE_TOAST, toastId: toast.id }),
    []
  );

  const value = useMemo(
    () => ({ uiState, addToast, removeToast }),
    [uiState, addToast, removeToast]
  );

  return (
    <UiContext.Provider value={value}>
      <>{children}</>
    </UiContext.Provider>
  );
};

export const useUiContext = () => useContext(UiContext);
