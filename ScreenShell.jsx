export default function ScreenShell({ children, className = "" }) {
  return (
    <div className={`flex flex-col min-h-screen bg-white ${className}`}>
      {children}
    </div>
  );
}