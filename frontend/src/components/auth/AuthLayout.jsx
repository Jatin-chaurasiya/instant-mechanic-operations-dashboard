import { Wrench } from "lucide-react";

const AuthLayout = ({
  title,
  subtitle,
  children,
  footer,
}) => {
  return (
    <div className="
      flex min-h-screen
      bg-slate-50
      dark:bg-slate-950
    ">
      {/* Left Branding */}
      <div className="
        hidden
        w-[42%]
        flex-col
        justify-between
        bg-slate-950
        p-10
        text-white
        lg:flex
      ">
        <div>
          <div className="flex items-center gap-3">
            <div className="
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              bg-white
              text-slate-950
            ">
              <Wrench size={23} />
            </div>

            <div>
              <p className="text-lg font-bold">
                Instant
              </p>

              <p className="text-sm text-slate-400">
                Mechanic
              </p>
            </div>
          </div>

          <div className="mt-24 max-w-md">
            <p className="
              text-sm
              font-medium
              uppercase
              tracking-[0.2em]
              text-slate-400
            ">
              Operations Platform
            </p>

            <h1 className="
              mt-4
              text-4xl
              font-bold
              leading-tight
            ">
              Manage your vehicle service operations.
            </h1>

            <p className="
              mt-5
              text-base
              leading-7
              text-slate-400
            ">
              Monitor bookings, revenue, mechanics and
              service performance from one place.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          Instant Mechanic • Operations Dashboard
        </p>
      </div>

      {/* Right */}
      <div className="
        flex flex-1
        items-center
        justify-center
        px-5 py-10
        sm:px-8
      ">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="
            mb-8
            flex
            items-center
            gap-3
            lg:hidden
          ">
            <div className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              bg-slate-900
              text-white
              dark:bg-white
              dark:text-slate-950
            ">
              <Wrench size={19} />
            </div>

            <div>
              <p className="font-bold text-slate-900 dark:text-white">
                Instant Mechanic
              </p>

              <p className="text-xs text-slate-500">
                Operations Dashboard
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
            ">
              {title}
            </h2>

            <p className="
              mt-2
              text-sm
              text-slate-500
              dark:text-slate-400
            ">
              {subtitle}
            </p>
          </div>

          {children}

          {footer && (
            <div className="mt-6 text-center">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;