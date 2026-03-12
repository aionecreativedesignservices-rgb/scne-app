export default function Card({ children, className = '' }) {
  return <div className={`p-4 bg-white border border-gray-100 rounded-2xl ${className}`}>{children}</div>;
}