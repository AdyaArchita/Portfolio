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
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <motion.div
        className="w-full max-w-md bg-surface border border-border rounded-[2rem] p-8 shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold tracking-tighter text-primary mb-6 text-center">
          Admin Login
        </h1>

        <form className="flex flex-col gap-4" onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="px-4 py-3 rounded-xl border border-border bg-bg text-primary focus:border-accent focus:outline-none transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="px-4 py-3 rounded-xl border border-border bg-bg text-primary focus:border-accent focus:outline-none transition-all"
          />

          <button
            type="submit"
            className="mt-2 px-4 py-3 bg-slate-900 dark:bg-white hover:opacity-90 text-white dark:text-slate-900 font-bold rounded-full uppercase tracking-[0.2em] text-xs transition-all"
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
