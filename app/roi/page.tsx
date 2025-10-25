"use client";

import { useState } from "react";

export default function Page() {
  // Inputs
  const [orgType, setOrgType] = useState<"Council" | "Enterprise">("Council");
  const [employees, setEmployees] = useState(250);
  const [cycles, setCycles] = useState(26); // 12 monthly, 26 fortnightly, 52 weekly
  const [hoursPerCycle, setHoursPerCycle] = useState(8);
  const [errorRatePct, setErrorRatePct] = useState(3);

  // Assumptions
  const hourlyRate = 55; // NZD
  const efficiencyFactor = orgType === "Enterprise" ? 0.35 : 0.40;
  const errorCost = orgType === "Enterprise" ? 70 : 90;

  // Calcs
  const adminTimeCost = hoursPerCycle * cycles * hourlyRate;
  const timeSaved = adminTimeCost * efficiencyFactor;
  const errorSavings = employees * (errorRatePct / 100) * errorCost * cycles;
  const totalSavings = timeSaved + errorSavings;
  const roi = adminTimeCost > 0 ? totalSavings / adminTimeCost : 0;
  const roiPct = Math.max(0, Math.min(100, Math.round(roi * 100)));
  const bookingUrl =
    "mailto:sales@datacom.co.nz?subject=Datapay%20Discovery%20(20%20min)";

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold">Datapay ROI / Efficiency Calculator</h1>

        {/* Toggle */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setOrgType("Council")}
            className={`px-3 py-2 rounded border ${
              orgType === "Council"
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-white text-slate-700 border-slate-300"
            }`}
          >
            Council
          </button>
          <button
            onClick={() => setOrgType("Enterprise")}
            className={`px-3 py-2 rounded border ${
              orgType === "Enterprise"
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-white text-slate-700 border-slate-300"
            }`}
          >
            Enterprise
          </button>
        </div>

        {/* Inputs */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Employees</span>
            <input
              type="number"
              className="rounded border p-2"
              value={employees}
              onChange={(e) => setEmployees(Math.max(1, Number(e.target.value)))}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Pay cycles per year</span>
            <select
              className="rounded border p-2"
              value={cycles}
              onChange={(e) => setCycles(Number(e.target.value))}
            >
              <option value={12}>12 (Monthly)</option>
              <option value={26}>26 (Fortnightly)</option>
              <option value={52}>52 (Weekly)</option>
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Avg payroll hours / cycle</span>
            <input
              type="number"
              className="rounded border p-2"
              value={hoursPerCycle}
              onChange={(e) => setHoursPerCycle(Math.max(1, Number(e.target.value)))}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Error correction rate (%)</span>
            <input
              type="number"
              className="rounded border p-2"
              value={errorRatePct}
              onChange={(e) => setErrorRatePct(Math.max(0, Number(e.target.value)))}
            />
          </label>
        </div>

        {/* Outputs */}
        <div className="mt-6 rounded border p-4">
          <div className="text-sm text-slate-500">Estimated ROI</div>
          <div
            className={`text-4xl font-bold ${
              roiPct < 30 ? "text-red-500" : roiPct < 60 ? "text-amber-500" : "text-teal-600"
            }`}
          >
            {roiPct}%
          </div>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total annual savings</span>
              <span>${Math.round(totalSavings).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Admin time cost (current)</span>
              <span>${Math.round(adminTimeCost).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Hours back to team</span>
              <span>{Math.round(timeSaved / hourlyRate)} hrs / yr</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => window.print()}
            className="rounded border border-slate-300 px-4 py-2 text-slate-700"
          >
            Export PDF
          </button>

          <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
            <button className="rounded bg-teal-600 px-4 py-2 font-medium text-white hover:bg-teal-700">
              Book a 20-min discovery
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}