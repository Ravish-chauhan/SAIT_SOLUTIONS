'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronRight,
  RotateCcw,
  Send,
  Edit3,
  SlidersHorizontal,
  Bookmark,
  Trash2,
  X,
  HelpCircle,
  MessageCircle,
  Plus,
  ArrowRight,
  Cpu, 
  Layers, 
  Monitor, 
  HardDrive, 
  Zap, 
  Box, 
  Wind,
  Tv,
  Fan,
  FileCheck,
  ShieldCheck,
  Headphones,
  CreditCard,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface ComponentCategory {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  required: boolean;
  isExtra?: boolean;
  options: string[];
}

const PC_BUILD_CATEGORIES: ComponentCategory[] = [
  {
    id: 'cpu',
    name: 'Processor (CPU)',
    subtitle: 'Choose your processor',
    icon: <Cpu className="w-4 h-4 text-[#5b21b6]" />,
    required: true,
    options: [
      'Intel Core i3 12100F (4 Cores / 8 Threads)',
      'Intel Core i3 14100F (4 Cores / 8 Threads)',
      'Intel Core i5 12400F (6 Cores / 12 Threads)',
      'Intel Core i5 13400F (10 Cores / 16 Threads)',
      'Intel Core i5 13600K (14 Cores / 20 Threads)',
      'Intel Core i5 14400F (10 Cores / 16 Threads)',
      'Intel Core i5 14600K (14 Cores / 20 Threads)',
      'Intel Core i7 13700K (16 Cores / 24 Threads)',
      'Intel Core i7 14700K (20 Cores / 28 Threads)',
      'Intel Core i9 13900K (24 Cores / 32 Threads)',
      'Intel Core i9 14900K (24 Cores / 32 Threads)',
      'AMD Ryzen 5 5500 (6 Cores / 12 Threads - AM4)',
      'AMD Ryzen 5 5600 (6 Cores / 12 Threads - AM4)',
      'AMD Ryzen 5 5600X (6 Cores / 12 Threads - AM4)',
      'AMD Ryzen 7 5700X (8 Cores / 16 Threads - AM4)',
      'AMD Ryzen 7 5800X3D (8 Cores / 16 Threads - AM4)',
      'AMD Ryzen 5 7500F (6 Cores / 12 Threads - AM5)',
      'AMD Ryzen 5 7600 (6 Cores / 12 Threads - AM5)',
      'AMD Ryzen 5 7600X (6 Cores / 12 Threads - AM5)',
      'AMD Ryzen 7 7700X (8 Cores / 16 Threads - AM5)',
      'AMD Ryzen 7 7800X3D (8 Cores / 16 Threads - Best Gaming)',
      'AMD Ryzen 9 7900X (12 Cores / 24 Threads - AM5)',
      'AMD Ryzen 9 7950X (16 Cores / 32 Threads - AM5)',
      'AMD Ryzen 9 7950X3D (16 Cores / 32 Threads - AM5)',
    ],
  },
  {
    id: 'motherboard',
    name: 'Motherboard',
    subtitle: 'Choose your motherboard',
    icon: <Layers className="w-4 h-4 text-[#5b21b6]" />,
    required: true,
    options: [
      'ASUS / MSI / Gigabyte H610M DDR4 (Intel LGA1700)',
      'ASUS / MSI / Gigabyte B760M DDR4 Gaming (Intel LGA1700)',
      'ASUS / MSI / Gigabyte B760M DDR5 Wi-Fi (Intel LGA1700)',
      'ASUS ROG Strix / MSI MAG Z790 DDR5 Gaming (Intel LGA1700)',
      'ASUS / MSI / Gigabyte A520M (AMD AM4)',
      'ASUS TUF / MSI MAG B550M Wi-Fi (AMD AM4)',
      'ASUS / MSI / Gigabyte A620M (AMD AM5)',
      'ASUS TUF / MSI MAG B650M Wi-Fi Gaming (AMD AM5)',
      'Gigabyte AORUS / MSI MAG B650 DDR5 ATX (AMD AM5)',
      'ASUS ROG Strix / MSI MEG X670E Premium (AMD AM5)',
    ],
  },
  {
    id: 'gpu',
    name: 'Graphics Card (GPU)',
    subtitle: 'Choose your graphics card',
    icon: <Monitor className="w-4 h-4 text-[#5b21b6]" />,
    required: true,
    options: [
      'Integrated Graphics (No Dedicated GPU)',
      'NVIDIA GeForce GTX 1650 4GB GDDR6',
      'NVIDIA GeForce RTX 3050 6GB / 8GB',
      'NVIDIA GeForce RTX 3060 12GB GDDR6',
      'NVIDIA GeForce RTX 4060 8GB GDDR6 (ASUS / MSI / Zotac / Gigabyte)',
      'NVIDIA GeForce RTX 4060 Ti 8GB / 16GB GDDR6',
      'NVIDIA GeForce RTX 4070 12GB GDDR6X',
      'NVIDIA GeForce RTX 4070 Super 12GB GDDR6X',
      'NVIDIA GeForce RTX 4070 Ti Super 16GB GDDR6X',
      'NVIDIA GeForce RTX 4080 Super 16GB GDDR6X',
      'NVIDIA GeForce RTX 4090 24GB Extreme GDDR6X',
      'AMD Radeon RX 6600 8GB GDDR6',
      'AMD Radeon RX 7600 8GB GDDR6',
      'AMD Radeon RX 7700 XT 12GB GDDR6',
      'AMD Radeon RX 7800 XT 16GB GDDR6',
      'AMD Radeon RX 7900 XT / XTX 20GB / 24GB',
    ],
  },
  {
    id: 'ram',
    name: 'RAM',
    subtitle: 'Choose your memory',
    icon: <Zap className="w-4 h-4 text-[#5b21b6]" />,
    required: true,
    options: [
      '8GB DDR4 3200MHz (Corsair / G.Skill / Kingston)',
      '16GB (8GB x 2) DDR4 3200MHz Dual Channel',
      '32GB (16GB x 2) DDR4 3600MHz Dual Channel',
      '16GB (16GB x 1) DDR5 5200MHz / 5600MHz High Speed',
      '32GB (16GB x 2) DDR5 6000MHz CL30 RGB Gaming (Corsair / G.Skill / XPG)',
      '64GB (32GB x 2) DDR5 6000MHz RGB Workstation RAM',
      '128GB (32GB x 4) DDR5 6000MHz Heavy Render Workstation RAM',
    ],
  },
  {
    id: 'ssd',
    name: 'Storage (SSD)',
    subtitle: 'Choose your primary storage',
    icon: <HardDrive className="w-4 h-4 text-[#5b21b6]" />,
    required: true,
    options: [
      '512GB M.2 NVMe PCIe Gen3 (Crucial / Kingston / WD)',
      '1TB M.2 NVMe PCIe Gen4 High Speed SSD (Up to 7000MB/s)',
      '1TB Samsung 990 Pro / WD Black SN850X Gen4 NVMe SSD',
      '2TB M.2 NVMe PCIe Gen4 High Speed SSD (Crucial / Kingston)',
      '2TB Samsung 990 Pro / WD Black SN850X Gen4 NVMe SSD',
      '4TB M.2 NVMe PCIe Gen4 Extreme Speed SSD',
    ],
  },
  {
    id: 'psu',
    name: 'Power Supply (PSU)',
    subtitle: 'Choose your power supply',
    icon: <Zap className="w-4 h-4 text-[#5b21b6]" />,
    required: true,
    options: [
      '450W 80+ Bronze Certified Power Supply (Ant Esports / DeepCool)',
      '550W 80+ Bronze Certified Power Supply (Corsair / DeepCool)',
      '650W 80+ Bronze Certified Power Supply (Corsair CV650 / DeepCool PK650D)',
      '750W 80+ Gold Fully Modular Power Supply (Corsair RM750e / DeepCool)',
      '850W 80+ Gold ATX 3.0 Modular Power Supply (Corsair / DeepCool / Cooler Master)',
      '1000W 80+ Gold / Platinum ATX 3.0 PCIe 5.0 PSU (Corsair / Seasonic)',
      '1200W+ 80+ Platinum Extreme Modular Power Supply',
    ],
  },
  {
    id: 'cabinet',
    name: 'Cabinet',
    subtitle: 'Choose your cabinet',
    icon: <Box className="w-4 h-4 text-[#5b21b6]" />,
    required: true,
    options: [
      'Standard ATX Cabinet with Front RGB',
      'Ant Esports ICE-110 / ICE-200 / ICE-511 Mesh RGB',
      'DeepCool CC560 / CH560 Digital ARGB Mesh Case',
      'Cooler Master MasterBox TD500 Mesh V2 ARGB Case',
      'Corsair 4000D Airflow / 5000D Airflow Gaming Case',
      'Lian Li O11 Dynamic EVO / Vision Dual Chamber Panoramic Case',
      'NZXT H6 Flow / H9 Flow Panoramic RGB Case',
      'Antec Performance 1 FT / C8 Mesh Gaming Case',
    ],
  },
  {
    id: 'cooler',
    name: 'CPU Cooler',
    subtitle: 'Choose your cooler',
    icon: <Wind className="w-4 h-4 text-[#5b21b6]" />,
    required: true,
    options: [
      'Stock Air Cooler (Included with Processor)',
      'DeepCool AK400 / AG400 ARGB Single Tower Air Cooler',
      'DeepCool AK620 / Thermalright Peerless Assassin Dual Tower Air Cooler',
      'Cooler Master / DeepCool 240mm ARGB Liquid AIO Cooler',
      'Cooler Master / DeepCool 360mm ARGB Liquid AIO Cooler',
      'Lian Li Galahad II / NZXT Kraken 360 RGB LCD Display AIO Cooler',
    ],
  },
  {
    id: 'os',
    name: 'Operating System',
    subtitle: 'Choose your OS',
    icon: <FileCheck className="w-4 h-4 text-[#5b21b6]" />,
    required: true,
    options: [
      'Trial / DOS Setup (Free Pre-Installation & Drivers)',
      'Windows 11 Home 64-bit OEM',
      'Windows 11 Pro 64-bit OEM',
    ],
  },
  {
    id: 'hdd',
    name: 'Secondary Storage (HDD / SATA SSD)',
    subtitle: 'Optional additional storage',
    icon: <HardDrive className="w-4 h-4 text-[#5b21b6]" />,
    required: false,
    isExtra: true,
    options: [
      'None (Primary SSD Only)',
      '1TB Seagate Barracuda / WD Blue 7200RPM HDD',
      '2TB Seagate Barracuda / WD Blue 7200RPM HDD',
      '4TB Seagate IronWolf / WD Purple Surveillance HDD',
      '1TB SATA III 2.5" High Speed SSD',
      '2TB SATA III 2.5" High Speed SSD',
    ],
  },
  {
    id: 'fans',
    name: 'Cabinet Fans',
    subtitle: 'Optional ARGB fan pack',
    icon: <Fan className="w-4 h-4 text-[#5b21b6]" />,
    required: false,
    isExtra: true,
    options: [
      'Default Included Case Fans Only',
      '3x 120mm ARGB High Airflow Fan Pack + Hub',
      '6x 120mm ARGB High Airflow Fan Pack + Controller',
      'Lian Li UNI FAN SL-Infinity 120 (3 Pack)',
    ],
  },
  {
    id: 'monitor',
    name: 'Monitor / Display',
    subtitle: 'Optional display monitor',
    icon: <Tv className="w-4 h-4 text-[#5b21b6]" />,
    required: false,
    isExtra: true,
    options: [
      'None (Tower Only)',
      '22" Full HD 75Hz Office Monitor (Acer / LG / Samsung)',
      '24" Full HD 100Hz / 180Hz IPS Gaming Monitor (Acer / ViewSonic / MSI)',
      '27" QHD (2K 1440p) 180Hz IPS Gaming Monitor (LG Ultragear / Gigabyte)',
      '32" 4K UHD 144Hz Professional / Gaming Monitor',
    ],
  },
];

export default function CustomPcClient() {
  const [showExtraAccessories, setShowExtraAccessories] = useState(false);

  const [selections, setSelections] = useState<Record<string, { value: string; customText?: string }>>({
    cpu: { value: PC_BUILD_CATEGORIES[0].options[3] }, // i5 13400F
    motherboard: { value: PC_BUILD_CATEGORIES[1].options[1] }, // B760M
    gpu: { value: PC_BUILD_CATEGORIES[2].options[4] }, // RTX 4060
    ram: { value: PC_BUILD_CATEGORIES[3].options[1] }, // 16GB
    ssd: { value: PC_BUILD_CATEGORIES[4].options[1] }, // 1TB NVMe
    psu: { value: PC_BUILD_CATEGORIES[5].options[2] }, // 650W
    cabinet: { value: PC_BUILD_CATEGORIES[6].options[1] }, // Ant Esports
    cooler: { value: PC_BUILD_CATEGORIES[7].options[1] }, // AK400
    os: { value: PC_BUILD_CATEGORIES[8].options[1] }, // Windows 11 Home
  });

  const handleSelectChange = (catId: string, value: string) => {
    if (value === 'CUSTOM_INPUT') {
      setSelections((prev) => ({
        ...prev,
        [catId]: { value: 'CUSTOM_INPUT', customText: '' },
      }));
    } else {
      setSelections((prev) => ({
        ...prev,
        [catId]: { value },
      }));
    }
  };

  const handleCustomTextChange = (catId: string, text: string) => {
    setSelections((prev) => ({
      ...prev,
      [catId]: {
        ...prev[catId],
        customText: text,
      },
    }));
  };

  const removeItem = (catId: string) => {
    setSelections((prev) => {
      const copy = { ...prev };
      delete copy[catId];
      return copy;
    });
  };

  const resetAll = () => {
    setSelections({
      cpu: { value: PC_BUILD_CATEGORIES[0].options[3] },
      motherboard: { value: PC_BUILD_CATEGORIES[1].options[1] },
      gpu: { value: PC_BUILD_CATEGORIES[2].options[4] },
      ram: { value: PC_BUILD_CATEGORIES[3].options[1] },
      ssd: { value: PC_BUILD_CATEGORIES[4].options[1] },
      psu: { value: PC_BUILD_CATEGORIES[5].options[2] },
      cabinet: { value: PC_BUILD_CATEGORIES[7].options[1] },
      cooler: { value: PC_BUILD_CATEGORIES[8].options[1] },
      os: { value: PC_BUILD_CATEGORIES[9].options[1] },
    });
    setShowExtraAccessories(false);
  };

  // Format WhatsApp quotation message
  const generateWhatsAppMessage = () => {
    let msg = `🖥️ *CUSTOM PC BUILD QUOTATION REQUEST*\n`;
    msg += `------------------------------------\n`;

    PC_BUILD_CATEGORIES.forEach((cat) => {
      const sel = selections[cat.id];
      if (sel && sel.value && sel.value !== 'None (Primary SSD Only)' && sel.value !== 'None (Tower Only)') {
        let textVal = sel.value === 'CUSTOM_INPUT' 
          ? (sel.customText?.trim() ? `Custom: ${sel.customText.trim()}` : 'Custom model (to specify)') 
          : sel.value;
        msg += `• *${cat.name}:* ${textVal}\n`;
      }
    });

    msg += `------------------------------------\n`;
    msg += `Hi Sait Solutions, please check component availability and provide your best wholesale quotation for this build.`;
    return msg;
  };

  const whatsappUrl = `https://wa.me/919369991770?text=${encodeURIComponent(generateWhatsAppMessage())}`;

  const activeCategories = PC_BUILD_CATEGORIES.filter((c) => !c.isExtra || showExtraAccessories);

  return (
    <div className="bg-[#f8fafc] min-h-screen py-6 md:py-10 font-sans text-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 space-y-6">
        
        {/* 1. BREADCRUMBS */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-[#5b21b6] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Custom PC Builder</span>
        </div>

        {/* 2. SIMPLE TOP HEADER (Exact Match with Image) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-2">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Custom PC Builder
              </h1>
              <div className="p-1.5 rounded-lg bg-purple-50 text-[#5b21b6] border border-purple-100">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs md:text-sm text-slate-500 font-medium mt-1">
              <span>Select the best components and build your dream PC.</span>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#5b21b6] hover:underline font-bold inline-flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Need Help?</span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-purple-200 text-[#5b21b6] bg-white hover:bg-purple-50 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Save Build</span>
            </a>

            <button
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rose-200 text-rose-600 bg-white hover:bg-rose-50 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        </div>

        {/* 3. TWO COLUMN MAIN BUILDER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Select Components Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 md:p-7 shadow-sm space-y-6">
            
            {/* Left Card Header */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span className="w-6 h-6 rounded-full bg-[#5b21b6] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                1
              </span>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Select Components
              </h2>
            </div>

            {/* List of Component Rows */}
            <div className="space-y-4">
              {activeCategories.map((cat) => {
                const currentSel = selections[cat.id] || { value: '' };
                const isCustom = currentSel.value === 'CUSTOM_INPUT';

                return (
                  <div key={cat.id} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      
                      {/* Left: Category Icon & Title */}
                      <div className="flex items-center gap-3 sm:w-5/12 shrink-0">
                        <div className="p-2.5 rounded-xl bg-purple-50/80 text-[#5b21b6] shrink-0 border border-purple-100/60">
                          {cat.icon}
                        </div>
                        <div>
                          <h3 className="text-xs font-extrabold text-slate-900 leading-tight">
                            {cat.name}
                          </h3>
                          <span className="text-[10.5px] text-slate-400 font-medium block mt-0.5">
                            {cat.subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Right: Dropdown Select Box & Arrow Button */}
                      <div className="flex items-center gap-2 flex-1 w-full">
                        <select
                          value={currentSel.value}
                          onChange={(e) => handleSelectChange(cat.id, e.target.value)}
                          className="w-full bg-slate-50/90 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#5b21b6] focus:bg-white transition-all cursor-pointer truncate"
                        >
                          {cat.options.map((optLabel, oIdx) => (
                            <option key={oIdx} value={optLabel}>
                              {optLabel}
                            </option>
                          ))}
                          <option value="CUSTOM_INPUT">✏️ Other / Enter Custom Model Manually...</option>
                        </select>

                        <div className="w-9 h-9 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 text-slate-500">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>

                    </div>

                    {/* Custom Input Field */}
                    {isCustom && (
                      <div className="pl-0 sm:pl-[44%] pt-1">
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-slate-400">
                            <Edit3 className="w-3.5 h-3.5" />
                          </span>
                          <input
                            type="text"
                            placeholder={`Type custom ${cat.name} model...`}
                            value={currentSel.customText || ''}
                            onChange={(e) => handleCustomTextChange(cat.id, e.target.value)}
                            className="w-full bg-purple-50/40 border border-purple-200 rounded-xl pl-9 pr-3 py-2 text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#5b21b6] transition-all"
                            autoFocus
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Add More Accessories Toggle Button */}
            {!showExtraAccessories && (
              <div className="pt-2">
                <button
                  onClick={() => setShowExtraAccessories(true)}
                  className="w-full border-2 border-dashed border-purple-200 hover:border-purple-400 bg-purple-50/30 hover:bg-purple-50 text-[#5b21b6] font-extrabold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add More Accessories (Monitor, Fans, Secondary Storage)</span>
                </button>
              </div>
            )}

          </div>

          {/* Right Column: Your Custom Build Card (No Images & No Prices) */}
          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 md:p-7 shadow-sm space-y-6 lg:sticky lg:top-20">
            
            {/* Right Card Header */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span className="w-6 h-6 rounded-full bg-[#5b21b6] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                2
              </span>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Your Custom Build
              </h2>
            </div>

            {/* Selected Components Itemized List */}
            <div className="space-y-3.5 max-h-[440px] overflow-y-auto pr-1 text-xs divide-y divide-slate-100">
              {PC_BUILD_CATEGORIES.map((cat) => {
                const sel = selections[cat.id];
                if (!sel || !sel.value || sel.value === 'None (Primary SSD Only)' || sel.value === 'None (Tower Only)') return null;
                const isCustom = sel.value === 'CUSTOM_INPUT';
                const displayTitle = isCustom ? (sel.customText?.trim() || 'Custom Model Specified') : sel.value;

                return (
                  <div key={cat.id} className="pt-3 first:pt-0 flex items-start justify-between gap-3 group">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-extrabold text-slate-900 block">
                        {displayTitle}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        {cat.name}
                      </span>
                    </div>

                    <button
                      onClick={() => removeItem(cat.id)}
                      className="text-slate-300 hover:text-rose-500 transition-colors p-1 shrink-0 cursor-pointer"
                      title="Remove item"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Bottom Action Buttons (Green WhatsApp & Request a Quote) */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1ebe5a] text-white rounded-xl py-3 px-4 font-extrabold text-xs tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md transition-all active:scale-95 text-center"
              >
                <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                <span>Ask on WhatsApp</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white hover:bg-purple-50 text-[#5b21b6] border-2 border-purple-200 hover:border-purple-300 rounded-xl py-2.5 px-4 font-extrabold text-xs tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 text-center"
              >
                <Send className="w-3.5 h-3.5 shrink-0" />
                <span>Request a Quote</span>
              </a>
            </div>

          </div>

        </div>

        {/* 4. BOTTOM TRUST BADGES STRIP (Exact Match with Image) */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 md:p-6 grid grid-cols-2 md:grid-cols-5 gap-4 text-xs">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 text-[#5b21b6] shrink-0 border border-purple-100">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 leading-tight">100% Genuine Products</div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">Official brand warranty</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 text-[#5b21b6] shrink-0 border border-purple-100">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 leading-tight">Expert Support</div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">Get help from experts</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 text-[#5b21b6] shrink-0 border border-purple-100">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 leading-tight">Best Price Guarantee</div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">We match the best price</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 text-[#5b21b6] shrink-0 border border-purple-100">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 leading-tight">Secure Payments</div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">Multiple payment options</div>
            </div>
          </div>

          <div className="flex items-center gap-3 col-span-2 md:col-span-1">
            <div className="p-2.5 rounded-xl bg-purple-50 text-[#5b21b6] shrink-0 border border-purple-100">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 leading-tight">Easy Exchange</div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">Replacement warranty</div>
            </div>
          </div>

        </div>

        {/* 5. BOTTOM EXPERT ASSISTANCE BANNER STRIP (Exact Match with Image) */}
        <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#5b21b6] text-white shrink-0 shadow-sm mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm md:text-base">Not sure what to choose?</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Our IT hardware experts can help you build the perfect custom PC for your specific needs and budget.
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-purple-50 text-[#5b21b6] border border-purple-200 font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat with Expert</span>
          </a>
        </div>

      </div>
    </div>
  );
}
