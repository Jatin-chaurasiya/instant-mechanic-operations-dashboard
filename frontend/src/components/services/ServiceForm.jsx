import { useEffect, useState } from "react";

const initialFormData = {
  serviceName: "",
  category: "",
  description: "",
  price: "",
  durationMinutes: "",
};

const ServiceForm = ({
  service,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState(initialFormData);

  const isEditMode = Boolean(service);

  useEffect(() => {
    if (service) {
      setFormData({
        serviceName: service.serviceName || "",
        category: service.category || "",
        description: service.description || "",
        price: service.price ?? "",
        durationMinutes: service.durationMinutes ?? "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [service]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const serviceData = {
      serviceName: formData.serviceName.trim(),
      category: formData.category.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      durationMinutes: Number(formData.durationMinutes),
    };

    onSubmit(serviceData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Service Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Service Name
        </label>

        <input
          type="text"
          name="serviceName"
          value={formData.serviceName}
          onChange={handleChange}
          placeholder="Enter service name"
          required
          maxLength={100}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-slate-500"
        />
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Category
        </label>

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g. Maintenance"
          required
          maxLength={100}
          className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-slate-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter service description"
          rows={4}
          maxLength={500}
          className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-slate-500"
        />
      </div>

      {/* Price + Duration */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Price (₹)
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            min="0"
            step="0.01"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-slate-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Duration (minutes)
          </label>

          <input
            type="number"
            name="durationMinutes"
            value={formData.durationMinutes}
            onChange={handleChange}
            placeholder="e.g. 45"
            min="1"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-slate-500"
          />
        </div>

      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-slate-700 pt-5">

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : isEditMode
              ? "Update Service"
              : "Add Service"}
        </button>

      </div>

    </form>
  );
};

export default ServiceForm;