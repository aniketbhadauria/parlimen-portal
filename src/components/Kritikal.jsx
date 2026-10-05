import { AlertTriangle, Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { adunList } from "../adun.js";
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

const pinned = [
  {
    code: "N21",
    seat: "Simpang Jeram",
    name: "Datuk Zulkurnain Kamisan",
    party: "UMNO",
    bahagian: "Johor Bahru",
    hotspot: 4,
    aduan: 198,
    rating: 4.6,
  },
  {
    code: "N05",
    seat: "Tangkak",
    name: "Mohd Azahar Ibrahim",
    party: "UMNO",
    bahagian: "Tangkak",
    hotspot: 3,
    aduan: 167,
    rating: 4.8,
  },
];

function plain(name) {
  return name.toLowerCase().replace(/^datuk\s+/, "");
}

const pinnedNames = new Set(pinned.map((item) => plain(item.name)));

const rest = adunList
  .filter((item) => item.hotspot >= 3 && !pinnedNames.has(plain(item.name)))
  .sort((a, b) => b.hotspot - a.hotspot || b.aduan - a.aduan);

const critical = [...pinned, ...rest];

export function KritikalScreen() {
  const reduce = useReducedMotion();

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

      <section
        className="flex gap-3 rounded-2xl border px-4 py-3"
        style={{ borderColor: "rgba(204,0,1,0.35)", background: "#fff6f6" }}
      >
        <AlertTriangle size={20} color="#CC0001" className="mt-0.5 shrink-0" aria-hidden="true" />
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-[#CC0001]">
            Amaran MB. Kawasan memerlukan perhatian segera
          </h2>
          <p className="mt-1 text-sm text-ink">
            ADUN dengan hotspot aktif 3 atau lebih. Tindakan segera diperlukan.
          </p>
        </div>
      </section>

      <ol className="flex flex-col gap-3">
        {critical.map((item, index) => (
          <li
            key={`${item.code}-${item.name}`}
            className="card flex flex-wrap items-center gap-4 px-4 py-4"
            style={{ boxShadow: "inset 3px 0 0 #CC0001" }}
          >
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold text-[#CC0001]"
              style={{ background: "#fff1f1" }}
            >
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-moss">{item.code} {item.seat}</p>
              <p className="mt-0.5 text-[16px] font-semibold text-ink">{item.name}</p>
              <p className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={partyStyle[item.party]}>
                  {item.party}
                </span>
                <span className="rounded-full bg-sidebar px-2 py-0.5 text-[11px] text-moss">
                  {item.bahagian}
                </span>
              </p>
            </div>
            <dl className="grid grid-cols-3 gap-4 text-center">
              <div>
                <dt className="text-xs text-moss">Hotspot</dt>
                <dd className="text-lg font-semibold tabular-nums text-[#CC0001]">{item.hotspot}</dd>
              </div>
              <div>
                <dt className="text-xs text-moss">Aduan</dt>
                <dd className="text-lg font-semibold tabular-nums text-ink">{item.aduan}</dd>
              </div>
              <div>
                <dt className="text-xs text-moss">Rating</dt>
                <dd className="inline-flex items-center gap-1 text-lg font-semibold tabular-nums text-ink">
                  {item.rating.toFixed(1)}
                  <Star size={14} fill="#FFCC00" color="#FFCC00" aria-hidden="true" />
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}
