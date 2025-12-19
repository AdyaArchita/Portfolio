import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function PostCard({ post }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between h-full hover:shadow-xl transition-shadow duration-300"
    >
      {/* Title */}
      <h3 className="text-xl font-bold font-k2d mb-2">
        <Link
          to={`/Projects/${post.slug}`}
          className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          {post.title}
        </Link>
      </h3>

      {/* Date */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      {/* Content Preview */}
      <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow line-clamp-4">
        {post.content}
      </p>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto">
          {post.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-orange-200 to-orange-300 text-orange-900 dark:from-orange-700 dark:to-orange-600 dark:text-orange-100"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
