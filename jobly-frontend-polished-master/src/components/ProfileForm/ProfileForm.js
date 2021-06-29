import { EuiButton, EuiFieldText, EuiForm, EuiFormRow, EuiFieldPassword, EuiSpacer } from "@elastic/eui"
import { useProfileForm } from "hooks/useProfileForm"
import "./ProfileForm.css"

export default function ProfileForm({ setIsEditing }) {
  const { isUpdating, form, formErrors, getFormErrors, handleInputChange, handleSubmit } = useProfileForm({
    setIsEditing,
  })

  return (
    <div className="profile-form-wrapper">
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
          label="Change Password"
          helpText="Enter a new password."
          isInvalid={Boolean(formErrors.password)}
          error={`Password must be at least 5 characters.`}
        >
          <EuiFieldPassword
            placeholder="••••••••••••"
            value={form.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            type="dual"
            aria-label="Enter a new password."
            isInvalid={Boolean(formErrors.password)}
          />
        </EuiFormRow>

        {[
          { label: "First Name", value: "firstName" },
          { label: "Last Name", value: "lastName" },
        ].map(({ label, value }) => (
          <EuiFormRow key={label} label={label} helpText={`Your legal ${label.toLowerCase()}.`}>
            <EuiFieldText
              placeholder={label}
              value={form[value]}
              onChange={(e) => handleInputChange(value, e.target.value)}
              aria-label={label}
              isInvalid={Boolean(formErrors[value])}
            />
          </EuiFormRow>
        ))}

        <EuiSpacer size="m" />

        <EuiButton type="submit" isLoading={isUpdating} fill iconType="save" iconSide="right">
          Save Profile
        </EuiButton>
      </EuiForm>
    </div>
  )
}
