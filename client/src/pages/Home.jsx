export default function Home() {
  return (
    <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl text-gray-800 font-bold mb-4">
          AI-Powered Compliance Analysis
        </h1>
        <p className="text-gray-600 mb-6">
          Upload documents, evaluate risks, and improve your startup’s compliance posture with intelligent automation.
        </p>
        <a
          href="/dashboard"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
