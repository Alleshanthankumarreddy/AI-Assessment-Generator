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

  // Teacher Data
  teacher: Teacher | null;

  // Auth Status
  isAuthenticated: boolean;

  // Loading
  loading: boolean;


  // LOGIN / REGISTER
  login: (
    teacher: Teacher
  ) => void;


  // LOGOUT
  logout: () => void;


  // LOADING
  setLoading: (
    loading: boolean
  ) => void;


  // RESTORE USER
  restoreAuth: () => void;

}


const useAuthStore =
  create<AuthState>((set) => ({

    teacher: null,

    isAuthenticated: false,

    loading: false,


    // ================= LOGIN =================
    login: (teacher) => {

      // STORE TEACHER
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

      // REMOVE FROM STORAGE
      localStorage.removeItem(
        "teacher"
      );

      set({

        teacher: null,

        isAuthenticated: false,

      });

    },


    // ================= LOADING =================
    setLoading: (loading) =>

      set({ loading }),


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