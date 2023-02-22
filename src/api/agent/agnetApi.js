import axios from "../axiosInstance";

export const agentLogin = async (email, password) => {
  try {
    const response = await axios.post("/auth/agent/login", { email, password });
    return response;
  } catch (err) {
    return err.response;
  }
};

//* AGENT REGISTERATION *//
export const agentRegister = async (formData) => {
  try {
    const form = new FormData();
    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("phone", formData.phone);
    form.append("city", formData.city);
    form.append("address", formData.address);
    form.append("image", formData.picture);

    const response = await axios.post("/auth/agent/register", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// * fetch complete bus list *//

export const getBusList = async (token) => {
  try {
    const response = await axios.get("/agent/bus-list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// * booking *//

export const booking = async (id, token) => {
  try {
    const response = await axios.get("/agent/book-seat", {
      params: {
        id: id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

//*   get Avaiable seats      *//
export const getAvaSeats = async (token) => {
  try {
    const response = await axios.get("/agent/seats", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

//*  ADD BOOKING *//

export const addBooking = async (passenges, id, token) => {
  try {
    const response = await axios.post(
      "/agent/booking",
      { passenger: passenges, id: id },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

//* BOOKED SEATS *//

export const getBookedSeats = async (id, token) => {
  try {
    const response = await axios.get("/agent/booked-seats", {
      params: {
        id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
