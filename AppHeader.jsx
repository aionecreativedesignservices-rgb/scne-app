export default function AppHeader({ title }) {
  return (
    <div className="px-6 pt-6 pb-4 text-center border-b border-white/5">
      <h1 className="text-xl tracking-widest font-light text-scne-gold">
        SCNE
      </h1>
      {title && (
        <p className="text-white/70 text-sm mt-1">
          {title}
        </p>
      )}
    </div>
  );
}