import { apiFetch } from "./api";

export type TaskStatus = "todo" | "in-progress" | "done";

export type Task = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  dueDate: number | null;
  createdAt: number;
  updatedAt: number;
};

type TasksResponse = {
  tasks: Task[];
};

export async function getTasks(token: string): Promise<Task[]> {
  const response = await apiFetch<TasksResponse>("/api/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.tasks;
}

export async function createTask(
  token: string,
  data: {
    title: string;
    description?: string;
    status?: TaskStatus;
    dueDate?: number;
  }
): Promise<Task> {
  const response = await apiFetch<{ task: Task }>("/api/tasks", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.task;
}

export async function updateTask(
  token: string,
  id: string,
  data: Partial<{
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: number;
  }>
): Promise<Task> {
  const response = await apiFetch<{ task: Task }>(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.task;
}

export async function deleteTask(
  token: string,
  id: string
): Promise<void> {
  await apiFetch(`/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
