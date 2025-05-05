import { useState } from "react";
import { openPopup } from "../hooks/popupHandler";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
      redirect_uri:
        "http://localhost:3333/api/v1/google_authentication_redirect",
      // client_id: import.meta.env.VITE_CLIENT_ID,
      client_id:
        "792038614586-5s45ttkqtklmkmi6ahggmdcq8h8sc8rk.apps.googleusercontent.com",
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: ["openid", "profile", "email"].join(" "),
      flowName: "GeneralOAuthFlow",
    };

    const params = new URLSearchParams(options);
    try {
      const code = await openPopup(`${rootUrl}?${params.toString()}`);
      console.log(`Authorization code received: ${code}`);
    } catch (err: unknown) {
      const error = err as unknown as { message?: string };
      if (error?.message === "Popup closed by user") {
        setLoading(false);
      }
      setError(error?.message || "Failed to authenticate with Google");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <span>Profile</span>
      <button
        onClick={handleLogin}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? "Logging in..." : "Login with Google"}
      </button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default Profile;
