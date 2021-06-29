import { useEffect } from "react";
import { EuiLoadingSpinner } from "@elastic/eui";
import { LoginPage } from "components";
import { useAuthContext } from "context/auth";
import { useUiContext } from "context/ui";
import config from "config";

export default function ProtectedRoute({ element: Component, ...props }) {
  const { authState } = useAuthContext();
  const { addToast } = useUiContext();

  useEffect(() => {
    const { hasAttemptedAuthentication, isAuthenticated, isLoading } =
      authState;
    if (hasAttemptedAuthentication && !isAuthenticated && !isLoading) {
      addToast({
        id: `not-allowed-protected-route`,
        title: "Authentication required.",
        color: "danger",
        iconType: "danger",
        toastLifeTimeMs: config.alertDismissMs
      });
    }
  }, [authState, addToast]);

  if (!authState.hasAttemptedAuthentication)
    return <EuiLoadingSpinner size="xl" />;

  if (!authState.isAuthenticated) {
    return (
      <>
        <LoginPage />
      </>
    );
  }

  return <Component {...props} />;
}
