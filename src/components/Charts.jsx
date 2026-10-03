import {
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { T, ink } from "../theme.js";
import { formatMillions } from "../data.js";

const shareColors = [T.blue, T.red, T.gold, T.lime, T.pink];

function formatTip(value, kind) {
  if (kind === "yield") return `${value} kt`;
  if (kind === "share") return `${value}%`;
  return formatMillions(value);
}

function Tip({ active, payload, label, kind }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-3 py-2 text-sm"
      style={{ background: T.panel, border: `1px solid ${T.border}`, color: T.text }}
    >
      <p style={{ color: ink.secondary }}>{label}</p>
      {payload.map((item) => (
        <p key={item.dataKey} className="tabular-nums">
          {item.name}: {formatTip(item.value, kind)}
        </p>
      ))}
    </div>
  );
}

const axisTick = { fill: ink.secondary, fontSize: 12, fontFamily: "Outfit Variable, sans-serif" };

export function InflowChart({ data }) {
  return (
    <div className="h-64 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 28, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="hasilFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={T.blue} stopOpacity={0.22} />
              <stop offset="100%" stopColor={T.blue} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={T.wire} vertical={false} />
          <XAxis dataKey="label" tick={axisTick} axisLine={false} tickLine={false} />
          <YAxis hide domain={[(min) => Math.floor(min * 0.75), (max) => Math.ceil(max * 1.08)]} />
          <Tooltip content={<Tip />} />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ fontSize: 13, color: ink.secondary, top: 0 }}
          />
          <Area type="monotone" dataKey="hasil" name="Hasil" stroke={T.blue} fill="url(#hasilFill)" strokeWidth={2} />
          <Area type="monotone" dataKey="royalty" name="Royalty" stroke={T.red} fill="transparent" strokeWidth={2} />
          <Area type="monotone" dataKey="forest" name="Forestry" stroke={T.gold} fill="transparent" strokeWidth={2.5} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function YieldChart({ data }) {
  return (
    <div className="h-72 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid stroke={T.wire} horizontal={false} />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="district"
            width={96}
            axisLine={false}
            tickLine={false}
            tick={axisTick}
          />
          <Tooltip content={<Tip kind="yield" />} />
          <Bar dataKey="yield" name="Yield" radius={[0, 6, 6, 0]} barSize={14}>
            {data.map((row) => (
              <Cell
                key={row.district}
                fill={row.yield === Math.max(...data.map((item) => item.yield)) ? T.blue : "#C5CEDD"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ShareChart({ data }) {
  const lead = data[0];
  return (
    <div className="relative h-72 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="58%"
            outerRadius="82%"
            paddingAngle={2}
            stroke="#ffffff"
          >
            {data.map((slice, index) => (
              <Cell key={slice.name} fill={shareColors[index % shareColors.length]} />
            ))}
          </Pie>
          <Tooltip content={<Tip kind="share" />} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: 13, color: ink.secondary }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-x-0 top-0 flex h-[72%] items-center justify-center">
        <p className="text-center">
          <span className="display block text-3xl text-ink">{lead.value}%</span>
          <span className="text-sm text-moss">{lead.name}</span>
        </p>
      </div>
    </div>
  );
}
