// hooks/usePageTitle.js
import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Trouve ton artisan`;
    } else {
      document.title = "Trouve ton artisan";
    }
  }, [title]);
};

export default useTitle;
