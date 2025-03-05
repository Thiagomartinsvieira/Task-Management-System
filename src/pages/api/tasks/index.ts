import { NextApiRequest, NextApiResponse } from "next";
import taskDb from "@/lib/db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Handle GET request - return all tasks
    if (req.method === "GET") {
      const tasks = taskDb.getAll();
      return res.status(200).json(tasks);
    }

    // Handle POST request - create a new task
    if (req.method === "POST") {
      const { title } = req.body;

      if (!title || typeof title !== "string") {
        return res
          .status(400)
          .json({ error: "Title is required and must be a string" });
      }

      const newTask = taskDb.create(title);
      return res.status(201).json(newTask);
    }

    // Method not allowed
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
