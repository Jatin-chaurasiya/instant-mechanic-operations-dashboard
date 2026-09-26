const Footer = () => {
  return (
    <footer
      id="about"
      className="border-t border-slate-800 bg-[#020617]"
    >
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="flex flex-col justify-between gap-8 md:flex-row">

          <div>
            <h3 className="text-lg font-bold text-white">
              Instant Mechanic
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              A vehicle service operations platform for
              managing services, vehicles and bookings.
            </p>
          </div>

          <div className="flex gap-10 text-sm text-slate-400">
            <a
              href="#services"
              className="transition hover:text-white"
            >
              Services
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-white"
            >
              How It Works
            </a>

            <a
              href="#about"
              className="transition hover:text-white"
            >
              About
            </a>
          </div>

        </div>

        <div className="mt-10 border-t border-slate-800 pt-6">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Instant Mechanic.
            All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;