import api from "./axios";


// ================= GET ALL =================

export const getAllAssignments =
  async () => {

    const response =
      await api.get(
        "/assignment"
      );

    return response.data;

};


// ================= GET SINGLE =================

export const getSingleAssignment =
  async (id: string) => {

    const response =
      await api.get(
        `/assignment/${id}`
      );

    return response.data;

};


// ================= DELETE =================

export const deleteAssignment =
  async (id: string) => {

    const response =
      await api.delete(
        `/assignment/${id}`
      );

    return response.data;

};


// ================= CREATE =================

export const createAssignment =
  async (formData: FormData) => {

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

export const getQuestionPaper =
  async (id: string) => {

    const { data } =
      await api.get(

        `/assignment/question-paper/${id}`

      );

    return data;

};
