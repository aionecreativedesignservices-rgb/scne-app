import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

/**
 * Routes expected:
 *  /checkin/select-venue-collapsed  => <SelectVenue expanded={false} />
 *  /checkin/select-venue-expanded   => <SelectVenue expanded={true} />
 *  /venue/:venueId/checkin          => <ScreenVenueFeedCheckin />
 */

const VENUES = [
  { id: "compound", label: "Compound" },
  { id: "aura-rooftop", label: "Aura Rooftop" },
  { id: "the-mansion", label: "The Mansion" },
  { id: "the-foundry", label: "The Foundry" },
];

export function SelectVenue({ expanded = false }) {
  const navigate = useNavigate();

  const subtitle = useMemo(
    () => (
      <>
        Select a venue to check-in
        <br />
        and see who's here.
      </>
    ),
    []
  );

  const goExpanded = () => navigate("/checkin/select-venue-expanded");

  const goVenueCheckin = (venueId) => {
    navigate(`/venue/${venueId}/checkin`);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background image glow area */}
      <div className="absolute inset-x-0 top-0 h-[42%]">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_top,rgba(120,140,255,0.25),rgba(0,0,0,0)_55%),radial-gradient(ellipse_at_top_left,rgba(255,120,190,0.18),rgba(0,0,0,0)_50%),linear-gradient(to_bottom,rgba(0,0,0,0.15),rgba(0,0,0,0.95))]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-black" />
      </div>

      <div className="relative z-10 px-8 pt-14 pb-10">
        {/* Back + wordmark */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-xs text-scne-gold/80 underline underline-offset-4"
          >
            &larr; Back
          </button>

          <div className="text-[10px] tracking-[0.35em] text-white/40 select-none">
            SCNE
          </div>
        </div>

        {/* Title */}
        <div className="mt-14 text-center">
          <h1 className="text-4xl font-extrabold leading-tight">
            Check Into
            <br />
            The Club
            <br />
            You’re At
          </h1>

          <p className="mt-4 text-sm text-scne-gold/80">{subtitle}</p>
        </div>

        {/* Buttons */}
        <div className="mt-10 space-y-4">
          {!expanded ? (
            <VenueRow label="Select Venue" onClick={goExpanded} />
          ) : (
            VENUES.map((v) => (
              <VenueRow
                key={v.id}
                label={v.label}
                onClick={() => goVenueCheckin(v.id)}
              />
            ))
          )}
        </div>

        {/* Divider line */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-scne-gold/40 to-transparent" />
      </div>
    </div>
  );
}

function VenueRow({ label, onClick }) {
  return (
    <button type="button" onClick={onClick} className="gradient-border w-full">
      <div className="rounded-[1.25rem] bg-[#0B0B12] px-5 py-4 flex items-center justify-between">
        <span className="text-base">{label}</span>
        <span className="text-white/80 text-lg leading-none">▶</span>
      </div>
    </button>
  );
}

/**
 * Venue feed screen placeholder (so routing works)
 * If you already have a proper VenueFeedTemplate elsewhere, tell me its prop API
 * and I’ll wire it in perfectly.
 */
import { VenueFeedTemplate } from "./SharedTemplates"; // add this at the top with other imports

export function ScreenVenueFeedCheckin() {
  // VenueFeedTemplate already knows how to read the venueId from the route (via useParams) in your project setup.
  return <VenueFeedTemplate />;
}