"use client";

import { useState } from "react";
import "./dottxt.css";

export interface ReviewItem {
  step: number;
  id: string;
  indexStr: string;
  name: string;
  service: string;
  rating: number;
  highlight: string;
  review: string;
  stylist: string;
  date: string;
  image: string;
  buttonText: string;
  buttonKey: string;
}

const REVIEWS: ReviewItem[] = [
  {
    step: 1,
    id: "review-tanvi",
    indexStr: "01",
    name: "Tanvi Mehra",
    service: "Liquid Gloss Balayage & Silk Cut",
    rating: 5,
    highlight: "The balayage and silk blowout turned out breathtaking.",
    review:
      "I visited Aluma for their signature liquid gloss balayage and haircut. The master stylist studied my facial structure and natural undertones before formulating a custom dimensional tone. The shine and movement are unmatched—every single person at work asked where I got my hair done!",
    stylist: "Lead Colorist Elena",
    date: "Verified Visit • 2 days ago",
    image: "/aluma-drive/DSC00593.JPG",
    buttonText: "Book Balayage",
    buttonKey: "1",
  },
  {
    step: 2,
    id: "review-rhea",
    indexStr: "02",
    name: "Rhea Singhal",
    service: "Seamless Remy Tape-In Extensions",
    rating: 5,
    highlight: "Completely undetectable extensions with featherlight volume.",
    review:
      "I was nervous about getting extensions for the first time, but the ultrasonic cold fusion at Aluma is on another level. Zero damage, perfectly blended with my natural texture, and completely weightless. It feels 100% like my own hair!",
    stylist: "Master Extensionist Rahul",
    date: "Verified Visit • 5 days ago",
    image: "/aluma-drive/DSC00588.JPG",
    buttonText: "Book Extensions",
    buttonKey: "2",
  },
  {
    step: 3,
    id: "review-aanya",
    indexStr: "03",
    name: "Aanya Deshmukh",
    service: "Trichology Scalp Therapy & Trim",
    rating: 5,
    highlight: "The scalp scan diagnosis completely revitalized my hair health.",
    review:
      "The 200x polarized diagnostic scalp scan showed exactly what my hair was lacking. The customized organic botanical therapy cleared all follicle buildup and left my hair soft and bouncy. Truly a high-science atelier experience.",
    stylist: "Trichology Specialist Devika",
    date: "Verified Visit • 1 week ago",
    image: "/aluma-drive/DSC00599.JPG",
    buttonText: "Book Scalp Therapy",
    buttonKey: "3",
  },
  {
    step: 4,
    id: "review-pooja",
    indexStr: "04",
    name: "Pooja Malhotra",
    service: "Couture Keratin Smoothing & Blowout",
    rating: 5,
    highlight: "Zero frizz even in high humidity, and the salon hospitality is immaculate.",
    review:
      "Living with rebellious frizzy hair was exhausting until I experienced Aluma's cold keratin smoothing treatment. It preserved my natural volume while leaving every strand silky and reflective like glass. The iced matcha in the lounge was the cherry on top!",
    stylist: "Creative Director Marco",
    date: "Verified Visit • 10 days ago",
    image: "/aluma-drive/DSC00585.JPG",
    buttonText: "Book Smoothing",
    buttonKey: "4",
  },
  {
    step: 5,
    id: "review-kavya",
    indexStr: "05",
    name: "Kavya Verma",
    service: "Bespoke Couture Wig Customization",
    rating: 5,
    highlight: "Natural hairline precision and unmatched craftsmanship.",
    review:
      "The attention to detail on the lace hairline, hand-tied density, and personalized coloring is world class. You leave feeling empowered, radiant, and utterly confident. Aluma isn't just a salon—it's transformative artistry.",
    stylist: "Couture Wig Artisan Priya",
    date: "Verified Visit • 2 weeks ago",
    image: "/aluma-drive/DSC00582.JPG",
    buttonText: "Book Wig Consult",
    buttonKey: "5",
  },
  {
    step: 6,
    id: "review-ishita",
    indexStr: "06",
    name: "Ishita Roy",
    service: "Dimensional Babylights & Framing Cut",
    rating: 5,
    highlight: "Subtle sun-kissed dimension that grows out seamlessly.",
    review:
      "Elena's babylights technique is wizardry. She placed micro-fine highlights around my face that illuminated my eyes. The root melt ensures zero harsh line of demarcation as it grows. The blow-dry finish lasted four full days!",
    stylist: "Lead Colorist Elena",
    date: "Verified Visit • 2 weeks ago",
    image: "/aluma-drive/DSC00577.JPG",
    buttonText: "Book Babylights",
    buttonKey: "6",
  },
  {
    step: 7,
    id: "review-simran",
    indexStr: "07",
    name: "Simran Bhasin",
    service: "Japanese Thermal Straightening & Gloss",
    rating: 5,
    highlight: "Liquid glass shine and poker-straight fluidity without any stiffness.",
    review:
      "I have thick coarse waves that take two hours to style every morning. After Aluma's Japanese thermal treatment, I can wash and air-dry into sleek, salon-grade straight hair with incredible shine. A total life upgrade.",
    stylist: "Master Stylist Rahul",
    date: "Verified Visit • 3 weeks ago",
    image: "/aluma-drive/DSC00595.JPG",
    buttonText: "Book Straightening",
    buttonKey: "7",
  },
  {
    step: 8,
    id: "review-natasha",
    indexStr: "08",
    name: "Natasha Khanna",
    service: "Ultrasonic Micro-Ring Extensions",
    rating: 5,
    highlight: "Added 6 inches of natural length with zero glue or heat.",
    review:
      "The micro-ring application took less than 90 minutes and the bonds are tiny and comfortable to sleep on. The color match to my multi-tonal brunette hair was spot on. Worth every single rupee!",
    stylist: "Master Extensionist Rahul",
    date: "Verified Visit • 3 weeks ago",
    image: "/aluma-drive/DSC00589.JPG",
    buttonText: "Book Micro-Rings",
    buttonKey: "8",
  },
  {
    step: 9,
    id: "review-sneha",
    indexStr: "09",
    name: "Sneha Kulkarni",
    service: "Organic Hair Spa & Scalp Detox",
    rating: 5,
    highlight: "The head massage and steam infusion melted all my stress away.",
    review:
      "The sensory journey at Aluma is unlike any salon in the city. Calming essential oils, acupressure massage, and a deeply conditioning peptide mask that rescued my heat-damaged strands. My scalp feels so clean and light.",
    stylist: "Trichology Specialist Devika",
    date: "Verified Visit • 1 month ago",
    image: "/aluma-drive/DSC00597.JPG",
    buttonText: "Book Hair Spa",
    buttonKey: "9",
  },
  {
    step: 10,
    id: "review-radhika",
    indexStr: "10",
    name: "Radhika Sen",
    service: "Bespoke Bridal Hair & Velvet Waves",
    rating: 5,
    highlight: "My wedding hair stayed flawless through 12 hours of celebrations.",
    review:
      "Marco designed a sculptural bridal wave look for my reception that felt both timeless and editorial. It held its shape through dancing, heat, and photo flashes. I felt like royalty on my big day!",
    stylist: "Creative Director Marco",
    date: "Verified Visit • 1 month ago",
    image: "/aluma-drive/DSC00580.JPG",
    buttonText: "Book Bridal",
    buttonKey: "10",
  },
];

interface DotTxtProductsProps {
  onOpenBooking?: () => void;
}

export default function DotTxtProductsFullSection({ onOpenBooking }: DotTxtProductsProps) {
  const [activeStep, setActiveStep] = useState(0);

  const prevStep = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : REVIEWS.length - 1));
  };

  const nextStep = () => {
    setActiveStep((prev) => (prev < REVIEWS.length - 1 ? prev + 1 : 0));
  };

  const current = REVIEWS[activeStep];

  return (
    <div
      className="dottxt-products-scope relative bg-[#FCEEF6] text-[#0B0C10] font-mono select-none border-t-2 border-black"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }}
    >
      <section
        id="reviews"
        className="section section--use-cases UseCasesSection_useCases__D9NK5 py-12 sm:py-16 lg:py-24 px-3 sm:px-6 lg:px-10"
      >
        <div className="section__container max-w-7xl mx-auto">
          {/* Section Heading Badge matching reference website style */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-black shadow-[3px_3px_0px_#0B0C10] text-xs font-mono font-bold tracking-[0.2em] uppercase text-black mb-3">
              <span className="text-[#20B364]">✦</span>
              <span>Our Client Stories</span>
              <span className="text-[#EA54DB]">✦</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-[#0B0C10] tracking-tight">
              Real Salon <span className="font-normal italic text-[#6875E9]">Transformations</span>
            </h2>
          </div>

          {/* Main List Container */}
          <div
            className="UseCasesSection_useCases__listHeight__M_vV1"
            style={{ ["--list-length" as any]: REVIEWS.length }}
          >
            <div className="UseCasesSection_useCases__wrapper___GEbO rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-black shadow-[8px_8px_0px_#0B0C10] bg-white">
              <div className="UseCasesSection_useCases__content__pKzEt grid grid-cols-1 lg:grid-cols-12">
                
                {/* 1. Left Box: Customer Photo in Salon */}
                <div className="UseCasesSection_useCases__box__CpS__ bg-white p-4 sm:p-7 lg:p-10 lg:col-span-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r-2 border-black/15">
                  {/* Header Label & Index */}
                  <div className="UseCasesSection_useCases__header__wtR9w flex items-center justify-between mb-3 sm:mb-6">
                    <div className="UseCasesSection_useCases__label__l4teN">
                      <div className="SectionLabel_sectionLabel__p19ZQ flex items-center gap-2.5 sm:gap-3">
                        <span className="SectionLabel_sectionLabel__index__lvtR0 font-mono text-xs sm:text-sm font-bold text-black">
                          04
                        </span>
                        <span className="SectionLabel_sectionLabel__text__ZdXcY font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-black/70">
                          Client Stories
                        </span>
                      </div>
                    </div>

                    <div className="UseCasesSection_useCases__index__nSH8S font-mono text-lg sm:text-xl font-bold">
                      <span className="UseCasesSection_useCases__indexPrimary__SsC8P">04.</span>
                      <span className="use-cases__index-secondary UseCasesSection_useCases__indexSecondary__2gXho text-[#20B364]">
                        <span>{current.indexStr}</span>
                      </span>
                    </div>
                  </div>

                  {/* Customer in Salon Photo Frame */}
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border-2 border-black/20 shadow-md aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] max-h-[380px] sm:max-h-[440px] lg:max-h-none bg-[#F1F1F1] group my-2">
                    <img
                      key={current.id}
                      src={current.image}
                      alt={`${current.name} at Aluma Salon`}
                      className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                      loading="eager"
                    />

                    {/* Gradient Overlay for Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                    {/* Top Tag: Verified Customer */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-black/60 backdrop-blur-md border border-white/20 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono flex items-center gap-1.5 sm:gap-2">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#1DE9B6] animate-pulse"></span>
                      <span>Verified Client In Salon</span>
                    </div>

                    {/* Floating Info Overlay on Customer Photo */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex text-[#FFD700] text-xs sm:text-sm tracking-wider">
                          {"★".repeat(current.rating)}
                        </div>
                        <span className="text-[10px] sm:text-[11px] text-white/80 font-mono font-semibold">
                          5.0 Experience
                        </span>
                      </div>
                      <h4 className="text-lg sm:text-2xl font-serif font-bold text-white tracking-tight">
                        {current.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#1DE9B6] font-mono mt-0.5 font-medium">
                        {current.service}
                      </p>
                    </div>
                  </div>

                  {/* Quick Action Button matching reference green CTA */}
                  <div className="use-cases__button UseCasesSection_useCases__button__iBKnK pointer-events-auto mt-4 sm:mt-6 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={onOpenBooking}
                      className="btn use-cases__btn inline-flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 rounded-full bg-[#20B364] text-black border-2 border-black shadow-[3px_3px_0px_#0B0C10] hover:bg-black hover:text-[#20B364] hover:shadow-none transition-all duration-200 font-mono text-xs uppercase tracking-wider font-bold cursor-pointer"
                    >
                      <span className="label hover-effect">{current.buttonText}</span>
                      <span className="key w-5 h-5 rounded-full bg-white text-black text-[10px] flex items-center justify-center font-bold border border-black">
                        {current.buttonKey}
                      </span>
                    </button>
                    <span className="text-[11px] text-black/50 font-mono text-right">
                      {current.date}
                    </span>
                  </div>
                </div>

                {/* 2. Right Box: Client Review & Interactive Controls */}
                <div className="UseCasesSection_useCases__box__CpS__ UseCasesSection_useCases__boxIndex__4kG9y bg-white p-5 sm:p-8 lg:p-10 lg:col-span-6 flex flex-col justify-between">
                  {/* Top Arrow Navigation & 10 Step Selectors (Same Row on Desktop & Mobile) */}
                  <div>
                    <div className="UseCasesSection_useCases__navButtons__UZzcw flex items-center justify-between gap-3 mb-5 sm:mb-6">
                      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        {/* Prev Button */}
                        <button
                          onClick={prevStep}
                          className="UseCasesSection_useCases__navButton__1_LEX UseCasesSection_useCases__navButtonPrev__MkS4g p-2.5 sm:p-3 rounded-xl border-2 border-black hover:bg-[#20B364] transition-all cursor-pointer shadow-[2px_2px_0px_#0B0C10] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                          aria-label="Previous review"
                        >
                          <svg
                            width="20"
                            height="18"
                            viewBox="0 0 39 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M39 20.5714V15.4335L9.75 15.4335V10.2906L4.875 10.2906L4.875 15.4335H0L0 20.5714H4.875L4.875 25.7192H9.75L9.75 20.5763L39 20.5714ZM14.625 30.8571L9.75 30.8571V25.7192L14.625 25.7143V30.8571ZM14.625 30.8571H19.5V36H14.625V30.8571ZM14.625 5.14286L9.75 5.14286L9.75 10.2906H14.625L14.625 5.14286ZM14.625 5.14286L19.5 5.14286V0L14.625 0V5.14286Z"
                              fill="#000000"
                            />
                          </svg>
                        </button>

                        {/* Next Button */}
                        <button
                          onClick={nextStep}
                          className="UseCasesSection_useCases__navButton__1_LEX UseCasesSection_useCases__navButtonNext__n_oGE p-2.5 sm:p-3 rounded-xl border-2 border-black hover:bg-[#20B364] transition-all cursor-pointer shadow-[2px_2px_0px_#0B0C10] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                          aria-label="Next review"
                        >
                          <svg
                            width="20"
                            height="18"
                            viewBox="0 0 39 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.01629e-06 15.4286L2.46546e-06 20.5666L29.25 20.5665L29.25 25.7094L34.125 25.7094L34.125 20.5665L39 20.5665L39 15.4286L34.125 15.4286L34.125 10.2808L29.25 10.2808L29.25 15.4237L2.01629e-06 15.4286ZM24.375 5.14285L29.25 5.14285L29.25 10.2808L24.375 10.2857L24.375 5.14285ZM24.375 5.14285L19.5 5.14285L19.5 -2.10995e-06L24.375 -2.53614e-06L24.375 5.14285ZM24.375 30.8571L29.25 30.8571L29.25 25.7094L24.375 25.7094L24.375 30.8571ZM24.375 30.8571L19.5 30.8571L19.5 36L24.375 36L24.375 30.8571Z"
                              fill="#000000"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* 10 Review Numbers Selection */}
                      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs font-mono">
                        {REVIEWS.map((r, idx) => (
                          <button
                            key={r.id}
                            onClick={() => setActiveStep(idx)}
                            className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer text-[11px] sm:text-xs ${
                              activeStep === idx
                                ? "bg-[#20B364] text-black font-bold border-2 border-black shadow-[2px_2px_0px_#0B0C10] scale-105"
                                : "text-black/70 hover:text-black border border-black/20 hover:border-black bg-white"
                            }`}
                          >
                            {r.step}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Segmented Pixel Bar (20 Segments for 10 reviews) */}
                    <div className="UseCasesSection_useCases__progressBar__LU5X9 flex gap-1 sm:gap-1.5 mb-5 sm:mb-6">
                      {Array.from({ length: 20 }).map((_, i) => {
                        const isActive = i < (activeStep + 1) * 2;
                        return (
                          <div
                            key={i}
                            className={`h-1.5 sm:h-2 flex-1 rounded-sm transition-all duration-300 ${
                              isActive ? "bg-black" : "bg-black/10"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Review Content Box */}
                  <div className="my-auto py-1 sm:py-2">
                    {/* Rating Badge */}
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                      <div className="flex text-[#FF9E0D] text-sm sm:text-base tracking-wider">
                        {"★".repeat(current.rating)}
                      </div>
                      <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-black/70 font-bold">
                        Google 5.0 Rating &bull; <span className="text-[#6875E9]">{current.stylist}</span>
                      </span>
                    </div>

                    {/* Review Headline in Editorial Serif */}
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-normal text-black tracking-tight leading-snug mb-3 sm:mb-4">
                      &ldquo;{current.highlight}&rdquo;
                    </h3>

                    {/* Full Review Text */}
                    <p className="text-sm sm:text-base lg:text-lg text-black/80 font-normal leading-relaxed">
                      {current.review}
                    </p>

                    {/* Author & Service Signature */}
                    <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t-2 border-black/10 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-black font-serif font-bold text-base sm:text-lg">
                          {current.name}
                        </div>
                        <div className="text-xs text-black/60 font-mono">
                          {current.service}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-mono text-black/50">
                          {current.date}
                        </div>
                        <div className="text-xs font-mono font-bold text-[#6875E9]">
                          Aluma Atelier Client
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Glyphs / Footer */}
                  <div className="UseCasesSection_useCases__descriptionIcon__JMHEq mt-4 sm:mt-6 pt-3 sm:pt-4 border-t-2 border-black/10 flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-black/50 font-semibold">
                      Aluma Salon &bull; Real Transformations
                    </span>
                    <div className="block">
                      <svg
                        width="110"
                        height="18"
                        viewBox="0 0 237 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="opacity-80"
                      >
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
          </div>

          {/* Luxury Salon Rating Badge / Footer Element */}
          <div className="section__side-element mt-8 flex justify-end">
            <button
              type="button"
              onClick={onOpenBooking}
              className="btn btn--terciary bg-white text-black px-6 py-3.5 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#0B0C10] flex items-center gap-4 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#0B0C10] transition-all cursor-pointer"
            >
              <div className="CTA_cta__container__fdNH_ flex items-center gap-3">
                <span className="key w-8 h-8 rounded-full bg-[#20B364] text-black text-sm flex items-center justify-center font-bold border border-black">
                  ★
                </span>
                <div className="text-left">
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                    500+ Verified 5-Star Reviews
                  </div>
                  <div className="text-[11px] text-black/60 font-mono">
                    Rated 4.9 on Google &bull; Click to Reserve
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
