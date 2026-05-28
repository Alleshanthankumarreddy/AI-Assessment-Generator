import api from "./axios";


// ================= GET ALL =================

export const getAllAssignments =
  async () => {

    const teacher =
      JSON.parse(
        localStorage.getItem("teacher") || "{}"
      );

    const TeacherId =
      teacher?._id;


    const response =
      await api.get(
        "/assignment",
        {
          params: {
            TeacherId,
          },
        }
      );

    return response.data;

};


// ================= GET SINGLE =================

export const getSingleAssignment =
  async (id: string) => {

    const teacher =
      JSON.parse(
        localStorage.getItem("teacher") || "{}"
      );

    const TeacherId =
      teacher?._id;

    const response =
      await api.get(
        `/assignment/${id}`,
        {
          params: {
            TeacherId,
          },
        }
      );

    return response.data;

};


// ================= DELETE =================

export const deleteAssignment =
  async (id: string) => {

    const teacher =
      JSON.parse(
        localStorage.getItem("teacher") || "{}"
      );

    const TeacherId =
      teacher?._id;

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

    const teacher =
      JSON.parse(
        localStorage.getItem("teacher") || "{}"
      );

    const TeacherId =
      teacher?._id;

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

    const teacher =
      JSON.parse(
        localStorage.getItem("teacher") || "{}"
      );

    const TeacherId =
      teacher?._id;

    const { data } =
      await api.get(
        `/assignment/question-paper/${id}`,
        {
          params: {
            TeacherId,
          },
        }
      );

    return data;

};