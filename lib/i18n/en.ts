export const en = {
  hero: {
    tag: "Inspired by AHA and PHRI Research Results",
    title: "1-Minute Cardiovascular Risk Assessment",
    subtitle: "Understand your cardiovascular health in 1 minute. No blood test required for our quick assessment mode.",
    github: "If you find this useful, please star it on GitHub! 🚀",
  },
  tabs: {
    quick: "Quick Test (NL-IHRS)",
    pro: "AHA Pro (PREVENT™)",
  },
  ads: {
    zone: "Ad Zone (Desktop Sidebar / Mobile Below Result)"
  },
  footer: {
    title: "Medical Disclaimer",
    desc: "This tool is for educational and academic demonstration purposes only. It is not a diagnostic tool and does not replace professional medical advice. Always consult a physician for health-related decisions. The results provided are estimates based on statistical models and population averages.",
    copyright: "© 2026 HeartEase Predictor",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    ahaAttribution: "Professional Mode (PREVENT™) is based in part on equations developed by the American Heart Association. PREVENT™ is not a diagnostic tool."
  },
  prevent: {
    title: "AHA PREVENT™ (Pro Mode)",
    desc: "Clinical-grade risk assessment using biomarkers. Requires blood test results (Cholesterol, eGFR, etc.).",
    form: {
      sex: { label: "Biological Sex", male: "Male", female: "Female" },
      age: { label: "Age", unit: "years", error: "Age must be between 30 and 79 years" },
      tc: { label: "Total Cholesterol", unit: "mg/dL", error: "TC must be between 130 and 320 mg/dL" },
      hdl: { label: "HDL Cholesterol", unit: "mg/dL", error: "HDL must be between 20 and 100 mg/dL" },
      sbp: { label: "Systolic Blood Pressure", unit: "mmHg", error: "SBP must be between 90 and 200 mmHg" },
      dm: { label: "Diabetes", no: "No", yes: "Yes" },
      smoking: { label: "Current Smoking", no: "No", yes: "Yes" },
      bmi: { label: "BMI (for HF only)", unit: "kg/m²", error: "BMI must be between 18.5 and 39.9" },
      egfr: { label: "eGFR", unit: "mL/min/1.73m²", error: "eGFR must be greater than 0" },
      bptreat: { label: "Anti-hypertensive Medication", no: "No", yes: "Yes" },
      statin: { label: "Statin Use", no: "No", yes: "Yes" },
      optional: {
        heading: "Optional Indicators",
        subheading: "The following three predictors are optional for further personalization. Select 'Yes' if available.",
      },
      uacr: { label: "UACR", unit: "mg/g", hint: "Indicated for CKD, diabetes, or hypertension", error: "UACR must be ≥ 0" },
      hba1c: { label: "HbA1c", unit: "%", hint: "Indicated for diabetes or prediabetes", error: "HbA1c must be > 0" },
      sdi: { label: "SDI (1-10)", hint: "Social Deprivation Index decile (US zip-code based)", error: "SDI must be 1–10" },
      calculate: "Calculate Risk",
      calculateReport: "Calculate & View Report",
      reset: "Reset",
    },
    result: {
      title: "PREVENT™ Risk Assessment Results",
      tenYear: "10-Year Risk",
      thirtyYear: "30-Year Risk",
      cvd: "Total CVD",
      ascvd: "ASCVD",
      hf: "Heart Failure",
      riskLow: "Low",
      riskBorderline: "Borderline",
      riskModerate: "Moderate",
      riskHigh: "High",
      naAge: "30-year risk is not available for age > 59.",
      naBmi: "HF risk requires a valid BMI (18.5–39.9 kg/m²).",
    },
    report: {
      back: "← Back to Edit Data",
      hero: {
        title: "PREVENT™ Risk Assessment Report",
        subtitle: "AHA PREVENT Personalized Risk Analysis",
        headline: "You have a {{probability}}% probability of a cardiovascular event in the next 10 years",
      },
      explanation: {
        title: "What does this number mean?",
        meaning: "Your result of {{probability}}% indicates that, based on your current risk factor profile, the statistical model estimates a {{probability}}% probability of you experiencing a major cardiovascular event (including cardiovascular death, myocardial infarction, stroke, or heart failure) within the next 10 years.",
        perThousand: "In simpler terms, among 1,000 people with a similar risk profile, approximately {{perThousand}} would experience a major cardiovascular event within 10 years.",
        annualRisk: "Annualized risk is approximately {{annualRisk}}% per year.",
        method: "This report uses the AHA PREVENT™ equations (Khan et al., 2024), a sex-specific cardiovascular risk prediction model calibrated using pooled US cohort data. It incorporates 11 core clinical risk factors plus optional biomarkers (UACR, HbA1c, SDI).",
        levelsTitle: "Risk Level Thresholds (per AHA/ACC Guidelines):",
        levelLow: "🟢 Low (<5%): Below guideline thresholds for treatment intensification.",
        levelBorderline: "🟡 Borderline (5–7.5%): May benefit from discussion with a clinician.",
        levelModerate: "🟠 Moderate (7.5–20%): Statin therapy should be considered.",
        levelHigh: "🔴 High (≥20%): High-intensity intervention recommended.",
        disclaimer: "This report is for educational purposes only and does not constitute a medical diagnosis. Please consult a healthcare professional for clinical decisions.",
      },
      factors: {
        title: "Risk Factor Contribution Analysis",
        desc: "The following shows which clinical factors contribute most to your overall 10-year CVD risk score:",
        age: "Age",
        cholesterol: "Non-HDL Cholesterol",
        hdl: "HDL Cholesterol",
        bloodPressure: "Blood Pressure & Treatment",
        diabetes: "Diabetes",
        smoking: "Smoking",
        kidney: "Kidney Function (eGFR)",
        statin: "Statin Use",
        sdi: "Social Deprivation (SDI)",
        uacr: "Urine Albumin-Creatinine Ratio",
        hba1c: "HbA1c",
      },
      advice: {
        title: "A Friendly Reminder",
        levels: {
          low: "Your assessment result falls in a lower risk range — a positive sign. Keep up your healthy habits and stay mindful of your cardiovascular health.",
          borderline: "Your assessment suggests it may be worthwhile to pay closer attention to your cardiovascular health. Consider speaking with your doctor to learn more about heart-healthy practices.",
          moderate: "Your assessment result indicates that cardiovascular health deserves attention. It may be helpful to discuss your overall health with a medical professional at your convenience.",
          high: "Your assessment result suggests that cardiovascular health warrants serious attention. Consider consulting a healthcare professional for a more comprehensive evaluation when possible.",
        },
      },
    },
  },
  cardio: {
    title: "Health & Lifestyle Questionnaire",
    desc: "Please answer the following questions to estimate your CVD risk. No blood test required.",
    region: {
      label: "Select Your Region",
      overall: "Overall Average",
      china: "China",
      na_eu: "North America / Europe",
      sa: "South Asia",
      sea: "Southeast Asia",
      me: "Middle East",
      sam: "South America",
      africa: "Africa"
    },
    ageSex: {
      label: "Age & Gender",
      opt1: "Male < 55 / Female < 65",
      opt2: "Male ≥ 55 / Female ≥ 65"
    },
    whr: {
      label: "Waist-to-Hip Ratio (WHR) - How to measure: Waist circumference (narrowest part above navel) divided by Hip circumference (widest part of buttocks)",
      opt1: "< 0.873",
      opt2: "0.873 - 0.963",
      opt3: "≥ 0.964"
    },
    hypertension: {
      label: "Known Hypertension (High Blood Pressure)",
      opt1: "No / Unsure",
      opt2: "Yes (Diagnosed or BP ≥ 140/90 mmHg)"
    },
    diabetes: {
      label: "Known Diabetes",
      opt1: "No / Unsure",
      opt2: "Yes (Diagnosed, Fasting Glucose > 7 mmol/L, or on medication)"
    },
    familyHistory: {
      label: "Family History",
      opt1: "No / Unsure",
      opt2: "Yes (Biological parent had a heart attack/CAD)"
    },
    smoking: {
      label: "Smoking Status",
      opt1: "Never / Quit > 12 months",
      opt2: "Currently 1-5 cigarettes/day",
      opt3: "6-10 cigarettes/day",
      opt4: "11-15 cigarettes/day",
      opt5: "16-20 cigarettes/day",
      opt6: "> 20 cigarettes/day"
    },
    secondhandSmoke: {
      label: "Secondhand Smoke Exposure (Inhaling others' smoke in enclosed spaces like home, office, restaurants, or car)",
      opt1: "Minimal (< 10 mins/day or < 1 hr/week)",
      opt2: "Regular (≥ 10 mins/day or ≥ 1 hr/week)" // [cite: 444]
    },
    stress: {
      label: "Psychosocial Stress Level",
      opt1: "None / Occasional stress",
      opt2: "Frequent or persistent (Periods of stress at work or home)"
    },
    depression: {
      label: "Depressive Symptoms",
      opt1: "No",
      opt2: "Yes (Felt sad/depressed for 2+ consecutive weeks in last year)"
    },
    saltyFood: {
      label: "Salty Snacks or Foods",
      opt1: "< 1 serving/day",
      opt2: "≥ 1 serving/day (e.g., small bag of chips, pickles, or processed meat)"
    },
    friedFood: {
      label: "Fried, Fast Food, or Trans-fats",
      opt1: "< 3 servings/week",
      opt2: "≥ 3 servings/week (e.g., fried chicken, fries, or deep-fried snacks)"
    },
    fruit: {
      label: "Fruit Consumption",
      opt1: "≥ 1 serving/day (e.g., one fist-sized fruit, approx. 150g)", // [cite: 450]
      opt2: "< 1 serving/day"
    },
    vegetables: {
      label: "Vegetable Consumption",
      opt1: "≥ 1 serving/day (~1/2 cup cooked or 1 cup raw vegetables, approx. 75-100g)", // [cite: 450]
      opt2: "< 1 serving/day"
    },
    meat: {
      label: "Meat/Poultry Consumption",
      opt1: "< 2 servings/day",
      opt2: "≥ 2 servings/day (Red meat or poultry, ~85g/3 oz per serving, total ≥ 170g/day)" // [cite: 450]
    },
    physicalActivity: {
      label: "Physical Activity (Leisure Time)",
      opt1: "Active (≥ 150 mins moderate or 75 mins vigorous/week)",
      opt2: "Mainly Sedentary / Light Activity"
    },
    result: {
      title: "Your Heart Risk Result",
      subtitle: "Estimated CVD risk for {{years}}-year window based on NL-IHRS validated algorithms.",
      note1: "• Based on Non-Laboratory INTERHEART Risk Score.",
      note2: "• Calculated specifically for the {{region}} region.",
      note3: "• This is a screening tool, not a medical diagnosis."
    }
  },
  report: {
    cta: "View My Heart Health Report",
    back: "Back to Questionnaire",
    save: "Save Report (Image)",
    hero: {
      title: "Cardiovascular Risk Report",
      subtitle: "Personalized health analysis based on NL-IHRS algorithms",
      status: "Assessment Status: {{level}}"
    },
    sections: {
      explanation: {
        title: "What Does This Number Mean?",
        meaning: "Your result of {{probability}}% represents your estimated probability of experiencing a major cardiovascular event — including heart attack, stroke, heart failure, cardiovascular death, or coronary revascularization — over the next {{years}} years, based on the {{region}} population data.",
        simplifiedNote: "In simpler terms, statistically speaking, out of 1,000 people with a similar risk profile, approximately {{perThousand}} would be expected to experience a major cardiovascular event within the next {{years}} years.",
        annualRisk: "This corresponds to an estimated annual risk of approximately {{annualRisk}}% per year.",
        method: "This estimate was calculated using the Non-Laboratory INTERHEART Risk Score (NL-IHRS), a validated tool developed from the INTERHEART study (27,000+ participants across 52 countries) and externally validated in the PURE prospective cohort study (100,000+ participants across 17 countries). The score sums points from 15 risk factors — age, sex, waist-to-hip ratio, blood pressure, diabetes, family history, smoking, secondhand smoke, physical activity, stress, depression, and dietary habits — then converts the total into a probability using a region-specific recalibrated logistic regression model.",
        levelsTitle: "Risk levels (based on annualized risk):",
        levelLow: "🟢 Low risk (< 1%/year): Below population average. Continue maintaining healthy habits.",
        levelModerate: "🟡 Moderate risk (1–2%/year): Elevated risk. Consider consulting a healthcare provider about preventive strategies.",
        levelHigh: "🔴 High risk (> 2%/year): Significantly elevated. Discuss risk reduction strategies with a healthcare professional.",
        disclaimer: "Important: This is a population-level statistical estimate, not a personal diagnosis. It cannot account for all individual factors such as specific medications, lab values, or genetic predispositions. Some dietary predictors showed inconsistent associations across regions in the validation study. This tool is for educational purposes only and should not replace professional medical advice."
      },
      breakdown: {
        title: "Risk Factor Analysis",
        desc: "Your assessment is based on the NL-IHRS algorithm, calibrated for the {{region}} population. Below are the key factors contributing to your score:",
        factorHeader: "Primary Risk Sources",
        impact: "Risk Impact"
      },
      lifestyle: {
        title: "Lifestyle Summary",
        positive: "Healthy Habits to Maintain",
        negative: "Habits to Improve"
      },
      advice: {
        title: "A Friendly Reminder",
        levels: {
          low: "Your assessment result falls in a lower risk range. Keep up your healthy habits and stay mindful of your cardiovascular well-being.",
          moderate: "Your assessment suggests cardiovascular health is worth paying attention to. Consider discussing your lifestyle and health with a doctor when convenient.",
          high: "Your assessment result suggests that cardiovascular health warrants attention. Consider consulting a healthcare professional for a more comprehensive evaluation."
        }
      }
    }
  }
};