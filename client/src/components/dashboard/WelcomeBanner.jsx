import { CalendarDays } from "lucide-react";

function WelcomeBanner() {
  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div
      className="
        mb-8
        flex
        flex-col
        gap-5
        rounded-2xl
        bg-gradient-to-r
        from-blue-600
        to-indigo-600
        p-6
        text-white
        shadow-lg
        shadow-blue-200/50

        sm:flex-row
        sm:items-center
        sm:justify-between

        dark:shadow-none
      "
    >
      {/* Welcome Message */}
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">
          Welcome Back 👋
        </h2>

        <p className="mt-2 text-sm text-blue-100 sm:text-base">
          Here's what's happening in your medical shop today.
        </p>
      </div>

      {/* Date */}
      <div
        className="
          flex
          w-fit
          items-center
          gap-2
          rounded-xl
          border
          border-white/10
          bg-white/20
          px-4
          py-2.5
          text-sm
          font-medium
          backdrop-blur-sm

          sm:text-base
        "
      >
        <CalendarDays size={19} />

        <span>{today}</span>
      </div>
    </div>
  );
}

export default WelcomeBanner;