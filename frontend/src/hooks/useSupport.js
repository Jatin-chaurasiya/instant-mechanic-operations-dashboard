import { useState } from "react";
import supportApi from "../api/supportApi";

const useSupport = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const sendMessage = async (data) => {
    try {
      setLoading(true);
      setSuccess("");
      setError("");

      const response = await supportApi.sendMessage(data);

      setSuccess(
        response?.message ||
          "Support message sent successfully."
      );

      return response;
    } catch (err) {
      console.error("Support error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to send support message."
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setSuccess("");
    setError("");
  };

  return {
    loading,
    success,
    error,
    sendMessage,
    clearMessages,
  };
};

export default useSupport;