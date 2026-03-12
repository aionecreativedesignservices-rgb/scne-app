import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  const base = "flex flex-col items-center text-xs";
  const active = "text-scne-gold";
  const inactive = "text-white/50";

  return (
    <div className="
        fixed bottom-0 left-1/2 -translate-x-1/2
        w-full max-w-md
        bg-[#0B0B12]/95 backdrop-blur
        border-t border-white/5
        px-6 py-3
        flex justify-between
    ">
      <NavLink to="/feed" className={({isActive}) => `${base} ${isActive ? active : inactive}`}>
        Home
      </NavLink>

      <NavLink to="/messages" className={({isActive}) => `${base} ${isActive ? active : inactive}`}>
        Messages
      </NavLink>

      <NavLink to="/profile/me" className={({isActive}) => `${base} ${isActive ? active : inactive}`}>
        Profile
      </NavLink>
    </div>
  );
}