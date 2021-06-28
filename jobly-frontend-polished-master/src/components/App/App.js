import { useEffect } from "react"
import { Helmet } from "react-helmet"
import { AuthContextProvider, useAuthContext, selectUserFromAuthState } from "context/auth"
import { UiContextProvider, useUiContext } from "context/ui"
import { ApplicationsContextProvider, useApplicationsContext } from "context/applications"
import config from "config"
import { EuiGlobalToastList, EuiLoadingKibana, EuiSpacer } from "@elastic/eui"
import "@elastic/eui/dist/eui_theme_light.css"
import "./App.css"

import { Routes } from "components"

export default function AppContainer() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Jobly</title>
        <link rel="canonical" href="https://jobly.io" />
      </Helmet>
      <AuthContextProvider>
        <UiContextProvider>
          <ApplicationsContextProvider>
            <App />
          </ApplicationsContextProvider>
        </UiContextProvider>
      </AuthContextProvider>
    </>
  )
}

function App() {
  const { authState, fetchUserFromToken } = useAuthContext()
  const { uiState, removeToast } = useUiContext()
  const { setUserJobsAppliedFor } = useApplicationsContext()

  useEffect(() => {
    fetchUserFromToken()
  }, [fetchUserFromToken])

  useEffect(() => {
    const { isAuthenticated } = authState
    const user = selectUserFromAuthState(authState)

    if (isAuthenticated) {
      setUserJobsAppliedFor(user?.applications || [])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState])

  if (!authState.hasAttemptedAuthentication) {
    return (
      <>
        <EuiSpacer size="xl" />
        <EuiLoadingKibana size="xl" />
      </>
    )
  }

  return (
    <>
      <Routes />
      <EuiGlobalToastList
        toasts={uiState.toastList}
        dismissToast={(toast) => removeToast(toast)}
        toastLifeTimeMs={config.alertDismissMs}
        side="right"
        className="auth-toast-list"
      />
    </>
  )
}
