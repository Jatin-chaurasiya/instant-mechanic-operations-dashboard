const ServiceCard = ({
  service,
  onEdit,
  onActivate,
  onDeactivate,
  onBookNow,
  mode = "admin",
}) => {
  const {
    id,
    serviceName,
    category,
    description,
    price,
    durationMinutes,
    active,
  } = service;

  const isPublic = mode === "public";
  const isCustomer = mode === "customer";
  const isAdmin = mode === "admin";

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 transition hover:border-slate-600">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-4">

          {/* Service Icon */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-slate-800 bg-white text-2xl">
            🔧
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              {serviceName}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {category}
            </p>
          </div>

        </div>

        {/* Status */}
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            active
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {active ? "Active" : "Inactive"}
        </span>

      </div>

      {/* Divider */}
      <div className="my-5 border-t border-slate-700" />

      {/* Description */}
      <div className="mb-5">
        <p className="text-sm leading-6 text-slate-400">
          {description || "No description available."}
        </p>
      </div>

      {/* Service Details */}
      <div className="grid grid-cols-2 gap-4">

        <div>
          <p className="text-sm text-slate-500">
            Price
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            ₹{Number(price).toLocaleString("en-IN")}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Duration
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            {durationMinutes} min
          </p>
        </div>

      </div>

      {/* Public / Customer Action */}
      {(isPublic || isCustomer) && (
        <div className="mt-6">

          <button
            onClick={() => onBookNow(service)}
            className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
          >
            Book Now
          </button>

        </div>
      )}

      {/* Admin Actions */}
      {isAdmin && (
        <div className="mt-6 flex gap-3">

          <button
            onClick={() => onEdit(service)}
            className="flex-1 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Edit
          </button>

          {active ? (
            <button
              onClick={() => onDeactivate(id)}
              className="flex-1 rounded-xl border border-red-500/30 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
            >
              Deactivate
            </button>
          ) : (
            <button
              onClick={() => onActivate(id)}
              className="flex-1 rounded-xl border border-green-500/30 px-4 py-2.5 text-sm font-medium text-green-400 transition hover:bg-green-500/10"
            >
              Activate
            </button>
          )}

        </div>
      )}

    </div>
  );
};

export default ServiceCard;