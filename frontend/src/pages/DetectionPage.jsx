import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Activity, Network, FileText, Search, Filter, Download } from 'lucide-react';
import { detectAttack, getNetworkLogs } from '../api';

const DetectionPage = () => {
  const [formData, setFormData] = useState({
    packet_size: 500,
    duration: 2,
    failed_logins: 0,
    connections: 10,
    data_transferred: 100,
    protocol_type: 'tcp',
    service: 'http',
    flag: 'SF',
    src_bytes: 100,
    dst_bytes: 50,
    land: 0,
    wrong_fragment: 0,
    urgent: 0,
    hot: 0,
    num_failed_logins: 0,
    logged_in: 0,
    num_compromised: 0,
    root_shell: 0,
    su_attempted: 0,
    num_root: 0,
    num_file_creations: 0,
    num_shells: 0,
    num_access_files: 0,
    num_outbound_cmds: 0,
    is_host_login: 0,
    is_guest_login: 0,
    count: 2,
    srv_count: 2,
    serror_rate: 0,
    srv_serror_rate: 0,
    rerror_rate: 0,
    srv_rerror_rate: 0,
    same_srv_rate: 1,
    diff_srv_rate: 0,
    srv_diff_host_rate: 0,
    dst_host_count: 2,
    dst_host_srv_count: 2,
    dst_host_same_srv_rate: 1,
    dst_host_diff_srv_rate: 0,
    dst_host_same_src_port_rate: 0,
    dst_host_srv_diff_host_rate: 0,
    dst_host_serror_rate: 0,
    dst_host_srv_serror_rate: 0,
    dst_host_rerror_rate: 0,
    dst_host_srv_rerror_rate: 0
  });

  const [detectionResult, setDetectionResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [networkLogs, setNetworkLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    loadNetworkLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [networkLogs, searchTerm, filterType]);

  const loadNetworkLogs = async () => {
    try {
      const logs = await getNetworkLogs();
      setNetworkLogs(logs || []);
    } catch (error) {
      console.error('Error loading network logs:', error);
      setNetworkLogs([]);
    }
  };

  const filterLogs = () => {
    let filtered = networkLogs;
    
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.source_ip?.includes(searchTerm) || 
        log.destination_ip?.includes(searchTerm) ||
        log.protocol?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterType !== 'all') {
      filtered = filtered.filter(log => log.threat_level === filterType);
    }
    
    setFilteredLogs(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDetection = async () => {
    setIsAnalyzing(true);
    try {
      const result = await detectAttack(formData);
      setDetectionResult(result);
    } catch (error) {
      console.error('Detection error:', error);
      setDetectionResult({ attack: -1, error: 'Failed to analyze traffic' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getThreatLevelColor = (level) => {
    switch (level) {
      case 'high': return 'text-cyber-red bg-red-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'low': return 'text-cyber-green bg-green-900/20';
      default: return 'text-gray-400 bg-gray-800';
    }
  };

  const getDetectionResultColor = (result) => {
    if (result?.error) return 'text-gray-400';
    return result?.attack === 1 ? 'text-cyber-red' : 'text-cyber-green';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-gray-900 to-cyber-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Network Threat Detection</h1>
          <p className="text-gray-300">Real-time analysis of network traffic and security threats</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Traffic Analysis Form */}
          <div className="cyber-card">
            <div className="flex items-center mb-6">
              <Activity className="w-6 h-6 text-cyber-blue mr-2" />
              <h2 className="text-2xl font-semibold text-white">Traffic Analysis</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Packet Size</label>
                <input
                  type="number"
                  name="packet_size"
                  value={formData.packet_size}
                  onChange={handleInputChange}
                  className="cyber-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Duration (s)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="cyber-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Failed Logins</label>
                <input
                  type="number"
                  name="failed_logins"
                  value={formData.failed_logins}
                  onChange={handleInputChange}
                  className="cyber-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Connections</label>
                <input
                  type="number"
                  name="connections"
                  value={formData.connections}
                  onChange={handleInputChange}
                  className="cyber-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Data Transferred (MB)</label>
                <input
                  type="number"
                  name="data_transferred"
                  value={formData.data_transferred}
                  onChange={handleInputChange}
                  className="cyber-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Protocol</label>
                <select name="protocol_type" value={formData.protocol_type} onChange={handleInputChange} className="cyber-input w-full">
                  <option value="tcp">TCP</option>
                  <option value="udp">UDP</option>
                  <option value="icmp">ICMP</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleDetection}
              disabled={isAnalyzing}
              className="cyber-button w-full flex items-center justify-center"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Analyze Traffic
                </>
              )}
            </button>

            {detectionResult && (
              <div className={`mt-6 p-4 rounded-lg border ${
                detectionResult.attack === 1 ? 'bg-red-900/20 border-red-500' : 
                detectionResult.error ? 'bg-gray-800 border-gray-600' : 'bg-green-900/20 border-green-500'
              }`}>
                <div className="flex items-center">
                  {detectionResult.attack === 1 ? (
                    <AlertTriangle className="w-5 h-5 text-cyber-red mr-2" />
                  ) : detectionResult.error ? (
                    <AlertTriangle className="w-5 h-5 text-gray-400 mr-2" />
                  ) : (
                    <Shield className="w-5 h-5 text-cyber-green mr-2" />
                  )}
                  <span className={`font-semibold ${getDetectionResultColor(detectionResult)}`}>
                    {detectionResult.attack === 1 ? '🚨 Attack Detected!' : 
                     detectionResult.error ? 'Analysis Failed' : '✅ Normal Traffic'}
                  </span>
                </div>
                {detectionResult.error && (
                  <p className="text-gray-400 text-sm mt-2">{detectionResult.error}</p>
                )}
              </div>
            )}
          </div>

          {/* Network Logs */}
          <div className="cyber-card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Network className="w-6 h-6 text-cyber-blue mr-2" />
                <h2 className="text-2xl font-semibold text-white">Network Logs</h2>
              </div>
              <button className="text-cyber-blue hover:text-cyber-blue/80">
                <Download className="w-5 h-5" />
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex space-x-2 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="cyber-input w-full pl-10"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="cyber-input"
              >
                <option value="all">All Levels</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Logs List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No network logs available</p>
                </div>
              ) : (
                filteredLogs.map((log, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getThreatLevelColor(log.threat_level)}`}>
                          {log.threat_level?.toUpperCase() || 'UNKNOWN'}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{log.source_ip || 'Unknown IP'} → {log.destination_ip || 'Unknown IP'}</p>
                          <p className="text-gray-400 text-xs">{log.protocol || 'Unknown Protocol'} • {log.timestamp || new Date().toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="cyber-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Scans Today</p>
                <p className="text-2xl font-bold text-white">1,247</p>
              </div>
              <Activity className="w-8 h-8 text-cyber-blue" />
            </div>
          </div>
          <div className="cyber-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Threats Blocked</p>
                <p className="text-2xl font-bold text-cyber-red">23</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-cyber-red" />
            </div>
          </div>
          <div className="cyber-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Detection Accuracy</p>
                <p className="text-2xl font-bold text-cyber-green">98.5%</p>
              </div>
              <Shield className="w-8 h-8 text-cyber-green" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectionPage;
