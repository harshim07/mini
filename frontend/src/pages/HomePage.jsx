import React, { useState, useEffect } from 'react';
import { Shield, Activity, TrendingUp, AlertTriangle, FileText, Users, Cpu, Database, Globe, Lock, Zap, Target, ShieldCheck, Eye, Network, Wifi } from 'lucide-react';

const HomePage = () => {
  const [animatedStats, setAnimatedStats] = useState({
    networks: 0,
    threats: 0,
    score: 0,
    users: 0
  });

  useEffect(() => {
    const targetStats = {
      networks: 24,
      threats: 3,
      score: 94,
      users: 1247
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedStats({
        networks: Math.floor(targetStats.networks * easeOutQuart),
        threats: Math.floor(targetStats.threats * easeOutQuart),
        score: Math.floor(targetStats.score * easeOutQuart),
        users: Math.floor(targetStats.users * easeOutQuart)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { 
      label: 'Total Networks Monitored', 
      value: animatedStats.networks, 
      icon: Globe, 
      color: 'from-blue-500 to-cyan-400',
      bgGlow: 'shadow-blue-500/20',
      trend: '+12%',
      trendUp: true
    },
    { 
      label: 'Active Threats Detected', 
      value: animatedStats.threats, 
      icon: AlertTriangle, 
      color: 'from-red-500 to-orange-400',
      bgGlow: 'shadow-red-500/20',
      trend: '+23%',
      trendUp: true
    },
    { 
      label: 'Security Score', 
      value: `${animatedStats.score}%`, 
      icon: ShieldCheck, 
      color: 'from-green-500 to-emerald-400',
      bgGlow: 'shadow-green-500/20',
      trend: '+2%',
      trendUp: true
    },
    { 
      label: 'Users Protected', 
      value: animatedStats.users.toLocaleString(), 
      icon: Users, 
      color: 'from-purple-500 to-pink-400',
      bgGlow: 'shadow-purple-500/20',
      trend: '+8%',
      trendUp: true
    },
  ];

  const features = [
    {
      title: 'Real-Time Detection',
      description: 'Advanced AI-powered threat detection system that monitors network traffic in real-time with machine learning algorithms.',
      icon: Activity,
      path: '/detection',
      color: 'from-blue-600 to-cyan-500',
      stats: '99.9% Accuracy'
    },
    {
      title: 'Monitoring Dashboard',
      description: 'Comprehensive analytics and visualization of security metrics with interactive charts and real-time updates.',
      icon: Cpu,
      path: '/monitoring',
      color: 'from-purple-600 to-pink-500',
      stats: 'Live Updates'
    },
    {
      title: 'Security Reports',
      description: 'Detailed incident reports and analysis for compliance and forensic investigations with automated reporting.',
      icon: FileText,
      path: '/reporting',
      color: 'from-green-600 to-emerald-500',
      stats: 'Auto-Generated'
    },
    {
      title: 'Database Management',
      description: 'Centralized security database for storing and analyzing threat intelligence with encrypted storage.',
      icon: Database,
      path: '/database',
      color: 'from-orange-600 to-red-500',
      stats: 'Encrypted'
    }
  ];

  const recentActivity = [
    { 
      time: '2 min ago', 
      event: 'System scan completed successfully', 
      type: 'success',
      icon: ShieldCheck,
      details: 'All systems operational'
    },
    { 
      time: '15 min ago', 
      event: 'Suspicious activity detected from IP 192.168.1.105', 
      type: 'warning',
      icon: AlertTriangle,
      details: 'Threat neutralized automatically'
    },
    { 
      time: '1 hour ago', 
      event: 'Security definitions updated', 
      type: 'info',
      icon: Zap,
      details: 'Latest threat patterns added'
    },
    { 
      time: '2 hours ago', 
      event: 'Firewall rules optimized', 
      type: 'success',
      icon: Lock,
      details: 'Performance improved by 15%'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center py-16 px-4">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full mb-6">
            <Shield className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-blue-400 text-sm font-medium">AI-Powered Security System</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Cyber Security
            </span>
            <br />
            <span className="text-white">Monitoring System</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Advanced threat detection and real-time monitoring powered by artificial intelligence
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/detection'}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
            >
              <Activity className="w-5 h-5 inline mr-2" />
              Start Detection
            </button>
            <button 
              onClick={() => window.location.href = '/monitoring'}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <Eye className="w-5 h-5 inline mr-2" />
              View Dashboard
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}></div>
                  <div className="relative bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 group-hover:transform group-hover:scale-105">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex items-center text-sm font-medium ${
                        stat.trendUp ? 'text-green-400' : 'text-red-400'
                      }`}>
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {stat.trend}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-gray-400 text-lg">Comprehensive security solutions for modern threats</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group cursor-pointer" onClick={() => window.location.href = feature.path}>
                  <div className="relative h-full">
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-full hover:border-white/20 transition-all duration-300 group-hover:transform group-hover:scale-105">
                      <div className={`inline-flex p-3 bg-gradient-to-r ${feature.color} rounded-xl mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 bg-white/10 px-2 py-1 rounded-full">
                          {feature.stats}
                        </span>
                        <div className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                          <Target className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="container mx-auto px-4 pb-16">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Recent Security Activity</h2>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                View All Activity
              </button>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'success' ? 'bg-green-500/20 text-green-400' :
                        activity.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                        activity.type === 'info' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{activity.event}</p>
                        <p className="text-gray-400 text-sm">{activity.details}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">{activity.time}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        activity.type === 'success' ? 'text-green-400 bg-green-500/20' :
                        activity.type === 'warning' ? 'text-yellow-400 bg-yellow-500/20' :
                        activity.type === 'info' ? 'text-blue-400 bg-blue-500/20' : 'text-gray-400 bg-gray-500/20'
                      }`}>
                        {activity.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
