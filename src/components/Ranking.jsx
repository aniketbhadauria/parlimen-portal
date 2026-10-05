import { useMemo } from "react";
import { AlertTriangle, ArrowDown, ArrowUp, Trophy } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { attention, ranking, topFive } from "../ranking.js";
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

function matches(item, query) {
  if (!query.trim()) return true;
  const haystack = `${item.code} ${item.seat} ${item.name} ${item.party}`.toLowerCase();
  return haystack.includes(query.trim().toLowerCase());
}

export function RankingScreen({ query }) {
  const reduce = useReducedMotion();
  const rows = useMemo(() => ranking.filter((item) => matches(item, query)), [query]);
  const best = topFive.filter((item) => matches(item, query));
  const watch = attention.filter((item) => matches(item, query));

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

      <div className="grid gap-4 lg:grid-cols-2">
        <RankList
          title="Top 5, prestasi terbaik"
          icon={<Trophy size={18} color="#010066" aria-hidden="true" />}
          people={best}
          tone="best"
        />
        <RankList
          title="Perlu perhatian, prestasi rendah"
          icon={<AlertTriangle size={18} color="#CC0001" aria-hidden="true" />}
          people={watch}
          tone="watch"
        />
      </div>

      <section className="card overflow-hidden">
        <h2 className="px-4 pt-4 text-[15px] font-medium text-ink">Ranking penuh, 48 ADUN BN Johor</h2>
        {rows.length === 0 ? (
          <p className="px-4 py-8 text-sm text-moss">Tiada nama sepadan. Cuba DUN, parti, atau nama.</p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead>
                <tr className="text-left text-xs text-moss">
                  <th className="px-4 py-2 font-medium">#</th>
                  <th className="px-3 py-2 font-medium">DUN</th>
                  <th className="px-3 py-2 font-medium">Nama</th>
                  <th className="px-3 py-2 font-medium">Parti</th>
                  <th className="px-3 py-2 font-medium">Aduan</th>
                  <th className="px-3 py-2 font-medium">% siap</th>
                  <th className="px-3 py-2 font-medium">Rating</th>
                  <th className="px-4 py-2 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((item, index) => (
                  <tr key={item.code} className="border-t border-line">
                    <td className="px-4 py-3 tabular-nums text-moss">{index + 1}</td>
                    <td className="px-3 py-3 text-ink">{item.code} {item.seat}</td>
                    <td className="px-3 py-3 font-medium text-ink">{item.name}</td>
                    <td className="px-3 py-3">
                      <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={partyStyle[item.party]}>
                        {item.party}
                      </span>
                    </td>
                    <td className="px-3 py-3 tabular-nums text-ink">{item.aduan}</td>
                    <td className="px-3 py-3">
                      <span className="flex items-center gap-2">
                        <span className="h-1.5 w-16 overflow-hidden rounded-full bg-[#eef1f6]">
                          <span className="block h-full rounded-full bg-navy" style={{ width: `${item.selesai}%` }} />
                        </span>
                        <span className="tabular-nums text-moss">{item.selesai}%</span>
                      </span>
                    </td>
                    <td className="px-3 py-3 font-medium tabular-nums text-ink">{item.rating.toFixed(1)}</td>
                    <td className="px-4 py-3">
                      {item.trend === "up" ? (
                        <ArrowUp size={16} color="#010066" aria-label="Naik" />
                      ) : (
                        <ArrowDown size={16} color="#CC0001" aria-label="Turun" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </motion.div>
  );
}

function RankList({ title, icon, people, tone }) {
  return (
    <section className="card p-4">
      <h2 className="flex items-center gap-2 text-[15px] font-medium text-ink">
        {icon}
        {title}
      </h2>
      <ol className="mt-3 flex flex-col">
        {people.map((item, index) => (
          <li key={item.code} className="flex items-center gap-3 border-t border-line py-3 first:border-t-0">
            <span className="w-5 text-sm tabular-nums text-moss">{index + 1}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-ink">{item.name}</span>
              <span className="block text-xs text-moss">{item.code} {item.seat}</span>
            </span>
            <span className="text-right">
              <span className="block text-sm font-semibold tabular-nums" style={{ color: tone === "best" ? "#010066" : "#CC0001" }}>
                {item.rating.toFixed(1)}
              </span>
              <span className="block text-xs text-moss tabular-nums">{item.selesai}% siap</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
