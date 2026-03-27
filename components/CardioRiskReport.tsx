"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  ArrowLeft,
  Download,
  ChevronRight,
  Heart,
  Activity,
  Stethoscope,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Lightbulb
} from "lucide-react";

interface CardioRiskReportProps {
  data: any;
  result: {
    probability: string;
    annualRisk: string;
    perThousand: string;
    level: {
      label: string;
      color: string;
      key: string;
    };
  };
  years: number;
  onBack: () => void;
}

const CardioRiskReport: React.FC<CardioRiskReportProps> = ({ data, result, years, onBack }) => {
  const { t, language } = useLanguage();

  // Logic to extract top 3 risk factors
  const riskFactors = useMemo(() => {
    const factors = [
      { key: "ageSex", score: parseInt(data.ageSex) },
      { key: "whr", score: parseInt(data.whr) },
      { key: "hypertension", score: parseInt(data.hypertension) },
      { key: "diabetes", score: parseInt(data.diabetes) },
      { key: "familyHistory", score: parseInt(data.familyHistory) },
      { key: "smoking", score: parseInt(data.smoking) },
      { key: "secondhandSmoke", score: parseInt(data.secondhandSmoke) },
      { key: "stress", score: parseInt(data.stress) },
      { key: "depression", score: parseInt(data.depression) },
      { key: "saltyFood", score: parseInt(data.saltyFood) },
      { key: "friedFood", score: parseInt(data.friedFood) },
      { key: "fruit", score: parseInt(data.fruit) },
      { key: "vegetables", score: parseInt(data.vegetables) },
      { key: "meat", score: parseInt(data.meat) },
      { key: "physicalActivity", score: parseInt(data.physicalActivity) },
    ];

    return factors
      .filter(f => f.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [data]);

  // Lifestyle habits logic
  const habits = useMemo(() => {
    const positive = [];
    const negative = [];

    if (data.fruit === "0") positive.push(t("cardio.fruit.label").split(' - ')[0]);
    else negative.push(t("cardio.fruit.label").split(' - ')[0]);

    if (data.vegetables === "0") positive.push(t("cardio.vegetables.label").split(' - ')[0]);
    else negative.push(t("cardio.vegetables.label").split(' - ')[0]);

    if (data.physicalActivity === "0") positive.push(t("cardio.physicalActivity.label").split(' (')[0]);
    else negative.push(t("cardio.physicalActivity.label").split(' (')[0]);

    if (parseInt(data.smoking) > 0) negative.push(t("cardio.smoking.label"));
    if (data.friedFood === "1") negative.push(t("cardio.friedFood.label"));
    if (data.stress === "3") negative.push(t("cardio.stress.label"));

    return { positive, negative };
  }, [data, t]);

  const getEmoji = (key: string) => {
    switch (key) {
      case 'low': return <div className="flex flex-col items-center justify-center w-full"><iframe src="https://giphy.com/embed/a1T4UDhJ4GLGOAmGUa" width="240" height="240" frameBorder={0} className="giphy-embed max-w-full" allowFullScreen></iframe><p><a href="https://giphy.com/stickers/iSalud-doctori-ok-thumbs-up-great-a1T4UDhJ4GLGOAmGUa"></a></p></div>;
      case 'moderate': return <div className="flex flex-col items-center justify-center w-full"><iframe src="https://giphy.com/embed/Revfms5zESAJokfdZz" width="240" height="360" frameBorder={0} className="giphy-embed max-w-full" allowFullScreen></iframe><p><a href="https://giphy.com/stickers/SuneduPeru-top-doctor-pensado-Revfms5zESAJokfdZz"></a></p></div>;
      case 'high': return <div className="flex flex-col items-center justify-center w-full"><iframe src="https://giphy.com/embed/3ov9jS4jYIoJZjiv16" width="240" height="360" frameBorder={0} className="giphy-embed max-w-full" allowFullScreen></iframe><p><a href="https://giphy.com/stickers/iSalud-doctori-ok-thumbs-up-great-a1T4UDhJ4GLGOAmGUa"></a></p></div>;
      default: return "📋";
    }
  };

  const getTranslatedLevelLabel = (label: string) => {
    if (language === 'zh') {
      if (label === 'Low Risk') return '低风险';
      if (label === 'Moderate Risk') return '中风险';
      if (label === 'High Risk') return '高风险';
    }
    return label;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Navigation */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="group hover:bg-white mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {t("report.back")}
        </Button>

        {/* Hero Section */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className={cn(
              "p-8 text-center space-y-4",
              result.level.key === 'high' ? "bg-red-50" :
                result.level.key === 'moderate' ? "bg-orange-50" : "bg-emerald-50"
            )}>
              <div className="text-6xl mb-2">{getEmoji(result.level.key)}</div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {t("report.hero.title")}
              </h1>
              <p className="text-slate-500 max-w-md mx-auto">
                {t("report.hero.subtitle")}
              </p>

              <div className="pt-4 flex flex-col items-center gap-4 px-2">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight text-center break-words">
                  您在接下来 {years} 年内，有{result.probability}%的概率发生重大心血管事件
                </div>
                <div className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider border",
                  result.level.color
                )}>
                  {getTranslatedLevelLabel(result.level.label)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Explanation */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center space-x-2 pb-2">
            <Activity className="h-5 w-5 text-indigo-600" />
            <CardTitle className="text-xl">{t("report.sections.explanation.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-700 leading-relaxed">
              {t("report.sections.explanation.meaning", {
                probability: result.probability,
                years: years.toString(),
                region: t(`cardio.region.${data.region.toLowerCase().replace(/[\s\/]/g, '_')}`)
              })}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t("report.sections.explanation.simplifiedNote", {
                years: years.toString(),
                perThousand: result.perThousand
              })}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              {t("report.sections.explanation.annualRisk", {
                annualRisk: result.annualRisk
              })}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t("report.sections.explanation.method")}
            </p>
            <div className="bg-slate-50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-slate-700">
                {t("report.sections.explanation.levelsTitle")}
              </p>
              <p className="text-sm text-slate-600">{t("report.sections.explanation.levelLow")}</p>
              <p className="text-sm text-slate-600">{t("report.sections.explanation.levelModerate")}</p>
              <p className="text-sm text-slate-600">{t("report.sections.explanation.levelHigh")}</p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("report.sections.explanation.disclaimer")}
            </p>
          </CardContent>
        </Card>

        {/* Risk Breakdown */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center space-x-2 pb-2">
            <Stethoscope className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-xl">{t("report.sections.breakdown.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-slate-500">
              {t("report.sections.breakdown.desc", {
                region: t(`cardio.region.${data.region.toLowerCase().replace(/[\s\/]/g, '_')}`)
              })}
            </p>

            <div className="space-y-4">
              <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>{t("report.sections.breakdown.factorHeader")}</span>
                <span>{t("report.sections.breakdown.impact")}</span>
              </div>

              {riskFactors.map((factor) => (
                <div key={factor.key} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{t(`cardio.${factor.key}.label`).split(' (')[0]}</span>
                    <span className="text-slate-500">+{factor.score} pts</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        result.level.key === 'high' ? "bg-red-500" :
                          result.level.key === 'moderate' ? "bg-orange-500" : "bg-emerald-500"
                      )}
                      style={{ width: `${(factor.score / 11) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lifestyle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center space-x-2 pb-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <CardTitle className="text-lg">{t("report.sections.lifestyle.positive")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {habits.positive.length > 0 ? habits.positive.map((h, i) => (
                  <li key={i} className="text-sm flex items-start">
                    <ChevronRight className="h-4 w-4 mr-1 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600">{h}</span>
                  </li>
                )) : (
                  <li className="text-sm text-slate-400 italic">No specific positive habits identified.</li>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm border-l-4 border-l-orange-400">
            <CardHeader className="flex flex-row items-center space-x-2 pb-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <CardTitle className="text-lg">{t("report.sections.lifestyle.negative")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {habits.negative.length > 0 ? habits.negative.map((h, i) => (
                  <li key={i} className="text-sm flex items-start">
                    <ChevronRight className="h-4 w-4 mr-1 text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600">{h}</span>
                  </li>
                )) : (
                  <li className="text-sm text-slate-400 italic">Excellent! No specific risk habits identified.</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Expert Advice */}
        <Card className="border-none shadow-sm bg-blue-600 text-white overflow-hidden relative">
          <div className="absolute right-0 top-0 opacity-10 p-4">
            <Lightbulb size={120} />
          </div>
          <CardHeader className="flex flex-row items-center space-x-2 pb-2 relative z-10">
            <Lightbulb className="h-5 w-5" />
            <CardTitle className="text-xl text-white">{t("report.sections.advice.title")}</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-blue-50 leading-relaxed">
              {t(`report.sections.advice.levels.${result.level.key}`)}
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
            {t("report.back")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardioRiskReport;