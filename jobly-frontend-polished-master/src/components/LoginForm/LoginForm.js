import { memo, useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "context/auth"
import { useUiContext } from "context/ui"
import { EuiButton, EuiFieldText, EuiForm, EuiFormRow, EuiFieldPassword, EuiSpacer } from "@elastic/eui"
import { EuiCustomLink } from "components"
import validation from "utils/validation"
import config from "config"
import "./LoginForm.css"

export default function LoginFormContainer() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    password: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const { authState, loginUser } = useAuthContext()
  const { addToast } = useUiContext()

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("/companies/")
    }
  }, [navigate, authState])

  const getFormErrors = () => {
    const errors = [formErrors.required]

    if (hasSubmitted && authState.error) {
      errors.push(authState.error)
    }

    return errors.filter(Boolean)
  }

  return (
    <LoginForm
      form={form}
      setForm={setForm}
      setHasSubmitted={setHasSubmitted}
      getFormErrors={getFormErrors}
      formErrors={formErrors}
      setFormErrors={setFormErrors}
      isLoading={authState.isLoading}
      loginUser={loginUser}
      addToast={addToast}
    />
  )
}

const LoginForm = memo(
  ({ form, setForm, isLoading, loginUser, setFormErrors, getFormErrors, formErrors, setHasSubmitted, addToast }) => {
    const validateInput = useCallback(
      (label, value) => {
        // grab validation function and run it on input if it exists
        // if it doesn't exists, just assume the input is valid
        const isValid = validation?.[label] ? validation?.[label]?.(value) : true
        // set an error if the validation function returns false
        setFormErrors((errors) => ({ ...errors, [label]: !isValid }))
      },
      [setFormErrors]
    )

    const handleInputChange = useCallback(
      (label, value) => {
        validateInput(label, value)

        setForm((form) => ({ ...form, [label]: value }))
      },
      [validateInput, setForm]
    )

    const handleSubmit = async (e) => {
      e.preventDefault()

      // validate inputs before submitting
      Object.keys(form).forEach((label) => validateInput(label, form[label]))
      // if any input hasn't been entered in, return early
      if (!Object.values(form).every((value) => Boolean(value))) {
        setFormErrors((errors) => ({ ...errors, form: `You must fill out all fields.` }))
        return
      }

      setHasSubmitted(true)
      const res = await loginUser(form)
      // reset the password form state if the login attempt is not successful
      if (!res.success) {
        setForm((form) => ({ ...form, password: "" }))
        addToast({
          id: `login-unsuccessful`,
          title: "Authentication Failed",
          color: "danger",
          iconType: "danger",
          toastLifeTimeMs: config.alertDismissMs,
        })
      }
    }

    return (
      <div className="login-form-wrapper">
        <EuiForm
          component="form"
          onSubmit={handleSubmit}
          isInvalid={Boolean(getFormErrors().length)}
          error={getFormErrors()}
        >
          <EuiFormRow
            label="username"
            helpText="Enter the username associated with your account consisting solely of letters, numbers, underscores, and dashes."
            isInvalid={Boolean(formErrors.username)}
            error={`Please enter a valid username.`}
          >
            <EuiFieldText
              icon="user"
              placeholder="your_username"
              value={form.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              aria-label="Enter the username associated with your account consisting solely of letters, numbers, underscores, and dashes."
              isInvalid={Boolean(formErrors.username)}
            />
          </EuiFormRow>

          <EuiFormRow
            label="Password"
            helpText="Enter your password."
            isInvalid={Boolean(formErrors.password)}
            error={`Password must be at least 5 characters.`}
          >
            <EuiFieldPassword
              placeholder="••••••••••••"
              value={form.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              type="dual"
              aria-label="Enter your password."
              isInvalid={Boolean(formErrors.password)}
            />
          </EuiFormRow>
          <EuiSpacer />
          <EuiButton type="submit" fill isLoading={isLoading}>
            Submit
          </EuiButton>
        </EuiForm>

        <EuiSpacer size="xl" />
        <span className="have-account-link">
          Need an account? Sign up <EuiCustomLink to="/registration">here</EuiCustomLink>.
        </span>
      </div>
    )
  }
)
