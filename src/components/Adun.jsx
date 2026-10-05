import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { adunList, bahagianOptions, parties } from "../adun.js";
import { kpis } from "../gambaran.js";

const pageKpis = kpis.map((item) => {
  if (item.id === "aduan") return { ...item, value: "7,052" };
  if (item.id === "rating") return { ...item, label: "Purata rating" };
  return item;
});

const partyStyle = {
  UMNO: { background: "#FFCC00", color: "#010066" },
  MCA: { background: "#CC0001", color: "#ffffff" },
  MIC: { background: "#010066", color: "#ffffff" },
};

function codeNumber(code) {
  return Number(code.replace(/\D/g, ""));
}

export function AdunScreen({ query }) {
  const reduce = useReducedMotion();
  const [party, setParty] = useState("Semua");
  const [bahagian, setBahagian] = useState("Semua");
  const [sort, setSort] = useState("dun");
  const [localQuery, setLocalQuery] = useState("");

  const shown = useMemo(() => {
    const needle = `${query} ${localQuery}`.trim().toLowerCase();
    const list = adunList.filter((item) => {
      const partyOk = party === "Semua" || item.party === party;
      const bahagianOk = bahagian === "Semua" || item.bahagian === bahagian;
      const text = `${item.code} ${item.seat} ${item.name} ${item.party}`.toLowerCase();
      return partyOk && bahagianOk && (!needle || text.includes(needle));
    });
    const ranked = [...list];
    if (sort === "aduan") ranked.sort((a, b) => b.aduan - a.aduan);
    else if (sort === "rating") ranked.sort((a, b) => b.rating - a.rating);
    else ranked.sort((a, b) => codeNumber(a.code) - codeNumber(b.code));
    return ranked;
  }, [bahagian, localQuery, party, query, sort]);

  return (
    <motion.div
      className="flex flex-col gap-5"
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
        {pageKpis.map((item) => (
          <li key={item.id} className="card px-3 py-3">
            <p className="display text-[22px] leading-none text-ink tabular-nums">{item.value}</p>
            <p className="mt-2 text-xs text-moss">{item.label}</p>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-2">
        <label className="min-w-[220px] flex-1">
          <span className="sr-only">Cari nama atau DUN</span>
          <input
            value={localQuery}
            onChange={(event) => setLocalQuery(event.target.value)}
            placeholder="Cari nama atau DUN..."
            className="hit w-full rounded-full border border-line bg-sidebar px-4 text-sm"
          />
        </label>
        <Select label="Parti" value={party} options={parties} onChange={setParty} />
        <Select label="Bahagian" value={bahagian} options={bahagianOptions} onChange={setBahagian} />
        <Select
          label="Susunan"
          value={sort}
          options={[
            { id: "dun", label: "No. DUN" },
            { id: "aduan", label: "Aduan" },
            { id: "rating", label: "Rating" },
          ]}
          onChange={setSort}
        />
        <p className="ml-auto text-sm text-moss tabular-nums">{shown.length} / {adunList.length} ADUN</p>
      </div>

      {shown.length === 0 ? (
        <div className="card px-4 py-8">
          <p className="text-base text-ink">Tiada ADUN sepadan</p>
          <p className="mt-1 text-sm text-moss">Cuba nama, kod DUN, atau set semula parti dan bahagian.</p>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {shown.map((item) => (
            <li key={item.code} className="card flex flex-col p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-moss">{item.code} {item.seat}</p>
                  <p className="mt-1 text-[15px] font-medium leading-snug text-ink">{item.name}</p>
                </div>
                <span
                  className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={partyStyle[item.party]}
                >
                  {item.party}
                </span>
              </div>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-sm">
                <div>
                  <dt className="text-xs text-moss">Aduan</dt>
                  <dd className="font-medium tabular-nums text-ink">{item.aduan}</dd>
                </div>
                <div>
                  <dt className="text-xs text-moss">Hotspot</dt>
                  <dd className="font-medium tabular-nums text-ink">{item.hotspot}</dd>
                </div>
                <div>
                  <dt className="text-xs text-moss">Program</dt>
                  <dd className="font-medium tabular-nums text-ink">{item.program}</dd>
                </div>
              </dl>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#eef1f6]">
                <div className="h-full rounded-full bg-navy" style={{ width: `${item.selesai}%` }} />
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="tabular-nums text-moss">{item.selesai}%</span>
                <span className="inline-flex items-center gap-1 font-medium tabular-nums text-ink">
                  <Star size={14} fill="#FFCC00" color="#FFCC00" aria-hidden="true" />
                  {item.rating.toFixed(1)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <label className="text-sm">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="hit rounded-full border border-line bg-paper px-3 text-sm text-ink"
      >
        {options.map((option) => {
          const id = typeof option === "string" ? option : option.id;
          const text = typeof option === "string" ? option : option.label;
          return <option key={id} value={id}>{text}</option>;
        })}
      </select>
    </label>
  );
}
