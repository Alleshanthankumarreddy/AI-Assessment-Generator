import { create } from "zustand";

import { persist }
from "zustand/middleware";


// ================= TYPES =================

export interface QuestionConfiguration {

  type:
    | "MCQ"
    | "Descriptive"
    | "True/False"
    | "Fill in the Blanks"
    | "Match the Following"
    | "Short Answer"
    | "Long Answer";

  numberOfQuestions: number;

  marksPerQuestion: number;

  difficulty:
    | "easy"
    | "medium"
    | "hard";

}


export interface Question {

  questionText: string;

  difficulty:
    | "easy"
    | "medium"
    | "hard";

  marks: number;

}


export interface Section {

  title: string;

  instruction: string;

  questions: Question[];

}


export interface GeneratedPaper {

  _id: string;

  sections: Section[];

  generatedByAI: boolean;

}


interface Assignment {

  _id: string;

  title: string;

  subject: string;

  dueDate: string;

  status: string;

  createdAt: string;

  institution?: string;

}

// ================= STORE =================

interface AssignmentState {

  // ALL ASSIGNMENTS
  assignments: Assignment[];

  // SINGLE ASSIGNMENT
  selectedAssignment:
    Assignment | null;

  // LOADING
  loading: boolean;

  generatedPaper:
    GeneratedPaper | null;

  // SET ALL
  setAssignments: (
    assignments: Assignment[]
  ) => void;


  // ADD
  addAssignment: (
    assignment: Assignment
  ) => void;


  // SELECT
  setSelectedAssignment: (
    assignment: Assignment | null
  ) => void;


  // DELETE
  removeAssignment: (
    id: string
  ) => void;


  // LOADING
  setLoading: (
    loading: boolean
  ) => void;


  setGeneratedPaper: (
    paper: GeneratedPaper
  ) => void;

  updateAssignmentStatus: (
  id: string,
  status: string
) => void;
  // CLEAR
  clearAssignments: () => void;

}


// ================= STORE =================

const useAssignmentStore =
  create<AssignmentState>()(

    persist(

      (set) => ({

        assignments: [],

        selectedAssignment: null,

        loading: false,

        generatedPaper: null,

        // ================= SET =================
        setAssignments:
          (assignments) =>

            set({
              assignments,
            }),


        // ================= ADD =================
        addAssignment:
          (assignment) =>

            set((state) => ({

              assignments: [
                assignment,
                ...state.assignments,
              ],

            })),



        // ================= UPDATE STATUS =================
        updateAssignmentStatus:
          (id, status) =>

            set((state) => ({

              assignments:
                state.assignments.map(
                  (assignment) =>

                    assignment._id === id

                      ? {
                          ...assignment,
                          status,
                        }

                      : assignment
                ),

            })),


        // ================= SELECT =================
        setSelectedAssignment:
          (assignment) =>

            set({
              selectedAssignment:
                assignment,
            }),

        // ================= SET GENERATED PAPER =================

        setGeneratedPaper:
          (paper) =>

            set({
              generatedPaper: paper,
            }),


        // ================= DELETE =================
        removeAssignment:
          (id) =>

            set((state) => ({

              assignments:
                state.assignments.filter(
                  (assignment) =>

                    assignment._id !== id
                ),

            })),


        // ================= LOADING =================
        setLoading:
          (loading) =>

            set({ loading }),


        // ================= CLEAR =================
        clearAssignments:
          () =>

            set({

              assignments: [],

              selectedAssignment:
                null,

            }),

      }),

      {
        name:
          "vedaai-assignments",
      }

    )

  );

export default useAssignmentStore;