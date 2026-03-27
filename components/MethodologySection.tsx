"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/* ───────────────────────────────────────────────
   Methodology / "How is my result calculated?"
   Drop this component into any page layout.
   ─────────────────────────────────────────────── */

const defined = {
  en: {
    heading: "How is your result calculated?",
    subheading:
      "Both calculators on this site reproduce peer-reviewed, externally-validated risk equations — not simplified approximations. Below we explain exactly which formulas are used, where they come from, and why you can trust the output.",

    /* ── Section 1: NL-IHRS ── */
    s1_title: "Quick Test — Non-Laboratory INTERHEART Risk Score (NL-IHRS)",
    s1_body_1:
      `This calculator is a faithful replication of the Non-Laboratory INTERHEART Risk Score (NL-IHRS), given website developer's technical ability, as externally validated in the PURE (Prospective Urban Rural Epidemiology) study — a community-based prospective cohort of over 140 000 participants across 17 countries and 7 geographic regions.`,
    s1_body_2:
      `The underlying research was led by Dr Philip Joseph (first author, Population Health Research Institute, McMaster University, Hamilton, Canada — a cardiologist and clinical trialist whose work focuses on global cardiovascular epidemiology) and Professor Salim Yusuf (senior / corresponding author, McMaster University — one of the most cited cardiovascular researchers in the world, principal investigator of the landmark INTERHEART, PURE, and HOPE trials, and a recipient of the Order of Canada). The validation cohort spans high-, middle-, and low-income countries, making the score uniquely suited for diverse populations.`,
    s1_body_3: `Our implementation faithfully reproduces the Prognostic Index (PI) for a given set of risk-factor point totals using the original INTERHEART regression coefficients published in the paper:`,

    s1_eq1_label: "Equation [3] — Estimated Prognostic Index from total points:",
    s1_eq1: `estimated PI = −1.45 + 0.2875 × (NL-IHRS total points / 2)`,

    s1_body_4: `Region-specific recalibration is then applied using the intercept (α̂) and slope (β̂) measured in each PURE region (Table 2 of the paper), producing the final predicted probability:`,

    s1_eq2_label: "Equation [4] — Recalibrated CVD risk:",
    s1_eq2: `p̂ = 1 / { 1 + exp[ −( α̂ + β̂ × estimated PI ) ] }`,

    s1_body_5: `Following recalibration, the score achieved a C-statistic of 0.72 (95 % CI 0.71–0.73) in the overall PURE population — moderate-to-good discrimination across all seven regions — and was only marginally outperformed by the laboratory-based FC-IHRS (C-statistic 0.74 vs 0.73, p < 0.001).`,

    s1_ref:
      "Joseph P, Yusuf S, Lee SF, et al. Prognostic validation of a non-laboratory and a laboratory based cardiovascular disease risk score in multiple regions of the world. Heart 2018;104:581–587. doi:10.1136/heartjnl-2017-311609.",

    /* ── Section 2: PREVENT ── */
    s2_title: "Professional Test — AHA PREVENT™ Equations",
    s2_body_1:
      `This calculator is based on/faithfully reproduces(100% replication not garuanteed), given website developer's technical ability, the American Heart Association's Predicting Risk of cardiovascular disease EVENTs (PREVENT™) equations, which estimate 10-year and 30-year absolute risk for total CVD, atherosclerotic CVD (ASCVD), and heart failure (HF) among adults aged 30–79 years.`,
    s2_body_2:
      `The PREVENT™ equations were developed by select members of the American Heart Association Cardiovascular-Kidney-Metabolic Scientific Advisory Group. The risk equations were derived and validated in a large, diverse sample of over 6 million individuals. Our implementation reproduces the published coefficients and model structure, including the base model and optional enhanced models incorporating UACR (urine albumin-to-creatinine ratio), HbA1c, and SDI (Social Deprivation Index).`,
    s2_body_3:
      `The 2025 AHA/ACC High Blood Pressure Guideline recommends the PREVENT-CVD equations to inform management decisions for Stage 1 hypertension (10-year CVD risk ≥ 7.5 % threshold), and the 2026 ACC/AHA Dyslipidemia Guideline recommends the PREVENT-ASCVD equations to guide lipid-lowering therapy, categorizing risk as low (< 3 %), borderline (3–< 5 %), intermediate (5–< 10 %), or high (≥ 10 %).`,
    s2_body_4:
      `The information derived from the use of PREVENT™ is based on PREVENT™ 1.0.0. Updates and future adaptations of PREVENT™ may yield different results and conclusions.`,
    s2_ref1:
      "Khan SS, Matsushita K, Sang Y, et al. Development and Validation of the American Heart Association Predicting Risk of Cardiovascular Disease EVENTs (PREVENT™) Equations. Circulation 2023. DOI: 10.1161/CIRCULATIONAHA.123.067626.",
    s2_ref2:
      "Khan SS, Coresh J, Pencina MJ, et al. Novel Prediction Equations for Absolute Risk Assessment of Total Cardiovascular Disease Incorporating Cardiovascular-Kidney-Metabolic Health: A Scientific Statement From the American Heart Association. Circulation 2023;148(24):1982-2004. DOI: 10.1161/CIR.0000000000001191.",

    /* ── Common ── */
    references: "References",
    disclaimer:
      "This tool is intended to support clinician–patient discussions. It is not a diagnostic instrument and should not be used to make independent treatment decisions. Patients should discuss their risk information with their clinician.",
  },

  zh: {
    heading: "结果是怎么计算出来的？",
    subheading:
      "本站的两个计算器均是基于/忠实复现(在开发者的技术能力下）了经同行评审、外部验证的风险方程——而非简化近似。以下详细说明所用公式的来源与原理，以及结果为何可信。",

    s1_title: "快速测试 — 非实验室 INTERHEART 风险评分（NL-IHRS）",
    s1_body_1:
      `本计算器是基于/忠实复现(在开发者的技术能力下）了在 PURE（前瞻性城乡流行病学）研究中经外部验证的非实验室 INTERHEART 风险评分（NL-IHRS）。PURE 是一项覆盖 17 个国家、7 大地理区域、超过 14 万名参与者的社区前瞻性队列研究。`,
    s1_body_2:
      `该研究由 Philip Joseph 博士（第一作者，加拿大麦克马斯特大学人口健康研究所，心脏病学家与临床试验专家，研究方向为全球心血管流行病学）和 Salim Yusuf 教授（通讯 / 资深作者，麦克马斯特大学——全球引用量最高的心血管研究者之一，INTERHEART、PURE、HOPE 等里程碑试验的首席研究员，加拿大勋章获得者）领衔。验证队列横跨高、中、低收入国家，使该评分尤其适用于多样化人群。`,
    s1_body_3: `我们的实现使用论文中发表的原始 INTERHEART 回归系数，根据给定的风险因素总积分计算预后指数（PI）：`,

    s1_eq1_label: "公式 [3] — 由总积分估算预后指数：",
    s1_eq1: `estimated PI = −1.45 + 0.2875 × (NL-IHRS 总积分 / 2)`,

    s1_body_4: `随后使用论文表 2 中各 PURE 地区测定的截距（α̂）与斜率（β̂）进行区域特异性再校准，得到最终预测概率：`,

    s1_eq2_label: "公式 [4] — 再校准后的 CVD 风险：",
    s1_eq2: `p̂ = 1 / { 1 + exp[ −( α̂ + β̂ × estimated PI ) ] }`,

    s1_body_5: `经再校准后，该评分在 PURE 总体人群中的 C-statistic 为 0.72（95% CI 0.71–0.73），在全部七个区域均达到中等至良好的区分能力，仅略低于需要实验室指标的 FC-IHRS（C-statistic 0.74 vs 0.73，p < 0.001）。`,

    s1_ref:
      "Joseph P, Yusuf S, Lee SF, et al. Prognostic validation of a non-laboratory and a laboratory based cardiovascular disease risk score in multiple regions of the world. Heart 2018;104:581–587. doi:10.1136/heartjnl-2017-311609.",

    s2_title: "专业测试 — AHA PREVENT™ 方程",
    s2_body_1:
      `本计算器是基于/忠实复现(在开发者的技术能力下）美国心脏协会的心血管疾病风险预测方程（PREVENT™），可估算 30–79 岁成人总 CVD、动脉粥样硬化性 CVD（ASCVD）及心力衰竭（HF）的 10 年和 30 年绝对风险。`,
    s2_body_2:
      `PREVENT™ 方程由美国心脏协会心血管-肾脏-代谢科学顾问组的部分成员开发，风险方程在超过 600 万人的大规模多样化样本中推导与验证。我们的实现完整复现了已发表的系数与模型结构，包括基础模型以及可选的 UACR（尿白蛋白/肌酐比值）、HbA1c、SDI（社会剥夺指数）增强模型。`,
    s2_body_3:
      `2025 AHA/ACC 高血压指南推荐使用 PREVENT-CVD 方程为 1 期高血压的管理决策提供信息（10 年 CVD 风险 ≥ 7.5% 为启动治疗阈值）；2026 ACC/AHA 血脂异常指南推荐使用 PREVENT-ASCVD 方程指导降脂治疗，将风险分为低（< 3%）、临界（3–< 5%）、中等（5–< 10%）和高（≥ 10%）四级。`,
    s2_body_4:
      `本工具提供的信息基于 PREVENT™ 1.0.0 版本。PREVENT™ 的更新和未来修订可能产生不同的结果和结论。`,
    s2_ref1:
      "Khan SS, Matsushita K, Sang Y, et al. Development and Validation of the American Heart Association Predicting Risk of Cardiovascular Disease EVENTs (PREVENT™) Equations. Circulation 2023. DOI: 10.1161/CIRCULATIONAHA.123.067626.",
    s2_ref2:
      "Khan SS, Coresh J, Pencina MJ, et al. Novel Prediction Equations for Absolute Risk Assessment of Total Cardiovascular Disease Incorporating Cardiovascular-Kidney-Metabolic Health: A Scientific Statement From the American Heart Association. Circulation 2023;148(24):1982-2004. DOI: 10.1161/CIR.0000000000001191.",

    references: "参考文献",
    disclaimer:
      "本工具旨在辅助医患沟通，不是诊断工具，不应用于独立做出治疗决策。患者应与临床医生讨论其风险信息。",
  },
};

export default function MethodologySection() {
  const { language } = useLanguage();
  const d = language === "zh" ? defined.zh : defined.en;
  const [open, setOpen] = useState<"ihrs" | "prevent" | null>(null);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16 font-[system-ui]">
      {/* ── Heading ── */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
          {d.heading}
        </h2>
        <p className="text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
          {d.subheading}
        </p>
      </div>

      <div className="space-y-6">
        {/* ══════════════════════════════════════════
           Section 1 – NL-IHRS
           ══════════════════════════════════════════ */}
        <article
          className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all"
        >
          <button
            onClick={() => setOpen(open === "ihrs" ? null : "ihrs")}
            className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-bold">
                1
              </span>
              <span className="text-lg font-bold text-slate-800">{d.s1_title}</span>
            </div>
            <svg
              className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${open === "ihrs" ? "rotate-180" : ""
                }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${open === "ihrs" ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <div className="px-6 pb-8 space-y-5 text-sm leading-relaxed text-slate-700">
              <p>{d.s1_body_1}</p>
              <p>{d.s1_body_2}</p>
              <p>{d.s1_body_3}</p>

              {/* Equation 3 */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 px-5 py-4 space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {d.s1_eq1_label}
                </p>
                <p className="font-mono text-sm sm:text-base text-slate-800 break-all">
                  {d.s1_eq1}
                </p>
              </div>

              <p>{d.s1_body_4}</p>

              {/* Equation 4 */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 px-5 py-4 space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {d.s1_eq2_label}
                </p>
                <p className="font-mono text-sm sm:text-base text-slate-800 break-all">
                  {d.s1_eq2}
                </p>
              </div>

              <p>{d.s1_body_5}</p>

              {/* Reference */}
              <div className="border-t border-slate-200 pt-4 mt-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  {d.references}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">{d.s1_ref}</p>
              </div>
            </div>
          </div>
        </article>

        {/* ══════════════════════════════════════════
           Section 2 – PREVENT
           ══════════════════════════════════════════ */}
        <article
          className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all"
        >
          <button
            onClick={() => setOpen(open === "prevent" ? null : "prevent")}
            className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-red-100 text-red-700 flex items-center justify-center text-lg font-bold">
                2
              </span>
              <span className="text-lg font-bold text-slate-800">{d.s2_title}</span>
            </div>
            <svg
              className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${open === "prevent" ? "rotate-180" : ""
                }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${open === "prevent" ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <div className="px-6 pb-8 space-y-5 text-sm leading-relaxed text-slate-700">
              <p>{d.s2_body_1}</p>
              <p>{d.s2_body_2}</p>
              <p>{d.s2_body_3}</p>

              {/* Version notice (required by license) */}
              <div className="rounded-xl bg-amber-50 border border-amber-200 px-5 py-4">
                <p className="text-sm text-amber-800">{d.s2_body_4}</p>
              </div>

              {/* References (required by license) */}
              <div className="border-t border-slate-200 pt-4 mt-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  {d.references}
                </p>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-500 leading-relaxed">
                  <li>{d.s2_ref1}</li>
                  <li>{d.s2_ref2}</li>
                </ol>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* ── Disclaimer ── */}
      <div className="mt-10 rounded-xl bg-slate-100 border border-slate-200 px-6 py-4">
        <p className="text-xs text-slate-500 leading-relaxed">{d.disclaimer}</p>
      </div>
    </section>
  );
}
