export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  price: string;
  icon?: string;
  tag?: string;
}

export interface PackageItem {
  id: string;
  name: string;
  tagline: string;
  idealFor: string;
  price: string;
  duration: string;
  featured?: boolean;
  inclusions: string[];
}

export interface TransformationItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  stylist: string;
  technique: string;
  beforeImg: string;
  afterImg: string;
  description: string;
}

export interface StylistItem {
  id: string;
  name: string;
  role: string;
  experience: string;
  speciality: string;
  image: string;
  accolade: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  publication: string;
  year: string;
  rating: number;
}

export interface StatItem {
  number: number;
  suffix: string;
  label: string;
  description: string;
}

export const salonData = {
  brand: {
    name: "ALUMA",
    fullName: "Aluma Salon & Aesthetic Sanctuary",
    tagline: "Architecture of Hair, Precision Care & Sensory Rituals",
    shortTagline: "Precision Cuts • Bespoke Colour • Pure Rituals",
    city: "Bangalore • Whitefield • HSR Layout • Sarjapur",
    established: "2018",
    promise: "Your look, our promise.",
    promiseParagraph:
      "Be part of a grooming and aesthetic experience that redefines quality, time, and trust. Combining French balayage alchemy, L'Oréal molecular smoothening, and rejuvenating Japanese micro-mist hair spas, Aluma shapes hair into architectural form and effortless beauty.",
    logoSvg: "/aluma-assets/logo.svg",
    heroYouTubeId: "-FnrCZJw6TE",
    heroYouTubeUrl: "https://youtu.be/-FnrCZJw6TE?si=c5fhdUcZxtjQq9_l",
    heroVideo: "/videos/hero-salon.mp4",
    galleryVideo: "/aluma-assets/ALUMA.036187e7de1663d09d1a.mp4",
    heroImage: "/aluma-assets/aluma-white-hero.4e1788185e4dce97f3b3.jpeg",
    receptionImage: "/aluma-assets/aluma-reception.73904b87bb650e2ccb78.jpeg",
    galleryHero: "/aluma-assets/aluma-img-gallery.16ce735e76e1b6971ef5.jpeg",
  },

  chapters: [
    { id: "promise", roman: "Chapter I", title: "Genesis & Promise", anchor: "#promise" },
    { id: "services", roman: "Chapter II", title: "Haute Services", anchor: "#services" },
    { id: "packages", roman: "Chapter III", title: "Signature Curation", anchor: "#packages" },
    { id: "transformations", roman: "Chapter IV", title: "Transformations", anchor: "#transformations" },
    { id: "team", roman: "Chapter V", title: "The Atelier Artists", anchor: "#team" },
    { id: "booking", roman: "Chapter VI", title: "Sanctuary Concierge", anchor: "#booking" },
  ],

  navLinks: [
    { name: "About", href: "/about" },
    { name: "Services", href: "/#services" },
    { name: "Packages", href: "/#packages" },
    { name: "Work", href: "/#transformations" },
    { name: "Team", href: "/#team" },
    { name: "Press", href: "/#press" },
    { name: "Contact", href: "/#booking" },
  ],

  stats: [
    { number: 8, suffix: "+", label: "Years of Craft", description: "Sanctuaries in Whitefield, HSR Layout & Sarjapur" },
    { number: 35000, suffix: "+", label: "Clients Transformed", description: "From red carpet looks to seamless daily luxury" },
    { number: 28, suffix: "", label: "Industry Accolades", description: "Top Rated Luxury Salon & Hair Spa Excellence" },
    { number: 100, suffix: "%", label: "Botanical Integrity", description: "Premium L'Oréal, Moroccanoil & vegan organic elixirs" },
  ],

  services: [
    {
      id: "cut-sculpt",
      number: "01",
      title: "Architectural Cut, Wash & Blow-Dry",
      category: "Sculpting & Form",
      shortDesc: "Geometric dry carving tailored to facial bone profile, natural crown growth, and effortless air-dry texture.",
      fullDesc: "Comprehensive consultation evaluating head shape, hair density and personal lifestyle, followed by deep botanical hair wash and signature blow-dry sculpt.",
      duration: "60 min",
      price: "₹1,499",
      icon: "/aluma-assets/hairCutF.c6cb2ee78d84e9a37b6f.png",
      tag: "Signature"
    },
    {
      id: "french-balayage",
      number: "02",
      title: "Global Hair Colour & French Balayage",
      category: "Colour Chemistry",
      shortDesc: "Hand-painted dimensional contouring paired with diamond gloss glaze for seamless, lived-in multi-tonal radiance.",
      fullDesc: "Freehand artisanal light placement with organic bond-protecting peptides, followed by a personalized acid-balanced gloss infusion.",
      duration: "180 min",
      price: "₹4,999",
      icon: "/aluma-assets/haircolorF.6f5b1a1c602c52d43689.png",
      tag: "Most Requested"
    },
    {
      id: "japanese-head-spa",
      number: "03",
      title: "Japanese Micro-Mist Hair Spa & Scalp Detox",
      category: "Scalp & Trichology",
      shortDesc: "Cellular scalp detox, ultrasonic mist diffusion, shiatsu acupressure, and deep thermal lymphatic drainage.",
      fullDesc: "Follicular diagnosis followed by carbonated water cleansing, bespoke herbal elixirs, hydrotherapy rainfall, and 30-minute tension release.",
      duration: "90 min",
      price: "₹2,499",
      icon: "/aluma-assets/spaF.088f3537cefc6bf256d1.png",
      tag: "Sensory Ritual"
    },
    {
      id: "botanical-keratin",
      number: "04",
      title: "L'Oréal Molecular Smoothening & Keratin Glass",
      category: "Restoration",
      shortDesc: "Formaldehyde-free smoothing elixir enriched with silk amino acids and velvet lipid seal for mirror-like light reflection.",
      fullDesc: "Thermal bond-sealing ritual that eliminates humidity frizz, seals the cuticle, and creates effortless manageability for up to 6 months.",
      duration: "150 min",
      price: "₹5,999",
      icon: "/aluma-assets/treatmentsF.9128d5ce138c0e09ae6b.png",
    },
    {
      id: "couture-bridal",
      number: "05",
      title: "Couture Bridal & Session Metamorphosis",
      category: "High Occasion",
      shortDesc: "Runway-standard editorial styling, bespoke hair extensions integration, veil fitting, and humidity-lock setting.",
      fullDesc: "Comprehensive pre-event rehearsal, day-of champagne suite access, custom hair architecture, and 12-hour veil placement concierge.",
      duration: "120 min",
      price: "₹7,999",
      icon: "/aluma-assets/brideF.b368b3b3ce3801b10be8.png",
      tag: "Editorial"
    },
    {
      id: "moroccanoil-repair",
      number: "06",
      title: "Moroccanoil Deep Hydration & Cellular Facial Glow",
      category: "Aesthetics & Care",
      shortDesc: "Pure argan oil infusion with thermal steam wrap paired with hydrating facial skin glow therapy.",
      fullDesc: "Deep restorative lipid therapy repairing thermal damage and split ends, complemented with organic cold-stone facial massage.",
      duration: "75 min",
      price: "₹2,899",
      icon: "/aluma-assets/facialF.bbedf77ea8b7c6117056.png",
    }
  ] as ServiceItem[],

  packages: [
    {
      id: "luminary-bride",
      name: "The Luminary Bride",
      tagline: "Couture Wedding Morning Metamorphosis",
      idealFor: "Brides seeking runway perfection, veil precision, and calm sanctuary luxury",
      price: "₹14,999",
      duration: "Full Atelier Access (4h)",
      featured: true,
      inclusions: [
        "In-depth 90-min bridal rehearsal & hair silhouette study",
        "Private VIP Lounge suite with dedicated bridal master",
        "Bespoke Couture Updo or Romantic French Waves",
        "Caviar Diamond Gloss pre-treatment 48h prior",
        "Day-of veil setting & jewelry placement concierge",
        "Luxury touch-up kit with mini serum & silk scrunchie"
      ]
    },
    {
      id: "balayage-mastery",
      name: "Balayage Haute Alchemy",
      tagline: "Total Light Transformation & Molecular Restoration",
      idealFor: "Those desiring effortless Parisian blonde, caramel, or hazel richness",
      price: "₹7,499",
      duration: "3.5 Hours",
      featured: false,
      inclusions: [
        "Complete bespoke freehand French balayage painting",
        "Double gloss toning & dimensional shadow rooting",
        "Molecular bond builder infusion (L'Oréal Absolut / K18)",
        "Botanical steam hair bath & scalp massage",
        "Signature blowout & editorial wave finish",
        "Tailored color-lock home care regimen consultation"
      ]
    },
    {
      id: "sensory-rejuvenation",
      name: "The Head Spa Metamorphosis",
      tagline: "Total Cellular Hair & Scalp Reset",
      idealFor: "Relieving city fatigue, scalp stress, and dry lifeless tresses",
      price: "₹3,999",
      duration: "2.5 Hours",
      featured: false,
      inclusions: [
        "High-definition 200x scalp microscopic follicle scan",
        "Carbonated detox bath & volcanic clay exfoliating mask",
        "Ultrasonic warm micro-mist moisture infusion",
        "Cervical & shoulder lymphatic shiatsu massage",
        "Custom peptide mask & cold stone facial roll",
        "Velvet blowout & botanical serum finish"
      ]
    }
  ] as PackageItem[],

  transformations: [
    {
      id: "transformation-1",
      number: "01",
      title: "Sun-Melted Cashmere Balayage",
      subtitle: "From Brassy Warmth to Parisian Luminescence",
      stylist: "Elena Vance",
      technique: "Micro-fine babylights + Champagne Ash Gloss melt",
      beforeImg: "/aluma-assets/1.9a20ad56f5e45297ab41.jpeg",
      afterImg: "/aluma-assets/1.66e60b3584f79fa15f73.jpeg",
      description: "Neutralized heavy brassy copper undertones into a seamless, sun-kissed butterscotch and cool cashmere blend with zero demarcation lines."
    },
    {
      id: "transformation-2",
      number: "02",
      title: "Architectural French Bob & Bevel Texture",
      subtitle: "Sculpted Weight Distribution for Heavy Density",
      stylist: "Marc de Luca",
      technique: "Geometric dry carving & bevel point texturizing",
      beforeImg: "/aluma-assets/2.8b064a173e63d6ed3fa3.jpeg",
      afterImg: "/aluma-assets/2.175bc3a5a880c24374a5.jpeg",
      description: "Removed heavy weight to accentuate jawline and cheekbones, introducing French curtain fringe that falls effortlessly with air drying."
    },
    {
      id: "transformation-3",
      number: "03",
      title: "Liquid Glass Keratin Metamorphosis",
      subtitle: "Porous Frizzy Waves to High-Gloss Silk",
      stylist: "Camille Laurent",
      technique: "Amino acid lipid infusion + thermo-sealing glaze",
      beforeImg: "/aluma-assets/3.e134b0f0a22bde24ec90.jpeg",
      afterImg: "/aluma-assets/3.875fe58dc82f9f707edc.jpeg",
      description: "Restored elasticity and lipid moisture to compromised locks, sealing the cuticles for a high-gloss, mirror-like patent reflection."
    },
    {
      id: "transformation-4",
      number: "04",
      title: "Dimensional Hazelnut & Copper Bronze Melt",
      subtitle: "Monotone Dark to Multidimensional Warmth",
      stylist: "Elena Vance",
      technique: "Dual-tone foilayage + copper amber glaze",
      beforeImg: "/aluma-assets/4.0a0569526b29df9391da.jpeg",
      afterImg: "/aluma-assets/4.609f20aa85a6c301b923.jpeg",
      description: "Transformed flat dark tresses into a vibrant multi-tonal symphony of molten bronze, cinnamon, and apricot gold highlights."
    }
  ] as TransformationItem[],

  team: [
    {
      id: "elena",
      name: "Elena Vance",
      role: "Creative Director & Master Colorist",
      experience: "14 Years of Craft",
      speciality: "Bespoke Balayage & Colour Alchemy",
      image: "/aluma-assets/5.24ac1a61c30e876d652c.jpeg",
      accolade: "Master of French Balayage Contouring"
    },
    {
      id: "marc",
      name: "Marc de Luca",
      role: "Head of Precision Sculpting",
      experience: "12 Years of Craft",
      speciality: "Geometric Dry Carving & Bobs",
      image: "/aluma-assets/v8_2.6932c064f31dc7c535b2.jpeg",
      accolade: "Architectural Silhouette Specialist"
    },
    {
      id: "soren",
      name: "Soren Al-Mansoor",
      role: "Trichology & Head Spa Master",
      experience: "10 Years of Craft",
      speciality: "Micro-Mist Scalp Regeneration",
      image: "/aluma-assets/haircut.d7f2cdd9661c752f3eeb.jpeg",
      accolade: "Certified Scalp & Follicular Health Specialist"
    },
    {
      id: "camille",
      name: "Camille Laurent",
      role: "Couture Bridal & Session Lead",
      experience: "11 Years of Craft",
      speciality: "Bridal Architecture & Hair Extensions",
      image: "/aluma-assets/1.66e60b3584f79fa15f73.jpeg",
      accolade: "Lead Stylist for High Occasion & Bridal"
    }
  ] as StylistItem[],

  pressQuotes: [
    {
      id: "vogue",
      publication: "VOGUE",
      quote: "Aluma has rewritten the luxury salon lexicon. The attention to bone geometry, botanical chemistry and calming ambience is transcendent.",
      author: "Olivia Sterling",
      role: "Senior Beauty Editor",
      year: "2025",
      rating: 5
    },
    {
      id: "harpers",
      publication: "HARPER'S BAZAAR",
      quote: "A quiet sanctuary away from city chaos where hair is treated as living sculpture. The Japanese Head Spa alone is worth a pilgrimage.",
      author: "Margot Fontaine",
      role: "Lifestyle Director",
      year: "2025",
      rating: 5
    },
    {
      id: "elle",
      publication: "ELLE INTERNATIONAL",
      quote: "The Balayage Haute Alchemy is the gold standard of natural, undetectable light placement. Pure understated modern luxury.",
      author: "Chloe Dubois",
      role: "Creative Contributor",
      year: "2024",
      rating: 5
    },
    {
      id: "vanityfair",
      publication: "VANITY FAIR",
      quote: "Bangalore’s most discreet luxury oasis. Where private consultation meets meticulous artistic execution.",
      author: "Julian Hayes",
      role: "Culture & Style Columnist",
      year: "2024",
      rating: 5
    }
  ] as TestimonialItem[],

  contact: {
    addressLine1: "Aluma Flagship Atelier, Whitefield",
    addressLine2: "HSR Layout • Sarjapur Road • Bangalore - 560100",
    city: "Bangalore",
    phone: "+91 90195 55087",
    altPhone: "+91 78929 62859",
    whatsapp: "919019555087",
    whatsappFormatted: "+91 90195 55087",
    email: "support@aluma.salon",
    instagram: "@aluma.salon",
    instagramUrl: "https://www.instagram.com/aluma.salon/",
    appUrl: "https://apps.apple.com/in/app/aluma-salon/id6498151574",
    hours: [
      { days: "Monday – Friday", hours: "09:00 – 21:00" },
      { days: "Saturday", hours: "08:30 – 21:30" },
      { days: "Sunday", hours: "09:00 – 21:00" }
    ],
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.750529899321!2d77.6756756!3d12.9101734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13768b209d8d%3A0xb35a75697223e717!2sAluma%20Salon!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  }
};
