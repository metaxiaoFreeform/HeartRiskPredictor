"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function Modal({ open, onClose, title, children }: {
  open: boolean; onClose: () => void; title: string; children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function FooterSection() {
  const { t, language } = useLanguage();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const isZh = language === "zh";

  return (
    <>
      <footer className="bg-muted py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="font-bold text-lg">{t("footer.title")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footer.desc")}
            </p>
            <div className="pt-8 flex justify-center gap-8 text-xs text-muted-foreground">
              <span>{t("footer.copyright")}</span>
              <button onClick={() => setShowPrivacy(true)} className="hover:text-primary underline">
                {t("footer.privacy")}
              </button>
              <button onClick={() => setShowTerms(true)} className="hover:text-primary underline">
                {t("footer.terms")}
              </button>
            </div>
            <p className="text-xs text-muted-foreground/60 mt-4 leading-relaxed max-w-2xl mx-auto">
              {t("footer.ahaAttribution")}
            </p>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <Modal
        open={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title={isZh ? "隐私政策" : "Privacy Policy"}
      >
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p className="font-semibold text-slate-900">
            {isZh ? "数据处理原则" : "Data Handling Principles"}
          </p>
          <p>
            {isZh
              ? "本网站的所有计算均在您的浏览器中本地完成。您输入的任何个人健康数据（包括年龄、血压、胆固醇等）绝不会被上传到任何服务器，也不会被存储、收集或传输给任何第三方。"
              : "All calculations on this website are performed locally in your browser. Any personal health data you enter (including age, blood pressure, cholesterol, etc.) is NEVER uploaded to any server, stored, collected, or transmitted to any third party."}
          </p>
          <p>
            {isZh
              ? "本网站不使用 Cookie 追踪用户行为，不收集任何个人可识别信息 (PII)。当您关闭浏览器标签页后，您输入的所有数据将自动消失。"
              : "This website does not use cookies to track user behavior and does not collect any Personally Identifiable Information (PII). When you close the browser tab, all data you entered is automatically discarded."}
          </p>
          <p>
            {isZh
              ? "本网站不包含任何分析追踪工具（如 Google Analytics）。我们不跟踪您的访问行为。"
              : "This website does not include any analytics tracking tools (such as Google Analytics). We do not track your browsing behavior."}
          </p>
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3">
            <p className="text-xs text-emerald-800 font-medium">
              {isZh
                ? "✅ 零数据上传 · 零 Cookie · 零追踪 · 100% 本地计算"
                : "✅ Zero data uploads · Zero cookies · Zero tracking · 100% local computation"}
            </p>
          </div>
        </div>
      </Modal>

      {/* Terms of Use Modal */}
      <Modal
        open={showTerms}
        onClose={() => setShowTerms(false)}
        title={isZh ? "使用条款" : "Terms of Use"}
      >
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p className="font-semibold text-slate-900">
            {isZh ? "1. 免责声明" : "1. Disclaimer"}
          </p>
          <p>
            {isZh
              ? "本工具仅供教育、学术和研究参考用途，不构成医疗诊断或治疗建议。本工具不是诊断工具，不应用于独立做出治疗决策。如有任何健康问题，请务必咨询专业医生。"
              : "This tool is for educational, academic, and research reference purposes only. It does not constitute medical diagnosis or treatment advice. This tool is NOT a diagnostic instrument and should NOT be used to make independent treatment decisions. Always consult a qualified physician for health-related decisions."}
          </p>

          <p className="font-semibold text-slate-900">
            {isZh ? "2. 代码使用与归属" : "2. Code Usage & Attribution"}
          </p>
          <p>
            {isZh
              ? "本项目的源代码以开源方式提供。如果您在自己的项目、论文、产品或网站中使用了本项目的代码或设计，请在显著位置注明出处，包括本项目的名称和 GitHub 仓库链接。"
              : "The source code of this project is provided as open source. If you use any code or design from this project in your own projects, papers, products, or websites, please provide proper attribution in a prominent location, including the project name and a link to the GitHub repository."}
          </p>
          <div className="rounded-lg bg-slate-50 border border-slate-200 px-4 py-3">
            <p className="text-xs text-slate-600 font-mono">
              {isZh
                ? '引用格式：「HeartEase Predictor — https://github.com/metaxiaoFreeform」'
                : 'Attribution: "HeartEase Predictor — https://github.com/metaxiaoFreeform"'}
            </p>
          </div>

          <p className="font-semibold text-slate-900">
            {isZh ? "3. 算法归属" : "3. Algorithm Attribution"}
          </p>
          <p>
            {isZh
              ? "本工具使用的风险评估算法分别来自 PURE 研究（NL-IHRS）和美国心脏协会（AHA PREVENT™）。详细的引用信息请参阅页面底部的「法律归属」及「方法论」部分。"
              : "The risk assessment algorithms used in this tool originate from the PURE Study (NL-IHRS) and the American Heart Association (AHA PREVENT™). For detailed citation information, please refer to the \"Legal Attribution\" and \"Methodology\" sections at the bottom of the page."}
          </p>

          <p className="font-semibold text-slate-900">
            {isZh ? "4. 无保证声明" : "4. No Warranty"}
          </p>
          <p>
            {isZh
              ? "本工具按「现状」提供，不提供任何明示或暗示的保证。开发者不对因使用本工具而产生的任何直接或间接损失承担责任。"
              : 'This tool is provided "AS IS" without warranty of any kind, either express or implied. The developer assumes no liability for any direct or indirect damages arising from the use of this tool.'}
          </p>
        </div>
      </Modal>
    </>
  );
}
