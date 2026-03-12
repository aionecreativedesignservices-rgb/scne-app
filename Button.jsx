export default function Button({ children, onClick, variant = 'primary', className = '' }) {
  const styles = variant === 'primary' ? 'bg-black text-white' : 'bg-gray-200 text-black';
  return (
    <button 
      onClick={onClick}
      className={`w-full py-3 rounded-xl font-bold transition-transform active:scale-95 ${styles} ${className}`}
    >
      {children}
    </button>
  );
}