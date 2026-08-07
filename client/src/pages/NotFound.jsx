import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md rounded-xl bg-white p-10 text-center shadow-lg">

        <h1 className="text-7xl font-bold text-blue-600">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-500">
          Sorry, the page you are looking for doesn't exist
          or has been moved.
        </p>

        <div className="mt-8 flex justify-center gap-4">

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-3 transition hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
          >
            <Home size={18} />
            Dashboard
          </Link>

        </div>

      </div>
    </div>
  );
};

export default NotFound;