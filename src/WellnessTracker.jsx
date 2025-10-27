import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, TrendingUp, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WellnessTracker = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const motivationalQuotes = [
    "Setiap langkah kecil adalah kemajuan. Kamu sudah melakukan yang terbaik hari ini! 💙",
    "Healing is not linear. Be patient with yourself. 🌱",
    "Kamu lebih kuat dari yang kamu kira. Keep going! ✨",
    "Mental health matters. Jangan ragu untuk mencari bantuan. 🤗",
    "Progress, not perfection. Celebrate your small wins today! 🎉"
  ];

  const moodData = [
    { day: 'Sen', mood: 6, label: 'Senin' },
    { day: 'Sel', mood: 5, label: 'Selasa' },
    { day: 'Rab', mood: 7, label: 'Rabu' },
    { day: 'Kam', mood: 8, label: 'Kamis' },
    { day: 'Jum', mood: 7, label: 'Jumat' },
    { day: 'Sab', mood: 9, label: 'Sabtu' },
    { day: 'Min', mood: 8, label: 'Minggu' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
        setFadeIn(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ icon: Icon, title, value, subtitle, gradient }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className={`relative overflow-hidden rounded-3xl p-6 transition-all duration-500 transform ${
          isHovered ? 'scale-105 shadow-2xl' : 'shadow-lg'
        }`}
        style={{
          background: gradient,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative z-10">
          <div className={`inline-flex p-3 rounded-2xl bg-white/20 backdrop-blur-sm mb-4 transition-all duration-500 ${
            isHovered ? 'rotate-12' : ''
          }`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-white/90 text-sm font-medium mb-2">{title}</h3>
          <p className="text-white text-3xl font-bold mb-1">{value}</p>
          <p className="text-white/70 text-xs">{subtitle}</p>
        </div>
        <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-white/10 transition-all duration-700 ${
          isHovered ? 'scale-150' : 'scale-100'
        }`}></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center shadow-lg">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
              Wellness Tracker
            </h1>
            <p className="text-gray-600 text-sm">Track your mental health journey with us</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={MessageCircle}
            title="Total Sesi Konseling"
            value="12"
            subtitle="8 sesi bulan ini"
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
          <StatCard
            icon={TrendingUp}
            title="Durasi Rata-rata"
            value="45 min"
            subtitle="↑ 5 min dari minggu lalu"
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          />
          <StatCard
            icon={Sparkles}
            title="Mood Rata-rata"
            value="7.3/10"
            subtitle="Trending positive!"
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mood Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-rose-500" />
              Perjalanan Mood Mingguan
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={moodData}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  stroke="#999"
                  style={{ fontSize: '14px' }}
                />
                <YAxis 
                  domain={[0, 10]}
                  stroke="#999"
                  style={{ fontSize: '14px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  labelFormatter={(label, payload) => {
                    const item = moodData.find(d => d.day === label);
                    return item ? item.label : label;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#f43f5e"
                  strokeWidth={3}
                  dot={{ fill: '#f43f5e', r: 6 }}
                  activeDot={{ r: 8 }}
                  fill="url(#moodGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <span>Mood Score (0-10)</span>
              </div>
            </div>
          </div>

          {/* Motivational Quote Card */}
          <div className="bg-gradient-to-br from-rose-400 via-orange-400 to-pink-400 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-white" />
                <h2 className="text-lg font-bold text-white">Pesan Hari Ini</h2>
              </div>
              
              <div 
                className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
              >
                <p className="text-white text-lg leading-relaxed font-medium">
                  {motivationalQuotes[currentQuote]}
                </p>
              </div>

              <div className="mt-6 flex gap-2">
                {motivationalQuotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setFadeIn(false);
                      setTimeout(() => {
                        setCurrentQuote(index);
                        setFadeIn(true);
                      }, 300);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentQuote === index ? 'w-8 bg-white' : 'w-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Aktivitas Terkini</h2>
          <div className="space-y-3">
            {[
              { date: '26 Okt 2025', activity: 'Sesi Konseling dengan Psikolog Rina', duration: '50 min', type: 'conseling' },
              { date: '24 Okt 2025', activity: 'Mood Check-in', duration: '2 min', type: 'checkin' },
              { date: '22 Okt 2025', activity: 'Journaling: Gratitude Practice', duration: '15 min', type: 'journal' },
              { date: '20 Okt 2025', activity: 'Sesi Konseling dengan Konselor Budi', duration: '45 min', type: 'conseling' },
            ].map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white hover:from-rose-50 hover:to-orange-50 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    item.type === 'conseling' ? 'bg-purple-100' :
                    item.type === 'checkin' ? 'bg-blue-100' : 'bg-pink-100'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    {item.type === 'conseling' ? '💬' : item.type === 'checkin' ? '📊' : '📝'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{item.activity}</p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-600 font-medium bg-white px-4 py-2 rounded-full shadow-sm">
                  {item.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action */}
      <div className="fixed bottom-8 right-8">
        <button className="bg-gradient-to-r from-rose-500 to-orange-500 text-white p-4 rounded-full shadow-2xl hover:shadow-rose-300 hover:scale-110 transition-all duration-300">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default WellnessTracker;