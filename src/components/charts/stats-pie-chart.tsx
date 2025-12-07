"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  type PieLabelRenderProps,
} from "recharts";

type StatsPieChartProps = {
  data: Array<{ name: string; value: number; color: string }>;
  innerRadius?: number;
  showTotal?: boolean;
};

export function StatsPieChart({
  data,
  innerRadius = 30,
  showTotal = false,
}: StatsPieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

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
    if (!props.percent || props.percent < 0.1) return <g />;

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
    <div className="relative">
      <ResponsiveContainer height={300} width="100%">
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={data}
            dataKey="value"
            innerRadius={innerRadius}
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

      {showTotal && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-2xl md:text-3xl font-bold text-gray-900">
            {total}
          </div>
          <div className="text-xs md:text-sm text-gray-600">合計食品数</div>
        </div>
      )}
    </div>
  );
}
