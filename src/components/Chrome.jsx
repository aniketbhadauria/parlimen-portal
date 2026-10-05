import {
  AlertTriangle, BarChart3, ChevronDown, LayoutGrid, Trophy, Users,
} from "lucide-react";
import { sections } from "../data.js";

const icons = {
  briefing: LayoutGrid,
  treasury: Users,
  estates: Trophy,
  council: AlertTriangle,
  istana: BarChart3,
};

function FlagMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <rect width="22" height="22" rx="6" fill="#010066" />
      <circle cx="8.5" cy="11" r="4.3" fill="#FFCC00" />
      <circle cx="10.1" cy="10.4" r="3.3" fill="#010066" />
      <path
        fill="#FFCC00"
        d="M14.2 7.2l.7 1.8 1.9.1-1.5 1.2.5 1.8-1.6-1-1.6 1 .5-1.8-1.5-1.2 1.9-.1z"
      />
    </svg>
  );
}

export function Sidebar({ section, onSelect }) {
  return (
    <aside className="hidden h-full w-[280px] shrink-0 flex-col bg-sidebar px-3 py-5 lg:flex">
      <div className="flex items-center justify-between px-3 pb-6">
        <p className="flex items-center gap-2 text-[17px] font-semibold tracking-tight text-ink">
          <FlagMark />
          Johor.
        </p>
        <span className="grid h-8 w-8 place-items-center rounded-lg text-moss" aria-hidden="true">
          <span className="block h-3.5 w-3.5 rounded-[4px] border border-current" />
        </span>
      </div>
      <nav className="flex flex-1 flex-col" aria-label="Sections">
        <ul className="flex flex-col gap-1">
          {sections.map((item) => {
            const Icon = icons[item.id];
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className="nav-item"
                  aria-current={section === item.id ? "page" : undefined}
                  onClick={() => onSelect(item.id)}
                >
                  <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-6 flex items-center gap-3 rounded-2xl px-2 py-2">
        <span
          className="grid h-10 w-10 place-items-center rounded-full text-sm font-semibold text-navy"
          style={{ background: "#FFCC00" }}
          aria-hidden="true"
        >
          JH
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-ink">Household</span>
          <span className="block text-xs text-moss">Steward’s desk</span>
        </span>
        <ChevronDown size={16} className="text-moss" aria-hidden="true" />
      </div>
    </aside>
  );
}

export function MobileTabs({ section, onSelect }) {
  return (
    <nav
      className="absolute inset-x-0 bottom-0 z-20 flex justify-around border-t border-line bg-paper px-1 pt-1 lg:hidden"
      style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}
      aria-label="Sections"
    >
      {sections.map((item) => {
        const Icon = icons[item.id];
        const current = section === item.id;
        return (
          <button
            key={item.id}
            type="button"
            className="hit flex flex-1 flex-col items-center justify-center gap-0.5 px-0.5 text-center text-[10px] leading-tight"
            aria-current={current ? "page" : undefined}
            style={{ color: current ? "#010066" : "#5c6b82" }}
            onClick={() => onSelect(item.id)}
          >
            <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

export function TopBar({ section }) {
  const current = sections.find((item) => item.id === section);
  return (
    <header
      className="px-5 pt-6 pb-2 sm:px-8"
      style={{ paddingTop: "max(24px, env(safe-area-inset-top))" }}
    >
      <h1 className="text-[32px] font-medium tracking-tight text-ink">
        {current?.label}
      </h1>
    </header>
  );
}
