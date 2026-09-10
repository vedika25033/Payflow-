interface ToastProps {
  message: string;
  type: 'success' | 'danger' | 'info';
}

const typeStyles = {
  success: 'bg-emerald-600 text-white',
  danger: 'bg-red-600 text-white',
  info: 'bg-indigo-600 text-white',
};

export default function Toast({ message, type }: ToastProps) {
  return (
    <div className="fixed top-20 left-1/2 z-[100] toast-animate">
      <div className={`
        px-5 py-3 rounded-xl shadow-xl
        ${typeStyles[type]}
      `}>
        <p className="text-sm font-semibold whitespace-nowrap">{message}</p>
      </div>
    </div>
  );
}
