export default function Input({ label, type = "text", ...props }) {
  return (
    <label className="block">
      <span className="block text-sm text-white/70 mb-2">{label}</span>
      <input
        type={type}
        className="w-full bg-transparent text-white placeholder-white/40 outline-none"
        {...props}
      />
      <div className="h-px bg-white/10 mt-3" />
    </label>
  );
}