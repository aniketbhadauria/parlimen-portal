import { motion, useReducedMotion } from "framer-motion";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { aduanTrend, bahagian, kpis, seats } from "../gambaran.js";
import { T } from "../theme.js";

const tick = { fill: "#5c6b82", fontSize: 12, fontFamily: "Outfit Variable, sans-serif" };

function Tip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink shadow">
      <p className="text-moss">{label}</p>
      {payload.map((item) => (
        <p key={item.name} className="tabular-nums">
          {item.name}: {item.value.toLocaleString("en-MY")}
        </p>
      ))}
    </div>
  );
}

export function GambaranScreen({ query }) {
  const reduce = useReducedMotion();
  const needle = query.trim().toLowerCase();
  const bars = bahagian.filter((row) => row.name.toLowerCase().includes(needle));

  return (
    <motion.div
      className="flex flex-col gap-5"
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[15px] font-medium text-navy">Kerajaan Negeri Johor Darul Takzim</p>
          <p className="mt-1 max-w-xl text-sm text-moss">
            Pantauan menyeluruh 48 ADUN BN. PRN Johor ke-16. Julai 2026.
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm font-medium text-ink">YAB Dato' Onn Hafiz bin Ghazi</p>
          <p className="text-sm text-moss">Menteri Besar Johor Darul Takzim</p>
          <p className="text-xs text-moss">BN, UMNO Johor, ADUN N28 Machap</p>
        </div>
      </header>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
        {kpis.map((item) => (
          <li key={item.id} className="card px-3 py-3">
            <p className="display text-[22px] leading-none text-ink tabular-nums">{item.value}</p>
            <p className="mt-2 text-xs text-moss">{item.label}</p>
          </li>
        ))}
      </ul>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="card p-4">
          <h2 className="text-[15px] font-medium text-ink">Pecahan kerusi BN Johor</h2>
          <p className="text-sm text-moss">PRN ke-16</p>
          <div className="mt-2 grid items-center gap-2 sm:grid-cols-[1fr_180px]">
            <div className="relative h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={seats} dataKey="value" nameKey="name" innerRadius="62%" outerRadius="88%" stroke="#fff" paddingAngle={2}>
                    {seats.map((seat) => (
                      <Cell key={seat.name} fill={seat.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<Tip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <p className="text-center">
                  <span className="display block text-3xl text-ink">48/56</span>
                  <span className="text-xs text-moss">Kerusi DUN</span>
                </p>
              </div>
            </div>
            <ul className="flex flex-col gap-3">
              {seats.map((seat) => (
                <li key={seat.name} className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 text-ink">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: seat.fill }} />
                    {seat.name}
                  </span>
                  <span className="tabular-nums text-moss">{seat.value} kerusi</span>
                </li>
              ))}
              <li className="rounded-2xl bg-[#fff6cc] px-3 py-2 text-sm text-navy">
                BN menang 48/56 kerusi DUN
              </li>
            </ul>
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-[15px] font-medium text-ink">Trend aduan negeri</h2>
          <p className="text-sm text-moss">Januari hingga Jun 2026</p>
          <div className="mt-3 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={aduanTrend} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={T.wire} vertical={false} />
                <XAxis dataKey="month" tick={tick} axisLine={false} tickLine={false} />
                <YAxis hide domain={[200, 560]} />
                <Tooltip content={<Tip />} />
                <Area type="monotone" dataKey="masuk" name="Masuk" stroke={T.blue} fill="rgba(1,0,102,0.08)" strokeWidth={2} />
                <Area type="monotone" dataKey="selesai" name="Selesai" stroke={T.red} fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="card p-4">
        <h2 className="text-[15px] font-medium text-ink">Jumlah aduan mengikut bahagian UMNO</h2>
        {bars.length === 0 ? (
          <p className="mt-6 text-sm text-moss">Tiada bahagian sepadan. Cuba Johor Bahru, Muar, atau Kluang.</p>
        ) : (
          <div className="mt-3 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bars} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid stroke={T.wire} vertical={false} />
                <XAxis dataKey="name" tick={tick} interval={0} angle={-28} textAnchor="end" height={64} axisLine={false} tickLine={false} />
                <YAxis tick={tick} axisLine={false} tickLine={false} width={36} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="aduan" name="Aduan" fill={T.gold} radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </motion.div>
  );
}
