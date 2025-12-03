"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  type PieLabelRenderProps,
} from "recharts";

interface StatsPieChartProps {
  data: Array<{ name: string; value: number; color: string }>;
}

export function StatsPieChart({ data }: StatsPieChartProps) {
  const renderLabel = (
    props: PieLabelRenderProps & {
      name?: string;
      value?: number;
      percent?: number;
      cx?: number;
      cy?: number;
      midAngle?: number;
      innerRadius?: number;
      outerRadius?: number;
    },
  ) => {
    if (!props.percent || props.percent < 0.1) {
      return <g />;
    }

    const name = props.name || "";
    const midAngle = props.midAngle || 0;
    const cx = props.cx || 150;
    const cy = props.cy || 150;
    const innerRadius = props.innerRadius || 30;
    const outerRadius = props.outerRadius || 100;

    const RADIAN = Math.PI / 180;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        dominantBaseline="central"
        fill="#000000"
        stroke="#ffffff"
        strokeWidth="3"
        style={{
          paintOrder: "stroke",
          fontSize: "12px",
          fontWeight: "bold",
        }}
        textAnchor="middle"
        x={x}
        y={y}
      >
        {name}
      </text>
    );
  };

  return (
    <ResponsiveContainer height={300} width="100%">
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={data}
          dataKey="value"
          innerRadius={30}
          label={renderLabel}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell
              fill={entry.color}
              key={`cell-${index}`}
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
