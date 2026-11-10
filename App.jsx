import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Heart, Palette, Globe, Image as ImageIcon, Plus, Trash2, 
  Settings, ChevronLeft, ChevronRight, X, ExternalLink, Mail, MessageSquare, 
  Instagram, Twitter, Facebook, CheckCircle2, Clock, AlertCircle, Eye, Upload, RefreshCw
} from 'lucide-react';

// Default Themes Palette
const THEMES = {
  pink: {
    id: 'pink',
    name: 'Cotton Candy',
    bg: '#fdf2f8',
    primary: '#f472b6',
    primaryHover: '#ec4899',
    text: '#9d174d',
    cardBg: '#ffffffcc',
    border: '#fbcfe8',
    accentBg: '#fce7f3',
    accentText: '#be185d',
    gradient: 'from-pink-300 via-purple-200 to-indigo-200'
  },
  lavender: {
    id: 'lavender',
    name: 'Soft Lavender',
    bg: '#faf5ff',
    primary: '#c084fc',
    primaryHover: '#a855f7',
    text: '#6b21a8',
    cardBg: '#ffffffcc',
    border: '#e9d5ff',
    accentBg: '#f3e8ff',
    accentText: '#7e22ce',
    gradient: 'from-purple-300 via-pink-200 to-blue-200'
  },
  matcha: {
    id: 'matcha',
    name: 'Matcha Mint',
    bg: '#f0fdf4',
    primary: '#34d399',
    primaryHover: '#10b981',
    text: '#065f46',
    cardBg: '#ffffffcc',
    border: '#a7f3d0',
    accentBg: '#d1fae5',
    accentText: '#047857',
    gradient: 'from-emerald-200 via-teal-100 to-cyan-200'
  },
  peach: {
    id: 'peach',
    name: 'Peach Milk',
    bg: '#fff7ed',
    primary: '#fb7185',
    primaryHover: '#f43f5e',
    text: '#9f1239',
    cardBg: '#ffffffcc',
    border: '#fed7aa',
    accentBg: '#ffedd5',
    accentText: '#c2410c',
    gradient: 'from-orange-200 via-rose-200 to-pink-200'
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean Sky',
    bg: '#f0f9ff',
    primary: '#38bdf8',
    primaryHover: '#0284c7',
    text: '#075985',
    cardBg: '#ffffffcc',
    border: '#bae6fd',
    accentBg: '#e0f2fe',
    accentText: '#0369a1',
    gradient: 'from-sky-200 via-indigo-100 to-blue-200'
  }
};

// Initial Profile State
const initialProfile = {
  name: "MochiArt 💕",
  handle: "@mochi_artist",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  banner: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80",
  status: "open", // open, busy, closed
  bioTH: "สวัสดีค่ะ! ยินดีต้อนรับสู่พื้นที่งานวาดของโมจิ รับวาดภาพสไตล์การ์ตูนน่ารักๆ สีพาสเทลสดใส สนใจสอบถามงานคอมมิชชันได้ทางข้อความเลยนะคะ ✨🌸",
  bioEN: "Hi there! Welcome to my sweet art space. I draw cute pastel anime & chibi style illustrations! Feel free to contact me via DMs for any commission inquiries ✨🌸",
  socials: {
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    discord: "Mochi#1234",
    email: "mochi.art@example.com"
  }
};

// Initial Artwork Categories
const initialCategories = [
  {
    id: 'cat-chibi',
    nameTH: 'ชิบิ (Chibi)',
    nameEN: 'Chibi Style',
    descriptionTH: 'ตัวละครตัวจิ๋ว น่ารัก ดุ๊กดิ๊ก ลงสีสดใส',
    descriptionEN: 'Cute mini characters with full color & soft details',
    priceTHB: 450,
    priceUSD: 15,
    turnaroundTH: '3 - 5 วัน',
    turnaroundEN: '3 - 5 Days',
    artworks: [
      { id: 'art-1', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80', title: 'Bunny Girl Chibi' },
      { id: 'art-2', url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80', title: 'Magical Girl' },
      { id: 'art-3', url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80', title: 'Cat Maid Chibi' }
    ]
  },
  {
    id: 'cat-bustup',
    nameTH: 'ครึ่งตัว / ช่วงอก (Bust-up)',
    nameEN: 'Bust-up / Headshot',
    descriptionTH: 'ภาพช่วงหัวถึงอก เน้นรายละเอียดใบหน้าและดวงตา',
    descriptionEN: 'Head to chest portraits focusing on cute expression & bright eyes',
    priceTHB: 850,
    priceUSD: 28,
    turnaroundTH: '5 - 7 วัน',
    turnaroundEN: '5 - 7 Days',
    artworks: [
      { id: 'art-4', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80', title: 'Pastel Dream Portrait' },
      { id: 'art-5', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', title: 'Cyber Cute Girl' }
    ]
  },
  {
    id: 'cat-fullbody',
    nameTH: 'เต็มตัว (Full Body)',
    nameEN: 'Full Body',
    descriptionTH: 'วาดเต็มตัว พร้อมฉากหลังเรียบง่าย หรือพื้นหลังใส PNG',
    descriptionEN: 'Full character artwork with simple custom background or transparent PNG',
    priceTHB: 1500,
    priceUSD: 48,
    turnaroundTH: '7 - 12 วัน',
    turnaroundEN: '7 - 12 Days',
    artworks: [
      { id: 'art-6', url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80', title: 'Fantasy Adventurer' },
      { id: 'art-7', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80', title: 'Idol Stage Outfit' }
    ]
  }
];

export default function App() {
  // Application States
  const [lang, setLang] = useState('TH'); // TH, EN
  const [customTheme, setCustomTheme] = useState(THEMES.pink);
  const [currency, setCurrency] = useState('THB'); // THB, USD
  const [profile, setProfile] = useState(initialProfile);
  const [categories, setCategories] = useState(initialCategories);
  const [activeCategory, setActiveCategory] = useState(initialCategories[0]?.id || '');
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Modals & Panels
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddArtOpen, setIsAddArtOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Form states
  const [newCategoryData, setNewCategoryData] = useState({ nameTH: '', nameEN: '', priceTHB: '', priceUSD: '', turnaroundTH: '', turnaroundEN: '' });
  const [newArtData, setNewArtData] = useState({ title: '', url: '', preview: null });

  const currentCategory = categories.find(c => c.id === activeCategory) || categories[0];

  // Handle local file selection for artwork
  const handleLocalImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewArtData(prev => ({
          ...prev,
          url: reader.result,
          preview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Carousel Navigation
  const prevSlide = () => {
    if (!currentCategory || !currentCategory.artworks.length) return;
    setCarouselIndex((prev) => (prev === 0 ? currentCategory.artworks.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (!currentCategory || !currentCategory.artworks.length) return;
    setCarouselIndex((prev) => (prev === currentCategory.artworks.length - 1 ? 0 : prev + 1));
  };

  // Reset Carousel Index when Category Changes
  useEffect(() => {
    setCarouselIndex(0);
  }, [activeCategory]);

  // Handler: Add New Category
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryData.nameTH || !newCategoryData.nameEN) return;
    const newCat = {
      id: `cat-${Date.now()}`,
      nameTH: newCategoryData.nameTH,
      nameEN: newCategoryData.nameEN,
      descriptionTH: newCategoryData.descriptionTH || 'รายละเอียดผลงานเพิ่มเติม',
      descriptionEN: newCategoryData.descriptionEN || 'Additional commission details',
      priceTHB: Number(newCategoryData.priceTHB) || 500,
      priceUSD: Number(newCategoryData.priceUSD) || 15,
      turnaroundTH: newCategoryData.turnaroundTH || '3-5 วัน',
      turnaroundEN: newCategoryData.turnaroundEN || '3-5 Days',
      artworks: []
    };
    setCategories([...categories, newCat]);
    setActiveCategory(newCat.id);
    setIsAddCategoryOpen(false);
    setNewCategoryData({ nameTH: '', nameEN: '', priceTHB: '', priceUSD: '', turnaroundTH: '', turnaroundEN: '' });
  };

  // Handler: Delete Category
  const handleDeleteCategory = (catId) => {
    if (categories.length <= 1) {
      alert(lang === 'TH' ? 'ต้องมีอย่างน้อย 1 หมวดหมู่ค่ะ' : 'Must keep at least 1 category!');
      return;
    }
    const filtered = categories.filter(c => c.id !== catId);
    setCategories(filtered);
    if (activeCategory === catId) {
      setActiveCategory(filtered[0].id);
    }
  };

  // Handler: Add Artwork to Active Category
  const handleAddArtwork = (e) => {
    e.preventDefault();
    if (!newArtData.url) return;
    const newArt = {
      id: `art-${Date.now()}`,
      url: newArtData.url,
      title: newArtData.title || (lang === 'TH' ? 'ผลงานใหม่' : 'New Artwork')
    };
    setCategories(categories.map(cat => {
      if (cat.id === activeCategory) {
        return { ...cat, artworks: [...cat.artworks, newArt] };
      }
      return cat;
    }));
    setIsAddArtOpen(false);
    setNewArtData({ title: '', url: '', preview: null });
  };

  // Handler: Delete Artwork from Active Category
  const handleDeleteArtwork = (artId) => {
    setCategories(categories.map(cat => {
      if (cat.id === activeCategory) {
        const updatedArts = cat.artworks.filter(a => a.id !== artId);
        return { ...cat, artworks: updatedArts };
      }
      return cat;
    }));
    if (carouselIndex >= (currentCategory?.artworks.length - 1)) {
      setCarouselIndex(0);
    }
  };

  // Handler: Local Avatar Upload
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler: Local Banner Upload
  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, banner: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Status Badge UI Helper
  const renderStatusBadge = () => {
    const statusMap = {
      open: { th: '✨ เปิดรับคอมมิชชัน', en: '✨ Commissions Open', bg: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
      busy: { th: '⏳ คิวแน่น (รับงานจำนวนจำกัด)', en: '⏳ Limited Slots', bg: 'bg-amber-100 text-amber-700 border-amber-300' },
      closed: { th: '❄️ ปิดรับคอมมิชชันชั่วคราว', en: '❄️ Commissions Closed', bg: 'bg-rose-100 text-rose-700 border-rose-300' }
    };
    const s = statusMap[profile.status] || statusMap.open;
    return (
      <span className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full border shadow-sm transition-transform hover:scale-105 ${s.bg}`}>
        {lang === 'TH' ? s.th : s.en}
      </span>
    );
  };

  return (
    <div 
      className="min-h-screen text-slate-700 font-sans transition-colors duration-300 pb-16"
      style={{ backgroundColor: customTheme.bg }}
    >
      {/* Top Floating Control Bar */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/70 border-b border-pink-100 px-4 py-3 shadow-sm">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 animate-pulse" style={{ color: customTheme.primary }} />
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {profile.name} Gallery
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Presets */}
            <div className="flex items-center bg-white/90 p-1 rounded-full border border-gray-200 shadow-inner">
              {Object.keys(THEMES).map((key) => (
                <button
                  key={key}
                  onClick={() => setCustomTheme(THEMES[key])}
                  className={`w-5 h-5 rounded-full mx-1 transition-transform hover:scale-125 ${
                    customTheme.id === key ? 'ring-2 ring-offset-1 ring-slate-400 scale-110' : 'opacity-70'
                  }`}
                  style={{ backgroundColor: THEMES[key].primary }}
                  title={THEMES[key].name}
                />
              ))}
            </div>

            {/* Custom Color Picker Toggle */}
            <button
              onClick={() => setIsColorPickerOpen(true)}
              className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition"
              title={lang === 'TH' ? 'เลือกสีตกแต่งเอง' : 'Custom Color Picker'}
            >
              <Palette className="w-3.5 h-3.5" style={{ color: customTheme.primary }} />
              <span>{lang === 'TH' ? 'แต่งสีเอง' : 'Colors'}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'TH' ? 'EN' : 'TH')}
              className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang}</span>
            </button>

            {/* Settings Button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-slate-600 transition"
              title={lang === 'TH' ? 'แก้ไขข้อมูลส่วนตัว' : 'Edit Profile'}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 pt-6 space-y-8">
        
        {/* Profile Card / Header Banner */}
        <section 
          className="relative rounded-3xl overflow-hidden shadow-lg backdrop-blur-sm transition-all"
          style={{ backgroundColor: customTheme.cardBg, borderColor: customTheme.border, borderWidth: '1px' }}
        >
          {/* Header Banner */}
          <div className="h-40 sm:h-52 w-full overflow-hidden relative">
            <img 
              src={profile.banner} 
              alt="Banner" 
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${customTheme.gradient || 'from-pink-300 to-indigo-200'} opacity-20`} />
          </div>

          {/* Profile Info Section */}
          <div className="relative px-6 pb-6 pt-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 sm:-mt-20 mb-4 gap-4">
              {/* Avatar */}
              <div className="relative group">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white shadow-md transition-transform group-hover:scale-105"
                />
                <span className="absolute bottom-2 right-2 p-1.5 text-white rounded-full shadow" style={{ backgroundColor: customTheme.primary }}>
                  <Heart className="w-4 h-4 fill-current" />
                </span>
              </div>

              {/* Status Badge */}
              <div className="text-center sm:text-right">
                {renderStatusBadge()}
              </div>
            </div>

            {/* Name & Handle */}
            <div className="text-center sm:text-left space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                {profile.name}
              </h1>
              <p className="text-sm font-medium text-slate-400">{profile.handle}</p>
            </div>

            {/* Bio Text */}
            <div className="mt-4 p-4 rounded-2xl bg-white/60 border border-slate-100 text-slate-600 text-sm leading-relaxed shadow-inner">
              {lang === 'TH' ? profile.bioTH : profile.bioEN}
            </div>

            {/* Social Contact Buttons */}
            <div className="mt-5 flex flex-wrap justify-center sm:justify-start gap-2">
              {profile.socials.twitter && (
                <a href={profile.socials.twitter} target="_blank" rel="noreferrer" 
                   className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-600 text-xs font-semibold hover:bg-sky-100 transition border border-sky-200 shadow-sm">
                  <Twitter className="w-3.5 h-3.5" /> Twitter/X
                </a>
              )}
              {profile.socials.instagram && (
                <a href={profile.socials.instagram} target="_blank" rel="noreferrer"
                   className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-50 text-pink-600 text-xs font-semibold hover:bg-pink-100 transition border border-pink-200 shadow-sm">
                  <Instagram className="w-3.5 h-3.5" /> Instagram
                </a>
              )}
              {profile.socials.facebook && (
                <a href={profile.socials.facebook} target="_blank" rel="noreferrer"
                   className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition border border-blue-200 shadow-sm">
                  <Facebook className="w-3.5 h-3.5" /> Facebook
                </a>
              )}
              {profile.socials.discord && (
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold border border-indigo-200 shadow-sm">
                  <MessageSquare className="w-3.5 h-3.5" /> Discord: {profile.socials.discord}
                </div>
              )}
              {profile.socials.email && (
                <a href={`mailto:${profile.socials.email}`}
                   className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold hover:bg-rose-100 transition border border-rose-200 shadow-sm">
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Categories Navigation & Management */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
              <Palette className="w-5 h-5" style={{ color: customTheme.primary }} />
              {lang === 'TH' ? 'หมวดหมู่งาน (Art Categories)' : 'Art Categories'}
            </h2>
            <button
              onClick={() => setIsAddCategoryOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white rounded-full shadow-md transition-all hover:scale-105"
              style={{ backgroundColor: customTheme.primary }}
            >
              <Plus className="w-4 h-4" />
              {lang === 'TH' ? 'เพิ่มหมวดหมู่' : 'Add Category'}
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <div key={cat.id} className="relative group flex-shrink-0">
                  <button
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 shadow-sm ${
                      isActive
                        ? 'text-white scale-105 shadow-md'
                        : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-100'
                    }`}
                    style={isActive ? { backgroundColor: customTheme.primary } : {}}
                  >
                    {lang === 'TH' ? cat.nameTH : cat.nameEN}
                  </button>
                  {/* Delete button for category */}
                  {categories.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(cat.id);
                      }}
                      className="absolute -top-1 -right-1 bg-red-400 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
                      title={lang === 'TH' ? 'ลบหมวดหมู่นี้' : 'Delete Category'}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Carousel Showcase Section */}
        {currentCategory && (
          <section 
            className="p-6 rounded-3xl shadow-lg backdrop-blur-sm space-y-6 border"
            style={{ backgroundColor: customTheme.cardBg, borderColor: customTheme.border }}
          >
            {/* Category Info Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">
                  {lang === 'TH' ? currentCategory.nameTH : currentCategory.nameEN}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {lang === 'TH' ? currentCategory.descriptionTH : currentCategory.descriptionEN}
                </p>
              </div>

              {/* Add Artwork to this Category Button */}
              <button
                onClick={() => setIsAddArtOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-50 shadow-sm transition"
              >
                <Upload className="w-3.5 h-3.5" style={{ color: customTheme.primary }} />
                {lang === 'TH' ? 'เพิ่มรูปในหมวดนี้' : 'Add Artwork'}
              </button>
            </div>

            {/* Slider / Carousel View */}
            {currentCategory.artworks.length > 0 ? (
              <div className="relative group max-w-2xl mx-auto">
                <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-md bg-slate-100">
                  <img
                    src={currentCategory.artworks[carouselIndex]?.url}
                    alt={currentCategory.artworks[carouselIndex]?.title}
                    className="w-full h-full object-cover transition-all duration-300 cursor-pointer hover:scale-105"
                    onClick={() => setLightboxImage(currentCategory.artworks[carouselIndex]?.url)}
                  />
                  
                  {/* Artwork Badge Overlay */}
                  <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium">
                    {currentCategory.artworks[carouselIndex]?.title}
                  </div>

                  {/* Delete current image button */}
                  <button
                    onClick={() => handleDeleteArtwork(currentCategory.artworks[carouselIndex]?.id)}
                    className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    title={lang === 'TH' ? 'ลบรูปนี้' : 'Delete Picture'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Left / Right Carousel Controls */}
                {currentCategory.artworks.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-md backdrop-blur-sm transition"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-md backdrop-blur-sm transition"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Dots indicator */}
                <div className="flex justify-center items-center gap-2 mt-4">
                  {currentCategory.artworks.map((art, idx) => (
                    <button
                      key={art.id}
                      onClick={() => setCarouselIndex(idx)}
                      className={`h-2.5 rounded-full transition-all ${
                        carouselIndex === idx ? 'w-7' : 'w-2.5 bg-slate-200'
                      }`}
                      style={carouselIndex === idx ? { backgroundColor: customTheme.primary } : {}}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 bg-white/50 rounded-2xl border border-dashed border-slate-200">
                <ImageIcon className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                <p>{lang === 'TH' ? 'ยังไม่มีรูปภาพในหมวดหมู่นี้' : 'No artworks in this category yet'}</p>
                <button
                  onClick={() => setIsAddArtOpen(true)}
                  className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-full shadow"
                  style={{ backgroundColor: customTheme.primary }}
                >
                  <Plus className="w-4 h-4" />
                  {lang === 'TH' ? 'อัปโหลดรูปภาพแรก' : 'Upload First Image'}
                </button>
              </div>
            )}
          </section>
        )}

        {/* Pricing & Terms Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
              <Heart className="w-5 h-5" style={{ color: customTheme.primary }} />
              {lang === 'TH' ? 'อัตราบริการ & ราคา (Price List)' : 'Commission Rates'}
            </h2>

            {/* Currency Switcher */}
            <div className="flex items-center bg-white rounded-full border border-slate-200 p-1 shadow-sm text-xs font-bold">
              <button
                onClick={() => setCurrency('THB')}
                className={`px-3 py-1 rounded-full transition ${currency === 'THB' ? 'text-white' : 'text-slate-500'}`}
                style={currency === 'THB' ? { backgroundColor: customTheme.primary } : {}}
              >
                THB (฿)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-full transition ${currency === 'USD' ? 'text-white' : 'text-slate-500'}`}
                style={currency === 'USD' ? { backgroundColor: customTheme.primary } : {}}
              >
                USD ($)
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div 
                key={`price-${cat.id}`}
                className="p-5 rounded-3xl border bg-white/90 shadow-md flex flex-col justify-between hover:scale-[1.02] transition-transform"
                style={{ borderColor: customTheme.border }}
              >
                <div>
                  <div 
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                    style={{ backgroundColor: customTheme.accentBg || '#fce7f3', color: customTheme.accentText || customTheme.primary }}
                  >
                    {lang === 'TH' ? cat.nameTH : cat.nameEN}
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-extrabold text-slate-800">
                      {currency === 'THB' ? `฿${cat.priceTHB.toLocaleString()}` : `$${cat.priceUSD}`}
                    </span>
                    <span className="text-xs text-slate-400 font-medium"> / {lang === 'TH' ? 'ภาพ' : 'picture'}</span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {lang === 'TH' ? cat.descriptionTH : cat.descriptionEN}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: customTheme.primary }} />
                    <span>{lang === 'TH' ? `ระยะเวลา: ${cat.turnaroundTH}` : `Turnaround: ${cat.turnaroundEN}`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'TH' ? 'ไฟล์ PNG ความละเอียดสูง (300 DPI)' : 'High-res PNG (300 DPI)'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Terms & Conditions Notice */}
          <div className="p-5 rounded-3xl bg-pink-50/70 border border-pink-100 text-xs text-slate-600 space-y-2">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
              <AlertCircle className="w-4 h-4 text-pink-500" />
              {lang === 'TH' ? 'ข้อตกลงและเงื่อนไข (Terms of Service)' : 'Terms of Service'}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-500">
              <li>{lang === 'TH' ? 'ราคานี้สำหรับการใช้งานส่วนตัวเท่านั้น (Personal Use)' : 'Base prices are for personal use only.'}</li>
              <li>{lang === 'TH' ? 'หากต้องการใช้เชิงพาณิชย์ (Commercial) คิดเพิ่ม +50% - 100% จากราคาปกติ' : 'Commercial rights cost +50% to +100% of the base price.'}</li>
              <li>{lang === 'TH' ? 'สามารถแก้แบบร่างฟรีได้ 2 ครั้ง (แก้ไขจุดใหญ่)' : 'Includes 2 free major revisions during sketch phase.'}</li>
            </ul>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="mt-16 text-center text-xs text-slate-400 py-6">
        <p>✨ {profile.name} • Art Commission Portfolio ✨</p>
      </footer>

      {/* --- MODAL: FREE CUSTOM COLOR PICKER --- */}
      {isColorPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Palette className="w-5 h-5 text-pink-500" />
                {lang === 'TH' ? 'เลือกสีตกแต่งตามใจชอบ' : 'Customize Colors'}
              </h3>
              <button onClick={() => setIsColorPickerOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700">สีหลัก (Primary Accent)</label>
                <input
                  type="color"
                  value={customTheme.primary}
                  onChange={(e) => setCustomTheme({ ...customTheme, primary: e.target.value })}
                  className="w-10 h-10 rounded-full cursor-pointer border border-slate-200"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700">สีพื้นหลังเว็บ (Background Color)</label>
                <input
                  type="color"
                  value={customTheme.bg}
                  onChange={(e) => setCustomTheme({ ...customTheme, bg: e.target.value })}
                  className="w-10 h-10 rounded-full cursor-pointer border border-slate-200"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700">สีขอบการ์ด (Border Color)</label>
                <input
                  type="color"
                  value={customTheme.border}
                  onChange={(e) => setCustomTheme({ ...customTheme, border: e.target.value })}
                  className="w-10 h-10 rounded-full cursor-pointer border border-slate-200"
                />
              </div>

              {/* Reset to Preset Buttons */}
              <div className="pt-2">
                <span className="font-semibold text-slate-500 block mb-2">หรือเลือกธีมสำเร็จรูป:</span>
                <div className="grid grid-cols-5 gap-2">
                  {Object.keys(THEMES).map((key) => (
                    <button
                      key={key}
                      onClick={() => setCustomTheme(THEMES[key])}
                      className="h-8 rounded-xl border border-slate-200 flex items-center justify-center font-bold text-[10px] shadow-sm hover:scale-105 transition"
                      style={{ backgroundColor: THEMES[key].bg, color: THEMES[key].text }}
                    >
                      {THEMES[key].name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsColorPickerOpen(false)}
              className="w-full py-2.5 rounded-2xl text-white font-bold shadow-md"
              style={{ backgroundColor: customTheme.primary }}
            >
              {lang === 'TH' ? 'ตกลง' : 'Apply Colors'}
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL: EDIT PROFILE SETTINGS --- */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-bold text-lg text-slate-800">
                {lang === 'TH' ? 'ตั้งค่าโปรไฟล์ & ข้อมูลส่วนตัว' : 'Profile Settings'}
              </h3>
              <button onClick={() => setIsSettingsOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600">Artist Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-pink-300 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-600">Handle / Social Tag</label>
                <input
                  type="text"
                  value={profile.handle}
                  onChange={(e) => setProfile({ ...profile, handle: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-pink-300 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-600">Status</label>
                <select
                  value={profile.status}
                  onChange={(e) => setProfile({ ...profile, status: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-pink-300 outline-none"
                >
                  <option value="open">Open (เปิดรับงาน)</option>
                  <option value="busy">Busy (งานแน่น)</option>
                  <option value="closed">Closed (ปิดรับงาน)</option>
                </select>
              </div>

              {/* Avatar Upload from Device or URL */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">
                  {lang === 'TH' ? 'รูปโปรไฟล์ (Avatar)' : 'Avatar Picture'}
                </label>
                <div className="flex items-center gap-3">
                  <img src={profile.avatar} alt="Avatar Preview" className="w-12 h-12 rounded-full object-cover border" />
                  <label className="flex-1 cursor-pointer bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 rounded-xl px-3 py-2 text-center font-bold transition">
                    {lang === 'TH' ? '📂 เลือกรูปโปรไฟล์จากเครื่อง' : 'Upload Avatar File'}
                    <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Or paste Avatar Image URL"
                  value={profile.avatar.startsWith('data:') ? '' : profile.avatar}
                  onChange={(e) => e.target.value && setProfile({ ...profile, avatar: e.target.value })}
                  className="w-full mt-1 px-3 py-1.5 border rounded-xl text-[11px] outline-none"
                />
              </div>

              {/* Banner Upload from Device or URL */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">
                  {lang === 'TH' ? 'ภาพปกโปรไฟล์ (Banner)' : 'Banner Picture'}
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-8 rounded-lg overflow-hidden border">
                    <img src={profile.banner} alt="Banner Preview" className="w-full h-full object-cover" />
                  </div>
                  <label className="flex-1 cursor-pointer bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 rounded-xl px-3 py-2 text-center font-bold transition">
                    {lang === 'TH' ? '📂 เลือกภาพปกจากเครื่อง' : 'Upload Banner File'}
                    <input type="file" accept="image/*" onChange={handleBannerUpload} className="hidden" />
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Or paste Banner Image URL"
                  value={profile.banner.startsWith('data:') ? '' : profile.banner}
                  onChange={(e) => e.target.value && setProfile({ ...profile, banner: e.target.value })}
                  className="w-full mt-1 px-3 py-1.5 border rounded-xl text-[11px] outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-600">Bio (TH)</label>
                <textarea
                  rows={2}
                  value={profile.bioTH}
                  onChange={(e) => setProfile({ ...profile, bioTH: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-pink-300 outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-600">Bio (EN)</label>
                <textarea
                  rows={2}
                  value={profile.bioEN}
                  onChange={(e) => setProfile({ ...profile, bioEN: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-pink-300 outline-none"
                />
              </div>

              {/* Social Links */}
              <div className="pt-2 border-t">
                <span className="font-bold text-slate-700 block mb-2">Social Links</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    value={profile.socials.twitter}
                    onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, twitter: e.target.value } })}
                    className="px-3 py-1.5 border rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Instagram URL"
                    value={profile.socials.instagram}
                    onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, instagram: e.target.value } })}
                    className="px-3 py-1.5 border rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Discord Tag"
                    value={profile.socials.discord}
                    onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, discord: e.target.value } })}
                    className="px-3 py-1.5 border rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    value={profile.socials.email}
                    onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, email: e.target.value } })}
                    className="px-3 py-1.5 border rounded-xl"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsSettingsOpen(false)}
              className="w-full py-2.5 rounded-2xl text-white font-bold shadow-md"
              style={{ backgroundColor: customTheme.primary }}
            >
              {lang === 'TH' ? 'บันทึกเรียบร้อย' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL: ADD CATEGORY --- */}
      {isAddCategoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <form onSubmit={handleAddCategory} className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b">
              <h3 className="font-bold text-lg text-slate-800">
                {lang === 'TH' ? 'เพิ่มหมวดหมู่งานใหม่' : 'Add New Category'}
              </h3>
              <button type="button" onClick={() => setIsAddCategoryOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600">ชื่อหมวดหมู่ (ภาษาไทย)</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น สติ๊กเกอร์, โลโก้"
                  value={newCategoryData.nameTH}
                  onChange={(e) => setNewCategoryData({ ...newCategoryData, nameTH: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-600">Category Name (English)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stickers, Logo"
                  value={newCategoryData.nameEN}
                  onChange={(e) => setNewCategoryData({ ...newCategoryData, nameEN: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-600">ราคา THB (฿)</label>
                  <input
                    type="number"
                    placeholder="500"
                    value={newCategoryData.priceTHB}
                    onChange={(e) => setNewCategoryData({ ...newCategoryData, priceTHB: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600">ราคา USD ($)</label>
                  <input
                    type="number"
                    placeholder="18"
                    value={newCategoryData.priceUSD}
                    onChange={(e) => setNewCategoryData({ ...newCategoryData, priceUSD: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-2xl text-white font-bold shadow-md"
              style={{ backgroundColor: customTheme.primary }}
            >
              {lang === 'TH' ? 'เพิ่มหมวดหมู่' : 'Create Category'}
            </button>
          </form>
        </div>
      )}

      {/* --- MODAL: ADD ARTWORK (Supports Local File Upload & URL) --- */}
      {isAddArtOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <form onSubmit={handleAddArtwork} className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b">
              <h3 className="font-bold text-lg text-slate-800">
                {lang === 'TH' ? `เพิ่มรูปใน ${currentCategory?.nameTH}` : `Add Art to ${currentCategory?.nameEN}`}
              </h3>
              <button type="button" onClick={() => setIsAddArtOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-600">ชื่อผลงาน / Artwork Title</label>
                <input
                  type="text"
                  placeholder="e.g. Cute Character #1"
                  value={newArtData.title}
                  onChange={(e) => setNewArtData({ ...newArtData, title: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl outline-none"
                />
              </div>

              {/* Local File Upload Box */}
              <div>
                <label className="font-semibold text-slate-600 block mb-1">
                  {lang === 'TH' ? 'เลือกรูปภาพจากเครื่อง (Upload from Device)' : 'Upload from Local Device'}
                </label>
                <label className="border-2 border-dashed border-pink-200 hover:border-pink-400 bg-pink-50/40 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition">
                  {newArtData.preview ? (
                    <img src={newArtData.preview} alt="Preview" className="h-32 rounded-xl object-contain mb-2" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-pink-400 mb-1" />
                      <span className="text-slate-500 font-medium">
                        {lang === 'TH' ? 'คลิกเพื่อเลือกไฟล์รูปภาพ' : 'Click to choose artwork image'}
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLocalImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="text-center text-slate-400 font-bold">- {lang === 'TH' ? 'หรือ' : 'OR'} -</div>

              {/* URL Input */}
              <div>
                <label className="font-semibold text-slate-600">Image URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={newArtData.preview ? '' : newArtData.url}
                  onChange={(e) => setNewArtData({ ...newArtData, url: e.target.value, preview: null })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-2xl text-white font-bold shadow-md"
              style={{ backgroundColor: customTheme.primary }}
            >
              {lang === 'TH' ? 'เพิ่มรูปภาพ' : 'Upload Art'}
            </button>
          </form>
        </div>
      )}

      {/* --- LIGHTBOX MODAL --- */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-md cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={lightboxImage} alt="Full view" className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain" />
            <button className="absolute -top-4 -right-4 bg-white text-slate-800 p-2 rounded-full shadow-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Palette, Globe, Image as ImageIcon, Plus, Trash2, Settings, ChevronLeft, ChevronRight, X, ExternalLink, Mail, MessageSquare, Instagram, Twitter, Facebook, CheckCircle2, Clock, AlertCircle, Eye, Upload, RefreshCw } from 'lucide-react';

const THEMES = {
    pink: { id: 'pink', name: 'Cotton Candy', bg: 'bg-pink-50', primary: 'bg-pink-400', primaryHover: 'hover:bg-pink-500', text: 'text-pink-600', cardBg: 'bg-ffffff', border: 'border-pink-200', accentBg: 'vfe7f3', accentText: 'text-be185d', gradient: 'from-pink-300 via-purple-200 to-indigo-200' },
    lavender: { id: 'lavender', name: 'Soft Lavender', bg: 'bg-purple-50', primary: 'bg-purple-400', primaryHover: 'hover:bg-purple-500', text: 'text-purple-600', cardBg: 'bg-ffffff', border: 'border-purple-200', accentBg: 'c9d5ff', accentText: 'text-3ce8ff', gradient: 'from-purple-300 via-pink-200 to-blue-200' },
    matcha: { id: 'matcha', name: 'Matcha Mint', bg: 'bg-emerald-50', primary: 'bg-emerald-400', primaryHover: 'hover:bg-emerald-500', text: 'text-emerald-600', cardBg: 'bg-ffffff', border: 'border-emerald-200', accentBg: 'd1fae5', accentText: 'text-047857', gradient: 'from-emerald-200 via-teal-100 to-cyan-200' },
    peach: { id: 'peach', name: 'Peach Milk', bg: 'bg-orange-50', primary: 'bg-orange-400', primaryHover: 'hover:bg-orange-500', text: 'text-orange-600', cardBg: 'bg-ffffff', border: 'border-orange-200', accentBg: 'ffedd5', accentText: 'text-c2410c', gradient: 'from-orange-200 via-pink-200 to-pink-300' },
    ocean: { id: 'ocean', name: 'Ocean Sky', bg: 'bg-sky-50', primary: 'bg-sky-400', primaryHover: 'hover:bg-sky-500', text: 'text-sky-600', cardBg: 'bg-ffffff', border: 'border-sky-200', accentBg: 'bae6fd', accentText: 'text-0369a1', gradient: 'from-sky-200 via-indigo-100 to-cyan-200' }
};

const initialProfile = {
    name: 'MochiArt 🌸',
    handle: '@mochi_artist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    banner: 'https://images.unsplash.com/photo-1579546929518-9c396f3cc809?auto=format&fit=crop&w=1200&q=80',
    status: 'open',
    bioTH: '✨ สวัสดีค่ะ! ยินดีต้อนรับสู่พื้นที่ผลงานคอมมิชชัน คาวาอี้ & ชิิบิสไตล์! สนใจสอบถามงานคอมมิชชันได้ทางข้อความนะคะ 🌸💕',
    bioEN: '✨ Hi there! Welcome to my sweet art space. Cute pastel anime & chibi style illustrations! Feel free to contact me via DMs for any commission inquiries 🌸💕',
    socials: {
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com',
        discord: 'mochi#1234',
        email: 'mochi.art@example.com'
    }
};

const initialCategories = [
    {
        id: 'cat-1',
        nameTH: 'ชิบิ (Chibi)',
        nameEN: 'Chibi Style',
        descTH: 'ตัวละครตัวจิ๋ว น่ารัก ดุ๊กดิ๊ก ลงสีสดใส',
        descEN: 'Cute mini characters with full color & soft details.',
        priceTH: 450,
        priceUSD: 15,
        timeTH: '3 - 5 วัน',
        timeEN: '3 - 5 Days',
        artworks: [
            { id: 'art-1', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80', title: 'Bunny Girl Chibi' },
            { id: 'art-2', url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80', title: 'Magical Girl' }
        ]
    },
    {
        id: 'cat-2',
        nameTH: 'ครึ่งตัว / ครึ่งอก (Bust-up)',
        nameEN: 'Bust-up / Headshot',
        descTH: 'ภาพช่วงหัวถึงอก เน้นรายละเอียดใบหน้าและดวงตา',
        descEN: 'Head to chest portraits focusing on cute expression & bright eyes.',
        priceTH: 850,
        priceUSD: 28,
        timeTH: '5 - 7 วัน',
        timeEN: '5 - 7 Days',
        artworks: [
            { id: 'art-4', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80', title: 'Pastel Dream Portrait' }
        ]
    }
];
export default function App() {
    const [lang, setLang] = useState('TH');
    const [customTheme, setCustomTheme] = useState(null);
    const [theme, setTheme] = useState(THEMES.pink);
    const [currency, setCurrency] = useState('THB');
    const [profile, setProfile] = useState(initialProfile);
    const [categories, setCategories] = useState(initialCategories);
    const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '');
    const [carousels, setCarousels] = useState({});
    
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
    const [isAddArtOpen, setIsAddArtOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState(null);

    const [newCategoryData, setNewCategoryData] = useState({ nameTH: '', nameEN: '', priceTH: '', priceUSD: '', turnaroundTH: '3 - 5 วัน', turnaroundEN: '3 - 5 Days', descTH: '', descEN: '' });
    const [newArtData, setNewArtData] = useState({ title: '', url: '', preview: null });

    const currentCategory = categories.find(c => c.id === activeCategory) || categories[0];
    const currentSlide = carousels[activeCategory] || 0;

    const handleLocalImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewArtData(prev => ({ ...prev, url: reader.result, preview: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileBannerUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({ ...prev, banner: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const nextSlide = () => {
        if (!currentCategory || !currentCategory.artworks.length) return;
        setCarousels(prev => ({
            ...prev,
            [activeCategory]: (currentSlide + 1) % currentCategory.artworks.length
        }));
    };

    const prevSlide = () => {
        if (!currentCategory || !currentCategory.artworks.length) return;
        setCarousels(prev => ({
            ...prev,
            [activeCategory]: (currentSlide - 1 + currentCategory.artworks.length) % currentCategory.artworks.length
        }));
    };

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (!newCategoryData.nameTH || !newCategoryData.nameEN) return;
        const newCat = {
            id: `cat-${Date.now()}`,
            nameTH: newCategoryData.nameTH,
            nameEN: newCategoryData.nameEN,
            descTH: newCategoryData.descTH || 'รายละเอียดผลงานเพิ่มเติม',
            descEN: newCategoryData.descEN || 'Additional commission details',
            priceTH: Number(newCategoryData.priceTH) || 500,
            priceUSD: Number(newCategoryData.priceUSD) || 15,
            timeTH: newCategoryData.turnaroundTH,
            timeEN: newCategoryData.turnaroundEN,
            artworks: []
        };
        setCategories([...categories, newCat]);
        setActiveCategory(newCat.id);
        setIsAddCategoryOpen(false);
        setNewCategoryData({ nameTH: '', nameEN: '', priceTH: '', priceUSD: '', turnaroundTH: '3 - 5 วัน', turnaroundEN: '3 - 5 Days', descTH: '', descEN: '' });
    };

    const handleDeleteCategory = (catId) => {
        if (categories.length <= 1) {
            alert(lang === 'TH' ? 'ต้องมีอย่างน้อย 1 หมวดหมู่ค่ะ' : 'Must keep at least 1 category.');
            return;
        }
        const filtered = categories.filter(c => c.id !== catId);
        setCategories(filtered);
        if (activeCategory === catId) {
            setActiveCategory(filtered[0].id);
        }
    };

    const handleAddArtwork = (e) => {
        e.preventDefault();
        if (!newArtData.url) return;
        const newArt = {
            id: `art-${Date.now()}`,
            url: newArtData.url,
            title: newArtData.title || (lang === 'TH' ? 'ผลงานใหม่' : 'New Artwork')
        };
        setCategories(categories.map(cat => {
            if (cat.id === activeCategory) {
                return { ...cat, artworks: [...cat.artworks, newArt] };
            }
            return cat;
        }));
        setIsAddArtOpen(false);
        setNewArtData({ title: '', url: '', preview: null });
    };

    const handleDeleteArtwork = (artId) => {
        setCategories(categories.map(cat => {
            if (cat.id === activeCategory) {
                return { ...cat, artworks: cat.artworks.filter(a => a.id !== artId) };
            }
            return cat;
        }));
    };

    return (
        <div className={`min-h-screen ${theme.bg} pb-16 transition-colors duration-300`} style={customTheme ? { backgroundColor: customTheme.bg } : {}}>
            {/* Header Banner */}
            <div className="relative h-48 md:h-64 w-full overflow-hidden shadow-sm">
                <img src={profile.banner} alt="Banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={() => setIsColorPickerOpen(true)} className="bg-white/90 hover:bg-white text-slate-700 px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 backdrop-blur-sm transition">
                        🎨 {lang === 'TH' ? 'เลือกสี' : 'Colors'}
                    </button>
                    <button onClick={() => setIsSettingsOpen(true)} className="bg-white/90 hover:bg-white text-slate-700 px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 backdrop-blur-sm transition">
                        ⚙️ {lang === 'TH' ? 'ตั้งค่า' : 'Settings'}
                    </button>
                </div>
            </div>

            {/* Profile Section */}
            <div className="max-w-4xl mx-auto px-4 relative -mt-16 sm:-mt-20">
                <div className="rounded-3xl shadow-xl p-6 border text-center relative transition-colors duration-300" style={{ backgroundColor: customTheme ? customTheme.cardBg : '#ffffff', borderColor: customTheme ? customTheme.primary : undefined }}>
                    <div className="relative -mt-20 sm:-mt-24 inline-block">
                        <img src={profile.avatar} alt="Avatar" className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-md mx-auto" />
                        <span className={`absolute bottom-2 right-2 px-3 py-1 text-xs font-bold rounded-full text-white shadow ${profile.status === 'open' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                            {profile.status === 'open' ? (lang === 'TH' ? '🟢 เปิดรับงาน' : '🟢 Open') : (lang === 'TH' ? '🔴 ปิดรับงาน' : '🔴 Closed')}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold mt-3 text-slate-800">{profile.name}</h1>
                    <p className="text-sm text-slate-500">{profile.handle}</p>
                    <p className="mt-4 text-slate-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">{lang === 'TH' ? profile.bioTH : profile.bioEN}</p>

                    <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                        <button onClick={() => setLang(lang === 'TH' ? 'EN' : 'TH')} className="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                            🌐 {lang === 'TH' ? 'English (เปลี่ยนภาษา)' : 'ไทย (Language)'}
                        </button>
                        <button onClick={() => setCurrency(currency === 'THB' ? 'USD' : 'THB')} className="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                            💵 {currency}
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap items-center gap-2 mt-8 pb-2 justify-start sm:justify-center">
                    {categories.map(cat => (
                        <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-5 py-2.5 rounded-full font-medium text-sm transition shadow-sm ${activeCategory === cat.id ? 'text-white shadow-md' : 'bg-white text-slate-600 hover:bg-pink-50'}`} style={activeCategory === cat.id ? { backgroundColor: customTheme ? customTheme.primary : undefined } : {}}>
                            {lang === 'TH' ? cat.nameTH : cat.nameEN}
                        </button>
                    ))}
                    <button onClick={() => setIsAddCategoryOpen(true)} className="px-4 py-2.5 rounded-full font-medium text-sm bg-white/80 hover:bg-white text-slate-700 border border-dashed border-slate-300 flex items-center gap-1 shadow-sm transition">
                        <Plus size={16} /> {lang === 'TH' ? 'เพิ่มหมวดหมู่' : 'Add Category'}
                    </button>
                </div>

                {/* Gallery */}
                {currentCategory && (
                    <div className="rounded-3xl shadow-lg border p-6 sm:p-8 mt-6 bg-white transition-colors duration-300" style={{ borderColor: customTheme ? customTheme.primary : undefined }}>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl font-bold text-slate-800">{lang === 'TH' ? currentCategory.nameTH : currentCategory.nameEN}</h2>
                                    {categories.length > 1 && (
                                        <button onClick={() => handleDeleteCategory(currentCategory.id)} className="text-slate-400 hover:text-rose-500 transition p-1" title="ลบหมวดหมู่นี้">
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                                <p className="text-slate-600 mt-1">{lang === 'TH' ? currentCategory.descTH : currentCategory.descEN}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-pink-50 border border-pink-200 px-6 py-3 rounded-2xl text-right">
                                    <span className="text-xs text-slate-500 block">{lang === 'TH' ? 'ราคาเริ่มต้น' : 'Starting at'}</span>
                                    <span className="text-2xl font-bold text-pink-600" style={{ color: customTheme ? customTheme.primary : undefined }}>
                                        {currency === 'THB' ? `${currentCategory.priceTH} ฿` : `$${currentCategory.priceUSD}`}
                                    </span>
                                    <span className="text-xs text-slate-400 block mt-0.5">⏱️ {lang === 'TH' ? currentCategory.timeTH : currentCategory.timeEN}</span>
                                </div>
                                <button onClick={() => setIsAddArtOpen(true)} className="px-4 py-3 rounded-2xl text-white font-medium shadow-md transition flex items-center gap-2 bg-pink-400 hover:bg-pink-500" style={{ backgroundColor: customTheme ? customTheme.primary : undefined }}>
                                    <Plus size={18} /> {lang === 'TH' ? 'เพิ่มรูปงาน' : 'Add Art'}
                                </button>
                            </div>
                        </div>

                        {/* Slider */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-slate-700 mb-4">🖼️ {lang === 'TH' ? 'ผลงานในหมวดหมู่นี้' : 'Artworks'}</h3>
                            {currentCategory.artworks.length > 0 ? (
                                <div className="relative group">
                                    <div className="overflow-hidden rounded-2xl bg-slate-100 h-80 sm:h-96 flex items-center justify-center shadow-inner cursor-pointer relative" onClick={() => setLightboxImage(currentCategory.artworks[currentSlide].url)}>
                                        <img src={currentCategory.artworks[currentSlide].url} alt="Artwork" className="w-full h-full object-cover transition duration-300 hover:scale-105" />
                                        <button onClick={(e) => { e.stopPropagation(); handleDeleteArtwork(currentCategory.artworks[currentSlide].id); }} className="absolute top-3 right-3 bg-black/60 hover:bg-rose-600 text-white p-2 rounded-full shadow backdrop-blur-sm transition" title="ลบรูปนี้">
                                            <Trash2 size={16} />
                                        </button>
                                        <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-lg text-sm backdrop-blur-sm">
                                            {currentCategory.artworks[currentSlide].title} ({currentSlide + 1}/{currentCategory.artworks.length})
                                        </div>
                                    </div>
                                    {currentCategory.artworks.length > 1 && (
                                        <>
                                            <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-slate-700 transition">❮</button>
                                            <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-slate-700 transition">❯</button>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    {lang === 'TH' ? 'ยังไม่มีรูปผลงาน กดปุ่ม "เพิ่มรูปงาน" ด้านบนได้เลยค่ะ' : 'No artworks yet. Click "Add Art" above.'}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Modals & Color Picker (Settings / Add Categories / Add Art) */}
            {isColorPickerOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-slate-800">🎨 {lang === 'TH' ? 'เลือกสีตกแต่งอิสระ' : 'Custom Color Picker'}</h3>
                            <button onClick={() => setIsColorPickerOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700 block mb-1">{lang === 'TH' ? 'สีพื้นหลังเว็บ (Background)' : 'Background Color'}</label>
                                <input type="color" className="w-full h-10 rounded-xl cursor-pointer border p-1" onChange={(e) => {
                                    const val = e.target.value;
                                    setCustomTheme(prev => ({ ...(prev || theme), bg: val }));
                                }} />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700 block mb-1">{lang === 'TH' ? 'สีปุ่มหลักและกรอบ (Primary Color)' : 'Primary Color'}</label>
                                <input type="color" className="w-full h-10 rounded-xl cursor-pointer border p-1" onChange={(e) => {
                                    const val = e.target.value;
                                    setCustomTheme(prev => ({ ...(prev || theme), primary: val }));
                                }} />
                            </div>
                            <button onClick={() => { setCustomTheme(null); setTheme(THEMES.pink); }} className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition">
                                {lang === 'TH' ? 'รีเซ็ตเป็นค่าเริ่มต้น' : 'Reset Default'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isAddArtOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-slate-800">🖼️ {lang === 'TH' ? 'เพิ่มรูปผลงานใหม่' : 'Add New Artwork'}</h3>
                            <button onClick={() => setIsAddArtOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
                        </div>
                        <form onSubmit={handleAddArtwork} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700 block mb-1">{lang === 'TH' ? 'ชื่อผลงาน' : 'Artwork Title'}</label>
                                <input type="text" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400" value={newArtData.title} onChange={e => setNewArtData({...newArtData, title: e.target.value})} placeholder="เช่น Chibi Cute" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700 block mb-1">{lang === 'TH' ? 'อัปโหลดรูปภาพจากเครื่อง' : 'Upload Image File'}</label>
                                <input type="file" accept="image/*" onChange={handleLocalImageUpload} className="w-full border rounded-xl px-3 py-2 text-sm text-slate-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100 cursor-pointer" />
                            </div>
                            {newArtData.preview && (
                                <div className="mt-2 h-32 rounded-xl overflow-hidden border">
                                    <img src={newArtData.preview} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                            <button type="submit" className="w-full py-3 rounded-xl text-white font-medium bg-pink-400 hover:bg-pink-500 shadow-md transition">
                                {lang === 'TH' ? 'ยืนยันเพิ่มรูป' : 'Confirm Add'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {isSettingsOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-slate-800">⚙️ {lang === 'TH' ? 'ตั้งค่าโปรไฟล์' : 'Profile Settings'}</h3>
                            <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700 block mb-1">{lang === 'TH' ? 'เปลี่ยนรูปโปรไฟล์ (Avatar)' : 'Change Avatar'}</label>
                                <input type="file" accept="image/*" onChange={handleProfileAvatarUpload} className="w-full border rounded-xl px-3 py-2 text-sm text-slate-500 cursor-pointer" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700 block mb-1">{lang === 'TH' ? 'เปลี่ยนรูปแบนเนอร์ (Banner)' : 'Change Banner'}</label>
                                <input type="file" accept="image/*" onChange={handleProfileBannerUpload} className="w-full border rounded-xl px-3 py-2 text-sm text-slate-500 cursor-pointer" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700 block mb-1">{lang === 'TH' ? 'ชื่อศิลปิน' : 'Artist Name'}</label>
                                <input type="text" className="w-full border rounded-xl px-4 py-2 text-sm" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
                            </div>
                            <button onClick={() => setIsSettingsOpen(false)} className="w-full py-3 rounded-xl text-white font-medium bg-pink-400 hover:bg-pink-500 transition">
                                {lang === 'TH' ? 'บันทึกและปิด' : 'Save & Close'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {lightboxImage && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50" onClick={() => setLightboxImage(null)}>
                    <div className="relative max-w-4xl max-h-[90vh]">
                        <img src={lightboxImage} alt="Fullscreen" className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain mx-auto" />
                        <button onClick={() => setLightboxImage(null)} className="absolute -top-10 right-0 text-white text-xl font-bold px-3 py-1 bg-white/20 rounded-full hover:bg-white/40 transition">✕</button>
                    </div>
                </div>
            )}
        </div>
    );
}