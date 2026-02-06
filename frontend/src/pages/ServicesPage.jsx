import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
    ShieldCheck,
    Sparkles,
    SlidersHorizontal,
    Box,
    FlaskConical,
    Heart,
    Scissors,
    Smile,
    CheckCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
    const { t } = useTranslation();

    const services = [
        { key: "general", icon: ShieldCheck },
        { key: "cosmetic", icon: Sparkles },
        { key: "ortho", icon: SlidersHorizontal },
        { key: "implants", icon: Box },
        { key: "root_canal", icon: FlaskConical },
        { key: "periodontics", icon: Heart },
        { key: "oral_surgery", icon: Scissors },
        { key: "pediatric", icon: Smile }
    ];

    return (
        <div className="min-h-screen bg-white font-prompt flex flex-col overflow-x-hidden">
            <Header />

            <main className="flex-grow -mt-[88px]">
                {/* Hero Section - Same Style as HomePage */}
                <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-0" style={{ background: 'linear-gradient(120deg, #ffffff 0%, #ffffff 60%, rgba(206, 224, 243, 0.6) 100%)' }}>
                    {/* Background Blobs - Enhanced */}
                    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-brand-light/30 to-blue-200/20 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-gradient-to-tr from-brand-light/20 to-purple-100/30 rounded-full blur-3xl opacity-50"></div>

                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 w-full relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                            {/* Mobile Order: Text First, Desktop Order: Mascot First */}
                            {/* Mascot Image - Shows second on mobile, first on desktop (LEFT) */}
                            <div className="relative flex justify-center lg:justify-start lg:h-[700px] items-center order-2 lg:order-1">
                                <img
                                    src="/img/paradise_service.svg"
                                    alt="Our Services"
                                    className="w-full max-w-[435px] lg:max-w-[490px] h-auto drop-shadow-2xl animate-float relative z-10 hover:scale-105 transition-transform duration-500 ease-out"
                                />
                            </div>

                            {/* Content - Shows first on mobile, second on desktop (RIGHT) */}
                            <div className="text-center lg:text-left space-y-8 animate-fade-in-up order-1 lg:order-2">
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.35] text-gradient-brand">
                                    {t('services.hero.title_part1')} <br />
                                    {t('services.hero.title_part2')}
                                </h1>

                                <p className="text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                                    {t('services.hero.description')}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
                                    <Link
                                        to="/booking"
                                        className="group relative bg-brand text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg shadow-brand/30 hover:shadow-brand/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden whitespace-nowrap"
                                    >
                                        <span className="relative z-10">{t('services.hero.cta_primary')}</span>
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                    </Link>
                                    <a
                                        href="#list"
                                        className="group bg-white text-brand border-2 border-brand px-10 py-4 rounded-full font-semibold text-lg hover:bg-brand-light/10 hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
                                    >
                                        {t('services.hero.cta_secondary')}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Trust Indicators - Below CTAs, Centered */}
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-12 pb-8 text-sm font-medium text-text-secondary w-full">
                            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/50 transition-colors">
                                <CheckCircle className="h-5 w-5 text-brand" />
                                <span>{t('services.hero.trust_1')}</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/50 transition-colors">
                                <CheckCircle className="h-5 w-5 text-brand" />
                                <span>{t('services.hero.trust_2')}</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/50 transition-colors">
                                <CheckCircle className="h-5 w-5 text-brand" />
                                <span>{t('services.hero.trust_3')}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <section id="list" className="py-24 md:py-32 lg:py-40 bg-white">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                            {services.map((service, index) => (
                                <div key={index} className="bg-white rounded-2xl border border-brand-light shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center">
                                    <div className="flex justify-center mb-6">
                                        <div className="h-20 w-20 rounded-full bg-brand-light/50 flex items-center justify-center">
                                            <service.icon className="h-10 w-10 text-brand" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gradient-brand mb-4 text-center">
                                        {t(`services.${service.key}.title`)}
                                    </h3>
                                    <p className="text-text-secondary leading-relaxed mb-6 text-center">
                                        {t(`services.${service.key}.desc`)}
                                    </p>
                                    <a href="#" className="inline-flex items-center text-brand font-medium hover:text-brand-dark transition-colors">
                                        {t('services.hero.cta_secondary')}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ServicesPage;
