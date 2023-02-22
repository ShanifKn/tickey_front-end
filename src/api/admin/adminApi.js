import axios from "../axiosInstance";

//* LOGIN *//
export const login = async (email, password) => {
  try {
    const response = await axios.post(`/auth/admin/login`, { email, password });
    const data = response.data;
    return data;
  } catch (e) {
    return e.response;
  }
};

//* INVITE REQUEST *//
export const inviteAgent = async (email, name, token) => {
  try {
    const form = new FormData();
    form.append("email", email);
    form.append("name", name);

    const response = await axios.post(`/admin/invite`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

//* get agent list *//
export const getAgentList = async (token) => {
  try {
    const response = await axios.get("/admin/agents-list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// * add buss *//

export const addBus = async (fromData, token) => {
  try {
    const form = new FormData();
    form.append("start", fromData.start);
    form.append("drop", fromData.drop);
    form.append("rows", fromData.rows);

    const response = await axios.post("/admin/add-bus", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// * ASSIGN SEATS FOR AGENTS *//
export const bookSeats = async (id, seats, token) => {
  try {
    const response = await axios.patch(
      "/admin/book-seats",
      { id, seats },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
