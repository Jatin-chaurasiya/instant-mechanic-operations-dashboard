import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;