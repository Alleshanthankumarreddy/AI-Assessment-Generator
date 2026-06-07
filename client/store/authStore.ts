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


}

const useAuthStore =
  create<AuthState>((set) => ({

    teacher: null,

    isAuthenticated: false,

    loading: false,

    // ================= LOGIN =================

    login: (teacher) => {

      set({

        teacher,

        isAuthenticated: true,

      });

    },

    // ================= LOGOUT =================

    logout: () => {

      set({

        teacher: null,

        isAuthenticated: false,

      });

    },

    // ================= LOADING =================

    setLoading: (loading) => {

      set({ loading });

    },


  }));

export default useAuthStore;