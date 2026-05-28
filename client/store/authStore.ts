"use client";

import { create } from "zustand";

// ================= TYPES =================

interface Teacher {

  _id: string;

  name: string;

  email: string;

  subject: string;

  institution: string;

  institutionLocation: {

    city: string;

    state: string;

    country: string;

  };

}

// ================= STORE =================

interface AuthState {

  teacher: Teacher | null;

  isAuthenticated: boolean;

  loading: boolean;

  login: (
    teacher: Teacher
  ) => void;

  logout: () => void;

  setLoading: (
    loading: boolean
  ) => void;

  restoreAuth: () => void;

}

const useAuthStore =
  create<AuthState>((set) => ({

    teacher: null,

    isAuthenticated: false,

    loading: false,

    // ================= LOGIN =================

    login: (teacher) => {

      localStorage.setItem(

        "teacher",

        JSON.stringify(teacher)

      );

      set({

        teacher,

        isAuthenticated: true,

      });

    },

    // ================= LOGOUT =================

    logout: () => {

      localStorage.removeItem(
        "teacher"
      );

      set({

        teacher: null,

        isAuthenticated: false,

      });

    },

    // ================= LOADING =================

    setLoading: (loading) => {

      set({ loading });

    },

    // ================= RESTORE =================

    restoreAuth: () => {

      const storedTeacher =
        localStorage.getItem(
          "teacher"
        );

      if (storedTeacher) {

        set({

          teacher:
            JSON.parse(
              storedTeacher
            ),

          isAuthenticated: true,

        });

      }

    },

  }));

export default useAuthStore;