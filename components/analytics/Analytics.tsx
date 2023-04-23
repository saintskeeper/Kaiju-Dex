import { useEffect } from "react";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../lib/Firebase/Firebase";
const usePageViewTracking = (pageName: string) => {
  useEffect(() => {
    const trackPageView = async () => {
      const analyticsInstance = await analytics;
      if (analyticsInstance) {
        logEvent(analyticsInstance, "page_view", { page_name: pageName });
      }
    };

    trackPageView();

    // Optionally, you can track the time spent on pages
    const startTime = Date.now();
    return () => {
      const endTime = Date.now();
      const timeSpent = endTime - startTime;
      // Do something with the timeSpent variable, e.g., log it to analytics
    };
  }, [pageName]);
};

export default usePageViewTracking;
