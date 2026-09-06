"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "../../lib/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await register(name, email, password);
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-4 py-5 text-white sm:px-10 sm:py-6 lg:px-16">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,transparent_52%,#1769e814_100%)]" />
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between gap-3">
        <Link className="flex items-center gap-3 text-base font-bold tracking-tight sm:gap-4 sm:text-lg" href="/">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl  text-white shadow-[0_0_25px_#1769e866]">
            <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 20 20">
              <path d="M0 0h20v20H0z" fill="none" />
              <path fill="currentColor" d="M6.5 2a1.5 1.5 0 0 0-1.415 1H3.5A1.5 1.5 0 0 0 2 4.5v12A1.5 1.5 0 0 0 3.5 18h6.757A5.5 5.5 0 0 1 14 9.022V4.5A1.5 1.5 0 0 0 12.5 3h-1.585A1.5 1.5 0 0 0 9.5 2zM6 3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m4.854 6.354l-3.5 3.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7 12.293l3.146-3.147a.5.5 0 0 1 .708.708M19 14.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-4-2a.5.5 0 0 0-1 0V14h-1.5a.5.5 0 0 0 0 1H14v1.5a.5.5 0 0 0 1 0V15h1.5a.5.5 0 0 0 0-1H15z" />
            </svg>
          </span>
          Task Manager
        </Link>
        <Link className="whitespace-nowrap text-xs font-semibold text-white/60 transition hover:text-white sm:text-sm" href="/login">Already a member? <span className="text-[#5a9cff]">Login</span></Link>
      </nav>

      <section className="relative mx-auto grid min-h-0 max-w-6xl items-center gap-10 py-12 sm:gap-14 sm:py-16 lg:min-h-[calc(100vh-100px)] lg:grid-cols-[0.9fr_0.8fr] lg:gap-16">
        <div className="max-w-xl">
          <p className="mb-7 text-xs font-bold uppercase tracking-[0.2em] text-[#5a9cff]">Start with clarity</p>
          <h1 className="text-5xl font-bold leading-[0.95] tracking-[-0.07em] sm:text-7xl">Your tasks.<br /><span className="text-[#3c8cff]">Your momentum.</span></h1>
          <p className="mt-6 max-w-md text-base leading-7 text-white/55 sm:mt-8 sm:text-lg sm:leading-8">Create your free workspace and turn scattered thoughts into focused progress.</p>
          <div className="mt-10 grid max-w-md grid-cols-2 gap-4 border-t border-white/15 pt-6 text-sm sm:mt-12"><div><strong className="block text-white">One clear space</strong><span className="mt-2 block text-white/40">Everything organized.</span></div><div><strong className="block text-white">Less noise</strong><span className="mt-2 block text-white/40">More meaningful work.</span></div></div>
        </div>

        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-white/15 bg-[#111318] p-5 shadow-[0_30px_80px_#1769e833] sm:p-8">
            <div className="mb-7 sm:mb-8"><p className="text-xs font-bold uppercase tracking-widest text-[#5a9cff]">Get started</p><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Create Account</h2><p className="mt-2 text-sm text-white/45">Set up your account in a few seconds.</p></div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div><label className="mb-2 block text-sm font-semibold text-white/75" htmlFor="name">Name</label><input className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#3c8cff] focus:ring-2 focus:ring-[#1769e833]" id="name" type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required /></div>
              <div><label className="mb-2 block text-sm font-semibold text-white/75" htmlFor="email">Email</label><input className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#3c8cff] focus:ring-2 focus:ring-[#1769e833]" id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /></div>
              <div><label className="mb-2 block text-sm font-semibold text-white/75" htmlFor="password">Password</label><input className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#3c8cff] focus:ring-2 focus:ring-[#1769e833]" id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" required minLength={6} /></div>
              {error && <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-300">{error}</p>}
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1769e8] px-4 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_#1769e855] transition hover:bg-[#3c8cff] disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={loading}>
                {loading && <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />}
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-white/40">Already have an account? <Link className="font-semibold text-[#5a9cff] hover:text-white" href="/login">Login</Link></p>
          </div>
        </div>
      </section>
    </main>
  );
}