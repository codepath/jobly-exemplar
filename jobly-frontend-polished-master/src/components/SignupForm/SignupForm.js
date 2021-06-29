import { useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "context/auth"
import { useUiContext } from "context/ui"
import { EuiButton, EuiCheckbox, EuiFieldText, EuiForm, EuiFormRow, EuiFieldPassword, EuiSpacer } from "@elastic/eui"
import { htmlIdGenerator } from "@elastic/eui/lib/services"
import { EuiCustomLink } from "components"
import validation from "utils/validation"
import config from "config"
import "./SignupForm.css"

export default function SignupFormContainer() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const { authState, signupUser } = useAuthContext()
  const { addToast } = useUiContext()

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("/companies/")
    }
  }, [navigate, authState])

  const getFormErrors = () => {
    const errors = [formErrors.required, formErrors.terms]

    if (hasSubmitted && authState.error) {
      errors.push(authState.error)
    }

    return errors.filter(Boolean)
  }

  return (
    <Signup
      form={form}
      setForm={setForm}
      setHasSubmitted={setHasSubmitted}
      agreedToTerms={agreedToTerms}
      setAgreedToTerms={setAgreedToTerms}
      getFormErrors={getFormErrors}
      formErrors={formErrors}
      setFormErrors={setFormErrors}
      isLoading={authState.isLoading}
      signupUser={signupUser}
      addToast={addToast}
    />
  )
}

const Signup = ({
  form,
  setForm,
  isLoading,
  signupUser,
  setFormErrors,
  getFormErrors,
  agreedToTerms,
  formErrors,
  setHasSubmitted,
  setAgreedToTerms,
  addToast,
}) => {
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

  const handlePasswordConfirmChange = (value) => {
    setFormErrors((errors) => ({
      ...errors,
      passwordConfirm: form.password !== value ? `Passwords do not match.` : null,
    }))

    setForm((form) => ({ ...form, passwordConfirm: value }))
  }

  const setAgreedToTermsCheckbox = (e) => {
    setAgreedToTerms(e.target.checked)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // validate inputs before submitting
    Object.keys(form).forEach((label) => validateInput(label, form[label]))
    // if any input hasn't been entered in, return early
    if (!Object.values(form).every((value) => Boolean(value))) {
      setFormErrors((errors) => ({ ...errors, required: `You must fill out all fields.` }))
      return
    }

    // some additional validation
    if (form.password !== form.passwordConfirm) {
      setFormErrors((errors) => ({ ...errors, password: `Passwords do not match.` }))
      return
    }

    if (!agreedToTerms) {
      setFormErrors((errors) => ({ ...errors, terms: `You must agree to the terms and conditions.` }))
      return
    }

    setHasSubmitted(true)
    const res = await signupUser({
      username: form.username,
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
    })
    if (!res.success) {
      setForm((form) => ({ ...form, password: "", passwordConfirm: "" }))
      addToast({
        id: `signup-unsuccessful`,
        title: "Signup Failed",
        color: "danger",
        iconType: "danger",
        toastLifeTimeMs: config.alertDismissMs,
      })
    }
  }

  return (
    <div className="signup-form-wrapper">
      <EuiForm
        component="form"
        onSubmit={handleSubmit}
        isInvalid={Boolean(getFormErrors().length)}
        error={getFormErrors()}
      >
        <EuiFormRow
          label="Email"
          helpText="Enter the email associated with your account."
          isInvalid={Boolean(formErrors.email)}
          error={`Please enter a valid email.`}
        >
          <EuiFieldText
            icon="email"
            placeholder="user@gmail.com"
            value={form.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            aria-label="Enter the email associated with your account."
            isInvalid={Boolean(formErrors.email)}
          />
        </EuiFormRow>

        <EuiFormRow
          label="Username"
          helpText="Choose a username consisting solely of letters, numbers, underscores, and dashes."
          isInvalid={Boolean(formErrors.username)}
          error={`Please enter a valid username.`}
        >
          <EuiFieldText
            icon="user"
            placeholder="your_username"
            value={form.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            aria-label="Choose a username consisting of letters, numbers, underscores, and dashes."
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
        <EuiFormRow
          label="Confirm password"
          helpText="Confirm your password."
          isInvalid={Boolean(formErrors.passwordConfirm)}
          error={`Passwords must match.`}
        >
          <EuiFieldPassword
            placeholder="••••••••••••"
            value={form.passwordConfirm}
            onChange={(e) => handlePasswordConfirmChange(e.target.value)}
            type="dual"
            aria-label="Confirm your password."
            isInvalid={Boolean(formErrors.passwordConfirm)}
          />
        </EuiFormRow>

        {[
          { label: "First Name", value: "firstName" },
          { label: "Last Name", value: "lastName" },
        ].map(({ label, value }) => (
          <EuiFormRow
            key={label}
            label={label}
            helpText={`Your legal ${label.toLowerCase()}.`}
            isInvalid={Boolean(formErrors[value])}
            error={`Names must have less than 30 characters.`}
          >
            <EuiFieldText
              placeholder={label}
              value={form[value]}
              onChange={(e) => handleInputChange(value, e.target.value)}
              aria-label={label}
              isInvalid={Boolean(formErrors[value])}
            />
          </EuiFormRow>
        ))}

        <EuiSpacer />
        <EuiCheckbox
          id={htmlIdGenerator()()}
          label="I agree to the terms and conditions."
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTermsCheckbox(e)}
        />
        <EuiSpacer />
        <EuiButton type="submit" isLoading={isLoading} fill>
          Sign Up
        </EuiButton>
      </EuiForm>

      <EuiSpacer size="xl" />

      <span className="need-account-link">
        Already have an account? Log in <EuiCustomLink to="/login">here</EuiCustomLink>.
      </span>
    </div>
  )
}
