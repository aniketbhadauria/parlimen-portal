import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tabs from "@radix-ui/react-tabs";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  BookOpen, Castle, ChevronDown, Ellipsis, Landmark, LayoutGrid, Scale, Trees,
} from "lucide-react";
import { periods, sections } from "../data.js";

const icons = {
  briefing: LayoutGrid,
  treasury: Landmark,
  estates: Trees,
  council: Scale,
  istana: Castle,
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
    <aside className="hidden h-full w-[248px] shrink-0 flex-col bg-sidebar px-3 py-5 lg:flex">
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
            className="hit flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px]"
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

export function TopBar({ section, period, onPeriod, query, onQuery, onUpdate, onPrint }) {
  const current = sections.find((item) => item.id === section);
  const title = section === "briefing" ? "Overview" : current?.label;
  return (
    <header
      className="flex flex-col gap-4 px-5 pt-6 pb-2 sm:flex-row sm:items-center sm:px-8"
      style={{ paddingTop: "max(24px, env(safe-area-inset-top))" }}
    >
      <h1 className="min-w-0 flex-1 text-[32px] font-medium tracking-tight text-ink">
        {title}
      </h1>
      <div className="flex flex-wrap items-center gap-2">
        <label className="relative min-w-[180px] flex-1 sm:max-w-[220px]">
          <span className="sr-only">Search the books</span>
          <input
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder={section === "council" ? "Search sittings" : "Search"}
            className="hit w-full rounded-full border border-line bg-sidebar px-4 text-sm"
          />
        </label>
        <Tabs.Root value={period} onValueChange={onPeriod}>
          <Tabs.List className="segment" aria-label="Period">
            {periods.map((item) => (
              <Tabs.Trigger key={item.id} value={item.id}>
                {item.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
        <DropdownMenu.Root>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <DropdownMenu.Trigger
                className="hit grid place-items-center rounded-full bg-sidebar"
                aria-label="More actions"
              >
                <Ellipsis size={18} aria-hidden="true" />
              </DropdownMenu.Trigger>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="rounded-lg bg-paper px-2 py-1 text-sm shadow" sideOffset={6}>
                More actions
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="menu material" align="end" sideOffset={8}>
              <DropdownMenu.Item asChild>
                <button type="button" onClick={onUpdate}>Update the books</button>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <button type="button" onClick={onPrint}>
                  <BookOpen size={16} className="mr-2" aria-hidden="true" />
                  Print this briefing
                </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
