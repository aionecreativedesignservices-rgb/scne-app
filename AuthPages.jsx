import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

// If/when you add your logo file, uncomment this:
// import logo from "../assets/scne-logo.png";

export function ScreenAuthLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-end px-8 text-center bg-scne-bg text-white pb-24">
      {/* Logo + Tagline */}
      <div className="mb-12">
        <div className="scne-logo-shimmer">
          <h1
            className="text-5xl tracking-[0.25em] font-light"
            style={{ fontFamily: "serif" }}
          >
            SCNE
          </h1>
        </div>

        <p className="mt-3 text-sm text-scne-gold/80">
          The social layer for your nightlife
        </p>
      </div>

      {/* Get Started */}
      <button
        type="button"
        onClick={() => navigate("/auth")}
        className="gradient-border w-full max-w-xs"
      >
        <span className="block rounded-[1.25rem] py-3 bg-[#0B0B12] text-white">
          Get Started
        </span>
      </button>

      {/* Admin link */}
      <button
        type="button"
        onClick={() => alert("Admin View coming soon")}
        className="mt-10 text-xs text-scne-gold/70 underline underline-offset-4"
      >
        Switch to Admin View
      </button>
    </div>
  );
}

export function ScreenAuthChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-end px-8 text-center bg-scne-bg text-white pb-24">
      <div className="mb-12">
        <div className="scne-logo-shimmer">
          <h1
            className="text-5xl tracking-[0.25em] font-light"
            style={{ fontFamily: "serif" }}
          >
            SCNE
          </h1>
        </div>

        <p className="mt-3 text-sm text-scne-gold/80">
          The social layer for your nightlife
        </p>
      </div>

      <div className="w-full max-w-xs space-y-4">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="gradient-border w-full"
        >
          <span className="block rounded-[1.25rem] py-3 bg-[#0B0B12] text-white">
            Log In
          </span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/signup/personal-info")}
          className="gradient-border w-full"
        >
          <span className="block rounded-[1.25rem] py-3 bg-[#0B0B12] text-white">
            Sign Up
          </span>
        </button>
      </div>

      <p className="mt-8 text-xs text-white/50 leading-relaxed">
        By signing up, you agree to our Terms
        <br />
        and Privacy Policy.
      </p>

      <button
        type="button"
        onClick={() => alert("Admin View coming soon")}
        className="mt-8 text-xs text-scne-gold/70 underline underline-offset-4"
      >
        Switch to Admin View
      </button>
    </div>
  );
}

export function ScreenLogin() {
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
      <div className="mt-10 text-center">
        <h1 className="text-4xl font-semibold leading-tight">
          Log Into
          <br />
          Your Profile
        </h1>
        <p className="mt-4 text-sm text-scne-gold/80">
          Log in to start connecting to other users
        </p>
      </div>

      {/* Form */}
      <div className="mt-10 space-y-5">
        <div className="gradient-border">
          <div className="rounded-[1.25rem] bg-[#0B0B12] px-4 py-4">
            <Input label="Email" />
          </div>
        </div>

        <div className="gradient-border">
          <div className="rounded-[1.25rem] bg-[#0B0B12] px-4 py-4">
            <Input label="Password" type="password" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/onboarding/enable-location")}
          className="w-full mt-6 rounded-full bg-scne-gold text-black py-3 font-medium shadow-glow"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export function ScreenSignupPersonalInfo() {
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
      <div className="mt-10 text-center">
        <h1 className="text-3xl font-semibold">Sign Up For SCNE</h1>
        <p className="mt-3 text-sm text-scne-gold/80">
          Tell us about yourself to connect tonight
        </p>
      </div>

      {/* Form */}
      <div className="mt-10 space-y-5">
        <div className="gradient-border">
          <div className="rounded-[1.25rem] bg-[#0B0B12] px-4 py-4">
            <Input label="Full Name" />
          </div>
        </div>

        <div className="gradient-border">
          <div className="rounded-[1.25rem] bg-[#0B0B12] px-4 py-4">
            <Input label="Date of Birth" />
          </div>
        </div>

        <div className="gradient-border">
          <div className="rounded-[1.25rem] bg-[#0B0B12] px-4 py-4">
            <Input label="Phone Number" />
          </div>
        </div>

        <div className="gradient-border">
          <div className="rounded-[1.25rem] bg-[#0B0B12] px-4 py-4">
            <Input label="Username" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/signup/profile-setup")}
          className="w-full mt-6 rounded-full bg-scne-gold text-black py-3 font-medium shadow-glow"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function ScreenSignupProfileSetup() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (images.length + files.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
    e.target.value = ""; // lets you re-select the same file again if needed
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const copy = [...prev];
      const removed = copy.splice(index, 1)[0];
      if (removed?.preview) URL.revokeObjectURL(removed.preview);
      return copy;
    });
  };

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
      <div className="mt-10">
        <h1 className="text-3xl font-semibold">Create Your Profile</h1>
      </div>

      {/* Form */}
      <div className="mt-8 space-y-5">
        <div className="gradient-border">
          <div className="rounded-[1.25rem] bg-[#0B0B12] px-4 py-4">
            <Input label="My Go-To Drink Is:" />
          </div>
        </div>

        <div className="gradient-border">
          <div className="rounded-[1.25rem] bg-[#0B0B12] px-4 py-4">
            <Input label="Catch me on the dance floor when they play:" />
          </div>
        </div>

        <div className="gradient-border">
          <div className="rounded-[1.25rem] bg-[#0B0B12] px-4 py-4">
            <Input label="My vibe is best described as:" />
          </div>
        </div>

        {/* Upload Section */}
        <div className="gradient-border">
          <div className="rounded-[1.25rem] bg-[#0B0B12] px-4 py-5">
            <div className="text-sm text-white/80">Upload Profile Pictures</div>
            <div className="text-xs text-white/50">Choose up to 3 images</div>

            <div className="mt-4 flex flex-wrap gap-3 justify-center">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img.preview}
                    alt="preview"
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}

              {images.length < 3 && (
                <label className="h-20 w-20 rounded-full bg-white/90 text-black flex items-center justify-center text-2xl cursor-pointer shadow-glow">
                  +
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={() => navigate("/onboarding/enable-location")}
          className="w-full mt-2 rounded-full bg-scne-gold text-black py-3 font-medium shadow-glow"
        >
          Next
        </button>
      </div>
    </div>
  );
}