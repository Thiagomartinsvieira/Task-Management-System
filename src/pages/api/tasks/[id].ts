import { NextApiRequest, NextApiResponse } from "next";
import taskDb from "@/lib/db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Task ID is required" });
    }

    // Handle PUT request - update task completion status
    if (req.method === "PUT") {
      const updatedTask = taskDb.toggleComplete(id);

      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res.status(200).json(updatedTask);
    }

    // Handle DELETE request - delete a task
    if (req.method === "DELETE") {
      const success = taskDb.delete(id);

      if (!success) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res.status(200).json({ success: true });
    }

    // Method not allowed
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
