import {
  AlertTriangle,
} from "lucide-react";

import Modal from "./Modal";
import Button from "./Button";


const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,

  title = "Are you sure?",
  description = "This action cannot be undone.",

  confirmText = "Confirm",
  cancelText = "Cancel",

  loading = false,
}) => {

  return (
    <Modal
      isOpen={isOpen}
      onClose={loading ? undefined : onClose}
      size="sm"
      title={title}
      description={description}
    >

      {/* ==========================================
          Warning Icon
      ========================================== */}

      <div
        className="
          flex
          justify-center
          py-4
        "
      >
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-red-50
            text-red-500
            dark:bg-red-950/30
            dark:text-red-400
          "
        >
          <AlertTriangle size={24} />
        </div>
      </div>


      {/* ==========================================
          Actions
      ========================================== */}

      <div
        className="
          mt-4
          flex
          justify-end
          gap-3
          border-t
          border-slate-100
          pt-5
          dark:border-slate-700
        "
      >

        <Button
          variant="secondary"
          onClick={onClose}
          disabled={loading}
        >
          {cancelText}
        </Button>


        <Button
          variant="danger"
          onClick={onConfirm}
          loading={loading}
          disabled={loading}
        >
          {confirmText}
        </Button>

      </div>

    </Modal>
  );
};


export default ConfirmModal;