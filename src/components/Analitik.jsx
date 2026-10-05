import { Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
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

const bahagian = [
  { name: "Johor Bahru", adun: 15, aduan: 2804, hotspot: 39, rating: 4.6, selesai: 94, parties: { UMNO: 8, MCA: 3, MIC: 1 } },
  { name: "Kluang", adun: 4, aduan: 530, hotspot: 6, rating: 4.5, selesai: 95, parties: { UMNO: 3, MCA: 1 } },
  { name: "Batu Pahat", adun: 5, aduan: 677, hotspot: 9, rating: 4.5, selesai: 95, parties: { UMNO: 3, MCA: 2 } },
  { name: "Segamat", adun: 5, aduan: 542, hotspot: 7, rating: 4.5, selesai: 95, parties: { UMNO: 3, MCA: 1, MIC: 1 } },
  { name: "Pontian", adun: 4, aduan: 435, hotspot: 6, rating: 4.6, selesai: 95, parties: { UMNO: 4 } },
  { name: "Muar", adun: 4, aduan: 475, hotspot: 7, rating: 4.4, selesai: 94, parties: { UMNO: 3, MCA: 1 } },
  { name: "Kulai", adun: 4, aduan: 399, hotspot: 5, rating: 4.7, selesai: 94, parties: { UMNO: 3, MIC: 1 } },
  { name: "Mersing", adun: 2, aduan: 165, hotspot: 2, rating: 4.8, selesai: 95, parties: { UMNO: 2 } },
  { name: "Kota Tinggi", adun: 4, aduan: 438, hotspot: 5, rating: 4.4, selesai: 95, parties: { UMNO: 3, MIC: 1 } },
  { name: "Labis", adun: 1, aduan: 312, hotspot: 2, rating: 4.9, selesai: 95, parties: { UMNO: 1 } },
  { name: "Tangkak", adun: 2, aduan: 275, hotspot: 4, rating: 4.7, selesai: 95, parties: { UMNO: 2 } },
];

export function AnalitikScreen() {
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

      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {bahagian.map((item) => (
          <li key={item.name} className="card flex flex-col p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] text-moss">Bahagian UMNO</p>
                <h2 className="mt-1 text-lg font-semibold text-ink">{item.name}</h2>
              </div>
              <p className="text-right">
                <span className="block text-lg font-semibold tabular-nums text-navy">{item.adun}</span>
                <span className="text-[11px] text-moss">ADUN</span>
              </p>
            </div>
            <dl className="mt-4 grid grid-cols-3 gap-2 text-sm">
              <div>
                <dt className="text-xs text-moss">Aduan</dt>
                <dd className="font-semibold tabular-nums text-ink">{item.aduan.toLocaleString("en-MY")}</dd>
              </div>
              <div>
                <dt className="text-xs text-moss">Hotspot</dt>
                <dd className="font-semibold tabular-nums text-[#CC0001]">{item.hotspot}</dd>
              </div>
              <div>
                <dt className="text-xs text-moss">Rating</dt>
                <dd className="inline-flex items-center gap-1 font-semibold tabular-nums text-ink">
                  {item.rating.toFixed(1)}
                  <Star size={13} fill="#FFCC00" color="#FFCC00" aria-hidden="true" />
                </dd>
              </div>
            </dl>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#eef1f6]">
              <div className="h-full rounded-full bg-navy" style={{ width: `${item.selesai}%` }} />
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="text-xs tabular-nums text-moss">{item.selesai}%</span>
              <span className="flex flex-wrap justify-end gap-1">
                {Object.entries(item.parties).map(([party, count]) => (
                  <span
                    key={party}
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={partyStyle[party]}
                  >
                    {party} +{count}
                  </span>
                ))}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
