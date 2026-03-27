export const zh = {
  hero: {
    tag: "基于 AHA PREVENT™ 和 PHRI 的研究成果",
    title: "一分钟心血管疾病风险评估",
    subtitle: "一分钟内了解您的心血管健康状况。快速评估模式无需任何血液检测报告。",
    github: "如果这个工具对您有帮助，请在 GitHub 上给我们点亮星星！🚀",
  },
  tabs: {
    quick: "快速测试 (NL-IHRS)",
    pro: "专业版 (PREVENT™)",
  },
  ads: {
    zone: "广告展示区 (桌面端侧边栏 / 移动端结果下方)"
  },
  footer: {
    title: "医疗免责声明",
    desc: "本工具仅供教育和学术展示使用，不能替代专业的医疗诊断与建议。如有任何健康问题，请务必咨询专业医生。提供的风险估算结果基于统计模型和人群平均水平得出。",
    copyright: "© 2026 HeartEase Predictor",
    privacy: "隐私政策",
    terms: "使用条款",
    ahaAttribution: "专业模式 (PREVENT™) 部分基于美国心脏协会开发的风险方程。PREVENT™ 不是诊断工具。"
  },
  prevent: {
    title: "AHA PREVENT™ (专业模式)",
    desc: "采用生物标记的临床级风险评估。需要提供近期的血液检测报告（如胆固醇、eGFR 等）。",
    form: {
      sex: { label: "生理性别", male: "男", female: "女" },
      age: { label: "年龄", unit: "岁", error: "年龄必须在 30–79 岁之间" },
      tc: { label: "总胆固醇", unit: "mg/dL", error: "总胆固醇必须在 130–320 mg/dL 之间" },
      hdl: { label: "高密度脂蛋白胆固醇 (HDL)", unit: "mg/dL", error: "HDL 必须在 20–100 mg/dL 之间" },
      sbp: { label: "血压（收缩压）", unit: "mmHg", error: "血压（收缩压）必须在 90–200 mmHg 之间" },
      dm: { label: "糖尿病史", no: "否", yes: "是" },
      smoking: { label: "当前吸烟", no: "否", yes: "是" },
      bmi: { label: "BMI（仅用于心衰评估）", unit: "kg/m²", error: "BMI 必须在 18.5–39.9 之间" },
      egfr: { label: "肾小球滤过率 (eGFR)", unit: "mL/min/1.73m²", error: "eGFR 必须大于 0" },
      bptreat: { label: "降压药物治疗", no: "否", yes: "是" },
      statin: { label: "他汀类药物", no: "否", yes: "是" },
      optional: {
        heading: "可选指标",
        subheading: "以下三项指标为可选项，当临床有指征或数据可获得时，可进一步个性化风险评估。",
      },
      uacr: { label: "尿白蛋白肌酐比 (UACR)", unit: "mg/g", hint: "适用于慢性肾病、糖尿病或高血压患者", error: "UACR 必须 ≥ 0" },
      hba1c: { label: "糖化血红蛋白 (HbA1c)", unit: "%", hint: "适用于糖尿病或前期糖尿病患者", error: "HbA1c 必须 > 0" },
      sdi: { label: "社会剥夺指数 (SDI, 1-10)", hint: "基于美国邮政编码的社会剥夺指数分位数", error: "SDI 必须为 1–10 的整数" },
      calculate: "计算风险",
      calculateReport: "计算并获取报告",
      reset: "重置",
    },
    result: {
      title: "PREVENT™ 风险评估结果",
      tenYear: "10 年风险",
      thirtyYear: "30 年风险",
      cvd: "总体心血管疾病 (CVD)",
      ascvd: "动脉粥样硬化性心血管疾病 (ASCVD)",
      hf: "心力衰竭 (HF)",
      riskLow: "低风险",
      riskBorderline: "临界风险",
      riskModerate: "中等风险",
      riskHigh: "高风险",
      naAge: "30 年风险不适用于年龄 > 59 岁的人群。",
      naBmi: "心衰风险评估需要有效的 BMI（18.5–39.9 kg/m²）。",
    },
    report: {
      back: "← 返回修改数据",
      hero: {
        title: "PREVENT™ 风险评估报告",
        subtitle: "AHA PREVENT 个性化风险分析",
        headline: "您在未来 10 年内，有 {{probability}}% 的概率发生心血管事件",
      },
      explanation: {
        title: "这个数字意味着什么？",
        meaning: "您的结果 {{probability}}% 代表基于您当前的风险因素组合，统计模型估算您在未来 10 年内发生重大心血管事件（包括心血管相关死亡、心肌梗死、脑卒中或心力衰竭）的概率为 {{probability}}%。",
        perThousand: "通俗地说，在统计意义上，与您风险特征相似的人群中，每 1000 人在未来 10 年内预计约有 {{perThousand}} 人发生重大心血管事件。",
        annualRisk: "折算为年化风险约为每年 {{annualRisk}}%。",
        method: "本报告使用 AHA PREVENT™ 方程（Khan et al., 2024），这是一套基于性别差异的心血管风险预测模型，使用美国汇总队列数据校准。纳入 11 项核心临床风险因素及可选生物标记物（UACR、HbA1c、SDI）。",
        levelsTitle: "风险等级（基于 AHA/ACC 指南）：",
        levelLow: "🟢 低风险（< 5%）：低于指南建议的治疗强化阈值。",
        levelBorderline: "🟡 临界风险（5–7.5%）：建议与临床医生讨论个性化方案。",
        levelModerate: "🟠 中等风险（7.5–20%）：应考虑他汀类药物治疗。",
        levelHigh: "🔴 高风险（≥ 20%）：建议启动高强度干预治疗。",
        disclaimer: "本报告仅供教育和参考用途，不构成医学诊断。请咨询医疗专业人员做出临床决策。",
      },
      factors: {
        title: "风险因子贡献分析",
        desc: "以下展示了哪些临床因素对您的 10 年 CVD 风险评分贡献最大：",
        age: "年龄",
        cholesterol: "非高密度脂蛋白胆固醇",
        hdl: "高密度脂蛋白胆固醇 (HDL)",
        bloodPressure: "血压及降压治疗",
        diabetes: "糖尿病",
        smoking: "吸烟",
        kidney: "肾功能 (eGFR)",
        statin: "他汀类药物",
        sdi: "社会剥夺指数 (SDI)",
        uacr: "尿白蛋白肌酐比 (UACR)",
        hba1c: "糖化血红蛋白 (HbA1c)",
      },
      advice: {
        title: "温馨提示",
        levels: {
          low: "您目前的评估结果处于较低风险区间，这是一个积极的信号。继续保持良好的生活习惯，关注自身心血管健康。",
          borderline: "您的评估结果提示可能需要更多关注心血管健康。建议在方便时与您的医生沟通，了解更多关于心血管健康管理的信息。",
          moderate: "您的评估结果提示心血管健康值得重视。建议适时与医疗专业人士沟通，进一步了解自身健康状况。",
          high: "您的评估结果提示心血管健康需要引起重视。建议关注自身健康状况，并在合适的时候咨询专业医生获取进一步的评估和建议。",
        },
      },
    },
  },
  cardio: {
    title: "健康与生活方式问卷",
    desc: "请回答以下问题来评估您的心血管疾病风险。此测试不需要验血结果。",
    region: {
      label: "您的常住地区",
      overall: "全球平均",
      china: "中国",
      na_eu: "北美 / 欧洲",
      sa: "南亚",
      sea: "东南亚",
      me: "中东",
      sam: "南美洲",
      africa: "非洲"
    },
    ageSex: {
      label: "年龄与性别",
      opt1: "男性 < 55岁 / 女性 < 65岁",
      opt2: "男性 ≥ 55岁 / 女性 ≥ 65岁"
    },
    whr: {
      label: "腰臀比 (WHR) - 测量方法：腰围（肚脐上方最细处）除以臀围（臀部最宽处）",
      opt1: "< 0.873",
      opt2: "0.873 - 0.963",
      opt3: "≥ 0.964"
    },
    hypertension: {
      label: "高血压史",
      opt1: "否 / 不确定",
      opt2: "是（指曾被医生诊断或目前血压 ≥ 140/90 mmHg）"
    },
    diabetes: {
      label: "糖尿病史",
      opt1: "否 / 不确定",
      opt2: "是（指曾被诊断、空腹血糖 > 7 mmol/L 或正在服药）"
    },
    familyHistory: {
      label: "家族病史",
      opt1: "否 / 不确定",
      opt2: "是（指亲生父母中至少一人患过心肌梗死或心脏病）"
    },
    smoking: {
      label: "吸烟情况",
      opt1: "从不吸烟 / 已戒烟 > 12个月",
      opt2: "目前每日 1-5 支",
      opt3: "每日 6-10 支",
      opt4: "每日 11-15 支",
      opt5: "每日 16-20 支",
      opt6: "每日 > 20 支"
    },
    secondhandSmoke: {
      label: "二手烟暴露（指在家庭、办公室、餐厅或车内等封闭空间内吸入他人产生的烟雾）",
      opt1: "基本无暴露（平均每天少于 10 分钟）",
      opt2: "有暴露（平均每天超过 10 分钟或每周 ≥ 1 小时）" // [cite: 444]
    },
    stress: {
      label: "心理压力水平",
      opt1: "无压力 / 偶尔感到压力",
      opt2: "经常或持续承受压力（指在工作或生活中感到多个阶段或长期的压力）"
    },
    depression: {
      label: "抑郁症状",
      opt1: "否",
      opt2: "是（指在过去一年中，曾连续两周或以上感到忧郁、悲伤或情绪低落）"
    },
    saltyFood: {
      label: "咸食或高盐零食摄入",
      opt1: "每天少于 1 次",
      opt2: "每天 1 次或更多（如一小袋薯片、一份咸菜、或火腿/腊肉等腌制肉类）"
    },
    friedFood: {
      label: "油炸、快餐或含反式脂肪食品",
      opt1: "每周少于 3 次",
      opt2: "每周 3 次或更多（如炸鸡、薯条、油条或方便面等深炸食品）"
    },
    fruit: {
      label: "水果摄入频率",
      opt1: "每天 1 次或更多（约一个拳头大小，重量约 150 克）", // [cite: 450]
      opt2: "平均每天少于 1 次"
    },
    vegetables: {
      label: "蔬菜摄入频率",
      opt1: "每天 1 次或更多（约半杯熟菜或一杯生菜，重量约 75-100 克）", // [cite: 450]
      opt2: "平均每天少于 1 次"
    },
    meat: {
      label: "肉类和禽畜类摄入",
      opt1: "每天少于 2 次",
      opt2: "每天 2 次或更多（指红肉或禽肉，每次约 85 克/3盎司，每天总计 ≥ 170 克）" // [cite: 450]
    },
    physicalActivity: {
      label: "闲暇时间体力活动",
      opt1: "活跃（每周至少 150 分钟中强度运动，如快走、游泳等）",
      opt2: "久坐为主 / 轻度活动（主要是坐着，或仅进行轻微日常家务）"
    },
    result: {
      title: "您的心血管风险评估结果",
      subtitle: "基于 NL-IHRS 验证算法为您估算的未来 {{years}} 年内 CVD 发病风险。",
      note1: "• 基于无需化验指标的非实验室 INTERHEART 风险评分量表。",
      note2: "• 此结果已专门针对【{{region}}】人群进行统计学校正。",
      note3: "• 本工具是一个初步筛查工具，并非正式医学诊断。"
    }
  },
  report: {
    cta: "查看我的心血管健康报告",
    back: "返回修改数据",
    save: "保存报告 (图片)",
    hero: {
      title: "心血管风险评估报告",
      subtitle: "基于 NL-IHRS 算法的个性化健康分析",
      status: "当前评估状态：{{level}}"
    },
    sections: {
      explanation: {
        title: "这个数字意味着什么？",
        meaning: "您的结果 {{probability}}% 代表基于您当前的风险因素组合，统计模型估算您在未来 {{years}} 年内发生重大心血管事件（包括心肌梗死、脑卒中、心力衰竭、心血管死亡或冠状动脉血运重建术）的概率为 {{probability}}%。此估计基于{{region}}地区的人群数据.",
        simplifiedNote: "通俗地说，在统计意义上，与您风险特征相似的人群中，每1000人在未来 {{years}} 年内预计约有 {{perThousand}} 人发生重大心血管事件。",
        annualRisk: "折算为年化风险约为每年 {{annualRisk}}%。",
        method: "本报告使用非实验室 INTERHEART 风险评分（NL-IHRS），由 INTERHEART 研究（覆盖52个国家、27,000余名参与者）开发，并在 PURE 前瞻性队列研究（覆盖17个国家、100,000余名参与者）中完成外部验证。评分系统综合15项危险因素——年龄与性别、腰臀比、高血压、糖尿病、家族史、吸烟状况、二手烟暴露、体力活动、心理压力、抑郁及饮食习惯——通过针对所选地区专门校准的 logistic 回归模型将总分转换为概率值。",
        levelsTitle: "风险等级（基于年化风险）：",
        levelLow: "🟢 低风险（< 1%/年）：低于人群平均水平，建议继续保持健康的生活方式。",
        levelModerate: "🟡 中风险（1–2%/年）：风险有所升高，建议咨询医疗专业人员，讨论预防策略。",
        levelHigh: "🔴 高风险（> 2%/年）：风险显著升高，建议尽早与医生讨论降低风险的方案。",
        disclaimer: "重要说明：本结果为基于人群统计模型的估计值，不构成个人诊断。模型无法涵盖所有个体因素（如具体用药情况、详细实验室检查值或遗传易感性）。验证研究中，部分饮食相关预测因子在不同地区的关联性并不一致。本工具仅供健康教育参考，不能替代专业医疗建议。"
      },
      breakdown: {
        title: "风险因子拆解",
        desc: "您的评估基于 NL-IHRS 算法，针对【{{region}}】人群进行校正。以下是影响您得分的关键因子：",
        factorHeader: "主要风险来源",
        impact: "风险贡献度"
      },
      lifestyle: {
        title: "生活方式红黑榜",
        positive: "保持良好的习惯",
        negative: "建议改善的习惯"
      },
      advice: {
        title: "温馨提示",
        levels: {
          low: "您目前的评估结果处于较低风险区间，建议继续保持良好的生活习惯，关注自身心血管健康。",
          moderate: "您的评估结果提示心血管健康值得关注。建议留意日常生活习惯，并在方便时与医生沟通了解更多信息。",
          high: "您的评估结果提示心血管健康需要引起重视。建议关注自身健康状况，并在合适的时候咨询专业医生获取进一步评估。"
        }
      }
    }
  }
};