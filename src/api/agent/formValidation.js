export const formValidation = (formData) => {
  if (
    formData.firstName === "" ||
    formData.lastName === "" ||
    formData.email === "" ||
    formData.phone === "" ||
    formData.password === "" ||
    formData.address === "" ||
    formData.city === "" ||
    formData.picturePath === ""
  ) {
    return "All fields are required.";
  }

  if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
    return "Invalid email address.";
  }

  if (!/^\d{10}$/.test(formData.phone)) {
    return "Invalid phone number. Phone number must be 10 digits long.";
  }

  if (formData.password.length < 6) {
    return "Password must be at least 8 characters long.";
  }

  return null;
};

export const validateFrom = (formData) => {
  if (formData.email === "" || formData.password === "") {
    return "All fields are required.";
  }
  if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
    return "Invalid email address.";
  }

  return null;
};

export const validatefrom = (email, password) => {
  if (email === "" || password === "") {
    return "All fields are required.";
  }
  if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return "Invalid email address.";
  }

  return null;
};
