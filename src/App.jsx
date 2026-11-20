import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Preloader from "./components/layout/Preloader";
import ScrollToTop from "./components/layout/ScrollToTop";
import Footer from "./components/layout/Footer";
import { ThemeProvider } from "./context/ThemeContext";

// Lazy-loaded pages — each becomes its own JS chunk
const Home         = lazy(() => import("./pages/Home"));
const About        = lazy(() => import("./pages/About"));
const Contact      = lazy(() => import("./pages/Contact"));
const Projects     = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const AdminLogin   = lazy(() => import("./pages/AdminLogin"));
const Dashboard    = lazy(() => import("./pages/Dashboard"));
const NotFound     = lazy(() => import("./pages/NotFound"));

/** Minimal full-screen fallback shown while a chunk loads */
function PageLoader() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <span className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen transition-colors duration-500">
      <Preloader />
      <Navbar />
      <ScrollToTop />
      <main id="main-content">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/projects"       element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/about"          element={<About />} />
          <Route path="/contact"        element={<Contact />} />
          <Route path="/admin"          element={<AdminLogin />} />
          <Route path="/dashboard"      element={<Dashboard />} />
          <Route path="*"              element={<NotFound />} />
        </Routes>
      </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}