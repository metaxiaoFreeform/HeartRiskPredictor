"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { en } from "./en";
import { zh } from "./zh";

export type Language = "en" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, string>) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLine = localStorage.getItem("app-lang");
    if (savedLine === "en" || savedLine === "zh") {
      setLanguageState(savedLine as Language);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("app-lang", lang);
    }
  };

  const t = (key: string, variables?: Record<string, string>) => {
    const dict = language === "en" ? en : zh;
    let template = key.split(".").reduce((obj, k) => (obj || {})[k], dict as any);
    if (!template) return key;
    if (typeof template === "string" && variables) {
      Object.keys(variables).forEach((v) => {
        template = template.replaceAll(`{{${v}}}`, variables[v]);
      });
    }
    return template;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div key={language === "zh" ? "zh" : "en"} style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
