"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PreventOutput } from "@/lib/prevent/types";

function riskColor(val: number | null): string {
  if (val === null) return "text-slate-400 bg-slate-50";
  if (val < 5) return "text-green-700 bg-green-50";
  if (val < 7.5) return "text-yellow-700 bg-yellow-50";
  if (val < 20) return "text-orange-700 bg-orange-50";
  return "text-red-700 bg-red-50";
}

function riskLabel(val: number | null, t: (key: string) => string): string {
  if (val === null) return "N/A";
  if (val < 5) return t("prevent.result.riskLow");
  if (val < 7.5) return t("prevent.result.riskBorderline");
  if (val < 20) return t("prevent.result.riskModerate");
  return t("prevent.result.riskHigh");
}

const modelNames: Record<string, string> = {
  base: "Base",
  uacr: "Base + UACR",
  hba1c: "Base + HbA1c",
  sdi: "Base + SDI",
  full: "Full (UACR + HbA1c + SDI)",
};

interface PreventResultProps {
  result: PreventOutput;
}

export default function PreventResult({ result }: PreventResultProps) {
  const { t } = useLanguage();

  const rows = [
    { key: "cvd", label: t("prevent.result.cvd") },
    { key: "ascvd", label: t("prevent.result.ascvd") },
    { key: "hf", label: t("prevent.result.hf") },
  ] as const;

  const renderCell = (val: number | null) => {
    const color = riskColor(val);
    return (
      <td className="px-4 py-3 text-center">
        <div className={`inline-flex flex-col items-center gap-1 px-3 py-2 rounded-lg ${color}`}>
          <span className="text-xl font-bold">
            {val !== null ? `${val.toFixed(1)}%` : "N/A"}
          </span>
          <span className="text-xs font-medium opacity-75">
            {riskLabel(val, t)}
          </span>
        </div>
      </td>
    );
  };

  return (
    <div className="mt-8 bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-red-50 to-rose-50 px-6 py-4 border-b">
        <h3 className="text-lg font-bold text-slate-800">{t("prevent.result.title")}</h3>
        <p className="text-sm text-slate-500 mt-1">
          PREVENT™ {modelNames[result.model]} Model
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600"></th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600">
                {t("prevent.result.tenYear")}
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-slate-600">
                {t("prevent.result.thirtyYear")}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-b last:border-b-0 hover:bg-slate-50/50 transition">
                <td className="px-4 py-3 font-semibold text-slate-700">{row.label}</td>
                {renderCell(result.tenYear[row.key])}
                {renderCell(result.thirtyYear[row.key])}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {result.warnings.length > 0 && (
        <div className="px-6 py-3 bg-amber-50 border-t text-sm text-amber-700">
          {result.warnings.includes("age>59") && (
            <p>⚠️ {t("prevent.result.naAge")}</p>
          )}
          {result.warnings.includes("bmi_invalid_for_hf") && (
            <p>⚠️ {t("prevent.result.naBmi")}</p>
          )}
        </div>
      )}
    </div>
  );
}
