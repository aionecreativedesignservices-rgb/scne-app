export default function StatRow({ stats }) {
  return (
    <div className="flex justify-around py-4 border-y border-gray-50">
      {Object.entries(stats).map(([label, value]) => (
        <div key={label} className="text-center">
          <div className="font-bold text-lg">{value}</div>
          <div className="text-xs text-gray-400 capitalize">{label}</div>
        </div>
      ))}
    </div>
  );
}