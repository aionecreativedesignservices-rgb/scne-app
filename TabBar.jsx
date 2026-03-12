export default function TabBar({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex border-b border-gray-100">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 py-3 text-sm font-bold capitalize ${activeTab === tab ? 'border-b-2 border-black' : 'text-gray-400'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
