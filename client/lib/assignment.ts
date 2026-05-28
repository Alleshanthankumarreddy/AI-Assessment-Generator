import api from "./axios";

const TeacherId =
  localStorage.getItem("TeacherId");


// ================= GET ALL =================

export const getAllAssignments =
  async () => {

    const response =
      await api.get(
        "/assignment",
        {
          data: {
            TeacherId,
          },
        }
      );

    return response.data;

};


// ================= GET SINGLE =================

export const getSingleAssignment =
  async (id: string) => {

    const response =
      await api.get(
        `/assignment/${id}`,
        {
          data: {
            TeacherId,
          },
        }
      );

    return response.data;

};


// ================= DELETE =================

export const deleteAssignment =
  async (id: string) => {

    const response =
      await api.delete(
        `/assignment/${id}`,
        {
          data: {
            TeacherId,
          },
        }
      );

    return response.data;

};


// ================= CREATE =================

export const createAssignment =
  async (formData: FormData) => {

    formData.append(
      "TeacherId",
      TeacherId || ""
    );

    const response =
      await api.post(
        "/assignment/create",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;

};


// ================= QUESTION PAPER =================

export const getQuestionPaper =
  async (id: string) => {

    const { data } =
      await api.get(
        `/assignment/question-paper/${id}`,
        {
          data: {
            TeacherId,
          },
        }
      );

    return data;

};