'use client'

import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type LevelDatum = { level: string; count: number }
type RegionDatum = { region: string; avgScore: number; count: number }

const LEVEL_COLOR: Record<string, string> = {
  EXCELLENT: 'var(--color-excellent)',
  GOOD: 'var(--color-good)',
  AVERAGE: 'var(--color-average)',
  POOR: 'var(--color-poor)',
}

const LEVEL_LABEL: Record<string, string> = {
  EXCELLENT: 'Excellent', GOOD: 'Good', AVERAGE: 'Average', POOR: 'Poor',
}

export function DashboardCharts({ levelData, regionData }: { levelData: LevelDatum[]; regionData: RegionDatum[] }) {
  const pieData = levelData.map((d) => ({ name: LEVEL_LABEL[d.level], value: d.count, level: d.level }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <section className="lg:col-span-2 min-w-0 bg-primary-light border border-muted-blue/30 p-6">
        <h2 className="text-lg font-heading font-bold mb-1">Relationship Classification</h2>
        <p className="text-xs text-off-white/50 mb-6">Distribution of countries by relationship level</p>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={2}
              stroke="var(--color-primary-light)"
              strokeWidth={2}
            >
              {pieData.map((entry) => (
                <Cell key={entry.level} fill={LEVEL_COLOR[entry.level]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', fontSize: 13 }}
              itemStyle={{ color: '#F8FAFC' }}
            />
            <Legend
              verticalAlign="bottom"
              formatter={(value) => <span className="text-off-white/70 text-xs">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </section>

      <section className="lg:col-span-3 min-w-0 bg-primary-light border border-muted-blue/30 p-6">
        <h2 className="text-lg font-heading font-bold mb-1">Average Score by Region</h2>
        <p className="text-xs text-off-white/50 mb-6">Mean relationship score (0-100) across tracked regions</p>
        <ResponsiveContainer width="100%" height={Math.max(280, regionData.length * 34)}>
          <BarChart data={regionData} layout="vertical" margin={{ left: 12, right: 24 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={{ stroke: '#334155' }} tickLine={false} />
            <YAxis type="category" dataKey="region" width={110} interval={0} tick={{ fill: '#F8FAFC', fontSize: 12 }} axisLine={{ stroke: '#334155' }} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', fontSize: 13 }}
              itemStyle={{ color: '#F8FAFC' }}
              cursor={{ fill: '#334155', opacity: 0.2 }}
              formatter={(value, _name, item) => [`${value} avg (${item.payload.count} countries)`, 'Score']}
            />
            <Bar dataKey="avgScore" fill="var(--color-accent)" radius={[0, 4, 4, 0]} maxBarSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  )
}
