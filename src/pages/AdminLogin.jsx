import React, { useState } from "react";
import { api, setAuthToken } from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);
      navigate("/dashboard");
    } catch (e) {
      setErr(e?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <motion.div
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Admin Login
        </h1>

        <form className="flex flex-col gap-4" onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          />

          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition"
          >
            Login
          </button>

          {err && (
            <p className="text-red-500 text-sm mt-2 text-center font-medium">{err}</p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
