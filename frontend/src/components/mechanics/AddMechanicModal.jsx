import {
  UserRound,
  Phone,
  Mail,
  Wrench,
  MapPin,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { useEffect, useState } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

const INITIAL_FORM = {
  name: "",
  phone: "",
  email: "",
  specialization: "",
  location: "",
};

const AddMechanicModal = ({
  isOpen,
  onClose,
  onSubmit,
  mechanic = null,
  loading = false,
  error = "",
}) => {
  const isEdit = Boolean(mechanic);

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [localError, setLocalError] = useState("");

  /* =========================================================
     Initialize Add / Update Form
  ========================================================= */

  useEffect(() => {
    if (!isOpen) return;

    if (mechanic) {
      setFormData({
        name: mechanic.name || "",
        phone: mechanic.phone || "",
        email: mechanic.email || "",
        specialization: mechanic.specialization || "",
        location: mechanic.location || "",
      });
    } else {
      setFormData(INITIAL_FORM);
    }

    setLocalError("");
  }, [isOpen, mechanic]);

  /* =========================================================
     Input Change
  ========================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setLocalError("");
  };

  /* =========================================================
     Close
  ========================================================= */

  const handleClose = () => {
    if (loading) return;

    setFormData(INITIAL_FORM);
    setLocalError("");
    onClose?.();
  };

  /* =========================================================
     Submit
  ========================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const specialization = formData.specialization.trim();
    const location = formData.location.trim();

    if (!name) {
      setLocalError("Please enter mechanic name.");
      return;
    }

    if (!phone) {
      setLocalError("Please enter phone number.");
      return;
    }

    if (!email) {
      setLocalError("Please enter email address.");
      return;
    }

    if (!specialization) {
      setLocalError("Please enter specialization.");
      return;
    }

    if (!location) {
      setLocalError("Please enter location.");
      return;
    }

    try {
      setLocalError("");

      const mechanicData = {
        name,
        phone,
        email,
        specialization,
        location,

        // New mechanic always starts as AVAILABLE.
        // During update, preserve the existing status.
        status: isEdit
          ? mechanic.status
          : "AVAILABLE",
      };

      await onSubmit?.(mechanicData);
    } catch (err) {
      console.error(
        isEdit
          ? "Unable to update mechanic:"
          : "Unable to create mechanic:",
        err
      );

      setLocalError(
        err?.response?.data?.message ||
          (isEdit
            ? "Unable to update mechanic."
            : "Unable to create mechanic.")
      );
    }
  };

  if (!isOpen) {
    return null;
  }

  const inputClass = `
    h-11 w-full
    rounded-xl
    border border-slate-200
    bg-white
    pl-10 pr-3
    text-sm
    text-slate-900
    outline-none
    transition
    focus:border-slate-400
    focus:ring-4
    focus:ring-slate-100
    disabled:cursor-not-allowed
    disabled:opacity-60
    dark:border-slate-700
    dark:bg-slate-800
    dark:text-white
    dark:focus:border-slate-600
    dark:focus:ring-slate-700/50
  `;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="lg"
      title={isEdit ? "Update Mechanic" : "Add Mechanic"}
      description={
        isEdit
          ? "Update mechanic information."
          : "Add a new mechanic to your operations team."
      }
    >
      <form onSubmit={handleSubmit}>
        {/* =====================================================
            Error
        ====================================================== */}

        {(localError || error) && (
          <div
            className="
              mb-5
              flex items-start gap-3
              rounded-xl
              border border-red-200
              bg-red-50
              p-3.5
              text-sm text-red-700
              dark:border-red-900/50
              dark:bg-red-950/30
              dark:text-red-400
            "
          >
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>
              {localError || error}
            </span>
          </div>
        )}

        {/* =====================================================
            Form
        ====================================================== */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label
              className="
                mb-1.5 block
                text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Mechanic Name
            </label>

            <div className="relative">
              <UserRound
                size={17}
                className="
                  absolute left-3 top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter mechanic name"
                className={inputClass}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label
              className="
                mb-1.5 block
                text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Phone Number
            </label>

            <div className="relative">
              <Phone
                size={17}
                className="
                  absolute left-3 top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
                placeholder="+91 98765 43210"
                className={inputClass}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              className="
                mb-1.5 block
                text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={17}
                className="
                  absolute left-3 top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                placeholder="mechanic@example.com"
                className={inputClass}
              />
            </div>
          </div>

          {/* Specialization */}
          <div>
            <label
              className="
                mb-1.5 block
                text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Specialization
            </label>

            <div className="relative">
              <Wrench
                size={17}
                className="
                  absolute left-3 top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                disabled={loading}
                placeholder="e.g. Engine Repair"
                className={inputClass}
              />
            </div>
          </div>

          {/* Location */}
          <div className="sm:col-span-2">
            <label
              className="
                mb-1.5 block
                text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Location
            </label>

            <div className="relative">
              <MapPin
                size={17}
                className="
                  absolute left-3 top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={loading}
                placeholder="e.g. Ghaziabad"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* =====================================================
            Footer
        ====================================================== */}

        <div
          className="
            mt-6
            flex flex-col-reverse
            gap-3
            border-t
            border-slate-200
            pt-5
            sm:flex-row
            sm:justify-end
            dark:border-slate-700
          "
        >
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={loading}
            icon={loading ? Loader2 : undefined}
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Adding Mechanic..."
              : isEdit
              ? "Update Mechanic"
              : "Add Mechanic"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddMechanicModal;