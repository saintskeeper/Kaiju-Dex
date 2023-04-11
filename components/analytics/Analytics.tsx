import { useEffect } from "react";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../lib/Firebase/firebase";

// Custom hook for tracking page views
const usePageViewTracking = (pageName: string) => {
  useEffect(() => {
    logEvent(analytics, "page_view", { page_name: pageName });

    // Optionally, you can track the time spent on pages
    const startTime = Date.now();
    return () => {
      const duration = Date.now() - startTime;
      logEvent(analytics, "time_spent_on_page", { page_name: pageName, duration });
    };
  }, [pageName]);
};

export default usePageViewTracking;
