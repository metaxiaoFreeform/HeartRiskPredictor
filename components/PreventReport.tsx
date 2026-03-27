"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PreventInput, PreventOutput } from "@/lib/prevent/types";
import { computeContributions, FactorContribution } from "@/lib/prevent/contributions";
import PreventResult from "@/components/PreventResult";
import {
  ArrowLeft,
  Activity,
  Stethoscope,
  Lightbulb,
  TrendingUp,
  Shield,
} from "lucide-react";

interface PreventReportProps {
  input: PreventInput;
  result: PreventOutput;
  onBack: () => void;
}

function heroLevel(val: number | null): { key: string; bg: string; color: string } {
  if (val === null || val < 5) return { key: "low", bg: "bg-emerald-50", color: "text-emerald-700 border-emerald-300 bg-emerald-100" };
  if (val < 7.5) return { key: "borderline", bg: "bg-yellow-50", color: "text-yellow-700 border-yellow-300 bg-yellow-100" };
  if (val < 20) return { key: "moderate", bg: "bg-orange-50", color: "text-orange-700 border-orange-300 bg-orange-100" };
  return { key: "high", bg: "bg-red-50", color: "text-red-700 border-red-300 bg-red-100" };
}

const PreventReport: React.FC<PreventReportProps> = ({ input, result, onBack }) => {
  const { t, language } = useLanguage();

  const primaryRisk = result.tenYear.cvd;
  const level = heroLevel(primaryRisk);
  const perThousand = primaryRisk !== null ? (primaryRisk * 10).toFixed(0) : "N/A";
  const annualRisk = primaryRisk !== null
    ? ((1 - Math.pow(1 - primaryRisk / 100, 1 / 10)) * 100).toFixed(2)
    : "N/A";

  const contributions = useMemo(
    () => computeContributions(input, result.model),
    [input, result.model]
  );

  const maxContrib = useMemo(
    () => Math.max(...contributions.map(c => Math.abs(c.value)), 0.01),
    [contributions]
  );

  const getEmoji = (key: string) => {
    const src = key === 'high' ? '/images/high risk.gif'
      : key === 'moderate' ? '/images/medium risk.gif'
      : '/images/low risk.gif';
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <img src={src} alt={key} width={200} height={200} className="max-w-full" />
      </div>
    );
  };

  const levelLabel = (key: string) => {
    const map: Record<string, Record<string, string>> = {
      low: { en: "Low Risk", zh: "低风险" },
      borderline: { en: "Borderline Risk", zh: "临界风险" },
      moderate: { en: "Moderate Risk", zh: "中等风险" },
      high: { en: "High Risk", zh: "高风险" },
    };
    return map[key]?.[language] ?? map[key]?.en ?? key;
  };

  const factorLabel = (factor: string): string => {
    return t(`prevent.report.factors.${factor}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Navigation */}
        <Button variant="ghost" onClick={onBack} className="group hover:bg-white mb-4">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {t("prevent.report.back")}
        </Button>

        {/* Section 1: Hero */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className={cn("p-8 text-center space-y-4", level.bg)}>
              <div className="text-6xl mb-2">{getEmoji(level.key)}</div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {t("prevent.report.hero.title")}
              </h1>
              <p className="text-slate-500 max-w-md mx-auto">
                {t("prevent.report.hero.subtitle")}
              </p>

              <div className="pt-4 flex flex-col items-center gap-4 px-2">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight text-center break-words">
                  {t("prevent.report.hero.headline", {
                    probability: primaryRisk !== null ? primaryRisk.toFixed(1) : "N/A",
                  })}
                </div>
                <div className={cn("px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider border", level.color)}>
                  {levelLabel(level.key)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Risk Grid — reuse PreventResult */}
        <PreventResult result={result} />

        {/* Section 3: Medical Explanation */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center space-x-2 pb-2">
            <Activity className="h-5 w-5 text-indigo-600" />
            <CardTitle className="text-xl">{t("prevent.report.explanation.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {primaryRisk !== null && (
              <>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {t("prevent.report.explanation.meaning", {
                    probability: primaryRisk.toFixed(1),
                  })}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t("prevent.report.explanation.perThousand", {
                    perThousand,
                  })}
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {t("prevent.report.explanation.annualRisk", {
                    annualRisk,
                  })}
                </p>
              </>
            )}
            <p className="text-sm text-slate-600 leading-relaxed">
              {t("prevent.report.explanation.method")}
            </p>
            <div className="bg-slate-50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-slate-700">
                {t("prevent.report.explanation.levelsTitle")}
              </p>
              <p className="text-sm text-slate-600">{t("prevent.report.explanation.levelLow")}</p>
              <p className="text-sm text-slate-600">{t("prevent.report.explanation.levelBorderline")}</p>
              <p className="text-sm text-slate-600">{t("prevent.report.explanation.levelModerate")}</p>
              <p className="text-sm text-slate-600">{t("prevent.report.explanation.levelHigh")}</p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("prevent.report.explanation.disclaimer")}
            </p>
          </CardContent>
        </Card>

        {/* Section 4: Factor Contribution Analysis */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center space-x-2 pb-2">
            <Stethoscope className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-xl">{t("prevent.report.factors.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-slate-500">
              {t("prevent.report.factors.desc")}
            </p>

            <div className="space-y-4">
              {contributions.slice(0, 6).map((c) => (
                <div key={c.factor} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700 flex items-center gap-1.5">
                      {c.direction === 'protective' ? (
                        <Shield className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <TrendingUp className="h-3.5 w-3.5 text-orange-500" />
                      )}
                      {factorLabel(c.factor)}
                    </span>
                    <span className={cn(
                      "text-xs font-mono px-2 py-0.5 rounded",
                      c.direction === 'protective'
                        ? "text-emerald-700 bg-emerald-50"
                        : "text-orange-700 bg-orange-50"
                    )}>
                      {c.direction === 'protective' ? '' : '+'}{c.value.toFixed(3)}
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-700",
                        c.direction === 'protective' ? "bg-emerald-500" : "bg-orange-500"
                      )}
                      style={{ width: `${Math.min((Math.abs(c.value) / maxContrib) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Comprehensive Advice */}
        <Card className="border-none shadow-sm bg-blue-600 text-white overflow-hidden relative">
          <div className="absolute right-0 top-0 opacity-10 p-4">
            <Lightbulb size={120} />
          </div>
          <CardHeader className="flex flex-row items-center space-x-2 pb-2 relative z-10">
            <Lightbulb className="h-5 w-5" />
            <CardTitle className="text-xl text-white">{t("prevent.report.advice.title")}</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-blue-50 leading-relaxed">
              {t(`prevent.report.advice.levels.${level.key}`)}
            </p>
          </CardContent>
        </Card>

        {/* Section 6: Legal Attribution & Notices (required by AHA license) */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center space-x-2 pb-2">
            <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <CardTitle className="text-lg text-slate-700">
              {language === 'zh' ? '法律归属与声明' : 'Legal Attribution & Notices'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'zh'
                ? 'PREVENT™ 方程由美国心脏协会心血管-肾脏-代谢科学顾问组的部分成员开发。风险方程在超过 600 万人的大规模多样化样本中推导与验证。'
                : 'The PREVENT™ equations were developed by select members of the American Heart Association Cardiovascular-Kidney-Metabolic Scientific Advisory Group. The risk equations were derived and validated in a large, diverse sample of over 6 million individuals.'}
            </p>
            <div className="bg-slate-50 rounded-lg p-4 space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {language === 'zh' ? '参考文献' : 'References'}
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-500 leading-relaxed">
                <li>Khan SS, Matsushita K, Sang Y, et al. Development and Validation of the American Heart Association Predicting Risk of Cardiovascular Disease EVENTs (PREVENT™) Equations. <em>Circulation</em> 2023. DOI: 10.1161/CIRCULATIONAHA.123.067626.</li>
                <li>Khan SS, Coresh J, Pencina MJ, et al. Novel Prediction Equations for Absolute Risk Assessment of Total Cardiovascular Disease Incorporating Cardiovascular-Kidney-Metabolic Health: A Scientific Statement From the American Heart Association. <em>Circulation</em> 2023;148(24):1982-2004. DOI: 10.1161/CIR.0000000000001191.</li>
              </ol>
            </div>
            <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
              <p className="text-xs text-amber-800 leading-relaxed">
                {language === 'zh'
                  ? '本工具提供的信息基于 PREVENT™ 部分内容。PREVENT™ 是美国心脏协会 (AHA) 针对一级预防患者的在线风险计算器。AHA 材料的使用仅限于 PREVENT™ 的特定方面。本工具提供的信息基于 PREVENT™ 1.0.0 版本。PREVENT™ 的更新和未来修订可能产生不同的结果和结论。'
                  : 'The information provided herein is based in part on PREVENT™, which is the American Heart Association\'s (AHA) online risk calculator for primary prevention patients. The use of the AHA\'s material is limited to certain aspects of PREVENT™. The information derived from the use of PREVENT™ is based on PREVENT™ 1.0.0. Updates and future adaptations of PREVENT™ may yield different results and conclusions.'}
              </p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'zh'
                ? 'PREVENT™ 是筛查和风险分层工具，不是诊断工具，不应用于独立做出治疗决策。患者应与临床医生讨论其风险信息。'
                : 'PREVENT™ is a screening and risk stratification tool and is NOT a diagnostic tool. It should not be used to make independent treatment decisions. Patients should discuss their risk information with their clinician.'}
            </p>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            variant="outline"
            className="flex-1 py-6 text-lg rounded-xl border-2 hover:bg-slate-100"
            onClick={onBack}
          >
            {t("prevent.report.back")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreventReport;
