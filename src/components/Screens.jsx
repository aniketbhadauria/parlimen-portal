import { ArrowUpRight, Copy, Landmark, RefreshCw } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { InflowChart, ShareChart, YieldChart } from "./Charts.jsx";
import { formatMillions, formatRinggit, ledger, works } from "../data.js";
import { T } from "../theme.js";

function Note({ children }) {
  return <p className="max-w-prose text-[15px] text-moss">{children}</p>;
}

function Group({ title, children, empty }) {
  return (
    <section className="min-w-0">
      <h3 className="mb-2 px-1 text-[17px] font-semibold text-ink">{title}</h3>
      {empty ? (
        <div className="card px-4 py-8">
          <p className="text-base text-ink">{empty.title}</p>
          <p className="mt-1 max-w-prose text-sm text-moss">{empty.body}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">{children}</div>
      )}
    </section>
  );
}

function RecordButton({ record, onOpen }) {
  return (
    <button type="button" className="row" onClick={() => onOpen(record)}>
      <span
        className="grid h-5 w-5 shrink-0 place-items-center rounded-full border"
        style={{ borderColor: record.needsSignature ? T.red : "#C5CEDD" }}
        aria-hidden="true"
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[16px] text-ink">{record.title}</span>
        <span className="block truncate text-sm text-moss">{record.summary}</span>
      </span>
      <span className="shrink-0 text-sm text-moss">{record.when}</span>
    </button>
  );
}

function WalletCard({ book, onOpen, onUpdate, records }) {
  const hasil = book.series.reduce((sum, row) => sum + row.hasil, 0);
  const royalty = book.series.reduce((sum, row) => sum + row.royalty, 0);
  const total = hasil + royalty || 1;
  const hasilShare = (hasil / total) * 100;
  const grant = records.find((record) => record.needsSignature) || records[0];

  return (
    <div className="rounded-[28px] bg-white p-2 shadow-[0_16px_40px_rgba(1,0,102,0.08)]">
      <div
        className="rounded-[24px] px-5 pt-5 pb-4"
        style={{
          background:
            "linear-gradient(160deg, #eef3ff 0%, #f7f4ff 42%, #fff8df 100%)",
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-moss">Main treasury</p>
            <p className="mt-1 text-[15px] font-medium text-ink">{book.asOf}</p>
          </div>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-xl bg-white/80 text-moss"
            aria-label="Copy the treasury figure"
            onClick={() => navigator.clipboard?.writeText(formatRinggit(book.figure))}
          >
            <Copy size={16} aria-hidden="true" />
          </button>
        </div>
        <p className="display mt-6 text-[clamp(2.4rem,6vw,3.25rem)] text-ink tabular-nums">
          {book.figure >= 1_000_000_000
            ? `RM ${(book.figure / 1_000_000_000).toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}bn`
            : formatRinggit(book.figure)}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex items-center">
            {["Hasil", "Royalty", "Forestry"].map((name, index) => (
              <span
                key={name}
                className="grid h-9 w-9 place-items-center rounded-full border-2 border-white text-[10px] font-semibold text-white"
                style={{
                  marginLeft: index === 0 ? 0 : -8,
                  background: [T.blue, T.red, "#C9A400"][index],
                }}
                title={name}
              >
                {name.slice(0, 1)}
              </span>
            ))}
          </div>
          <span className="pill">
            <ArrowUpRight size={14} aria-hidden="true" />
            {(book.delta * 100).toFixed(2)}%
          </span>
        </div>
      </div>
      <div className="flex gap-2 px-2 py-3">
        <button type="button" className="action-pill" onClick={() => grant && onOpen(grant)} disabled={!grant}>
          <Landmark size={16} aria-hidden="true" />
          Review
        </button>
        <button type="button" className="action-pill" onClick={onUpdate}>
          <RefreshCw size={16} aria-hidden="true" />
          Update
        </button>
      </div>
      <div className="px-4 pb-4">
        <div className="flex h-3 overflow-hidden rounded-full bg-[#eef1f6]">
          <span className="h-full" style={{ width: `${hasilShare}%`, background: T.blue }} />
          <span className="h-full" style={{ width: `${100 - hasilShare}%`, background: "#F6C7C7" }} />
        </div>
        <div className="mt-3 flex justify-between text-sm">
          <p className="text-moss">
            <span className="mr-2 inline-block h-2 w-2 rounded-sm" style={{ background: T.blue }} />
            Hasil
            <span className="mt-0.5 block font-medium text-ink">{formatMillions(hasil)}</span>
          </p>
          <p className="text-right text-moss">
            <span className="mr-2 inline-block h-2 w-2 rounded-sm" style={{ background: T.red }} />
            Royalty
            <span className="mt-0.5 block font-medium text-ink">{formatMillions(royalty)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function BriefingScreen({ book, records, onOpen, onUpdate, query }) {
  const reduce = useReducedMotion();
  const recommended = works.slice(0, 3);
  return (
    <motion.div
      className="flex flex-col gap-5"
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <WalletCard book={book} records={records} onOpen={onOpen} onUpdate={onUpdate} />
      <div className="grid items-start gap-5 lg:grid-cols-[1.35fr_0.75fr]">
        <Group
          title="To-do"
          empty={records.length ? null : {
            title: query ? "Nothing matches that search" : "Nothing is waiting",
            body: query ? "Try a district, a palace, or a file name." : "Signed files leave this list.",
          }}
        >
          {records.map((record) => (
            <RecordButton key={record.id} record={record} onOpen={onOpen} />
          ))}
        </Group>
        <section className="min-w-0">
          <h3 className="mb-3 text-[15px] font-medium text-ink">Recommended</h3>
          <div className="flex flex-col gap-3">
            {recommended.map((work) => (
              <article key={work.id} className="card flex items-center gap-3 px-3 py-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f6f3ea] text-navy">
                  <Landmark size={18} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-ink">{work.name}</span>
                  <span className="block truncate text-sm text-moss">{work.note}</span>
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export function TreasuryScreen({ book, onOpen, records, query }) {
  const needle = query.trim().toLowerCase();
  const accounts = ledger.filter((row) => `${row.name} ${row.detail}`.toLowerCase().includes(needle));
  return (
    <div className="flex flex-col gap-8">
      <Note>{book.note}</Note>
      <section>
        <h3 className="mb-1 text-[17px] font-semibold text-ink">Hasil, royalty, forestry</h3>
        <InflowChart data={book.series} />
      </section>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Group
          title="The ledger"
          empty={accounts.length ? null : {
            title: "No account matches that search",
            body: "Try hasil, royalty, or forestry.",
          }}
        >
          {accounts.map((row) => (
            <button
              key={row.id}
              type="button"
              className="row"
              onClick={() => onOpen({
                id: row.id,
                kind: "Account",
                title: row.name,
                place: "Treasury",
                when: row.move,
                needsSignature: false,
                summary: row.detail,
                body: `${row.name} stands at ${formatRinggit(row.balance)}. Movement against the previous close is ${row.move}. ${row.detail}.`,
              })}
            >
              <span className="min-w-0 flex-1">
                <span className="block text-ink">{row.name}</span>
                <span className="block text-sm text-moss">{row.detail}</span>
              </span>
              <span className="text-right">
                <span className="block tabular-nums text-ink">{formatRinggit(row.balance)}</span>
                <span className="block text-sm text-moss">{row.move}</span>
              </span>
            </button>
          ))}
        </Group>
        <section>
          <h3 className="mb-1 text-[17px] font-semibold text-ink">Share of receipts</h3>
          <ShareChart data={book.shares} />
          {records[0] ? (
            <button type="button" className="row mt-3" onClick={() => onOpen(records[0])}>
              <span className="min-w-0 flex-1 text-left">
                <span className="block text-ink">{records[0].title}</span>
                <span className="block text-sm text-moss">{records[0].summary}</span>
              </span>
            </button>
          ) : null}
        </section>
      </div>
    </div>
  );
}

export function EstatesScreen({ book, query }) {
  const needle = query.trim().toLowerCase();
  const estates = book.estates.filter((row) => `${row.district} ${row.crop}`.toLowerCase().includes(needle));
  const lead = book.estates[0];
  return (
    <div className="flex flex-col gap-8">
      <Note>
        {lead.district} led with {lead.yield.toLocaleString("en-MY")} thousand tonnes of {lead.crop.toLowerCase()}.
      </Note>
      {estates.length ? <YieldChart data={estates} /> : null}
      <Group
        title="By district"
        empty={estates.length ? null : {
          title: "No district matches that search",
          body: "Try Kota Tinggi, Muar, or a crop.",
        }}
      >
        {estates.map((row) => (
          <div key={row.district} className="row cursor-default">
            <span className="min-w-0 flex-1">
              <span className="block text-ink">{row.district}</span>
              <span className="block text-sm text-moss">{row.crop}</span>
            </span>
            <span className="tabular-nums text-ink">{row.yield.toLocaleString("en-MY")} kt</span>
          </div>
        ))}
      </Group>
    </div>
  );
}

export function CouncilScreen({ records, onOpen, query }) {
  return (
    <div className="flex flex-col gap-8">
      <Note>
        {records.length === 0
          ? "Nothing matches."
          : `${records.length} item${records.length === 1 ? "" : "s"} still need a person.`}
      </Note>
      <Group
        title="The book"
        empty={records.length ? null : {
          title: query ? "No sittings match that search" : "The book is clear",
          body: query
            ? "Try a district, a palace, or a file name."
            : "New audiences will appear here when the steward enters them.",
        }}
      >
        {records.map((record) => (
          <RecordButton key={record.id} record={record} onOpen={onOpen} />
        ))}
      </Group>
    </div>
  );
}

export function IstanaScreen({ records, onOpen, query }) {
  const needle = query.trim().toLowerCase();
  const visibleWorks = works.filter((work) => `${work.name} ${work.place} ${work.note}`.toLowerCase().includes(needle));
  return (
    <div className="flex flex-col gap-8">
      <Note>The roof at Bukit Serene finishes this month. The hall still waits on marble.</Note>
      <Group
        title="Works in hand"
        empty={visibleWorks.length ? null : {
          title: "No works match that search",
          body: "Try Bukit Serene, the hall, or the jetty.",
        }}
      >
        {visibleWorks.map((work) => (
          <button
            key={work.id}
            type="button"
            className="row"
            onClick={() => onOpen(records.find((item) => item.id === work.recordId) || {
              id: work.id,
              kind: "Works",
              title: work.name,
              place: work.place,
              when: work.note,
              needsSignature: false,
              summary: work.note,
              body: `${work.name} at ${work.place} is ${Math.round(work.progress * 100)}% complete. ${work.note}`,
            })}
          >
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-3">
                <span className="text-ink">{work.name}</span>
                <span className="tabular-nums text-sm text-moss">{Math.round(work.progress * 100)}%</span>
              </span>
              <span className="mt-2 block h-1.5 overflow-hidden rounded-full" style={{ background: T.wire }}>
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${work.progress * 100}%`, background: work.progress > 0.8 ? T.gold : T.blue }}
                />
              </span>
              <span className="mt-1 block text-sm text-moss">{work.place}. {work.note}</span>
            </span>
          </button>
        ))}
      </Group>
    </div>
  );
}

export function Updating({ progress }) {
  return (
    <div className="max-w-[38rem] pt-6">
      <h2 className="text-2xl font-medium tracking-tight text-ink">Updating the books.</h2>
      <p className="mt-4 text-base text-moss">Fetching the latest household figures.</p>
      <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-label="Update progress" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-navy" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
