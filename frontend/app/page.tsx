import Link from "next/link";

const tasks = [
  "Review project brief",
  "Reply to team updates",
  "Prepare presentation slides",
  "Plan tomorrow's priorities",
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7 lg:px-8">
        <Link className="flex items-center gap-4 text-lg font-bold tracking-tight" href="/">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-[0_0_25px_#1769e866]">
            <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 20 20">
              <path d="M0 0h20v20H0z" fill="none" />
              <path fill="currentColor" d="M6.5 2a1.5 1.5 0 0 0-1.415 1H3.5A1.5 1.5 0 0 0 2 4.5v12A1.5 1.5 0 0 0 3.5 18h6.757A5.5 5.5 0 0 1 14 9.022V4.5A1.5 1.5 0 0 0 12.5 3h-1.585A1.5 1.5 0 0 0 9.5 2zM6 3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m4.854 6.354l-3.5 3.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7 12.293l3.146-3.147a.5.5 0 0 1 .708.708M19 14.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-4-2a.5.5 0 0 0-1 0V14h-1.5a.5.5 0 0 0 0 1H14v1.5a.5.5 0 0 0 1 0V15h1.5a.5.5 0 0 0 0-1H15z" />
            </svg>
          </span>
          Task Manager
        </Link>
        <div className="flex items-center gap-2 text-sm font-semibold sm:gap-5">
          <Link aria-label="Login" className="flex h-10 w-10 items-center justify-center gap-2 rounded-lg bg-[#1769e8] text-white shadow-[0_0_18px_#1769e855] transition hover:bg-transparent sm:h-auto sm:w-auto sm:justify-start sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0 sm:text-white/65 sm:shadow-none" href="/login">
            <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M9 6c.047-1.093.185-1.79.597-2.326q.242-.313.555-.554c.81-.62 1.985-.62 4.335-.62h.501c2.834 0 4.251 0 5.132.879c.88.878.88 2.293.88 5.121v7c0 2.828 0 4.243-.88 5.121s-2.298.879-5.132.879h-.5c-2.351 0-3.526 0-4.336-.62a3 3 0 0 1-.554-.554C9.185 19.79 9.047 19.093 9 18" />
                <path d="M15 12H3m9.5 3.5S16 12.922 16 12s-3.5-3.5-3.5-3.5" />
              </g>
            </svg>
            <span className="hidden sm:inline">Login</span>
          </Link>
          <Link aria-label="Create Account" className="flex h-10 w-10 items-center justify-center gap-2 rounded-lg bg-[#1769e8] text-white shadow-[0_0_22px_#1769e855] transition hover:bg-[#3c8cff] sm:h-auto sm:w-auto sm:justify-start sm:px-4 sm:py-2.5" href="/register">
            <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 256 256">
              <path d="M0 0h256v256H0z" fill="none" />
              <g fill="currentColor">
                <path d="M224 128a95.76 95.76 0 0 1-31.8 71.37A72 72 0 0 0 128 160a40 40 0 1 0-40-40a40 40 0 0 0 40 40a72 72 0 0 0-64.2 39.37A96 96 0 1 1 224 128" opacity=".2" />
                <path d="M168 56a8 8 0 0 1 8-8h16V32a8 8 0 0 1 16 0v16h16a8 8 0 0 1 0 16h-16v16a8 8 0 0 1-16 0V64h-16a8 8 0 0 1-8-8m62.56 54.68a103.92 103.92 0 1 1-85.24-85.24a8 8 0 0 1-2.64 15.78A88.07 88.07 0 0 0 40 128a87.62 87.62 0 0 0 22.24 58.41a79.66 79.66 0 0 1 36.06-28.75a48 48 0 1 1 59.4 0a79.66 79.66 0 0 1 36.06 28.75A87.62 87.62 0 0 0 216 128a89 89 0 0 0-1.22-14.68a8 8 0 1 1 15.78-2.64M128 152a32 32 0 1 0-32-32a32 32 0 0 0 32 32m0 64a87.57 87.57 0 0 0 53.92-18.5a64 64 0 0 0-107.84 0A87.57 87.57 0 0 0 128 216" />
              </g>
            </svg>
            <span className="hidden sm:inline">CREATE ACCOUNT</span>
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pt-24">
        <div>
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-[#5a9cff]">Simple. Focused. Yours.</p>
          <h1 className="max-w-xl text-6xl font-bold leading-[0.95] tracking-[-0.07em] sm:text-7xl">Make room for your <span className="text-[#3c8cff]">best work.</span></h1>
          <p className="mt-7 max-w-md text-lg leading-8 text-white/60">Keep every task in one clear place. Plan your day, focus on what matters, and finish with confidence.</p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link className="text-sm font-semibold text-white/60 transition hover:text-white" href="/login">Already have an account? <span className="text-[#5a9cff]">Login</span></Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-[#1769e844] blur-[90px]" />
          <div className="relative rounded-2xl border border-white/15 bg-[#111318] p-6 shadow-[0_30px_80px_#1769e833] sm:p-8">
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
              <h2 className="text-2xl font-bold">Tasks</h2>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1769e8] text-2xl text-white">+</span>
            </div>
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/3 px-4 py-4" key={task}>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border text-xs ${index < 2 ? "border-[#3c8cff] bg-[#3c8cff] text-white" : "border-white/30 text-transparent"}`}>&#10003;</span>
                  <span className={`font-semibold ${index < 2 ? "text-white/45 line-through" : "text-white"}`}>{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
