# Heart Risk Predictor ❤️🩺

English | [中文版](#中文版)

A modern, fast, and privacy-first web application designed to assess cardiovascular disease (CVD) risk in one minute. The platform provides two distinct assessment models: a quick, non-laboratory questionnaire (NL-IHRS) and a comprehensive, clinical-grade model (AHA PREVENT™).

> **Medical Disclaimer:** This tool is strictly intended for educational and screening purposes. It is **not** a diagnostic instrument. Always consult a healthcare professional before making any medical or lifestyle decisions.

## 🌟 Key Features

- 🏎️ **Quick Test Mode (NL-IHRS)**: Assess 10-year CVD risk without any blood test results. Inspired by the Non-Laboratory INTERHEART Risk Score, evaluating 15 lifestyle and physiological factors.
- 🔬 **Pro Mode (AHA PREVENT™)**: Calculates 10-year and 30-year risk for total CVD, ASCVD, and Heart Failure. Implements the official American Heart Association predicting equations (Base + Full models including UACR, HbA1c, and SDI).
- 📊 **Factor Contribution Analysis**: Visually decomposes how each biological and lifestyle factor impacts the final risk probability.
- 🔒 **100% Privacy-First**: All calculations run locally in the browser. Zero cookies, zero user tracking, and absolutely no data is sent to a server.
- 🌐 **Bilingual Support**: Seamlessly switch between English and Simplified Chinese without page reloads.

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: React 19, [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **State Management & Forms**: React Hook Form
- **Icons**: Radix Icons, React Icons, Lucide
- **Internationalization (i18n)**: Custom lightweight Context-based localization

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Acknowledgements & Legal Attribution

- **NL-IHRS Model**: The quick test is inspired by the INTERHEART Risk Score developed by the Population Health Research Institute (PHRI) at McMaster University. This project uses population-adjusted logistic regression models.
- **AHA PREVENT™ Model**: The professional calculator incorporates the American Heart Association PREVENT™ equations (version 1.0.0). *“Based in part on the PREVENT™ tool developed by the American Heart Association Cardiovascular-Kidney-Metabolic Science Advisory Group.”* Please review the AHA PREVENT™ specific terms of use before utilizing the code for clinical research.

---

<span id="中文版"></span>

# 心血管风险预测评估 (Heart Risk Predictor) ❤️🩺

[English](#heart-risk-predictor-️) | 中文版

一个现代、快速、以隐私为优先的 Web 应用程序，旨在通过一分钟的评估测算您的心血管疾病 (CVD) 风险。本平台提供两种评估模型：免抽血化验的快速评估问卷 (NL-IHRS) 以及专业临床级模型 (AHA PREVENT™)。

> **医疗免责声明：** 本工具仅供健康教育和早期筛查参考，**绝不构成任何正式的医学诊断**。在做出任何关于健康、用药或生活方式的决定前，请务必咨询专业医疗人员。

## 🌟 核心功能

- 🏎️ **快速测试模式 (NL-IHRS)**: 无需任何抽血化验单，通过 15 项生活方式和生理特征评估 10 年心血管病发生风险。算法灵感基于加拿大麦克马斯特大学 PHRI 的 INTERHEART 非实验室风险评分。
- 🔬 **专业模式 (AHA PREVENT™)**: 深入测算未来 10 年和 30 年的总体心血管病、动脉粥样硬化性心血管疾病 (ASCVD) 及心力衰竭的发生概率。内置美国心脏协会 (AHA) 官方发布的预测方程式（包含基础模型与叠加 UACR/HbA1c/SDI 的完整模型）。
- 📊 **风险因子拆解贡献度分析**: 可视化图表为您详细拆解您的各项生理指标或生活习惯是如何推高或降低最终风险概率的。
- 🔒 **100% 隐私优先**: 所有测算过程 100% 在您的本地浏览器中完成。无 Cookie、无用户追踪，绝对不会有任何健康数据被上传至云端服务器。
- 🌐 **双语支持**: 无缝流畅切换英文与简体中文，界面零延迟刷新。

## 🛠️ 技术栈

- **前端框架**: [Next.js 16](https://nextjs.org/) (App Router 最新架构)
- **UI 及样式**: React 19, [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) 组件库
- **表单与状态管理**: React Hook Form 搭配严格的类型验证
- **图标与动态交互**: Radix Icons, React Icons, Lucide 等现代化图标集
- **多语言处理 (i18n)**: 自定义极轻量级 Context/Hooks 国际化方案

## 🚀 本地运行与部署

首先，在您的终端中安装环境依赖：

```bash
npm install
# 或者
yarn install
# 或者
pnpm install
```

启动本地开发服务器：

```bash
npm run dev
# 或者
yarn dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 即可开始使用。部署时直接将代码库链接到 Vercel 或无需任何环境变量即可打包静态资源。

## 📜 算法出处与版权归属 (Attribution)

- **NL-IHRS 模型**: 快速评估系统灵感基于 INTERHEART 非实验室风险评分（McMaster University / PHRI），并采用了通过不同地区人群校准的 Logistic 回归统计模型。
- **AHA PREVENT™ 模型**: 专业版计算器内嵌了美国心脏协会（AHA）发布的 PREVENT™ 公式（版本 1.0.0）。*“本工具部分基于由美国心脏协会心血管-肾脏-代谢科学顾问小组开发的 PREVENT™ 工具。”* 如果您需要将本计算引擎代码用于正式临床研究或商业用途，请务必事先阅读并遵循 AHA 官方开源协议及要求。
