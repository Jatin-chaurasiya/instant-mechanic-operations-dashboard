import { useCallback, useEffect, useState } from "react";
import profileApi from "../api/profileApi";

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await profileApi.getProfile();

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
  }, []);

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