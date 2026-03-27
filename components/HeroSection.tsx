"use client";

import { Heart } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import ContactSection from "./contactSection";

export default function HeroSection() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="relative overflow-hidden bg-primary py-16 text-primary-foreground lg:py-24">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 text-sm font-medium border border-primary-foreground/20">
            <Heart className="size-4 fill-red-400 text-red-400" />
            <span>{t("hero.tag")}</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            {t("hero.title")}
          </h1>

          <p className="text-xl opacity-90 max-w-2xl">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setLanguage("zh")}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold transition-colors duration-300 ease-in-out active:scale-95",
                language === "zh"
                  ? "bg-red-700 hover:bg-red-600 text-white shadow-md"
                  : "bg-transparent text-primary-foreground/80 hover:bg-[#f0f0f0] focus:outline-none"
              )}
            >
              <span className="antialiased tracking-wide">中文</span>
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold transition-colors duration-300 ease-in-out active:scale-95",
                language === "en"
                  ? "bg-red-700 hover:bg-red-600 text-white shadow-md"
                  : "bg-transparent text-primary-foreground/80 hover:bg-[#f0f0f0] focus:outline-none"
              )}
            >
              <span className="antialiased tracking-wide">English</span>
            </button>
          </div>

          <p className="text-sm bold italic pt-4">
            {t("hero.github")}
            <br />
            <span className="inline-flex items-center gap-1 mt-2">
              <a href="https://github.com/metaxiaoFreeform/HeartRiskPredictor" className="hover:text-blue-400 transition"><FaGithub size={24} /></a> star-this-project
            </span>
          </p>

          <ContactSection />
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute -top-24 -left-24 size-96 rounded-full bg-white blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 size-96 rounded-full bg-white blur-3xl"></div>
      </div>
    </header>
  );
}
