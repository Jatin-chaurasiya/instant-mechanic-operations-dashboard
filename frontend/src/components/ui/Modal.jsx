import { useEffect } from "react";
import { X } from "lucide-react";

const sizes = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        p-4
      "
    >
      {/* Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-slate-900/50
          backdrop-blur-sm

          dark:bg-black/70
        "
        onClick={onClose}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className={`
          relative
          z-10
          w-full
          ${sizes[size]}
          max-h-[90vh]
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-2xl

          dark:border-slate-700
          dark:bg-slate-900
          dark:shadow-black/40
        `}
      >
        {/* Header */}
        <div
          className="
            flex
            items-start
            justify-between
            border-b
            border-slate-200
            px-5 py-4

            dark:border-slate-700

            sm:px-6
          "
        >
          <div className="pr-6">
            <h2
              className="
                text-base
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              {title}
            </h2>

            {description && (
              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-1.5
              text-slate-400
              transition

              hover:bg-slate-100
              hover:text-slate-700

              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
            aria-label="Close modal"
          >
            <X size={19} />
          </button>
        </div>

        {/* Body */}
        <div
          className="
            max-h-[calc(90vh-140px)]
            overflow-y-auto
            px-5 py-5

            sm:px-6
          "
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className="
              border-t
              border-slate-200
              bg-slate-50
              px-5 py-4

              dark:border-slate-700
              dark:bg-slate-800

              sm:px-6
            "
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;