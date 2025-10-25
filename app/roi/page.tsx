"use client";
import { useState } from "react";

export default function Page() {
  const [numEmployees, setNumEmployees] = useState(100);
  const [payCycles, setPayCycles] = useState(26);
  const [avgHours, setAvgHours] = useState(2);
  const [errorRate, setErrorRate] = useState(2);
  const [hourlyRate, setHourlyRate] = useState(40); // new editable rate
  const [group, setGroup] = useState("Council");

  // --- CALCULATION LOGIC ---
  const efficiencyFactor = group === "Enterprise" ? 0.8 : 0.4;
  const errorFactor = group === "Enterprise" ? 1.0 : 0.8;

  // total hours saved per year
  const timeSaved = (numEmployees * payCycles * avgHours * efficiencyFactor * (errorRate / 100)) / errorFactor;

  // cost saving in dollars (hourlyRate × time saved)
  const costSavings = timeSaved * hourlyRate;

  // ROI % (simple model)
  const roiPercent = (costSavings / (numEmployees * 10)) * 100;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Datapay ROI / Efficiency Calculator</h1>

      {/* --- INPUTS --- */}
      <div className="grid gap-3 mb-6">
        <input
          type="number"
          value={numEmployees}
          onChange={(e) => setNumEmployees(parseInt(e.target.value) || 0)}
          placeholder="Number of employees"
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={payCycles}
          onChange={(e) => setPayCycles(parseInt(e.target.value) || 0)}
          placeholder="Pay cycles per year"
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={avgHours}
          onChange={(e) => setAvgHours(parseFloat(e.target.value) || 0)}
          placeholder="Average HR hours per pay run"
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={errorRate}
          onChange={(e) => setErrorRate(parseFloat(e.target.value) || 0)}
          placeholder="Error correction rate (%)"
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
          placeholder="Average payroll admin hourly rate ($)"
          className="border p-2 rounded"
        />
        <select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Council">Council</option>
          <option value="Enterprise">Enterprise</option>
        </select>
      </div>

      {/* --- RESULTS --- */}
      <div className="p-4 border rounded bg-gray-50">
        <p><strong>Estimated Annual Time Saved:</strong> {timeSaved.toFixed(0)} hours</p>
        <p><strong>Estimated Annual Cost Savings:</strong> ${costSavings.toLocaleString()}</p>
        <p><strong>Estimated ROI:</strong> {roiPercent.toFixed(1)}%</p>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        *Savings based on average payroll administrator hourly rate (${hourlyRate}/hr). 
        Adjust as needed for your organisation.
      </p>
    </main>
  );
}