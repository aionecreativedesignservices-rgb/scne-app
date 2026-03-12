import { useNavigate } from "react-router-dom";

export function EnableLocation() {
  const navigate = useNavigate();

  const handleEnable = () => {
    if (!("geolocation" in navigator)) {
      alert("Geolocation not supported.");
      navigate("/onboarding/continue-to-checkin");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        navigate("/onboarding/continue-to-checkin");
      },
      () => {
        // Even if denied, continue (prototype behavior)
        navigate("/onboarding/continue-to-checkin");
      }
    );
  };

  return (
    <div className="min-h-screen bg-scne-bg text-white flex flex-col items-center justify-center px-8 text-center">
      <h1 className="text-xl leading-relaxed max-w-xs">
        Enable location to check in
        <br />
        to local venues
      </h1>

      <button
        type="button"
        onClick={handleEnable}
        className="mt-14 w-full max-w-xs rounded-full bg-scne-gold text-black py-3 font-medium shadow-glow"
      >
        Enable Location
      </button>
    </div>
  );
}

export function ContinueToCheckin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-scne-bg text-white flex flex-col items-center justify-center px-8 text-center">
      <h1 className="text-xl leading-relaxed max-w-xs">
        You’re all set.
        <br />
        Let’s check in.
      </h1>

      <button
        type="button"
        onClick={() => navigate("/checkin/select-venue-collapsed")}
        className="mt-14 w-full max-w-xs rounded-full bg-scne-gold text-black py-3 font-medium shadow-glow"
      >
        Continue
      </button>
    </div>
  );
}