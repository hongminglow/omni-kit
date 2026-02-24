import { useState } from "react";
import type { ReactNode } from "react";
import cronstrue from "cronstrue";
import { ToolPanel } from "../../components/ui/ToolPanel";

export function CronParserPage(): ReactNode {
  const [cronExp, setCronExp] = useState("* * * * *");

  let description = "";
  let error = "";
  try {
    if (cronExp.trim()) {
      description = cronstrue.toString(cronExp);
    }
  } catch (err: unknown) {
    error = err instanceof Error ? err.message : "Invalid cron expression";
  }

  return (
    <ToolPanel
      title="Cron Expression Parser"
      subtitle="Parse and validate cron schedule expressions into readable text."
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-300">
            Cron Expression
          </label>
          <input
            type="text"
            value={cronExp}
            onChange={(e) => setCronExp(e.target.value)}
            className="w-full rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 text-stone-200 placeholder-stone-500 focus:border-brandCta/60 focus:outline-none focus:ring-1 focus:ring-brandCta/60"
            placeholder="e.g. * * * * *"
          />
          <p className="text-xs text-stone-500">
            Format: minute hour day month day-of-week
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {["Minute", "Hour", "Day (Month)", "Month", "Day (Week)"].map(
            (label, index) => {
              const parts = cronExp.trim().split(/\s+/);
              const part = parts[index];
              const isActive = !!part && part !== "";
              const displayValue = isActive ? part : "-";

              return (
                <div
                  key={label}
                  className={`flex flex-col items-center justify-center rounded-xl border p-2 sm:p-3 transition-colors duration-300 ${
                    isActive
                      ? "border-brandCta/40 bg-brandCta/10 text-brandCta"
                      : "border-stone-800 bg-stone-900/40 text-stone-600"
                  }`}
                >
                  <span className="font-mono text-base font-bold sm:text-xl">
                    {displayValue}
                  </span>
                  <span className="mt-1.5 text-center text-[9px] font-bold uppercase tracking-widest text-stone-400 sm:text-[10px]">
                    {label}
                  </span>
                </div>
              );
            },
          )}
        </div>

        <div className="rounded-xl border border-stone-800 bg-stone-950 p-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
            Human Readable
          </h3>
          {error ? (
            <p className="font-medium text-rose-400">{error}</p>
          ) : (
            <p className="text-lg font-medium text-emerald-400">
              {description || "Enter a cron expression"}
            </p>
          )}
        </div>
      </div>
    </ToolPanel>
  );
}
