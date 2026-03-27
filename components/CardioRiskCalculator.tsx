"use client";

import React, { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Region, calculateCVDRisk, getRiskLevel, NL_IHRS_Data, regionFollowUpYears, getAnnualRisk } from "@/lib/calculations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import CardioRiskReport from "./CardioRiskReport";
import { ChevronRight } from "lucide-react";

const formSchema = z.object({
  region: z.string(),
  ageSex: z.string(),
  whr: z.string(),
  hypertension: z.string(),
  diabetes: z.string(),
  familyHistory: z.string(),
  smoking: z.string(),
  secondhandSmoke: z.string(),
  stress: z.string(),
  depression: z.string(),
  saltyFood: z.string(),
  friedFood: z.string(),
  fruit: z.string(),
  vegetables: z.string(),
  meat: z.string(),
  physicalActivity: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const regionKeyMap: Record<string, string> = {
  "Overall": "overall",
  "China": "china",
  "North America/Europe": "na_eu",
  "South Asia": "sa",
  "Southeast Asia": "sea",
  "Middle East": "me",
  "South America": "sam",
  "Africa": "africa"
};

const CardioRiskCalculator = () => {
  const { t, language } = useLanguage();
  const [view, setView] = useState<'form' | 'report'>('form');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      region: "Overall",
      ageSex: "0",
      whr: "0",
      hypertension: "0",
      diabetes: "0",
      familyHistory: "0",
      smoking: "0",
      secondhandSmoke: "0",
      stress: "0",
      depression: "0",
      saltyFood: "0",
      friedFood: "0",
      fruit: "0",
      vegetables: "0",
      meat: "0",
      physicalActivity: "0",
    },
  });

  const watchAllFields = form.watch();

  const riskResult = useMemo(() => {
    const data: NL_IHRS_Data = {
      ageSex: parseInt(watchAllFields.ageSex),
      whr: parseInt(watchAllFields.whr),
      hypertension: parseInt(watchAllFields.hypertension),
      diabetes: parseInt(watchAllFields.diabetes),
      familyHistory: parseInt(watchAllFields.familyHistory),
      smoking: parseInt(watchAllFields.smoking),
      secondhandSmoke: parseInt(watchAllFields.secondhandSmoke),
      stress: parseInt(watchAllFields.stress),
      depression: parseInt(watchAllFields.depression),
      saltyFood: parseInt(watchAllFields.saltyFood),
      friedFood: parseInt(watchAllFields.friedFood),
      fruit: parseInt(watchAllFields.fruit),
      vegetables: parseInt(watchAllFields.vegetables),
      meat: parseInt(watchAllFields.meat),
      physicalActivity: parseInt(watchAllFields.physicalActivity),
    };

    const probability = calculateCVDRisk(data, watchAllFields.region as Region);
    const annualRisk = getAnnualRisk(probability, watchAllFields.region as Region);
    return {
      probability: probability.toFixed(1),
      annualRisk: annualRisk.toFixed(2),
      perThousand: (probability * 10).toFixed(0),
      level: getRiskLevel(probability, watchAllFields.region as Region),
    };
  }, [watchAllFields]);

  const getTranslatedLevelLabel = (label: string) => {
    if (language === 'zh') {
      if (label === 'Low Risk') return '低风险';
      if (label === 'Moderate Risk') return '中风险';
      if (label === 'High Risk') return '高风险';
    }
    return label;
  };

  const renderField = (name: keyof FormValues, label: string, options: { label: string; value: string }[]) => (
    <div className="space-y-3 p-4 border rounded-lg bg-card/50">
      <Label className="text-base font-semibold">{label}</Label>
      <Controller
        control={form.control}
        name={name}
        render={({ field }) => (
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => field.onChange(option.value)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer",
                  field.value === option.value
                    ? "bg-red-50 text-red-700 border-red-700 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-200"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      />
    </div>
  );

  if (view === 'report') {
    return (
      <CardioRiskReport 
        data={watchAllFields} 
        result={riskResult} 
        years={regionFollowUpYears[watchAllFields.region as Region]}
        onBack={() => setView('form')} 
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("cardio.title")}</CardTitle>
            <CardDescription>
              {t("cardio.desc")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3 p-4 border rounded-lg bg-primary/5">
              <Label className="text-base font-semibold">{t("cardio.region.label")}</Label>
              <Controller
                control={form.control}
                name="region"
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-2"
                  >
                    {[
                      { label: t("cardio.region.overall"), value: "Overall" },
                      { label: t("cardio.region.china"), value: "China" },
                      { label: t("cardio.region.na_eu"), value: "North America/Europe" },
                      { label: t("cardio.region.sa"), value: "South Asia" },
                      { label: t("cardio.region.sea"), value: "Southeast Asia" },
                      { label: t("cardio.region.me"), value: "Middle East" },
                      { label: t("cardio.region.sam"), value: "South America" },
                      { label: t("cardio.region.africa"), value: "Africa" },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`region-${option.value}`} />
                        <Label htmlFor={`region-${option.value}`} className="font-normal cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            {renderField("ageSex", t("cardio.ageSex.label"), [
              { label: t("cardio.ageSex.opt1"), value: "0" },
              { label: t("cardio.ageSex.opt2"), value: "2" },
            ])}

            {renderField("whr", t("cardio.whr.label"), [
              { label: t("cardio.whr.opt1"), value: "0" },
              { label: t("cardio.whr.opt2"), value: "2" },
              { label: t("cardio.whr.opt3"), value: "4" },
            ])}

            {renderField("hypertension", t("cardio.hypertension.label"), [
              { label: t("cardio.hypertension.opt1"), value: "0" },
              { label: t("cardio.hypertension.opt2"), value: "5" },
            ])}

            {renderField("diabetes", t("cardio.diabetes.label"), [
              { label: t("cardio.diabetes.opt1"), value: "0" },
              { label: t("cardio.diabetes.opt2"), value: "6" },
            ])}

            {renderField("familyHistory", t("cardio.familyHistory.label"), [
              { label: t("cardio.familyHistory.opt1"), value: "0" },
              { label: t("cardio.familyHistory.opt2"), value: "4" },
            ])}

            {renderField("smoking", t("cardio.smoking.label"), [
              { label: t("cardio.smoking.opt1"), value: "0" },
              { label: t("cardio.smoking.opt2"), value: "2" },
              { label: t("cardio.smoking.opt3"), value: "4" },
              { label: t("cardio.smoking.opt4"), value: "6" },
              { label: t("cardio.smoking.opt5"), value: "7" },
              { label: t("cardio.smoking.opt6"), value: "11" },
            ])}

            {renderField("secondhandSmoke", t("cardio.secondhandSmoke.label"), [
              { label: t("cardio.secondhandSmoke.opt1"), value: "0" },
              { label: t("cardio.secondhandSmoke.opt2"), value: "2" },
            ])}

            {renderField("stress", t("cardio.stress.label"), [
              { label: t("cardio.stress.opt1"), value: "0" },
              { label: t("cardio.stress.opt2"), value: "3" },
            ])}

            {renderField("depression", t("cardio.depression.label"), [
              { label: t("cardio.depression.opt1"), value: "0" },
              { label: t("cardio.depression.opt2"), value: "3" },
            ])}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField("saltyFood", t("cardio.saltyFood.label"), [
                { label: t("cardio.saltyFood.opt1"), value: "0" },
                { label: t("cardio.saltyFood.opt2"), value: "1" },
              ])}
              {renderField("friedFood", t("cardio.friedFood.label"), [
                { label: t("cardio.friedFood.opt1"), value: "0" },
                { label: t("cardio.friedFood.opt2"), value: "1" },
              ])}
              {renderField("fruit", t("cardio.fruit.label"), [
                { label: t("cardio.fruit.opt1"), value: "0" },
                { label: t("cardio.fruit.opt2"), value: "1" },
              ])}
              {renderField("vegetables", t("cardio.vegetables.label"), [
                { label: t("cardio.vegetables.opt1"), value: "0" },
                { label: t("cardio.vegetables.opt2"), value: "1" },
              ])}
            </div>

            {renderField("meat", t("cardio.meat.label"), [
              { label: t("cardio.meat.opt1"), value: "0" },
              { label: t("cardio.meat.opt2"), value: "2" },
            ])}

            {renderField("physicalActivity", t("cardio.physicalActivity.label"), [
              { label: t("cardio.physicalActivity.opt1"), value: "0" },
              { label: t("cardio.physicalActivity.opt2"), value: "2" },
            ])}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-8 overflow-hidden border-2 transition-all">
          <CardHeader className={cn("text-center pb-2", riskResult.level.color.split(' ')[2])}>
            <CardTitle className="text-lg">{t("cardio.result.title")}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 text-center space-y-4">
            <div className="text-5xl font-bold tracking-tighter">
              {riskResult.probability}%
            </div>
            <div className={cn("inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider border", riskResult.level.color)}>
              {getTranslatedLevelLabel(riskResult.level.label)}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {t("cardio.result.subtitle", { years: regionFollowUpYears[watchAllFields.region as Region].toString() })}
            </p>
            <div className="pt-6 border-t text-xs text-left space-y-2 opacity-70">
              <p>{t("cardio.result.note1")}</p>
              <p>{t("cardio.result.note2", { region: t(`cardio.region.${regionKeyMap[watchAllFields.region] || 'overall'}`) })}</p>
              <p>{t("cardio.result.note3")}</p>
            </div>
            <Button 
              className="w-full mt-4 bg-red-700 text-white hover:bg-red-600 transition-all group"
              onClick={() => setView('report')}
            >
              {t("report.cta")}
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CardioRiskCalculator;
