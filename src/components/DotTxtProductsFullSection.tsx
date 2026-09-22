"use client";

import { useState } from "react";
import "./dottxt.css";

const PRODUCTS = [
  {
    step: 1,
    id: "api.dottxt.ai",
    indexStr: "1",
    title: "api.dottxt.ai platform",
    buttonText: "Get Started",
    buttonKey: "1",
    buttonHref: "https://h1xbpbfsf0w.typeform.com/to/fwQNWmS8?typeform-source=dottxt.ai",
    description:
      "The fastest way to put .txt's structured generation into production. Access our latest constrained-decoding technology on a pay-per-token basis, powered by the newest open-source models. Guaranteed-valid outputs behind an API you can call today.",
  },
  {
    step: 2,
    id: "self-host",
    indexStr: "2",
    title: "For teams that self-host",
    buttonText: "Try it",
    buttonKey: "2",
    buttonHref: "https://h1xbpbfsf0w.typeform.com/to/fwQNWmS8?typeform-source=dottxt.ai",
    description: (
      <>
        Drop-in replacements for the inference servers your team already runs: vLLM, SGLang or TensorRT-LLM.{" "}
        <strong>Keep your existing stack</strong> and gain reliable JSON, grammar-constrained, and function-calling output without the performance penalties of post-hoc validation. Built for teams that self-host.
      </>
    ),
  },
  {
    step: 3,
    id: "inference-providers",
    indexStr: "3",
    title: "For inference providers",
    buttonText: "Talk to us",
    buttonKey: "3",
    buttonHref: "https://h1xbpbfsf0w.typeform.com/to/fwQNWmS8?typeform-source=dottxt.ai",
    description: (
      <>
        Composable libraries that bring .txt&apos;s structured generation to any inference stack. <strong>dotjson</strong> enforces JSON Schema, <strong>dotgrammar</strong> handles arbitrary context-free grammars, and <strong>dotlambda</strong> powers reliable function calling. They are designed to integrate cleanly into existing inference pipelines, enabling providers to offer best-in-class structured outputs to their users.
      </>
    ),
  },
];

export default function DotTxtProductsFullSection() {
  const [activeStep, setActiveStep] = useState(0);

  const prevStep = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : PRODUCTS.length - 1));
  };

  const nextStep = () => {
    setActiveStep((prev) => (prev < PRODUCTS.length - 1 ? prev + 1 : 0));
  };

  const current = PRODUCTS[activeStep];

  return (
    <div className="dottxt-products-scope relative bg-[#4A2C7B] text-[#FFFFFF] font-mono select-none" data-background-squares="true">
      <section id="products" className="section section--use-cases UseCasesSection_useCases__D9NK5 py-16 sm:py-24 px-4 sm:px-10">
        <div className="section__container max-w-7xl mx-auto">
          {/* Main List Container */}
          <div className="UseCasesSection_useCases__listHeight__M_vV1" style={{ ["--list-length" as any]: 3 }}>
            <div className="UseCasesSection_useCases__wrapper___GEbO rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-white">
              <div className="UseCasesSection_useCases__content__pKzEt grid grid-cols-1 lg:grid-cols-12">
                
                {/* 1. Title & Header Box */}
                <div className="UseCasesSection_useCases__box__CpS__ UseCasesSection_useCases__boxTitle__9PJwh bg-white p-8 sm:p-12 lg:col-span-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/10">
                  <div className="UseCasesSection_useCases__header__wtR9w flex items-center justify-between mb-8">
                    <div className="UseCasesSection_useCases__label__l4teN">
                      <div className="SectionLabel_sectionLabel__p19ZQ flex items-center gap-3">
                        <span className="SectionLabel_sectionLabel__index__lvtR0 font-mono text-sm font-bold text-black">
                          04
                        </span>
                        <span className="SectionLabel_sectionLabel__text__ZdXcY font-mono text-xs uppercase tracking-[0.25em] text-black/70">
                          Products
                        </span>
                      </div>
                    </div>

                    <div className="UseCasesSection_useCases__index__nSH8S font-mono text-xl font-bold">
                      <span className="UseCasesSection_useCases__indexPrimary__SsC8P">04.</span>
                      <span className="use-cases__index-secondary UseCasesSection_useCases__indexSecondary__2gXho text-[#1DE9B6]">
                        <span>{current.indexStr}</span>
                      </span>
                    </div>
                  </div>

                  <div className="UseCasesSection_useCases__titleWrapper__QyT35 my-auto py-8">
                    <div className="UseCasesSection_useCases__title__h878h use-cases__title">
                      <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-black tracking-tight leading-tight">
                        {current.title}
                      </h2>
                    </div>

                    <div className="use-cases__button UseCasesSection_useCases__button__iBKnK pointer-events-auto mt-8">
                      <a
                        href={current.buttonHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn use-cases__btn inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white hover:bg-[#FF6E40] transition-all duration-300 font-mono text-xs uppercase tracking-wider font-semibold shadow-xl"
                      >
                        <span className="label hover-effect">{current.buttonText}</span>
                        <span className="key w-5 h-5 rounded-full bg-white text-black text-[10px] flex items-center justify-center font-bold">
                          {current.buttonKey}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2. Controls & Step Indicators */}
                <div className="UseCasesSection_useCases__box__CpS__ UseCasesSection_useCases__boxIndex__4kG9y bg-white p-8 sm:p-12 lg:col-span-6 flex flex-col justify-between">
                  {/* Top Arrow Navigation */}
                  <div className="UseCasesSection_useCases__navButtons__UZzcw flex items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                      {/* Prev Button */}
                      <button
                        onClick={prevStep}
                        className="UseCasesSection_useCases__navButton__1_LEX UseCasesSection_useCases__navButtonPrev__MkS4g p-3 rounded-xl border border-black/15 hover:border-black hover:bg-black/5 transition-all"
                        aria-label="Previous product"
                      >
                        <svg width="24" height="22" viewBox="0 0 39 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M39 20.5714V15.4335L9.75 15.4335V10.2906L4.875 10.2906L4.875 15.4335H0L0 20.5714H4.875L4.875 25.7192H9.75L9.75 20.5763L39 20.5714ZM14.625 30.8571L9.75 30.8571V25.7192L14.625 25.7143V30.8571ZM14.625 30.8571H19.5V36H14.625V30.8571ZM14.625 5.14286L9.75 5.14286L9.75 10.2906H14.625L14.625 5.14286ZM14.625 5.14286L19.5 5.14286V0L14.625 0V5.14286Z"
                            fill="#000000"
                          />
                        </svg>
                      </button>

                      {/* Next Button */}
                      <button
                        onClick={nextStep}
                        className="UseCasesSection_useCases__navButton__1_LEX UseCasesSection_useCases__navButtonNext__n_oGE p-3 rounded-xl border border-black/15 hover:border-black hover:bg-black/5 transition-all"
                        aria-label="Next product"
                      >
                        <svg width="24" height="22" viewBox="0 0 39 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M2.01629e-06 15.4286L2.46546e-06 20.5666L29.25 20.5665L29.25 25.7094L34.125 25.7094L34.125 20.5665L39 20.5665L39 15.4286L34.125 15.4286L34.125 10.2808L29.25 10.2808L29.25 15.4237L2.01629e-06 15.4286ZM24.375 5.14285L29.25 5.14285L29.25 10.2808L24.375 10.2857L24.375 5.14285ZM24.375 5.14285L19.5 5.14285L19.5 -2.10995e-06L24.375 -2.53614e-06L24.375 5.14285ZM24.375 30.8571L29.25 30.8571L29.25 25.7094L24.375 25.7094L24.375 30.8571ZM24.375 30.8571L19.5 30.8571L19.5 36L24.375 36L24.375 30.8571Z"
                            fill="#000000"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Step Numbers Selection */}
                    <div className="UseCasesSection_useCases__progress__8veFq flex items-center gap-4">
                      <div className="UseCasesSection_useCases__progressStepNumbers__2SE_7 flex gap-3 text-xs font-mono">
                        {PRODUCTS.map((p, idx) => (
                          <button
                            key={p.id}
                            onClick={() => setActiveStep(idx)}
                            className={`px-3 py-1 rounded-full transition-all ${
                              activeStep === idx
                                ? "bg-black text-white font-bold"
                                : "text-black/50 hover:text-black"
                            }`}
                          >
                            {p.step}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Segmented Pixel Bar */}
                  <div className="UseCasesSection_useCases__progressBar__LU5X9 flex gap-1.5 mb-8">
                    {Array.from({ length: 15 }).map((_, i) => {
                      const isActive = i < (activeStep + 1) * 5;
                      return (
                        <div
                          key={i}
                          className={`h-2 flex-1 rounded-sm transition-all duration-300 ${
                            isActive ? "bg-black" : "bg-black/10"
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Description Box */}
                  <div className="UseCasesSection_useCases__description__fPBnM text-base sm:text-lg text-black/80 font-normal leading-relaxed my-auto">
                    <p>{current.description}</p>
                  </div>

                  {/* Decorative 8-Bit Pixelated Glyphs SVG */}
                  <div className="UseCasesSection_useCases__descriptionIcon__JMHEq mt-8 pt-6 border-t border-black/10 flex justify-end">
                    <svg width="180" height="28" viewBox="0 0 237 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M169.72 17.28V18.72H171.16V15.84H169.72V17.28Z" fill="black"></path>
                      <path d="M169.72 14.4H171.16V12.96H166.84V14.4H168.28V15.84H169.72V14.4Z" fill="black"></path>
                      <path d="M165.4 30.24H163.96V31.68H165.4V30.24Z" fill="black"></path>
                      <path d="M166.84 28.8H165.4V30.24H166.84V28.8Z" fill="black"></path>
                      <path d="M168.28 27.36H166.84V28.8H168.28V27.36Z" fill="black"></path>
                      <path d="M174.04 30.24H172.6V31.68H174.04V30.24Z" fill="black"></path>
                      <path d="M172.6 28.8H171.16V30.24H172.6V28.8Z" fill="black"></path>
                      <path d="M171.16 27.36H169.72V28.8H171.16V27.36Z" fill="black"></path>
                      <path d="M1.44 33.12H0V36H2.88V34.56H1.44V33.12Z" fill="black"></path>
                      <path d="M2.87994 31.68V30.24H1.43994V33.12H2.87994V31.68Z" fill="black"></path>
                      <path d="M2.87988 33.12V34.56H5.75988V33.12H2.87988Z" fill="black"></path>
                      <path d="M14.4 30.24H12.96V31.68H14.4V30.24Z" fill="black"></path>
                      <path d="M15.8399 28.8H14.3999V30.24H15.8399V28.8Z" fill="black"></path>
                      <path d="M59.0401 2.88H57.6001V4.32H59.0401V2.88Z" fill="black"></path>
                      <path d="M57.5997 4.32001H56.1597V5.76001H57.5997V4.32001Z" fill="black"></path>
                      <path d="M108 20.16H106.56V21.6H108V20.16Z" fill="black"></path>
                      <path d="M110.88 21.6144H109.44V23.0544H110.88V21.6144Z" fill="black"></path>
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Quickstart Side / Footer Element */}
          <div className="section__side-element mt-8 flex justify-end">
            <a
              href="https://docs.dottxt.ai/quickstart"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--terciary bg-white text-black px-6 py-3.5 rounded-2xl border border-white/20 shadow-xl flex items-center gap-4 hover:bg-white/90 transition-all"
            >
              <div className="CTA_cta__container__fdNH_ flex items-center gap-3">
                <span className="key w-6 h-6 rounded-full bg-[#7F9ACF] text-black text-xs flex items-center justify-center font-bold">
                  D
                </span>
                <div>
                  <div className="font-mono text-xs font-bold uppercase tracking-wider">Quickstart</div>
                  <div className="text-[11px] text-black/60 font-mono">Structured outputs in 5 mins</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
