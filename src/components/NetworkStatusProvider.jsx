import { useEffect } from "react";
import useNetwork from "../hooks/useNetwork";
// import { toast } from "react-toastify";

const NetworkStatusProvider = ({ children }) => {
  const isOnline = useNetwork();

  useEffect(() => {
    if (!isOnline) {
      console.log("Offline now");
      // toast.error("Offline");
    } else {
      console.log("Online now");
      // toast.success("Online");
    }
  }, [isOnline]);

  return <>{children}</>;
};

export default NetworkStatusProvider;
