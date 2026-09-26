import { useEffect, useState } from "react";
import { X } from "lucide-react";

const CustomerVehicleModal = ({
  isOpen,
  onClose,
  onSubmit,
  vehicle,
  loading = false,
}) => {

  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleModel: "",
  });


  // ==========================================
  // Populate Form
  // ==========================================

  useEffect(() => {

    if (!isOpen) {
      return;
    }

    if (vehicle) {

      setFormData({
        vehicleNumber:
          vehicle.vehicleNumber || "",

        vehicleModel:
          vehicle.vehicleModel || "",
      });

    } else {

      setFormData({
        vehicleNumber: "",
        vehicleModel: "",
      });

    }

  }, [vehicle, isOpen]);


  if (!isOpen) {
    return null;
  }


  const isEdit = Boolean(vehicle);


  // ==========================================
  // Handle Input
  // ==========================================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;


    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (event) => {

    event.preventDefault();


    const vehicleNumber =
      formData.vehicleNumber.trim();

    const vehicleModel =
      formData.vehicleModel.trim();


    if (
      !vehicleNumber ||
      !vehicleModel
    ) {
      return;
    }


    await onSubmit({
      vehicleNumber,
      vehicleModel,
    });

  };


  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/60
        px-4
        backdrop-blur-sm
      "
    >

      <div
        className="
          w-full
          max-w-lg
          rounded-2xl
          border
          border-slate-700
          bg-slate-900
          p-6
          shadow-2xl
        "
      >

        {/* ==========================================
            Header
        ========================================== */}

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-semibold text-white">
              {isEdit
                ? "Update Vehicle"
                : "Add Vehicle"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {isEdit
                ? "Update your vehicle information."
                : "Add your vehicle to use it for bookings."}
            </p>

          </div>


          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-slate-800
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={20} />
          </button>

        </div>


        {/* ==========================================
            Form
        ========================================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Vehicle Model */}

          <div>

            <label
              htmlFor="vehicleModel"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-300
              "
            >
              Vehicle Model
            </label>


            <input
              id="vehicleModel"
              name="vehicleModel"
              type="text"
              value={formData.vehicleModel}
              onChange={handleChange}
              placeholder="e.g. Hyundai Creta"
              disabled={loading}
              className="
                w-full
                rounded-xl
                border
                border-slate-700
                bg-slate-800
                px-4
                py-3
                text-white
                outline-none
                transition
                placeholder:text-slate-500
                focus:border-slate-500
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            />

          </div>


          {/* Vehicle Number */}

          <div>

            <label
              htmlFor="vehicleNumber"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-300
              "
            >
              Vehicle Number
            </label>


            <input
              id="vehicleNumber"
              name="vehicleNumber"
              type="text"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="e.g. UP14CD5678"
              disabled={loading}
              className="
                w-full
                rounded-xl
                border
                border-slate-700
                bg-slate-800
                px-4
                py-3
                uppercase
                text-white
                outline-none
                transition
                placeholder:text-slate-500
                focus:border-slate-500
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            />

          </div>


          {/* Buttons */}

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                flex-1
                rounded-xl
                border
                border-slate-700
                px-4
                py-3
                font-medium
                text-slate-300
                transition
                hover:bg-slate-800
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={
                loading ||
                !formData.vehicleModel.trim() ||
                !formData.vehicleNumber.trim()
              }
              className="
                flex-1
                rounded-xl
                bg-white
                px-4
                py-3
                font-medium
                text-slate-900
                transition
                hover:bg-slate-100
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading
                ? "Saving..."
                : isEdit
                  ? "Update Vehicle"
                  : "Add Vehicle"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CustomerVehicleModal;