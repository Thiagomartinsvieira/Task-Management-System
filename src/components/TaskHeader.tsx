import React from "react";
import { ClipboardList } from "lucide-react";

interface TaskHeaderProps {
  totalTasks?: number;
  completedTasks?: number;
  title?: string;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({
  totalTasks = 5,
  completedTasks = 2,
  title = "My Task List",
}) => {
  return (
    <div className="w-full bg-white border-b border-gray-200 p-4 shadow-sm">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClipboardList className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">
              {completedTasks} of {totalTasks} completed
            </span>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{
                  width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;
