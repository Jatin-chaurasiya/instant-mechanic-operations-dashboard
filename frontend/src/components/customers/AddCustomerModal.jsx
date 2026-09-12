import { X, UserRound, Mail, Phone, MapPin, Loader2 } from "lucide-react";

import { useState } from "react";

const AddCustomerModal = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  error = null,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  if (!isOpen) {
  return null;
}

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit(formData);
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-slate-950/50
        p-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        className="
          w-full max-w-lg
          overflow-hidden
          rounded-2xl
          border border-slate-200
          bg-white
          shadow-xl
          dark:border-slate-700
          dark:bg-slate-900
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}

        <div
          className="
            flex items-center justify-between
            border-b border-slate-100
            px-5 py-4
            dark:border-slate-700
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                bg-slate-900
                dark:bg-white
              "
            >
              <UserRound
                size={18}
                className="
                  text-white
                  dark:text-slate-900
                "
              />
            </div>

            <div>
              <h2
                className="
                  text-base
                  font-semibold
                  text-slate-900
                  dark:text-white
                "
              >
                Add New Customer
              </h2>

              <p
                className="
                  mt-0.5
                  text-xs
                  text-slate-400
                  dark:text-slate-500
                "
              >
                Register a new customer.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-5">
            {/* Name */}

            <div>
              <label
                className="
                  mb-1.5 block
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Customer Name
              </label>

              <div className="relative">
                <UserRound
                  size={17}
                  className="
                    pointer-events-none
                    absolute left-3.5 top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter customer name"
                  required
                  className="
                    h-11 w-full
                    rounded-xl
                    border border-slate-200
                    bg-white
                    pl-10 pr-4
                    text-sm
                    text-slate-700
                    outline-none
                    focus:border-slate-400
                    focus:ring-4
                    focus:ring-slate-100
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-slate-200
                  "
                />
              </div>
            </div>

            {/* Email */}

            <div>
              <label
                className="
                  mb-1.5 block
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="
                    pointer-events-none
                    absolute left-3.5 top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                  className="
                    h-11 w-full
                    rounded-xl
                    border border-slate-200
                    bg-white
                    pl-10 pr-4
                    text-sm
                    text-slate-700
                    outline-none
                    focus:border-slate-400
                    focus:ring-4
                    focus:ring-slate-100
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-slate-200
                  "
                />
              </div>
            </div>

            {/* Phone */}

            <div>
              <label
                className="
                  mb-1.5 block
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Phone
              </label>

              <div className="relative">
                <Phone
                  size={17}
                  className="
                    pointer-events-none
                    absolute left-3.5 top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="
                    h-11 w-full
                    rounded-xl
                    border border-slate-200
                    bg-white
                    pl-10 pr-4
                    text-sm
                    text-slate-700
                    outline-none
                    focus:border-slate-400
                    focus:ring-4
                    focus:ring-slate-100
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-slate-200
                  "
                />
              </div>
            </div>

            {/* Address */}

            <div>
              <label
                className="
                  mb-1.5 block
                  text-sm
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                "
              >
                Address
              </label>

              <div className="relative">
                <MapPin
                  size={17}
                  className="
                    pointer-events-none
                    absolute left-3.5 top-3
                    text-slate-400
                  "
                />

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter customer address"
                  rows={3}
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border border-slate-200
                    bg-white
                    py-3 pl-10 pr-4
                    text-sm
                    text-slate-700
                    outline-none
                    focus:border-slate-400
                    focus:ring-4
                    focus:ring-slate-100
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-slate-200
                  "
                />
              </div>
            </div>

            {/* Error */}

            {error && (
              <div
                className="
                  rounded-xl
                  border border-red-200
                  bg-red-50
                  px-4 py-3
                  text-sm
                  text-red-700
                  dark:border-red-900/50
                  dark:bg-red-950/30
                  dark:text-red-400
                "
              >
                {error}
              </div>
            )}
          </div>

          {/* Footer */}

          <div
            className="
              flex justify-end gap-3
              border-t border-slate-100
              px-5 py-4
              dark:border-slate-700
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                rounded-xl
                border border-slate-200
                bg-white
                px-4 py-2.5
                text-sm
                font-medium
                text-slate-600
                transition
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-300
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-slate-900
                px-5 py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-slate-800
                disabled:cursor-not-allowed
                disabled:opacity-60
                dark:bg-white
                dark:text-slate-900
              "
            >
              {loading && <Loader2 size={16} className="animate-spin" />}

              {loading ? "Adding..." : "Add Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;
