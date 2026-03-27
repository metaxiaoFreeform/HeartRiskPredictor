"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { calculatePreventRisk } from "@/lib/prevent";
import { PreventInput, PreventOutput } from "@/lib/prevent/types";
import PreventReport from "@/components/PreventReport";

interface FormValues {
  sex: string;
  age: string;
  tc: string;
  hdl: string;
  sbp: string;
  dm: string;
  smoking: string;
  bmi: string;
  egfr: string;
  bptreat: string;
  statin: string;
  hasUacr: string;
  uacr: string;
  hasHba1c: string;
  hba1c: string;
  hasSdi: string;
  sdi: string;
}

const defaultValues: FormValues = {
  sex: "0", age: "", tc: "", hdl: "", sbp: "",
  dm: "0", smoking: "0", bmi: "", egfr: "",
  bptreat: "0", statin: "0",
  hasUacr: "no", uacr: "",
  hasHba1c: "no", hba1c: "",
  hasSdi: "no", sdi: "",
};

function InputField({ label, unit, error, required, children }: {
  label: string; unit?: string; error?: string; required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
        {unit && <span className="text-xs font-normal text-slate-400 ml-1">({unit})</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

const PreventCalculator = () => {
  const { t } = useLanguage();
  const [result, setResult] = useState<PreventOutput | null>(null);
  const [formData, setFormData] = useState<PreventInput | null>(null);
  const [showReport, setShowReport] = useState(false);
  const { register, handleSubmit, watch, reset, formState: { errors }, setValue } = useForm<FormValues>({
    defaultValues,
  });

  const watchSex = watch("sex");
  const watchDm = watch("dm");
  const watchSmoking = watch("smoking");
  const watchBptreat = watch("bptreat");
  const watchStatin = watch("statin");
  const watchHasUacr = watch("hasUacr");
  const watchHasHba1c = watch("hasHba1c");
  const watchHasSdi = watch("hasSdi");

  const onSubmit = (data: FormValues) => {
    const input: PreventInput = {
      sex: Number(data.sex) as 0 | 1,
      age: Number(data.age),
      tc: Number(data.tc),
      hdl: Number(data.hdl),
      sbp: Number(data.sbp),
      dm: Number(data.dm) as 0 | 1,
      smoking: Number(data.smoking) as 0 | 1,
      bmi: data.bmi ? Number(data.bmi) : undefined,
      egfr: Number(data.egfr),
      bptreat: Number(data.bptreat) as 0 | 1,
      statin: Number(data.statin) as 0 | 1,
      uacr: data.hasUacr === "yes" && data.uacr ? Number(data.uacr) : undefined,
      hba1c: data.hasHba1c === "yes" && data.hba1c ? Number(data.hba1c) : undefined,
      sdi: data.hasSdi === "yes" && data.sdi ? Number(data.sdi) : undefined,
    };
    const output = calculatePreventRisk(input);
    setResult(output);
    setFormData(input);
    setShowReport(true);
  };

  const handleReset = () => {
    reset(defaultValues);
    setResult(null);
    setFormData(null);
    setShowReport(false);
  };

  const inputClass = "w-full px-3 py-2 rounded-lg border border-slate-200 bg-blue-50/40 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition placeholder:text-slate-400";

  // Report mode: full-page report replaces the form
  if (showReport && result && formData) {
    return <PreventReport input={formData} result={result} onBack={() => setShowReport(false)} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("prevent.title")}</CardTitle>
        <CardDescription>{t("prevent.desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* ── Required Fields ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Sex */}
            <InputField label={t("prevent.form.sex.label")} required>
              <div className="flex flex-wrap gap-2 mt-1">
                <button type="button" onClick={() => setValue("sex", "0")}
                  className={cn("px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200",
                    watchSex === "0" ? "bg-red-50 text-red-700 border-red-700 shadow-sm" : "bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-200")}>
                  {t("prevent.form.sex.male")}
                </button>
                <button type="button" onClick={() => setValue("sex", "1")}
                  className={cn("px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200",
                    watchSex === "1" ? "bg-red-50 text-red-700 border-red-700 shadow-sm" : "bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-200")}>
                  {t("prevent.form.sex.female")}
                </button>
              </div>
            </InputField>

            {/* Age */}
            <InputField label={t("prevent.form.age.label")} unit={t("prevent.form.age.unit")} required
              error={errors.age?.message}>
              <input type="number" className={inputClass} placeholder="30–79"
                {...register("age", {
                  required: "Required",
                  min: { value: 30, message: t("prevent.form.age.error") },
                  max: { value: 79, message: t("prevent.form.age.error") },
                })} />
            </InputField>

            {/* SBP */}
            <InputField label={t("prevent.form.sbp.label")} unit={t("prevent.form.sbp.unit")} required
              error={errors.sbp?.message}>
              <input type="number" className={inputClass} placeholder="90–200"
                {...register("sbp", {
                  required: "Required",
                  min: { value: 90, message: t("prevent.form.sbp.error") },
                  max: { value: 200, message: t("prevent.form.sbp.error") },
                })} />
            </InputField>

            {/* TC */}
            <InputField label={t("prevent.form.tc.label")} unit={t("prevent.form.tc.unit")} required
              error={errors.tc?.message}>
              <input type="number" className={inputClass} placeholder="130–320"
                {...register("tc", {
                  required: "Required",
                  min: { value: 130, message: t("prevent.form.tc.error") },
                  max: { value: 320, message: t("prevent.form.tc.error") },
                })} />
            </InputField>

            {/* HDL */}
            <InputField label={t("prevent.form.hdl.label")} unit={t("prevent.form.hdl.unit")} required
              error={errors.hdl?.message}>
              <input type="number" className={inputClass} placeholder="20–100"
                {...register("hdl", {
                  required: "Required",
                  min: { value: 20, message: t("prevent.form.hdl.error") },
                  max: { value: 100, message: t("prevent.form.hdl.error") },
                })} />
            </InputField>

            {/* eGFR */}
            <InputField label={t("prevent.form.egfr.label")} unit={t("prevent.form.egfr.unit")} required
              error={errors.egfr?.message}>
              <input type="number" step="0.1" className={inputClass} placeholder="> 0"
                {...register("egfr", {
                  required: "Required",
                  min: { value: 0.1, message: t("prevent.form.egfr.error") },
                })} />
            </InputField>

            {/* BMI */}
            <InputField label={t("prevent.form.bmi.label")} unit={t("prevent.form.bmi.unit")}
              error={errors.bmi?.message}>
              <input type="number" step="0.1" className={inputClass} placeholder="18.5–39.9"
                {...register("bmi", {
                  min: { value: 18.5, message: t("prevent.form.bmi.error") },
                  max: { value: 39.9, message: t("prevent.form.bmi.error") },
                })} />
            </InputField>

            {/* Diabetes */}
            <InputField label={t("prevent.form.dm.label")} required>
              <div className="flex flex-wrap gap-2 mt-1">
                <button type="button" onClick={() => setValue("dm", "0")}
                  className={cn("px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200",
                    watchDm === "0" ? "bg-red-50 text-red-700 border-red-700 shadow-sm" : "bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-200")}>
                  {t("prevent.form.dm.no")}
                </button>
                <button type="button" onClick={() => setValue("dm", "1")}
                  className={cn("px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200",
                    watchDm === "1" ? "bg-red-50 text-red-700 border-red-700 shadow-sm" : "bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-200")}>
                  {t("prevent.form.dm.yes")}
                </button>
              </div>
            </InputField>

            {/* Smoking */}
            <InputField label={t("prevent.form.smoking.label")} required>
              <div className="flex flex-wrap gap-2 mt-1">
                <button type="button" onClick={() => setValue("smoking", "0")}
                  className={cn("px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200",
                    watchSmoking === "0" ? "bg-red-50 text-red-700 border-red-700 shadow-sm" : "bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-200")}>
                  {t("prevent.form.smoking.no")}
                </button>
                <button type="button" onClick={() => setValue("smoking", "1")}
                  className={cn("px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200",
                    watchSmoking === "1" ? "bg-red-50 text-red-700 border-red-700 shadow-sm" : "bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-200")}>
                  {t("prevent.form.smoking.yes")}
                </button>
              </div>
            </InputField>

            {/* BP Treatment */}
            <InputField label={t("prevent.form.bptreat.label")} required>
              <div className="flex flex-wrap gap-2 mt-1">
                <button type="button" onClick={() => setValue("bptreat", "0")}
                  className={cn("px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200",
                    watchBptreat === "0" ? "bg-red-50 text-red-700 border-red-700 shadow-sm" : "bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-200")}>
                  {t("prevent.form.bptreat.no")}
                </button>
                <button type="button" onClick={() => setValue("bptreat", "1")}
                  className={cn("px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200",
                    watchBptreat === "1" ? "bg-red-50 text-red-700 border-red-700 shadow-sm" : "bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-200")}>
                  {t("prevent.form.bptreat.yes")}
                </button>
              </div>
            </InputField>

            {/* Statin */}
            <InputField label={t("prevent.form.statin.label")} required>
              <div className="flex flex-wrap gap-2 mt-1">
                <button type="button" onClick={() => setValue("statin", "0")}
                  className={cn("px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200",
                    watchStatin === "0" ? "bg-red-50 text-red-700 border-red-700 shadow-sm" : "bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-200")}>
                  {t("prevent.form.statin.no")}
                </button>
                <button type="button" onClick={() => setValue("statin", "1")}
                  className={cn("px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200",
                    watchStatin === "1" ? "bg-red-50 text-red-700 border-red-700 shadow-sm" : "bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-200")}>
                  {t("prevent.form.statin.yes")}
                </button>
              </div>
            </InputField>
          </div>

          {/* ── Optional Section ── */}
          <div className="border-t pt-6">
            <p className="text-sm font-semibold text-slate-700 mb-1">{t("prevent.form.optional.heading")}</p>
            <p className="text-xs text-slate-500 mb-4">{t("prevent.form.optional.subheading")}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* UACR */}
              <div className="space-y-2 p-4 rounded-xl border bg-slate-50/50">
                <Label className="text-sm font-semibold">{t("prevent.form.uacr.label")}</Label>
                <p className="text-xs text-slate-500">{t("prevent.form.uacr.hint")}</p>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setValue("hasUacr", "no")}
                    className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200",
                      watchHasUacr === "no" ? "bg-red-50 text-red-700 border-red-700 shadow-sm" : "bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-200")}>
                    No
                  </button>
                  <button type="button" onClick={() => setValue("hasUacr", "yes")}
                    className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200",
                      watchHasUacr === "yes" ? "bg-red-50 text-red-700 border-red-700 shadow-sm" : "bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-200")}>
                    Yes
                  </button>
                </div>
                {watchHasUacr === "yes" && (
                  <input type="number" step="0.1" className={inputClass} placeholder="≥ 0 mg/g"
                    {...register("uacr", { min: { value: 0, message: t("prevent.form.uacr.error") } })} />
                )}
              </div>

              {/* HbA1c */}
              <div className="space-y-2 p-4 rounded-xl border bg-slate-50/50">
                <Label className="text-sm font-semibold">{t("prevent.form.hba1c.label")}</Label>
                <p className="text-xs text-slate-500">{t("prevent.form.hba1c.hint")}</p>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setValue("hasHba1c", "no")}
                    className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200",
                      watchHasHba1c === "no" ? "bg-red-50 text-red-700 border-red-700 shadow-sm" : "bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-200")}>
                    No
                  </button>
                  <button type="button" onClick={() => setValue("hasHba1c", "yes")}
                    className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200",
                      watchHasHba1c === "yes" ? "bg-red-50 text-red-700 border-red-700 shadow-sm" : "bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-200")}>
                    Yes
                  </button>
                </div>
                {watchHasHba1c === "yes" && (
                  <input type="number" step="0.1" className={inputClass} placeholder="> 0%"
                    {...register("hba1c", { min: { value: 0.1, message: t("prevent.form.hba1c.error") } })} />
                )}
              </div>

              {/* SDI */}
              <div className="space-y-2 p-4 rounded-xl border bg-slate-50/50">
                <Label className="text-sm font-semibold">{t("prevent.form.sdi.label")}</Label>
                <p className="text-xs text-slate-500">{t("prevent.form.sdi.hint")}</p>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setValue("hasSdi", "no")}
                    className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200",
                      watchHasSdi === "no" ? "bg-red-50 text-red-700 border-red-700 shadow-sm" : "bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-200")}>
                    No
                  </button>
                  <button type="button" onClick={() => setValue("hasSdi", "yes")}
                    className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200",
                      watchHasSdi === "yes" ? "bg-red-50 text-red-700 border-red-700 shadow-sm" : "bg-white text-slate-700 border-slate-200 hover:bg-red-50 hover:border-red-200")}>
                    Yes
                  </button>
                </div>
                {watchHasSdi === "yes" && (
                  <input type="number" className={inputClass} placeholder="1–10"
                    {...register("sdi", {
                      min: { value: 1, message: t("prevent.form.sdi.error") },
                      max: { value: 10, message: t("prevent.form.sdi.error") },
                    })} />
                )}
              </div>
            </div>
          </div>

          {/* ── Buttons ── */}
          <div className="flex gap-3 justify-center pt-2">
            <Button type="submit" className="px-8 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-full shadow-md">
              {t("prevent.form.calculateReport")}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}
              className="px-8 py-2.5 rounded-full font-bold border-red-200 text-red-700 hover:bg-red-50">
              {t("prevent.form.reset")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PreventCalculator;
