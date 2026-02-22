export function BookingsList({ title, list }: any) {
  return (
    <div>
      <h2 className="font-semibold mb-2">{title}</h2>

      <div className="space-y-2">
        {list.map((b: any) => (
          <div key={b.id} className="p-3 border rounded-lg">
            <p className="font-medium">{new Date(b.date).toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Status: {b.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
