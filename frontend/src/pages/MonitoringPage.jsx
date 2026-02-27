import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Activity, TrendingUp, AlertTriangle, Shield, Cpu, Database, Globe, Users } from 'lucide-react';
import { getTrafficData, getSecurityReport } from '../api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const MonitoringPage = () => {
  const [trafficData, setTrafficData] = useState([]);
  const [securityReport, setSecurityReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');

  useEffect(() => {
    loadMonitoringData();
  }, [timeRange]);

  const loadMonitoringData = async () => {
    setLoading(true);
    try {
      const [traffic, report] = await Promise.all([
        getTrafficData(),
        getSecurityReport()
      ]);
      setTrafficData(traffic || []);
      setSecurityReport(report);
    } catch (error) {
      console.error('Error loading monitoring data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sample data for charts (in real app, this would come from API)
  const attackTrendData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'DDoS Attacks',
        data: [12, 19, 8, 15, 22, 18],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Phishing Attempts',
        data: [8, 12, 6, 9, 14, 11],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Malware Detection',
        data: [5, 8, 12, 7, 10, 9],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const trafficDistributionData = {
    labels: ['Normal Traffic', 'Suspicious', 'Blocked', 'Critical'],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const protocolAnalysisData = {
    labels: ['HTTP', 'HTTPS', 'FTP', 'SSH', 'DNS', 'Other'],
    datasets: [
      {
        label: 'Traffic Volume',
        data: [450, 380, 120, 80, 200, 150],
        backgroundColor: 'rgba(14, 165, 233, 0.8)',
        borderColor: 'rgb(14, 165, 233)',
        borderWidth: 2,
      },
      {
        label: 'Threat Count',
        data: [45, 23, 18, 12, 8, 15],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
      },
    ],
  };

  const geographicThreatData = {
    labels: ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'],
    datasets: [
      {
        label: 'Threat Sources',
        data: [120, 95, 180, 45, 30, 25],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
      },
      {
        label: 'Protected Assets',
        data: [450, 380, 520, 180, 120, 95],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 12
        },
        usePointStyle: true,
        pointStyle: 'circle'
      }
    },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#0ea5e9',
        bodyColor: '#ffffff',
        borderColor: '#0ea5e9',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + (context.dataset.label.includes('Threat') ? ' threats' : ' units');
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: 'white',
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: 'white',
          font: {
            size: 11
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'white',
          font: {
            size: 12
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#0ea5e9',
        bodyColor: '#ffffff',
        borderColor: '#0ea5e9',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return context.label + ': ' + context.parsed + ' (' + percentage + '%)';
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1500,
      easing: 'easeInOutQuart'
    }
  };

  const stats = [
    { label: 'Active Connections', value: '2,847', icon: Globe, color: 'text-cyber-blue', change: '+12%' },
    { label: 'Threats Detected', value: '47', icon: AlertTriangle, color: 'text-cyber-red', change: '+23%' },
    { label: 'System Health', value: '98%', icon: Shield, color: 'text-cyber-green', change: '+2%' },
    { label: 'Response Time', value: '1.2s', icon: Activity, color: 'text-cyber-purple', change: '-15%' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-gray-900 to-cyber-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-blue mx-auto mb-4"></div>
          <p className="text-white">Loading monitoring data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-gray-900 to-cyber-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Security Monitoring Dashboard</h1>
            <p className="text-gray-300">Real-time network security analytics and threat intelligence</p>
          </div>
          <div className="flex space-x-2">
            {['1h', '24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-cyber-blue text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="cyber-card">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                  <span className={`text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-cyber-green' : 'text-cyber-red'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Attack Trends */}
          <div className="cyber-card">
            <h3 className="text-xl font-semibold text-white mb-4">Attack Trends Over Time</h3>
            <div className="h-64">
              <Line data={attackTrendData} options={chartOptions} />
            </div>
          </div>

          {/* Traffic Distribution */}
          <div className="cyber-card">
            <h3 className="text-xl font-semibold text-white mb-4">Traffic Classification</h3>
            <div className="h-64">
              <Doughnut data={trafficDistributionData} options={pieOptions} />
            </div>
          </div>

          {/* Protocol Analysis */}
          <div className="cyber-card">
            <h3 className="text-xl font-semibold text-white mb-4">Protocol Analysis</h3>
            <div className="h-64">
              <Bar data={protocolAnalysisData} options={chartOptions} />
            </div>
          </div>

          {/* Geographic Threats */}
          <div className="cyber-card">
            <h3 className="text-xl font-semibold text-white mb-4">Geographic Threat Distribution</h3>
            <div className="h-64">
              <Bar data={geographicThreatData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 cyber-card">
            <h3 className="text-xl font-semibold text-white mb-4">Real-time Security Events</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {[
                { time: '2 min ago', event: 'DDoS attack blocked', severity: 'high', ip: '192.168.1.105' },
                { time: '5 min ago', event: 'Suspicious login attempt', severity: 'medium', ip: '10.0.0.15' },
                { time: '8 min ago', event: 'Malware detected and quarantined', severity: 'high', ip: '172.16.0.8' },
                { time: '12 min ago', event: 'Unusual data transfer pattern', severity: 'low', ip: '192.168.2.45' },
                { time: '15 min ago', event: 'Firewall rule updated', severity: 'info', ip: 'System' },
                { time: '18 min ago', event: 'SSL certificate expiring soon', severity: 'medium', ip: 'web-server-01' },
                { time: '22 min ago', event: 'Backup completed successfully', severity: 'info', ip: 'backup-server' },
                { time: '25 min ago', event: 'Port scan detected', severity: 'high', ip: '203.0.113.45' },
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      event.severity === 'high' ? 'bg-cyber-red' :
                      event.severity === 'medium' ? 'bg-yellow-400' :
                      event.severity === 'low' ? 'text-cyber-green' : 'bg-gray-400'
                    }`}></div>
                    <div>
                      <p className="text-white text-sm font-medium">{event.event}</p>
                      <p className="text-gray-400 text-xs">{event.ip} • {event.time}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    event.severity === 'high' ? 'bg-red-900/20 text-cyber-red' :
                    event.severity === 'medium' ? 'bg-yellow-900/20 text-yellow-400' :
                    event.severity === 'low' ? 'bg-green-900/20 text-cyber-green' : 'bg-gray-800 text-gray-400'
                  }`}>
                    {event.severity.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System Performance */}
          <div className="cyber-card">
            <h3 className="text-xl font-semibold text-white mb-4">System Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">CPU Usage</span>
                  <span className="text-cyber-blue">45%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-cyber-blue h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Memory Usage</span>
                  <span className="text-cyber-green">62%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-cyber-green h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Network Load</span>
                  <span className="text-yellow-400">78%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Storage</span>
                  <span className="text-cyber-purple">34%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-cyber-purple h-2 rounded-full" style={{ width: '34%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;
