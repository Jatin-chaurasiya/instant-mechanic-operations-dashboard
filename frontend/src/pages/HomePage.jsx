import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />

      <FeaturesSection />

      <section
        id="how-it-works"
        className="border-t border-slate-800 py-24"
      >
        <div className="mx-auto max-w-7xl px-6">

          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Simple process
            </p>

            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Get your vehicle serviced in three steps.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7">
              <span className="text-sm text-slate-500">
                01
              </span>

              <h3 className="mt-6 text-xl font-semibold text-white">
                Select your vehicle
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Add and manage your vehicle information
                through your account.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7">
              <span className="text-sm text-slate-500">
                02
              </span>

              <h3 className="mt-6 text-xl font-semibold text-white">
                Choose a service
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Select an available service and schedule
                your preferred date and time.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7">
              <span className="text-sm text-slate-500">
                03
              </span>

              <h3 className="mt-6 text-xl font-semibold text-white">
                Track your booking
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Follow your booking status until the
                service is completed.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;