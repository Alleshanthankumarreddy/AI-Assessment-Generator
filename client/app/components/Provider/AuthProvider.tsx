"use client";

import { useEffect } from "react";

import useAuthStore
from "../../../store/authStore";

import api from "../../../lib/axios";


export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const { login, logout } = useAuthStore();

  useEffect(() => {

     const loadTeacher =
      async () => {

        try {

          const { data } =
            await api.get("/auth/me");

          login(data.teacher);

        } catch {

          logout();

        }

      };

    loadTeacher();

  }, []);

  return <>{children}</>;
}