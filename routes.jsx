// src/app/routes.jsx

import React from "react";

import * as Auth from "../pages/AuthPages";
import * as Interaction from "../pages/InteractionPages";
import * as Onboarding from "../pages/OnboardingPages";
import * as Checkin from "../pages/CheckinPages";

import {
  HomeTemplate,
  VenueFeedTemplate,
  UserProfileTemplate,
} from "../pages/SharedTemplates";

/* ========= AUTH ========= */
export const ScreenAuthLanding = Auth.ScreenAuthLanding;
export const ScreenAuthChoice = Auth.ScreenAuthChoice;
export const ScreenLogin = Auth.ScreenLogin;
export const ScreenSignupPersonalInfo = Auth.ScreenSignupPersonalInfo;
export const ScreenSignupProfileSetup = Auth.ScreenSignupProfileSetup;

/* ========= ONBOARDING ========= */
export const ScreenOnboardingEnableLocation = Onboarding.EnableLocation;
export const ScreenOnboardingContinueToCheckin = Onboarding.ContinueToCheckin;

/* ========= CHECK-IN ========= */
export const ScreenCheckinSelectVenueCollapsed = () => (
  <Checkin.SelectVenue expanded={false} />
);

export const ScreenCheckinSelectVenueExpanded = () => (
  <Checkin.SelectVenue expanded={true} />
);

// IMPORTANT: this must come from CheckinPages (NOT VenueFeedTemplate)
export const ScreenVenueFeedCheckin = Checkin.ScreenVenueFeedCheckin;

/* ========= HOME ========= */
// Your router likely uses /feed
export const ScreenHomeFeed = HomeTemplate;

/* ========= VENUE FEED ========= */
// Your router likely uses /venue/:venueId/feed
export const ScreenVenueFeed = VenueFeedTemplate;

/* ========= PROFILES ========= */
// "Me" profile (bottom nav Profile goes here)
export const ScreenUserProfileMe = () => <UserProfileTemplate forcedId="me" />;

// ✅ Part 2 / story bubble click destination
// Your router should use: /venue/user/:userId
export const ScreenVenueUserProfileView = UserProfileTemplate;

/* ========= MESSAGES ========= */
export const ScreenMessages = Interaction.Messages;
export const ScreenMessageDetail = Interaction.MessageDetail;
export const ScreenRequests = Interaction.Requests;