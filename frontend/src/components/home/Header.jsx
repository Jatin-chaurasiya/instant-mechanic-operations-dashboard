import { useState } from "react";
import { Link } from "react-router-dom";

import PublicAuthModal from "../auth/PublicAuthModal";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { isAuthenticated, loading } = useAuth();

  return (
    <>
      <header className="border-b border-slate-800 bg-[#020617]">
        <div className="relative mx-auto flex h-28 max-w-7xl items-center px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl">
              🔨
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">Instant</h1>

              <p className="text-lg text-slate-400">Mechanic</p>
            </div>
          </Link>

          {/* Center Navigation */}
          <nav
            className="
              absolute
              left-1/2
              top-1/2
              flex
              -translate-x-1/2
              -translate-y-1/2
              items-center
              gap-12
            "
          >
            <Link
              to="/"
              className="
                text-lg
                text-white
                transition
                hover:text-slate-300
              "
            >
              Home
            </Link>

            <Link
              to="/services"
              className="
                text-lg
                text-white
                transition
                hover:text-slate-300
              "
            >
              Services
            </Link>

            <a
              href="/#how-it-works"
              className="
                text-lg
                text-white
                transition
                hover:text-slate-300
              "
            >
              How It Works
            </a>

            <a
              href="/#about"
              className="
                text-lg
                text-white
                transition
                hover:text-slate-300
              "
            >
              About
            </a>
          </nav>

          {/* Login - Right Corner */}
          {!loading && !isAuthenticated && (
            <button
              type="button"
              onClick={() => setShowAuthModal(true)}
              className="
      ml-auto
      rounded-2xl
      bg-white
      px-8
      py-4
      text-lg
      text-slate-900
      transition
      hover:bg-slate-100
    "
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Public Login / Registration Modal */}
      {showAuthModal && !isAuthenticated && (
        <PublicAuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
};

export default Header;
