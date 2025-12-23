import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

export default function ModalBase({ children, title, onClose }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center w-screen h-screen bg-black/80 backdrop-blur-sm backdrop-saturate-150">
      <div className="relative w-[min(90vw,80rem)] max-h-[90vh] bg-slate-900 border-2 border-white/20 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-fadeIn">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-white/10">
          <h2 className="text-xl font-bold text-white tracking-wider uppercase">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-red-500/20 rounded-full transition-colors"
            aria-label="Cerrar modal"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-grow">{children}</div>
      </div>
    </div>,
    document.body
  );
}
