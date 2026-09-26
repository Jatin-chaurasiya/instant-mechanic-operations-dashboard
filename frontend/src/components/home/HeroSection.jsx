import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">

        {/* Left Content */}
        <div>

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Reliable Vehicle Service
          </p>

          <h1 className="max-w-2xl text-5xl font-bold leading-tight text-white md:text-6xl">
            Your vehicle.
            <br />
            Our expertise.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
            Book trusted vehicle services, manage your bookings,
            and keep your vehicle running smoothly with Instant
            Mechanic.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <button
              onClick={() => navigate("/login")}
              className="rounded-xl bg-white px-7 py-3.5 font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Book a Service
            </button>

            <a
              href="#services"
              className="rounded-xl border border-slate-700 px-7 py-3.5 font-medium text-slate-200 transition hover:bg-slate-800"
            >
              Explore Services
            </a>

          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-10">

            <div>
              <p className="text-2xl font-bold text-white">
                24/7
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Service Support
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-white">
                100%
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Secure Booking
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-white">
                Easy
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Vehicle Management
              </p>
            </div>

          </div>

        </div>

        {/* Right Visual */}
        <div className="relative hidden lg:block">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-slate-800/40 blur-3xl" />

          <div className="relative rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Instant Mechanic
                </p>

                <h3 className="mt-1 text-2xl font-semibold text-white">
                  Vehicle Care
                </h3>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13l1.5-5.5A2 2 0 016.43 6h11.14a2 2 0 011.93 1.5L21 13"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13h14v5H5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 18v2M17 18v2M7 13v-2h10v2"
                  />
                </svg>
              </div>
            </div>

            <div className="my-8 border-t border-slate-800" />

            <div className="space-y-4">

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-sm text-slate-500">
                  Service Booking
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <p className="font-medium text-white">
                    Schedule a service
                  </p>

                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                    Easy
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-sm text-slate-500">
                  Vehicle Management
                </p>

                <p className="mt-2 font-medium text-white">
                  Manage your vehicles
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-sm text-slate-500">
                  Booking Tracking
                </p>

                <p className="mt-2 font-medium text-white">
                  Track service progress
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;