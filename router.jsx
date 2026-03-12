import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";
import DetailLayout from "../layouts/DetailLayout";
import * as P from "./routes";

function MissingScreen({ name }) {
  return (
    <div className="min-h-screen bg-scne-bg text-white p-6">
      <h1 className="text-xl text-scne-gold">Missing screen export</h1>
      <p className="mt-2 text-white/70">
        <span className="font-mono">{name}</span> is not exported from{" "}
        <span className="font-mono">src/app/routes.jsx</span>
      </p>
    </div>
  );
}

const safe = (Comp, name) => (Comp ? <Comp /> : <MissingScreen name={name} />);

export default function AppRouter() {
  return (
    <Routes>
      {/* AUTH */}
      <Route element={<AuthLayout />}>
        <Route path="/authlanding" element={safe(P.ScreenAuthLanding, "ScreenAuthLanding")} />
	<Route path="/auth" element={safe(P.ScreenAuthChoice, "ScreenAuthChoice")} />
        <Route path="/login" element={safe(P.ScreenLogin, "ScreenLogin")} />
        <Route
          path="/signup/personal-info"
          element={safe(P.ScreenSignupPersonalInfo, "ScreenSignupPersonalInfo")}
        />
        <Route
          path="/signup/profile-setup"
          element={safe(P.ScreenSignupProfileSetup, "ScreenSignupProfileSetup")}
        />
      </Route>

      {/* MAIN APP (BottomNav) */}
      <Route element={<AppLayout />}>
        <Route path="/feed" element={safe(P.ScreenHomeFeed, "ScreenHomeFeed")} />
        <Route path="/messages" element={safe(P.ScreenMessages, "ScreenMessages")} />
        <Route path="/requests" element={safe(P.ScreenRequests, "ScreenRequests")} />
        <Route path="/profile/me" element={safe(P.ScreenUserProfileMe, "ScreenUserProfileMe")} />
        <Route
          path="/venue/user/:userId"
          element={safe(P.ScreenVenueUserProfileView, "ScreenVenueUserProfileView")}
        />
        <Route
          path="/venue/:venueId/feed"
          element={safe(P.ScreenVenueFeed, "ScreenVenueFeed")}
        />
      </Route>

      {/* DETAIL FLOW */}
      <Route element={<DetailLayout />}>
        <Route
          path="/onboarding/enable-location"
          element={safe(P.ScreenOnboardingEnableLocation, "ScreenOnboardingEnableLocation")}
        />
        <Route
          path="/onboarding/continue-to-checkin"
          element={safe(P.ScreenOnboardingContinueToCheckin, "ScreenOnboardingContinueToCheckin")}
        />
        <Route
          path="/checkin/select-venue-collapsed"
          element={safe(P.ScreenCheckinSelectVenueCollapsed, "ScreenCheckinSelectVenueCollapsed")}
        />
        <Route
          path="/checkin/select-venue-expanded"
          element={safe(P.ScreenCheckinSelectVenueExpanded, "ScreenCheckinSelectVenueExpanded")}
        />
        <Route
          path="/messages/:threadId"
          element={safe(P.ScreenMessageDetail, "ScreenMessageDetail")}
        />
        <Route
          path="/venue/:venueId/checkin"
          element={safe(P.ScreenVenueFeedCheckin, "ScreenVenueFeedCheckin")}
        />
      </Route>

      {/* DEFAULTS */}
      <Route path="/" element={<Navigate to="/authlanding" replace />} />
      <Route path="*" element={<Navigate to="/authlanding" replace />} />
    </Routes>
  );
}