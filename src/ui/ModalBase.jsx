
import { IoClose } from "react-icons/io5";

export default function ModalBase({ children, title, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      {/* Ventana del Modal */}
      <div className="relative w-full max-w-4xl bg-slate-900 border-2 border-white/20 rounded-xl shadow-2xl overflow-hidden animate-fadeIn">
        
        {/* Encabezado */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-white/10">
          <h2 className="text-xl font-bold text-white tracking-wider uppercase">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-red-500/20 rounded-full transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {children}
        </div>

      </div>
    </div>
  );
}