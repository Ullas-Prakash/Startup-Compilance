import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  useEffect(() => {
    if (!data) {
      navigate("/dashboard");
    }
  }, [data, navigate]);

  if (!data) return null;

  const { score, riskLevel, recommendations } = data;

  const riskColor =
    riskLevel === "Low"
      ? "bg-green-100 text-green-700"
      : riskLevel === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-sm rounded-xl p-8 w-full max-w-2xl text-center">

        <h1 className="text-2xl font-semibold mb-6">
          Compliance Assessment Result
        </h1>

        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center text-4xl font-bold text-slate-800 border">
            {score}
          </div>
        </div>

        <div className="mb-6">
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${riskColor}`}>
            {riskLevel} Risk
          </span>
        </div>

        <div className="text-left">
          <h2 className="text-lg font-medium mb-3">Recommended Actions</h2>

          {recommendations.length === 0 ? (
            <p className="text-green-600 font-medium">
              🎉 Great job! You are fully compliant.
            </p>
          ) : (
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-3 border rounded-md bg-gray-50">
                  {rec}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
