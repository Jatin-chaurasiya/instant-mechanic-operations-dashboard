import ServiceForm from "./ServiceForm";

const ServiceModal = ({
  service,
  onClose,
  onSubmit,
  loading,
}) => {
  const isEditMode = Boolean(service);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-700 px-6 py-5">

          <div>
            <h2 className="text-xl font-semibold text-white">
              {isEditMode
                ? "Edit Service"
                : "Add New Service"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {isEditMode
                ? "Update service information and pricing."
                : "Add a new mechanic service."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            ×
          </button>

        </div>

        {/* Modal Body */}
        <div className="p-6">
          <ServiceForm
            service={service}
            onSubmit={onSubmit}
            onCancel={onClose}
            loading={loading}
          />
        </div>

      </div>

    </div>
  );
};

export default ServiceModal;