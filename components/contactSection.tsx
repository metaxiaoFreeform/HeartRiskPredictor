"use client";

import { useState } from "react";
import { Mail, X } from "lucide-react";
import { IoLogoWechat } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { Xiaohongshu } from "./icons/rednoteicon";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ContactSection() {
    const [showWechatQR, setShowWechatQR] = useState(false);
    const { language } = useLanguage();

    return (
        <>
            <section id="contact" className="text-center">
                <p className="text-gray-600 mb-8">
                    {language === 'zh' ? '欢迎通过社交媒体或邮件找到我。' : 'Contact me through Social Media or Email'}
                </p>
                <div className="flex justify-center gap-8">
                    <button onClick={() => setShowWechatQR(true)} className="hover:text-[#07C160] transition cursor-pointer">
                        <IoLogoWechat size={24} />
                    </button>
                    <a href="https://xhslink.com/m/3uDh8DEIOeZ" className="hover:text-blue-400 transition"><Xiaohongshu size={24} /></a>
                    <a href="https://x.com/luluXiaoCoding" className="hover:text-blue-400 transition"><FaSquareXTwitter size={24} /></a>
                    <a href="mailto:fengzheng.2508@gmail.com" className="hover:text-red-500 transition"><Mail size={24} /></a>
                    <a href="https://github.com/metaxiaoFreeform" className="hover:text-blue-400 transition"><FaGithubSquare size={24} /></a>
                </div>
            </section>

            {/* WeChat QR Modal */}
            {showWechatQR && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md transition-all">
                    <div className="relative bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setShowWechatQR(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 hover:bg-gray-100 p-1 rounded-full transition"
                        >
                            <X size={24} />
                        </button>
                        <div className="text-center">
                            <IoLogoWechat size={48} className="mx-auto text-[#07C160] mb-4" />
                            <h3 className="text-2xl font-bold mb-2 text-gray-800">添加微信</h3>
                            <p className="text-gray-500 mb-6">扫一扫下方的二维码</p>
                            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl aspect-square flex items-center justify-center mb-2 p-2">
                                <img src="/images/WechatQR.jpg" alt="微信二维码" className="rounded-xl w-full h-full object-contain" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
