import api from "./axios";

export const logoutTeacher =
  async () => {

    const response =
      await api.get(
        "/auth/logout"
      );

    return response.data;

};