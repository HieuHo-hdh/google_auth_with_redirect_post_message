import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const AuthRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    // Send the code or error to the parent window
    if (window.opener) {
      window.opener.postMessage(
        {
          type: 'google_oauth_response',
          code: code || undefined,
          error: error || undefined,
        },
        window.location.origin
      );
      // Close the popup
      window.close();
    }
  }, [location]);

  return <div className="flex items-center justify-center h-screen">Processing...</div>;
};

export default AuthRedirect;