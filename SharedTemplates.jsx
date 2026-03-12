// src/pages/SharedTemplates.jsx
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

/**
 * SharedTemplates.jsx
 * Exports:
 *  - HomeTemplate
 *  - VenueFeedTemplate
 *  - UserProfileTemplate
 */

// -------------------------
// Helpers
// -------------------------
const profileImg = (id) => `/images/profiles/${String(id).toLowerCase()}.jpg`;

const venuePostImg = (venueId) => {
  const v = String(venueId).toLowerCase();
  if (v.includes("aura")) return "/images/posts/aura-post.jpg";
  if (v.includes("mansion")) return "/images/posts/mansion-post.jpg";
  if (v.includes("foundry")) return "/images/posts/foundry-post.jpg";
  return "/images/posts/compound-post.jpg";
};

// -------------------------
// Bottom Nav
// -------------------------
function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (prefix) => location.pathname.startsWith(prefix);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95">
      <div className="mx-auto max-w-md px-8 pb-5 pt-3">
        <div className="flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => navigate("/feed")}
            className={`flex items-center gap-2 ${
              isActive("/feed") ? "text-scne-gold" : "text-white/70"
            }`}
          >
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/messages")}
            className={`flex items-center gap-2 ${
              isActive("/messages") ? "text-scne-gold" : "text-white/70"
            }`}
          >
            <span>Messages</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile/me")}
            className={`flex items-center gap-2 ${
              isActive("/profile") ? "text-scne-gold" : "text-white/70"
            }`}
          >
            <span>Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------
// HOME TEMPLATE
// -------------------------
export function HomeTemplate() {
  const navigate = useNavigate();

  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [postType, setPostType] = useState("photo");
  const [caption, setCaption] = useState("");
  const [reportTarget, setReportTarget] = useState(null);
  const [commentsForPost, setCommentsForPost] = useState(null);
  const [commentDraft, setCommentDraft] = useState("");

  // Part 5A state
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [currentVenue, setCurrentVenue] = useState({
    id: "compound",
    name: "COMPOUND",
    activeCount: 1204,
  });
  const [isLeavingVenue, setIsLeavingVenue] = useState(false);
  const [showSessionEndedBanner, setShowSessionEndedBanner] = useState(false);

  const livePeople = [
    { id: "aj", name: "AJ", img: profileImg("aj") },
    { id: "marcus", name: "Marcus", img: profileImg("marcus") },
    { id: "leah", name: "Leah", img: profileImg("leah") },
    { id: "kyle", name: "Kyle", img: profileImg("kyle") },
  ];

  const [livePosts, setLivePosts] = useState([
    {
      id: "post-1",
      userId: "aj",
      username: "ajontherocks",
      userImage: profileImg("aj"),
      media: "/images/posts/compound-post.jpg",
      caption: "Tonight is already insane 😮‍💨✨",
      time: "Live now",
      reactionOptions: ["🔥", "😍", "🥂"],
      selectedReaction: "",
      comments: [
        { id: "c1", user: "Marcus", text: "This looks crazy 🔥" },
        { id: "c2", user: "Leah", text: "I’m on my way" },
      ],
    },
    {
      id: "post-2",
      userId: "marcus",
      username: "marcusafterdark",
      userImage: profileImg("marcus"),
      media: profileImg("marcus"),
      caption: "Who’s really outside tonight?",
      time: "2 min ago",
      reactionOptions: ["🔥", "😮", "🖤"],
      selectedReaction: "",
      comments: [{ id: "c3", user: "AJ", text: "Outside outside." }],
    },
  ]);

  const closeComposer = () => {
    setIsComposerOpen(false);
    setPostType("photo");
    setCaption("");
  };

  const submitPost = () => {
    const newPost = {
      id: `post-${Date.now()}`,
      userId: "me",
      username: "youonscene",
      userImage: profileImg("aj"),
      media: "/images/posts/compound-post.jpg",
      caption: caption || "New post on the Live Wall",
      time: "Just now",
      reactionOptions: ["🔥", "😍", "🥂"],
      selectedReaction: "",
      comments: [],
    };

    setLivePosts((prev) => [newPost, ...prev]);
    closeComposer();
    alert("Post submitted to the Live Wall (demo)");
  };

  const toggleReaction = (postId, emoji) => {
    setLivePosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              selectedReaction: post.selectedReaction === emoji ? "" : emoji,
            }
          : post
      )
    );
  };

  const openComments = (postId) => {
    setCommentsForPost(postId);
    setCommentDraft("");
  };

  const closeComments = () => {
    setCommentsForPost(null);
    setCommentDraft("");
  };

  const submitComment = () => {
    if (!commentDraft.trim() || !commentsForPost) return;

    setLivePosts((prev) =>
      prev.map((post) =>
        post.id === commentsForPost
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: `c-${Date.now()}`,
                  user: "You",
                  text: commentDraft.trim(),
                },
              ],
            }
          : post
      )
    );

    setCommentDraft("");
  };

  const activeCommentsPost = livePosts.find((p) => p.id === commentsForPost);

  // Part 5A leave venue flow
  const startLeaveVenueFlow = () => {
    setIsLeavingVenue(true);

    setTimeout(() => {
      setIsCheckedIn(false);
      setIsLeavingVenue(false);
      setShowSessionEndedBanner(true);

      setTimeout(() => {
        setShowSessionEndedBanner(false);
      }, 6000);
    }, 4000);
  };

  const cancelLeaveVenueFlow = () => {
    setIsLeavingVenue(false);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="px-8 pt-6 flex items-center justify-between">
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

        <button
          type="button"
          onClick={() => navigate("/messages")}
          className="text-white/70 hover:text-white"
          aria-label="Messages"
          title="Messages"
        >
          ✉
        </button>
      </div>

      {/* Session ended banner */}
      {showSessionEndedBanner && (
        <div className="px-8 mt-5">
          <div className="rounded-[1.25rem] border border-scne-gold/30 bg-scne-gold/10 px-4 py-4 text-sm text-white">
            You are no longer checked in at{" "}
            <span className="text-scne-gold font-medium">{currentVenue.name}</span>.
            Your location is no longer visible on Scene.
          </div>
        </div>
      )}

      {/* Leaving banner */}
      {isLeavingVenue && (
        <div className="px-8 mt-5">
          <div className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4">
            <div className="text-sm text-white/90">
              Leaving <span className="text-scne-gold">{currentVenue.name}</span>...
            </div>
            <div className="mt-1 text-xs text-white/50">
              Your venue session will expire in a few moments.
            </div>

            <button
              type="button"
              onClick={cancelLeaveVenueFlow}
              className="mt-3 text-xs text-scne-gold/80 underline underline-offset-4"
            >
              Undo
            </button>
          </div>
        </div>
      )}

      {/* Checked in state */}
      {isCheckedIn ? (
        <>
          {/* Venue status */}
          <div className="px-8 pt-8">
            <div className="flex items-center gap-2 text-xs text-scne-gold/80 uppercase tracking-[0.25em]">
              <span className="inline-block h-2 w-2 rounded-full bg-scne-gold animate-pulse" />
              <span>On Scene</span>
            </div>

            <h1
              className="mt-3 text-3xl tracking-wide"
              style={{ fontFamily: "serif" }}
            >
              {currentVenue.name}
            </h1>

            <p className="mt-2 text-sm text-white/60">
              {currentVenue.activeCount} people are active in the venue right now
            </p>
          </div>

          {/* Create post */}
          <div className="px-8 mt-6">
            <button
              type="button"
              onClick={() => setIsComposerOpen(true)}
              className="gradient-border w-full"
            >
              <div className="rounded-[1.25rem] bg-[#0B0B12] px-5 py-4 flex items-center justify-between">
                <div className="text-left">
                  <div className="text-sm font-medium">Post to the Live Wall</div>
                  <div className="text-xs text-white/50 mt-1">
                    Share a photo or video up to 30 seconds
                  </div>
                </div>
                <div className="text-xl text-scne-gold">＋</div>
              </div>
            </button>
          </div>

          {/* People on scene */}
          <div className="px-8 mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg italic" style={{ fontFamily: "serif" }}>
                On Scene Now
              </h2>

              <button
                type="button"
                onClick={() => navigate(`/venue/${currentVenue.id}/feed`)}
                className="text-xs text-scne-gold/80 underline underline-offset-4"
              >
                View Venue Feed
              </button>
            </div>

            <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
              {livePeople.map((person) => (
                <button
                  key={person.id}
                  type="button"
                  onClick={() => navigate(`/venue/user/${person.id}`)}
                  className="min-w-[70px] text-center"
                >
                  <div className="h-14 w-14 rounded-full gradient-border p-[2px] mx-auto">
                    <img
                      src={person.img}
                      alt={person.name}
                      className="h-full w-full rounded-full object-cover bg-[#0B0B12]"
                    />
                  </div>
                  <div className="mt-2 text-xs text-white/80">{person.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Live wall */}
          <div className="px-8 mt-8 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl italic" style={{ fontFamily: "serif" }}>
                Live Wall
              </h2>

              <button
                type="button"
                onClick={startLeaveVenueFlow}
                className="text-xs text-white/50 underline underline-offset-4 hover:text-white"
              >
                Leave Venue
              </button>
            </div>

            {livePosts.map((post) => (
              <div key={post.id} className="gradient-border w-full">
                <div className="rounded-[1.25rem] bg-[#0B0B12] p-4">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => navigate(`/venue/user/${post.userId}`)}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={post.userImage}
                        alt={post.username}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <div className="text-sm font-medium">{post.username}</div>
                        <div className="text-xs text-white/50">{post.time}</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setReportTarget(post.id)}
                      className="text-white/50 text-lg"
                      aria-label="More options"
                    >
                      •••
                    </button>
                  </div>

                  <div className="mt-4 rounded-xl overflow-hidden">
                    <img
                      src={post.media}
                      alt="live wall post"
                      className="w-full h-[360px] object-cover"
                    />
                  </div>

                  <p className="mt-4 text-sm text-white/85">{post.caption}</p>

                  <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {post.reactionOptions.map((emoji) => {
                        const isSelected = post.selectedReaction === emoji;
                        return (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => toggleReaction(post.id, emoji)}
                            className={`rounded-full px-3 py-1 text-sm border ${
                              isSelected
                                ? "bg-scne-gold text-black border-scne-gold"
                                : "border-white/10 bg-white/5 text-white"
                            }`}
                          >
                            {emoji}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-white/60">
                      <button
                        type="button"
                        onClick={() => openComments(post.id)}
                        className="hover:text-white"
                      >
                        {post.comments.length} comments
                      </button>

                      <button
                        type="button"
                        onClick={() => setReportTarget(post.id)}
                        className="hover:text-white"
                      >
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Not checked in state */}
          <div className="px-8 pt-10">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#0B0B12] p-6">
              <div className="text-xs uppercase tracking-[0.25em] text-white/40">
                Off Scene
              </div>

              <h1
                className="mt-3 text-3xl tracking-wide"
                style={{ fontFamily: "serif" }}
              >
                You’re Not Checked In
              </h1>

              <p className="mt-3 text-sm text-white/60">
                Live venue posts, temporary interactions, and venue visibility only
                exist while you’re On Scene.
              </p>

              <div className="mt-6 gradient-border w-full">
                <button
                  type="button"
                  onClick={() => navigate("/checkin/select-venue-collapsed")}
                  className="w-full rounded-[1.25rem] bg-[#0B0B12] px-5 py-4 text-left"
                >
                  <div className="text-sm font-medium">Check In To A Venue</div>
                  <div className="mt-1 text-xs text-white/50">
                    Join the live wall and venue energy again
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="px-8 mt-8">
            <div className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4">
              <div className="text-sm text-white/80">
                Messages from your last venue session are now treated as expired in
                this demo flow.
              </div>
            </div>
          </div>
        </>
      )}

      {/* Create Post Modal */}
      {isComposerOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-end justify-center">
          <div className="w-full max-w-md rounded-t-[2rem] gradient-border">
            <div className="rounded-t-[2rem] bg-[#0B0B12] px-6 pt-6 pb-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl italic" style={{ fontFamily: "serif" }}>
                  Create Post
                </h3>

                <button
                  type="button"
                  onClick={closeComposer}
                  className="text-white/60 text-lg"
                >
                  ✕
                </button>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setPostType("photo")}
                  className={`rounded-full px-4 py-2 text-sm ${
                    postType === "photo"
                      ? "bg-scne-gold text-black"
                      : "bg-white/5 text-white border border-white/10"
                  }`}
                >
                  Photo
                </button>

                <button
                  type="button"
                  onClick={() => setPostType("video")}
                  className={`rounded-full px-4 py-2 text-sm ${
                    postType === "video"
                      ? "bg-scne-gold text-black"
                      : "bg-white/5 text-white border border-white/10"
                  }`}
                >
                  Video
                </button>
              </div>

              <div className="mt-5 gradient-border">
                <div className="rounded-[1.25rem] bg-[#111118] h-44 flex flex-col items-center justify-center text-center px-4">
                  <div className="text-2xl text-scne-gold">＋</div>
                  <div className="mt-2 text-sm text-white/80">
                    Add {postType === "photo" ? "Photo" : "Video"}
                  </div>
                  <div className="mt-1 text-xs text-white/50">
                    {postType === "video"
                      ? "Videos can be up to 30 seconds"
                      : "Choose a photo from your camera roll"}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="text-xs text-white/60 block mb-2">
                  Caption
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="What’s the vibe tonight?"
                  className="w-full min-h-[110px] rounded-[1.25rem] bg-[#111118] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none resize-none"
                />
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={closeComposer}
                  className="gradient-border flex-1"
                >
                  <div className="rounded-[1.25rem] bg-[#0B0B12] py-3 text-center text-sm">
                    Cancel
                  </div>
                </button>

                <button
                  type="button"
                  onClick={submitPost}
                  className="flex-1 rounded-[1.25rem] bg-scne-gold text-black py-3 text-sm font-medium shadow-glow"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      {activeCommentsPost && (
        <div className="fixed inset-0 z-[65] bg-black/70 backdrop-blur-sm flex items-end justify-center">
          <div className="w-full max-w-md rounded-t-[2rem] gradient-border">
            <div className="rounded-t-[2rem] bg-[#0B0B12] px-6 pt-6 pb-8 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="text-xl italic" style={{ fontFamily: "serif" }}>
                  Comments
                </h3>

                <button
                  type="button"
                  onClick={closeComments}
                  className="text-white/60 text-lg"
                >
                  ✕
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {activeCommentsPost.comments.length === 0 ? (
                  <div className="text-sm text-white/50">
                    No comments yet. Start the conversation.
                  </div>
                ) : (
                  activeCommentsPost.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-medium">{comment.user}</div>
                          <div className="mt-1 text-sm text-white/80">
                            {comment.text}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => alert("Comment reported (demo)")}
                          className="text-xs text-white/50 underline underline-offset-4"
                        >
                          Report
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-5">
                <label className="text-xs text-white/60 block mb-2">
                  Add Comment
                </label>
                <textarea
                  value={commentDraft}
                  onChange={(e) => setCommentDraft(e.target.value)}
                  placeholder="Say something..."
                  className="w-full min-h-[90px] rounded-[1.25rem] bg-[#111118] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none resize-none"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={closeComments}
                  className="gradient-border flex-1"
                >
                  <div className="rounded-[1.25rem] bg-[#0B0B12] py-3 text-center text-sm">
                    Close
                  </div>
                </button>

                <button
                  type="button"
                  onClick={submitComment}
                  className="flex-1 rounded-[1.25rem] bg-scne-gold text-black py-3 text-sm font-medium shadow-glow"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Menu */}
      {reportTarget && (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="w-full max-w-sm gradient-border">
            <div className="rounded-[1.5rem] bg-[#0B0B12] p-6">
              <div className="text-lg italic" style={{ fontFamily: "serif" }}>
                Report Content
              </div>

              <p className="mt-2 text-sm text-white/60">
                Why are you reporting this?
              </p>

              <div className="mt-5 space-y-3">
                {["Harassment", "Inappropriate Content", "Spam", "Other"].map(
                  (reason) => (
                    <button
                      key={reason}
                      type="button"
                      onClick={() => {
                        alert(`Reported for: ${reason}`);
                        setReportTarget(null);
                      }}
                      className="gradient-border w-full"
                    >
                      <div className="rounded-[1.25rem] bg-[#0B0B12] py-3 text-center text-sm">
                        {reason}
                      </div>
                    </button>
                  )
                )}
              </div>

              <button
                type="button"
                onClick={() => setReportTarget(null)}
                className="mt-4 w-full text-xs text-white/50 underline underline-offset-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

// -------------------------
// Venue Feed Data
// -------------------------
const VENUE_FEED_DATA = {
  compound: {
    title: "COMPOUND",
    checkedIn: "1204 People Checked In.",
    stories: [
      { id: "aj", label: "AJ" },
      { id: "marcus", label: "Marcus" },
      { id: "leah", label: "Leah" },
    ],
    heroUser: "ajontherocks",
  },
  "aura-rooftop": {
    title: "AURA ROOFTOP",
    checkedIn: "374 People Checked In.",
    stories: [
      { id: "kyle", label: "Kyle" },
      { id: "kim", label: "Kim" },
      { id: "brandon", label: "Brandon" },
    ],
    heroUser: "kimnokardashian",
  },
  "the-mansion": {
    title: "THE MANSION",
    checkedIn: "842 People Checked In.",
    stories: [
      { id: "lucas", label: "Lucas" },
      { id: "monet", label: "Monet" },
      { id: "renee", label: "Renee" },
    ],
    heroUser: "dontsayrenee",
  },
  "the-foundry": {
    title: "THE FOUNDRY",
    checkedIn: "221 People Checked In.",
    stories: [
      { id: "chelsea", label: "Chelsea" },
      { id: "jordyn", label: "Jordyn" },
      { id: "tiana", label: "Tiana" },
    ],
    heroUser: "princesstiana",
  },
};

// -------------------------
// Venue Feed Template
// -------------------------
export function VenueFeedTemplate(props) {
  const navigate = useNavigate();
  const params = useParams();

  const venueId = props?.forcedVenueId || params?.venueId || params?.id || "compound";
  const data = VENUE_FEED_DATA[venueId] || VENUE_FEED_DATA.compound;

  const storyItems = useMemo(() => data.stories || [], [data.stories]);
  const heroImg = venuePostImg(venueId);

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="px-8 pt-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-xs text-scne-gold/80 underline underline-offset-4"
        >
          &larr; Back
        </button>
      </div>

      <div className="px-8 pt-6 text-center">
        <div className="text-[10px] tracking-[0.35em] text-white/40 select-none">
          SCNE
        </div>
        <h1 className="mt-3 text-3xl tracking-wide" style={{ fontFamily: "serif" }}>
          {data.title}
        </h1>
        <div className="mt-1 text-xs text-white/60">{data.checkedIn}</div>
      </div>

      <div className="px-8 mt-6">
        <div className="flex justify-center gap-6">
          {storyItems.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => navigate(`/venue/user/${s.id}`)}
              className="text-center"
              aria-label={`Open ${s.label} profile`}
              title={s.label}
            >
              <div className="h-14 w-14 rounded-full gradient-border p-[2px]">
                <img
                  src={profileImg(s.id)}
                  alt={s.label}
                  className="h-full w-full rounded-full object-cover bg-[#0B0B12]"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="h-full w-full rounded-full bg-[#0B0B12] -mt-14" />
              </div>
              <div className="mt-2 text-xs text-white/80">{s.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 mt-6">
        <div className="gradient-border w-full">
          <div className="rounded-[1.25rem] bg-[#0B0B12] p-3">
            <div className="flex items-center justify-between px-1 pb-2">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full gradient-border p-[2px] overflow-hidden">
                  <img
                    src={profileImg(data.stories?.[0]?.id || "aj")}
                    alt={data.heroUser}
                    className="h-full w-full rounded-full object-cover bg-[#0B0B12]"
                  />
                </div>
                <div className="text-xs text-white/80">{data.heroUser}</div>
              </div>
              <div className="text-white/60">•••</div>
            </div>

            <div className="rounded-lg overflow-hidden">
              <img
                src={heroImg}
                alt={`${data.title} post`}
                className="w-full h-[360px] object-cover"
              />
            </div>

            <div className="flex items-center gap-4 px-1 pt-3 text-white/80">
              <span className="text-xl">♡</span>
              <span className="text-xl">💬</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-white/60 px-1">
          <div className="flex items-center gap-2">
            <span className="text-white/70">◉</span>
            <span>You&apos;re checked in</span>
          </div>

          <button
            type="button"
            onClick={() => navigate("/checkin/select-venue-collapsed")}
            className="flex items-center gap-2 text-white/60 hover:text-white/80"
          >
            <span>Leave Venue</span>
            <span className="text-base">➔</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

// -------------------------
// Public Profile Data
// -------------------------
const PUBLIC_PROFILE_DATA = {
  aj: {
    display: "AJ",
    ageCity: "25 • Dallas",
    vibe: [
      { label: "My go-to drink order:", value: "Tequila + Pineapple" },
      { label: "Catch me on the dance floor when they play:", value: "Lil Baby" },
      { label: "My vibe is best described as:", value: "Laid Back" },
    ],
  },
  marcus: {
    display: "MARCUS",
    ageCity: "29 • Houston",
    vibe: [
      { label: "My go-to drink order:", value: "Old Fashioned" },
      { label: "Catch me on the dance floor when they play:", value: "Gunna" },
      { label: "My vibe is best described as:", value: "Party Energy" },
    ],
  },
  leah: {
    display: "LEAH",
    ageCity: "27 • San Antonio",
    vibe: [
      { label: "My go-to drink order:", value: "Espresso Martini" },
      { label: "Catch me on the dance floor when they play:", value: "Kehlani" },
      { label: "My vibe is best described as:", value: "Main Character Energy" },
    ],
  },

  kyle: {
    display: "KYLE",
    ageCity: "28 • Dallas",
    vibe: [
      { label: "My go-to drink order:", value: "Vodka Soda" },
      { label: "Catch me on the dance floor when they play:", value: "Drake" },
      { label: "My vibe is best described as:", value: "Smooth" },
    ],
  },
  kim: {
    display: "KIM",
    ageCity: "26 • Dallas",
    vibe: [
      { label: "My go-to drink order:", value: "Tequila Soda" },
      { label: "Catch me on the dance floor when they play:", value: "Beyoncé" },
      { label: "My vibe is best described as:", value: "Iconic" },
    ],
  },
  brandon: {
    display: "BRANDON",
    ageCity: "30 • Dallas",
    vibe: [
      { label: "My go-to drink order:", value: "Whiskey Sour" },
      { label: "Catch me on the dance floor when they play:", value: "Travis Scott" },
      { label: "My vibe is best described as:", value: "Hype" },
    ],
  },

  lucas: {
    display: "LUCAS",
    ageCity: "29 • Dallas",
    vibe: [
      { label: "My go-to drink order:", value: "Rum + Coke" },
      { label: "Catch me on the dance floor when they play:", value: "Future" },
      { label: "My vibe is best described as:", value: "Confident" },
    ],
  },
  monet: {
    display: "MONET",
    ageCity: "27 • Dallas",
    vibe: [
      { label: "My go-to drink order:", value: "Margarita" },
      { label: "Catch me on the dance floor when they play:", value: "SZA" },
      { label: "My vibe is best described as:", value: "Soft Glam" },
    ],
  },
  renee: {
    display: "RENEE",
    ageCity: "28 • Dallas",
    vibe: [
      { label: "My go-to drink order:", value: "Champagne" },
      { label: "Catch me on the dance floor when they play:", value: "Rihanna" },
      { label: "My vibe is best described as:", value: "Boss Energy" },
    ],
  },

  chelsea: {
    display: "CHELSEA",
    ageCity: "26 • Dallas",
    vibe: [
      { label: "My go-to drink order:", value: "Lemon Drop" },
      { label: "Catch me on the dance floor when they play:", value: "Doja Cat" },
      { label: "My vibe is best described as:", value: "Fun" },
    ],
  },
  jordyn: {
    display: "JORDYN",
    ageCity: "27 • Dallas",
    vibe: [
      { label: "My go-to drink order:", value: "Mojito" },
      { label: "Catch me on the dance floor when they play:", value: "Chris Brown" },
      { label: "My vibe is best described as:", value: "Flirty" },
    ],
  },
  tiana: {
    display: "TIANA",
    ageCity: "26 • Dallas",
    vibe: [
      { label: "My go-to drink order:", value: "Tequila Soda" },
      { label: "Catch me on the dance floor when they play:", value: "Ariana Grande" },
      { label: "My vibe is best described as:", value: "Princess Energy" },
    ],
  },
};

// -------------------------
// User Profile Template
// -------------------------
export function UserProfileTemplate(props) {
  const navigate = useNavigate();
  const params = useParams();
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [showReportUser, setShowReportUser] = useState(false);

  const userId = (props?.forcedId || params?.userId || params?.id || "me").toLowerCase();
  const isMe = userId === "me";

  const data =
    (isMe
      ? {
          display: "Me",
          ageCity: "29 • Dallas",
          vibe: [
            { label: "My go-to drink order:", value: "Tequila Soda" },
            { label: "My Favorite Song to Dance To:", value: "She Ready - Key Glock" },
            { label: "My Mood Right Now:", value: "Laid Back, Super Chill" },
          ],
        }
      : PUBLIC_PROFILE_DATA[userId]) || {
      display: userId.toUpperCase(),
      ageCity: "— • —",
      vibe: [
        { label: "My go-to drink order:", value: "—" },
        { label: "Catch me on the dance floor when they play:", value: "—" },
        { label: "My vibe is best described as:", value: "—" },
      ],
    };

  const handleBlockUser = () => {
    setShowBlockConfirm(false);
    alert(`${data.display} has been blocked (demo).`);
    navigate("/feed");
  };

  const handleReportUser = (reason) => {
    setShowReportUser(false);
    alert(`User reported for: ${reason}`);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="px-8 pt-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-xs text-scne-gold/80 underline underline-offset-4"
        >
          &larr; Back
        </button>
      </div>

      <div className="px-8 mt-4 flex items-center gap-4">
        <div className="h-14 w-14 rounded-full gradient-border p-[2px] overflow-hidden">
          <img
            src={isMe ? profileImg("aj") : profileImg(userId)}
            alt={data.display}
            className="h-full w-full rounded-full object-cover bg-[#0B0B12]"
          />
        </div>

        <div>
          <div className="text-2xl font-semibold">
            {data.display}
            <span className="ml-2 text-sm text-white/60">{data.ageCity}</span>
          </div>

          {!isMe && (
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => alert("Connect request sent (demo).")}
                className="rounded-full bg-scne-gold text-black px-4 py-2 text-xs font-medium shadow-glow"
              >
                Connect
              </button>

              <button
                type="button"
                onClick={() => alert("Message screen coming next (demo).")}
                className="gradient-border"
              >
                <div className="rounded-full bg-[#0B0B12] px-4 py-2 text-xs text-white/80">
                  Message
                </div>
              </button>

              <button
                type="button"
                onClick={() => setShowBlockConfirm(true)}
                className="text-xs text-white/50 underline underline-offset-4"
              >
                Block User
              </button>

              <button
                type="button"
                onClick={() => setShowReportUser(true)}
                className="text-xs text-white/50 underline underline-offset-4"
              >
                Report User
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="px-8 mt-5">
        <div className="mx-auto w-full max-w-sm rounded-2xl overflow-hidden bg-[#0B0B12]">
          <img
            src={isMe ? profileImg("aj") : profileImg(userId)}
            alt={`${data.display} profile`}
            className="w-full h-[320px] object-cover"
          />
        </div>
      </div>

      <div className="px-8 mt-5">
        <div className="flex items-center justify-between text-sm text-white/80">
          <span>Show I&apos;m Here Tonight</span>
          <span className="text-scne-gold/80">◉</span>
        </div>

        <h2 className="mt-3 text-2xl italic" style={{ fontFamily: "serif" }}>
          My Vibe
        </h2>

        <div className="mt-3 space-y-3">
          {data.vibe.map((row) => (
            <VibeRow key={row.label} label={row.label} value={row.value} />
          ))}
        </div>

        {isMe && (
          <button
            type="button"
            onClick={() => alert("Edit Profile coming soon")}
            className="mt-5 gradient-border w-full"
          >
            <div className="rounded-[1.25rem] bg-[#0B0B12] py-3 text-center">
              Edit Profile Details
            </div>
          </button>
        )}
      </div>

      {showBlockConfirm && (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="w-full max-w-sm gradient-border">
            <div className="rounded-[1.5rem] bg-[#0B0B12] p-6">
              <div className="text-lg italic" style={{ fontFamily: "serif" }}>
                Block {data.display}?
              </div>

              <p className="mt-2 text-sm text-white/60">
                Blocking will prevent messaging, profile viewing, and interaction
                with content in this demo.
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowBlockConfirm(false)}
                  className="gradient-border flex-1"
                >
                  <div className="rounded-[1.25rem] bg-[#0B0B12] py-3 text-center text-sm">
                    Cancel
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleBlockUser}
                  className="flex-1 rounded-[1.25rem] bg-scne-gold text-black py-3 text-sm font-medium shadow-glow"
                >
                  Block
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReportUser && (
        <div className="fixed inset-0 z-[71] bg-black/70 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="w-full max-w-sm gradient-border">
            <div className="rounded-[1.5rem] bg-[#0B0B12] p-6">
              <div className="text-lg italic" style={{ fontFamily: "serif" }}>
                Report {data.display}
              </div>

              <p className="mt-2 text-sm text-white/60">
                Why are you reporting this user?
              </p>

              <div className="mt-5 space-y-3">
                {["Harassment", "Inappropriate Content", "Spam", "Fake Profile"].map(
                  (reason) => (
                    <button
                      key={reason}
                      type="button"
                      onClick={() => handleReportUser(reason)}
                      className="gradient-border w-full"
                    >
                      <div className="rounded-[1.25rem] bg-[#0B0B12] py-3 text-center text-sm">
                        {reason}
                      </div>
                    </button>
                  )
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowReportUser(false)}
                className="mt-4 w-full text-xs text-white/50 underline underline-offset-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

function VibeRow({ label, value }) {
  return (
    <div className="gradient-border w-full">
      <div className="rounded-[1.25rem] bg-[#0B0B12] px-4 py-4 flex items-center justify-between">
        <div className="text-xs text-white/80">
          <div className="text-white/70">{label}</div>
          <div className="mt-1 text-white/90">{value}</div>
        </div>
        <button
          type="button"
          onClick={() => alert("Edit coming soon")}
          className="text-xs text-white/50 underline underline-offset-4"
        >
          edit
        </button>
      </div>
    </div>
  );
}