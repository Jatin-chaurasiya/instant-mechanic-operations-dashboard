const features = [
  {
    title: "Easy Booking",
    description:
      "Choose a service, select your vehicle, and schedule a convenient time.",
    icon: "01",
  },
  {
    title: "Vehicle Management",
    description:
      "Keep all your vehicle information organized in one place.",
    icon: "02",
  },
  {
    title: "Service Tracking",
    description:
      "Follow your booking from pending to completion.",
    icon: "03",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="services"
      className="border-t border-slate-800 bg-slate-950/40 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            What we provide
          </p>

          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            Everything you need for your vehicle.
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Instant Mechanic brings vehicle service management,
            booking and tracking together in one platform.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.icon}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-7 transition hover:border-slate-700"
            >
              <span className="text-sm font-semibold text-slate-500">
                {feature.icon}
              </span>

              <h3 className="mt-8 text-xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;