import { useNavigate, useParams } from "react-router-dom";

/**
 * InteractionPages.jsx
 * Screens:
 *  - Messages (requests-style inbox)
 *  - MessageDetail (placeholder)
 *  - Requests (placeholder list)
 */

export function Messages() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-scne-bg text-white px-8 pt-16 pb-10">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-xs text-scne-gold/80 underline underline-offset-4"
      >
        &larr; Back
      </button>

      {/* Title */}
      <div className="mt-8">
        <h1 className="text-4xl font-semibold tracking-tight">Messages</h1>
      </div>

      {/* Cards */}
      <div className="mt-10 space-y-6">
        <RequestCard
          initial="C"
          name="Chris"
          preview={"Hey, what's up. I\nwould really\nlike..."}
          onOpen={() => navigate("/messages/chris")}
          onDecline={() => alert("Declined")}
        />

        <RequestCard
          initial="M"
          name="Marcus"
          preview={"Hello! I couldn't\nhelp but notice..."}
          onOpen={() => navigate("/messages/marcus")}
          onDecline={() => alert("Declined")}
        />
      </div>

      {/* View Requests button */}
      <div className="mt-12 flex justify-center">
        <button
          type="button"
          onClick={() => navigate("/requests")}
          className="gradient-border"
        >
          <span className="block rounded-full px-10 py-2 bg-[#0B0B12] text-sm text-white/90">
            View Requests
          </span>
        </button>
      </div>

      {/* bottom padding so it sits above nav */}
      <div className="h-10" />
    </div>
  );
}

function RequestCard({ initial, name, preview, onOpen, onDecline }) {
  return (
    <div className="gradient-border w-full">
      <div className="rounded-[1.25rem] bg-[#0B0B12] px-5 py-4 flex items-center justify-between gap-4">
        {/* Left: avatar + text */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="h-12 w-12 rounded-full border border-scne-gold/40 flex items-center justify-center text-xl font-semibold text-white">
            {initial}
          </div>

          <div className="min-w-0">
            <div className="text-lg font-semibold leading-none">{name}</div>
            <div className="mt-1 text-xs text-white/55 whitespace-pre-line leading-snug">
              {preview}
            </div>
          </div>
        </div>

        {/* Right: buttons */}
        <div className="flex flex-col gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpen}
            className="h-7 w-16 rounded-full bg-scne-gold text-black text-xs font-medium"
          >
            Open
          </button>
          <button
            type="button"
            onClick={onDecline}
            className="h-7 w-16 rounded-full bg-scne-gold text-black text-xs font-medium opacity-95"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Optional placeholders so routes don’t break ---------- */

export function MessageDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-scne-bg text-white px-8 pt-16 pb-10">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-xs text-scne-gold/80 underline underline-offset-4"
      >
        &larr; Back
      </button>

      <div className="mt-8">
        <h1 className="text-3xl font-semibold">Chat</h1>
        <p className="mt-2 text-sm text-white/60">Thread: {id}</p>
      </div>

      <div className="mt-10 text-white/60 text-sm">
        Message thread UI goes here.
      </div>
    </div>
  );
}

export function Requests() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white px-8 pt-16 pb-24">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-xs text-scne-gold/80 underline underline-offset-4"
      >
        &larr; Back
      </button>

      {/* Title */}
      <div className="mt-8">
        <h1 className="text-4xl font-semibold tracking-tight">
          Social
          <br />
          Requests
        </h1>
      </div>

      {/* Request Cards */}
      <div className="mt-8 space-y-6">
        <SocialRequestCard
          initial="C"
          name="Chris"
          subtitle="Sent You A Drink"
          primaryLabel="Accept"
          secondaryLabel="Decline"
        />

        <SocialRequestCard
          initial="M"
          name="Marcus"
          subtitle="Sent You Champagne"
          primaryLabel="Accept"
          secondaryLabel="Decline"
        />

        <SocialRequestCard
          initial="T"
          name="Ty"
          subtitle="Sent You A Wave"
          primaryLabel="Chat"
          secondaryLabel="Decline"
        />
      </div>

      {/* Activity Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold">Activity</h2>
        <p className="mt-2 text-sm text-white/60">
          You accepted a drink from Ty
        </p>
      </div>

      <div className="h-10" />
    </div>
  );
}

function SocialRequestCard({
  initial,
  name,
  subtitle,
  primaryLabel,
  secondaryLabel,
}) {
  return (
    <div className="gradient-border w-full">
      <div className="rounded-[1.25rem] bg-[#0B0B12] px-5 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full border border-scne-gold/40 flex items-center justify-center text-lg font-semibold">
            {initial}
          </div>

          <div>
            <div className="text-lg font-semibold leading-none">
              {name}
            </div>
            <div className="text-xs text-white/55 mt-1">
              {subtitle}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="h-7 px-4 rounded-full bg-scne-gold text-black text-xs font-medium"
          >
            {primaryLabel}
          </button>

          <button
            type="button"
            className="h-7 px-4 rounded-full bg-scne-gold text-black text-xs font-medium opacity-95"
          >
            {secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}