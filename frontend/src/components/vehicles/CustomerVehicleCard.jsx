import {
  CarFront,
  Edit3,
  Trash2,
} from "lucide-react";

const CustomerVehicleCard = ({
  vehicle,
  onEdit,
  onDelete,
}) => {

  const {
    vehicleModel,
    vehicleNumber,
  } = vehicle;

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-700
        bg-slate-900
        p-6
        transition
        hover:border-slate-600
      "
    >

      {/* ==========================================
          Header
      ========================================== */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-slate-800
              text-slate-200
            "
          >
            <CarFront size={26} />
          </div>


          <div>

            <h3 className="text-lg font-semibold text-white">
              {vehicleModel}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Vehicle
            </p>

          </div>

        </div>

      </div>


      {/* ==========================================
          Divider
      ========================================== */}

      <div className="my-5 border-t border-slate-700" />


      {/* ==========================================
          Vehicle Number
      ========================================== */}

      <div>

        <p className="text-sm text-slate-500">
          Vehicle Number
        </p>

        <p className="mt-1 text-lg font-semibold text-white">
          {vehicleNumber}
        </p>

      </div>


      {/* ==========================================
          Actions
      ========================================== */}

      <div className="mt-6 flex gap-3">

        {/* Edit */}

        <button
          type="button"
          onClick={() => onEdit(vehicle)}
          className="
            flex
            flex-1
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-700
            px-4
            py-2.5
            text-sm
            font-medium
            text-slate-200
            transition
            hover:bg-slate-800
          "
        >
          <Edit3 size={16} />
          Edit
        </button>


        {/* Delete */}

        <button
          type="button"
          onClick={() => onDelete(vehicle)}
          className="
            flex
            flex-1
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-red-500/30
            px-4
            py-2.5
            text-sm
            font-medium
            text-red-400
            transition
            hover:bg-red-500/10
          "
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>

    </div>
  );
};

export default CustomerVehicleCard;