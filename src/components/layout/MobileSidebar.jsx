import Sidebar from "./Sidebar";

const MobileSidebar = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-slate-900/50
          backdrop-blur-[2px]
          dark:bg-black/70
        "
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className="
          relative
          h-full
          w-72
          max-w-[85vw]
          shadow-2xl
        "
      >
        <Sidebar onClose={onClose} />
      </div>
    </div>
  );
};

export default MobileSidebar;