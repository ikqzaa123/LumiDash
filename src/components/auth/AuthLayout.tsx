import type { ReactNode } from 'react';
import { CalendarCheck, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  footer: ReactNode;
  children: ReactNode;
}

const HIGHLIGHTS = [
  { icon: Users, text: 'Keep your roster, roles, and standing in one place.' },
  { icon: CalendarCheck, text: 'Plan meetings, workshops, and socials on a shared calendar.' },
  { icon: ShieldCheck, text: 'Your club data is private to your account.' },
];

export default function AuthLayout({ title, subtitle, footer, children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen bg-slate-50 font-sans text-slate-900 lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-slate-900 p-12 text-slate-300 lg:flex">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
        <Link to="/" className="relative flex items-center gap-3 text-white">
          <span className="text-lg font-semibold tracking-tight">ClubHub</span>
        </Link>
        <div className="relative space-y-8">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white">
            Run your club with confidence.
          </h2>
          <ul className="space-y-5">
            {HIGHLIGHTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-emerald-400">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm leading-relaxed text-slate-300">{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-slate-500">Manage members and events in one place.</p>
      </aside>

      <main className="flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md animate-scale-in">
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <span className="text-base font-semibold tracking-tight text-slate-900">ClubHub</span>
          </Link>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
            <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>
            <div className="mt-8">{children}</div>
          </div>
          <div className="mt-6 text-center text-sm text-slate-600">{footer}</div>
        </div>
      </main>
    </div>
  );
}
