// Need promise here (async) as we need to wait until user click ok, google redirect ...

export const openPopup = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // set up popup style
    const width = window.screen.width / 2;
    const height = window.screen.height / 2;
    const left = width / 2;
    const top = height / 2;
    const windowFeatures = `left=${left},top=${top},width=${width},height=${height}`;
    // open popup
    const popup = window.open(url, "Google Oauth title", windowFeatures);

    // check if popup not shown (For e.g: blocked by browser) => throw error
    if (!popup) {
      reject(new Error("Popup blocked by browser"));
      return;
    }

    // set up post message listener, which listens to popup
    const messageListener = (event: MessageEvent) => {
      // Verify the origin for security
      if (event.origin !== window.location.origin) return;
      const { type, code, error } = event.data;
      if (type === "google_oauth_response") {
        if (code) {
          // Take the code, call google api to take refresh_date, access_token expiry time
          resolve(code);
          console.log("SUCCESS_CODE:", code);
          popup.close();
        } else if (error) {
          reject(new Error(error));
          popup.close();
        }
        // Clean up the listener
        window.removeEventListener("message", messageListener);
      }
    };
    window.addEventListener("message", messageListener);

    // Fallback timeout in case the popup is closed without redirect
    const timeout = setTimeout(() => {
      window.removeEventListener("message", messageListener);
      reject(new Error("Popup closed or timed out"));
    }, 300000); // 5-minute timeout (adjust as needed)

    // Optional: Poll to check if popup is closed (less reliable, use as fallback)
    const checkPopupClosed = setInterval(() => {
      try {
        if (!popup || popup.closed) {
          clearInterval(checkPopupClosed);
          window.removeEventListener("message", messageListener);
          clearTimeout(timeout);
          reject(new Error("Popup closed by user"));
        }
      } catch (_e: unknown) {
        // Ignore COOP-related errors
        clearInterval(checkPopupClosed);
        window.removeEventListener("message", messageListener);
        clearTimeout(timeout);
        reject(new Error("Popup access blocked or closed"));
      }
    }, 500);
  });
};
