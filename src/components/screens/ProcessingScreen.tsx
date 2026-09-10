export default function ProcessingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-slate-50 to-white px-6">
      {/* Animated shield */}
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-indigo-100 animate-ping opacity-40" />
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      </div>

      {/* Processing text */}
      <p className="text-slate-700 font-semibold text-lg mb-1">Verifying payment…</p>
      <p className="text-slate-400 text-sm">PayFlow Shield is checking in the background</p>

      {/* Loading dots */}
      <div className="flex items-center gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-indigo-400"
            style={{
              animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
