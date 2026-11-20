import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.5em] text-accent mb-6">404</p>
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
        Page Not Found
      </h1>
      <p className="text-xl text-muted font-medium mb-12 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-10 py-5 rounded-full bg-accent text-on-accent font-bold uppercase tracking-[0.2em] text-xs hover:bg-accent-hover transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
