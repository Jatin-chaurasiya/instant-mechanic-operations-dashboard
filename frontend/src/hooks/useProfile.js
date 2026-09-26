import {
  useCallback,
  useEffect,
  useState,
} from "react";

import profileApi from "../api/profileApi";
import { useAuth } from "../context/AuthContext";

const useProfile = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      let data;

      if (user?.role === "ADMIN") {
        data = await profileApi.getAdminProfile();
      } else if (user?.role === "CUSTOMER") {
        data = await profileApi.getCustomerProfile();
      } else {
        throw new Error("Invalid user role.");
      }

      setProfile(data);
    } catch (err) {
      console.error("Profile fetch error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  }, [user?.role]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
  };
};

export default useProfile;