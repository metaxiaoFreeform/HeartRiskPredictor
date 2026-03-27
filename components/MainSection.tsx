"use client";

import CardioRiskCalculator from "@/components/CardioRiskCalculator";
import PreventCalculator from "@/components/PreventCalculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function MainSection() {
  const { t } = useLanguage();

  return (
    <main className="container mx-auto px-4 py-12 -mt-8">
      <div className="bg-background rounded-2xl shadow-xl border p-2 mb-12">
        <Tabs defaultValue="quick" className="w-full">
          <div className="flex justify-center p-4 border-b">
            <TabsList className="grid w-full max-w-md grid-cols-2 h-12">
              <TabsTrigger value="quick" className="text-sm font-bold h-10 data-[state=active]:bg-red-700 data-[state=active]:text-white">
                {t("tabs.quick")}
              </TabsTrigger>
              <TabsTrigger value="pro" className="text-sm font-bold h-10 data-[state=active]:bg-red-700 data-[state=active]:text-white">
                {t("tabs.pro")}
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-4 md:p-8">
            <TabsContent value="quick" className="mt-0 focus-visible:ring-0">
              <CardioRiskCalculator />
            </TabsContent>
            <TabsContent value="pro" className="mt-0 focus-visible:ring-0">
              <PreventCalculator />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
}
