export function StatsGrid({ stats }: any) {
  const items = [
    { label: "Total", value: stats.total },
    { label: "Upcoming", value: stats.upcoming },
    { label: "Completed", value: stats.completed },
    { label: "Cancelled", value: stats.cancelled },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((i) => (
        <div key={i.label} className="p-4 border rounded-xl">
          <p className="text-sm text-muted-foreground">{i.label}</p>
          <p className="text-xl font-bold">{i.value}</p>
        </div>
      ))}
    </div>
  );
}
