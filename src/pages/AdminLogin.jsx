import React, { useState } from "react";
import { api, setAuthToken } from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const prefersReducedMotion = usePrefersReducedMotion();

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
        className="w-full max-w-md bg-surface border border-border rounded-[2rem] p-8"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 50 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.8, ease: "easeOut" }
        }
      >
        <h1 className="text-2xl font-bold tracking-tighter text-text mb-6 text-center">
          Admin Login
        </h1>

        <form className="flex flex-col gap-4" onSubmit={submit}>
          <label htmlFor="admin-email" className="text-xs font-bold uppercase tracking-widest text-muted">
            Email
          </label>
          <input
            id="admin-email"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="px-4 py-3 rounded-xl border border-border bg-surface text-text focus:border-accent focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 transition-all"
          />
          <label htmlFor="admin-password" className="text-xs font-bold uppercase tracking-widest text-muted">
            Password
          </label>
          <input
            id="admin-password"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="px-4 py-3 rounded-xl border border-border bg-surface text-text focus:border-accent focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 transition-all"
          />

          <button
            type="submit"
            className="mt-2 px-4 py-3 bg-accent text-on-accent hover:bg-accent-hover font-bold rounded-full uppercase tracking-[0.2em] text-xs transition-colors"
          >
            Login
          </button>

          {err && (
            <p className="text-accent text-sm mt-2 text-center font-medium">{err}</p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
