import React, { useEffect, useState } from "react";
import { api, setAuthToken } from "../services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", tags: "" });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
    load();
  }, []);

  const load = async () => {
    const { data } = await api.get("/posts");
    setPosts(data);
  };

  const savePost = async (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      content: form.content,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    if (selected?.slug) {
      await api.put(`/posts/${selected.slug}`, payload);
    } else {
      await api.post("/posts", payload);
    }
    setForm({ title: "", content: "", tags: "" });
    setSelected(null);
    load();
  };

  const editPost = (p) => {
    setSelected(p);
    setForm({
      title: p.title,
      content: p.content,
      tags: (p.tags || []).join(", "),
    });
  };

  const deletePost = async (slug) => {
    await api.delete(`/posts/${slug}`);
    if (selected?.slug === slug) setSelected(null);
    load();
  };

  return (
    <div className="min-h-screen bg-bg text-text pt-32 pb-32 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Dashboard
          </h1>
          <p className="text-muted font-medium">
            Manage your portfolio content and posts.
          </p>
        </header>

        {/* Post Form */}
        <form
          onSubmit={savePost}
          className="bg-surface border border-border rounded-3xl p-8 mb-24 space-y-6"
        >
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted px-1">
              Post Title
            </label>
            <input
              type="text"
              placeholder="Enter title..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full rounded-2xl border border-border bg-surface text-text px-6 py-4 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted px-1">
              Content
            </label>
            <div className="rounded-2xl overflow-hidden border border-border bg-surface">
              <ReactQuill
                theme="snow"
                value={form.content}
                onChange={(val) => setForm({ ...form, content: val })}
                className="text-text"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "blockquote", "code-block"],
                    ["clean"],
                  ],
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted px-1">
              Tags
            </label>
            <input
              type="text"
              placeholder="React, Design, GSAP..."
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="w-full rounded-2xl border border-border bg-surface text-text px-6 py-4 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest text-on-accent bg-accent hover:bg-accent-hover transition-colors active:scale-95"
            >
              {selected ? "Update Entry" : "Publish Entry"}
            </button>
            {selected && (
              <button
                type="button"
                onClick={() => {
                  setSelected(null);
                  setForm({ title: "", content: "", tags: "" });
                }}
                className="px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest border border-border hover:bg-surface transition-all"
              >
                Discard
              </button>
            )}
          </div>
        </form>

        {/* Existing Posts */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold tracking-tighter text-text">
            Recent Entries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((p) => (
              <div
                key={p._id}
                className="group p-8 rounded-3xl bg-surface border border-border hover:border-accent/30 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-text mb-2 group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted mb-6">
                    {new Date(p.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => editPost(p)}
                    className="text-xs font-bold uppercase tracking-widest text-text hover:underline underline-offset-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePost(p.slug)}
                    className="text-xs font-bold uppercase tracking-widest text-accent hover:underline underline-offset-4"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
