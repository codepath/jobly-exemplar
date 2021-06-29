import { useState, useEffect, useCallback } from "react";
import { useAuthContext, selectUserFromAuthState } from "context/auth";
import { useUiContext } from "context/ui";
import validation from "utils/validation";
import config from "config";

export const useProfileForm = ({ profile, setIsEditing }) => {
  const [form, setForm] = useState({
    password: profile?.password || "",
    email: profile?.email || "",
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || ""
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const { authState, updateUserProfile } = useAuthContext();
  const user = selectUserFromAuthState(authState);
  const { addToast } = useUiContext();

  useEffect(() => {
    if (user) {
      setForm({
        password: user.password || "",
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || ""
      });
    }
  }, [user]);

  const validateInput = useCallback(
    (field, value) => {
      // grab validation function and run it on input if it exists
      // if it doesn't exists, just assume the input is valid
      const isValid = validation?.[field] ? validation?.[field]?.(value) : true;
      // set an error if the validation function returns false
      setFormErrors(errors => ({ ...errors, [field]: !isValid }));
    },
    [setFormErrors]
  );

  const handleInputChange = useCallback(
    (field, value) => {
      validateInput(field, value);

      setForm(form => ({ ...form, [field]: value }));
    },
    [validateInput, setForm]
  );

  const getFormErrors = () => {
    const errors = [];

    if (hasSubmitted && authState.error) {
      errors.push(authState.error);
    }

    return errors.filter(Boolean);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // only update fields that have changed
    const fieldsToUpdate = Object.keys(form)
      .filter(field => Boolean(form[field]))
      .filter(field => form[field] !== user[field]);

    // validate inputs before submitting
    fieldsToUpdate.forEach(field => validateInput(field, form[field]));

    // not doing anything with the validation before submit
    const profileUpdate = fieldsToUpdate.reduce((acc, c) => {
      acc[c] = form[c];
      return acc;
    }, {});

    setHasSubmitted(true);

    const res = await updateUserProfile(profileUpdate);
    if (res.success) {
      addToast({
        id: `profile-update-successful`,
        title: "Success!",
        color: "primary",
        // color: "success",
        iconType: "checkInCircleFilled",
        toastLifeTimeMs: config.alertDismissMs
      });
      setIsEditing(false);
    } else {
      addToast({
        id: `profile-update-unsuccessful`,
        title: "Profile Update Failed",
        color: "danger",
        iconType: "alsert",
        toastLifeTimeMs: config.alertDismissMs
      });
    }
  };

  return {
    form,
    formErrors,
    getFormErrors,
    handleInputChange,
    handleSubmit,
    isUpdating: authState.isUpdating
  };
};
