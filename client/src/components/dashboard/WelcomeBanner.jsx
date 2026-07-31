import { CalendarDays } from "lucide-react";

function WelcomeBanner() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-8 flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow">
      <div>
        <h2 className="text-3xl font-bold">
          Welcome Back 👋
        </h2>

        <p className="mt-2 text-blue-100">
          Here's what's happening in your medical shop today.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2">
        <CalendarDays size={20} />
        <span>{today}</span>
      </div>
    </div>
  );
}

export default WelcomeBanner;