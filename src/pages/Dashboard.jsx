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
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700 bg-clip-text text-transparent">
        Dashboard
      </h1>

      {/* Post Form */}
      <form
        onSubmit={savePost}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-12 space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-orange-500"
        />

        {/* Rich Text Editor */}
        <ReactQuill
          theme="snow"
          value={form.content}
          onChange={(val) => setForm({ ...form, content: val })}
          className="bg-white dark:bg-gray-900 dark:text-white rounded-lg"
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "blockquote", "code-block"],
              ["clean"],
            ],
          }}
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-orange-500"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700 hover:opacity-90 transition"
          >
            {selected ? "Update Post" : "Create Post"}
          </button>
          {selected && (
            <button
              type="button"
              onClick={() => {
                setSelected(null);
                setForm({ title: "", content: "", tags: "" });
              }}
              className="px-5 py-2.5 rounded-lg font-medium bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Existing Posts */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Existing Posts
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((p) => (
          <div
            key={p._id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {p.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {new Date(p.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-3 mt-auto">
              <button
                onClick={() => editPost(p)}
                className="px-3 py-1.5 rounded-lg bg-orange-500 text-white text-sm hover:bg-orange-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(p.slug)}
                className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
