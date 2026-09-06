"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getMe, User } from "../../lib/auth";
import {
  createTask,
  deleteTask,
  getTasks,
  Task,
  TaskStatus,
  updateTask,
} from "../../lib/tasks";

export default function DashboardPage() {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<"all" | TaskStatus>("all");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState("");

    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function loadDashboard() {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const currentUser = await getMe(token);
        const userTasks = await getTasks(token);

        setUser(currentUser);
        setTasks(userTasks);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setError(
          err instanceof Error ? err.message : "Failed to load dashboard"
        );

        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);


  async function handleCreateTask(
  event: React.FormEvent<HTMLFormElement>
) {
  event.preventDefault();

  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
    return;
  }

  if (!title.trim()) {
    setCreateError("Title is required");
    return;
  }

  setCreating(true);
  setCreateError("");

  try {
    const newTask = await createTask(token, {
      title: title.trim(),
      description: description.trim() || undefined,
    });

    setTasks((currentTasks) => [newTask, ...currentTasks]);

    setTitle("");
    setDescription("");
  } catch (err) {
    setCreateError(
      err instanceof Error ? err.message : "Failed to create task"
    );
  } finally {
    setCreating(false);
  }
}

  async function handleStatusChange(
    taskId: string,
    status: TaskStatus
  ) {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const updatedTask = await updateTask(token, taskId, {
        status,
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId ? updatedTask : task
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update task"
      );
    }
  }

  async function handleDelete(taskId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      await deleteTask(token, taskId);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId)
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete task"
      );
    }
  }


  async function handleUpdateTask(taskId: string) {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
    return;
  }

  if (!editTitle.trim()) {
    setError("Title is required");
    return;
  }

  setUpdating(true);
  setError("");

  try {
    const updatedTask = await updateTask(token, taskId, {
      title: editTitle.trim(),
      description: editDescription.trim(),
    });

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? updatedTask : task
      )
    );

    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
  } catch (err) {
    setError(
      err instanceof Error ? err.message : "Failed to update task"
    );
  } finally {
    setUpdating(false);
  }
}

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#3c8cff]" />
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link className="flex items-center gap-3 text-lg font-bold tracking-tight" href="/">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl text-white"><svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 20 20"><path d="M0 0h20v20H0z" fill="none" /><path fill="currentColor" d="M6.5 2a1.5 1.5 0 0 0-1.415 1H3.5A1.5 1.5 0 0 0 2 4.5v12A1.5 1.5 0 0 0 3.5 18h6.757A5.5 5.5 0 0 1 14 9.022V4.5A1.5 1.5 0 0 0 12.5 3h-1.585A1.5 1.5 0 0 0 9.5 2zM6 3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m4.854 6.354l-3.5 3.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7 12.293l3.146-3.147a.5.5 0 0 1 .708.708M19 14.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-4-2a.5.5 0 0 0-1 0V14h-1.5a.5.5 0 0 0 0 1H14v1.5a.5.5 0 0 0 1 0V15h1.5a.5.5 0 0 0 0-1H15z" /></svg></span>
            Task Manager
          </Link>
          <div className="flex items-center gap-4"><span className="hidden text-sm text-white/45 sm:inline">{user ? `Welcome, ${user.name}` : "Your workspace"}</span><button className="rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-white/70 transition hover:border-[#3c8cff] hover:text-white" onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); router.push("/login"); }}>Logout</button></div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl overflow-x-hidden px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-10"><p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#5a9cff]">Your workspace</p><h1 className="text-4xl font-bold tracking-[-0.06em] sm:text-5xl">Your Tasks</h1><p className="mt-3 text-sm text-white/45">Capture your work and keep your next step clear.</p></div>
        <div className="grid min-w-0 gap-8 overflow-hidden [&>div]:min-w-0 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <form className="h-fit rounded-2xl border border-white/15 bg-[#111318] p-5 shadow-[0_20px_60px_#1769e822] sm:p-6" onSubmit={handleCreateTask}>
            <div className="mb-6 flex items-center justify-between"><h2 className="text-xl font-bold">Create Task</h2><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1769e8] text-xl">+</span></div>
            <div className="space-y-5"><div><label className="mb-2 block text-sm font-semibold text-white/70" htmlFor="title">Title</label><input className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#3c8cff] focus:ring-2 focus:ring-[#1769e833]" id="title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What needs to be done?" required /></div><div><label className="mb-2 block text-sm font-semibold text-white/70" htmlFor="description">Description</label><textarea className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#3c8cff] focus:ring-2 focus:ring-[#1769e833]" id="description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Add some details..." rows={4} /></div></div>
            {createError && <p className="mt-4 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-300">{createError}</p>}
            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1769e8] px-4 py-3.5 text-sm font-bold shadow-[0_0_22px_#1769e844] transition hover:bg-[#3c8cff] disabled:opacity-60" type="submit" disabled={creating}>{creating && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />}{creating ? "Creating..." : "Create Task"}</button>
          </form>

          <div><div className="mb-5 flex flex-wrap items-center gap-2">{([["all", "All"], ["todo", "Todo"], ["in-progress", "In Progress"], ["done", "Done"]] as const).map(([value, label]) => <button className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${filter === value ? "bg-[#1769e8] text-white" : "border border-white/10 text-white/50 hover:text-white"}`} key={value} onClick={() => setFilter(value)}>{label}</button>)}</div>{error && <p className="mb-4 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-300">{error}</p>}{filteredTasks.length === 0 ? <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center text-sm text-white/40">No tasks found.</div> : <div className="space-y-3">{filteredTasks.map((task) => <article className="rounded-2xl border border-white/10 bg-[#111318] p-5" key={task.id}>{editingTaskId === task.id ? <div className="space-y-4"><input className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#3c8cff]" type="text" value={editTitle} onChange={(event) => setEditTitle(event.target.value)} /><textarea className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#3c8cff]" value={editDescription} onChange={(event) => setEditDescription(event.target.value)} rows={3} /><div className="flex gap-2"><button className="rounded-lg bg-[#1769e8] px-4 py-2 text-xs font-bold" onClick={() => handleUpdateTask(task.id)} disabled={updating}>{updating ? "Saving..." : "Save"}</button><button className="rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold text-white/60" onClick={() => { setEditingTaskId(null); setEditTitle(""); setEditDescription(""); }} disabled={updating}>Cancel</button></div></div> : <div className="flex flex-col gap-4 sm:flex-row sm:items-start"><span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${task.status === "done" ? "border-[#32c49b] bg-[#32c49b] text-xs" : "border-[#3c8cff]"}`}>{task.status === "done" && "✓"}</span><div className="min-w-0 flex-1 break-words [overflow-wrap:anywhere]"><h3 className={`break-words font-semibold ${task.status === "done" ? "text-white/40 line-through" : "text-white"}`}>{task.title}</h3>{task.description && <p className="mt-1 break-words text-sm leading-6 text-white/40 [overflow-wrap:anywhere]">{task.description}</p>}</div><div className="flex shrink-0 flex-wrap items-center gap-2"><select className="rounded-lg border border-white/10 bg-black px-2 py-2 text-xs text-white/65 outline-none focus:border-[#3c8cff]" value={task.status} onChange={(event) => handleStatusChange(task.id, event.target.value as TaskStatus)}><option value="todo">Todo</option><option value="in-progress">In Progress</option><option value="done">Done</option></select><button className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/60 hover:text-white" onClick={() => { setEditingTaskId(task.id); setEditTitle(task.title); setEditDescription(task.description ?? ""); }}>Edit</button><button className="rounded-lg border border-red-400/20 px-3 py-2 text-xs text-red-300/70 hover:text-red-300" onClick={() => handleDelete(task.id)}>Delete</button></div></div>}</article>)}</div>}</div>
        </div>
      </section>
    </main>
  );
}