import React, { useState, useEffect } from 'react';
import { FileText, Download, Filter, Search, Calendar, AlertTriangle, Shield, TrendingUp, Eye, BarChart3 } from 'lucide-react';
import { getSecurityReport, getIncidents } from '../api';

const ReportingPage = () => {
  const [reports, setReports] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('7d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReportData();
  }, [filterDateRange]);

  const loadReportData = async () => {
    setLoading(true);
    try {
      const [reportData, incidentData] = await Promise.all([
        getSecurityReport(),
        getIncidents()
      ]);
      
      // Generate sample reports based on the data
      const generatedReports = generateReports(reportData, incidentData);
      setReports(generatedReports);
      setIncidents(incidentData || []);
    } catch (error) {
      console.error('Error loading report data:', error);
      // Set sample data if API fails
      setReports(getSampleReports());
      setIncidents(getSampleIncidents());
    } finally {
      setLoading(false);
    }
  };

  const generateReports = (reportData, incidentData) => {
    return [
      {
        id: 1,
        title: 'Daily Security Summary',
        type: 'daily',
        date: new Date().toISOString(),
        severity: 'low',
        status: 'completed',
        summary: 'System security overview for the past 24 hours',
        metrics: {
          totalIncidents: incidentData?.length || 12,
          blockedAttacks: 8,
          newThreats: 3,
          systemHealth: 98
        }
      },
      {
        id: 2,
        title: 'Threat Intelligence Report',
        type: 'threat',
        date: new Date(Date.now() - 86400000).toISOString(),
        severity: 'medium',
        status: 'completed',
        summary: 'Analysis of emerging threats and vulnerability patterns',
        metrics: {
          totalIncidents: 5,
          blockedAttacks: 4,
          newThreats: 2,
          systemHealth: 95
        }
      },
      {
        id: 3,
        title: 'Incident Response Summary',
        type: 'incident',
        date: new Date(Date.now() - 172800000).toISOString(),
        severity: 'high',
        status: 'review',
        summary: 'Detailed analysis of security incidents and response actions',
        metrics: {
          totalIncidents: 3,
          blockedAttacks: 2,
          newThreats: 1,
          systemHealth: 92
        }
      },
      {
        id: 4,
        title: 'Compliance Audit Report',
        type: 'compliance',
        date: new Date(Date.now() - 259200000).toISOString(),
        severity: 'low',
        status: 'completed',
        summary: 'Regulatory compliance assessment and gap analysis',
        metrics: {
          totalIncidents: 0,
          blockedAttacks: 0,
          newThreats: 0,
          systemHealth: 100
        }
      }
    ];
  };

  const getSampleReports = () => [
    {
      id: 1,
      title: 'Daily Security Summary',
      type: 'daily',
      date: new Date().toISOString(),
      severity: 'low',
      status: 'completed',
      summary: 'System security overview for the past 24 hours',
      metrics: { totalIncidents: 12, blockedAttacks: 8, newThreats: 3, systemHealth: 98 }
    },
    {
      id: 2,
      title: 'Threat Intelligence Report',
      type: 'threat',
      date: new Date(Date.now() - 86400000).toISOString(),
      severity: 'medium',
      status: 'completed',
      summary: 'Analysis of emerging threats and vulnerability patterns',
      metrics: { totalIncidents: 5, blockedAttacks: 4, newThreats: 2, systemHealth: 95 }
    }
  ];

  const getSampleIncidents = () => [
    {
      id: 1,
      title: 'DDoS Attack Mitigation',
      severity: 'high',
      date: new Date(Date.now() - 3600000).toISOString(),
      status: 'resolved',
      description: 'Successfully blocked distributed denial of service attack targeting web servers',
      responseTime: '2 min 34 sec',
      impact: 'minimal'
    },
    {
      id: 2,
      title: 'Suspicious Login Activity',
      severity: 'medium',
      date: new Date(Date.now() - 7200000).toISOString(),
      status: 'investigating',
      description: 'Multiple failed login attempts detected from unusual geographic location',
      responseTime: '1 min 12 sec',
      impact: 'none'
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || report.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-cyber-red bg-red-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'low': return 'text-cyber-green bg-green-900/20';
      default: return 'text-gray-400 bg-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-cyber-green';
      case 'review': return 'text-yellow-400';
      case 'investigating': return 'text-cyber-blue';
      default: return 'text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const downloadReport = (report) => {
    // In a real app, this would generate and download a PDF/CSV file
    const reportData = {
      title: report.title,
      date: formatDate(report.date),
      summary: report.summary,
      metrics: report.metrics
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-gray-900 to-cyber-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-blue mx-auto mb-4"></div>
          <p className="text-white">Loading security reports...</p>
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
            <h1 className="text-4xl font-bold text-white mb-2">Security Reports & Analytics</h1>
            <p className="text-gray-300">Comprehensive security incident reports and threat analysis</p>
          </div>
          <button className="cyber-button flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="cyber-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Reports</p>
                <p className="text-2xl font-bold text-white">{reports.length}</p>
              </div>
              <FileText className="w-8 h-8 text-cyber-blue" />
            </div>
          </div>
          <div className="cyber-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Incidents</p>
                <p className="text-2xl font-bold text-cyber-red">
                  {incidents.filter(i => i.status === 'investigating').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-cyber-red" />
            </div>
          </div>
          <div className="cyber-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Resolved Today</p>
                <p className="text-2xl font-bold text-cyber-green">8</p>
              </div>
              <Shield className="w-8 h-8 text-cyber-green" />
            </div>
          </div>
          <div className="cyber-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">System Health</p>
                <p className="text-2xl font-bold text-cyber-green">98%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-cyber-green" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reports List */}
          <div className="lg:col-span-2">
            <div className="cyber-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Security Reports</h2>
                <div className="flex space-x-2">
                  <select
                    value={filterDateRange}
                    onChange={(e) => setFilterDateRange(e.target.value)}
                    className="cyber-input text-sm"
                  >
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="all">All Time</option>
                  </select>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex space-x-2 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="cyber-input w-full pl-10"
                  />
                </div>
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="cyber-input"
                >
                  <option value="all">All Severities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Reports List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredReports.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No reports found</p>
                  </div>
                ) : (
                  filteredReports.map((report) => (
                    <div
                      key={report.id}
                      className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => setSelectedReport(report)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-white font-medium">{report.title}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(report.severity)}`}>
                              {report.severity.toUpperCase()}
                            </span>
                            <span className={`text-xs ${getStatusColor(report.status)}`}>
                              {report.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-2">{report.summary}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(report.date)}
                            </span>
                            <span>Type: {report.type}</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadReport(report);
                          }}
                          className="text-cyber-blue hover:text-cyber-blue/80 p-2"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Report Details & Recent Incidents */}
          <div className="space-y-6">
            {/* Report Details */}
            {selectedReport && (
              <div className="cyber-card">
                <h3 className="text-lg font-semibold text-white mb-4">Report Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm">Title</p>
                    <p className="text-white font-medium">{selectedReport.title}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Summary</p>
                    <p className="text-white text-sm">{selectedReport.summary}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Key Metrics</p>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(selectedReport.metrics).map(([key, value]) => (
                        <div key={key} className="bg-gray-800 rounded p-2">
                          <p className="text-gray-400 text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <p className="text-white font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Incidents */}
            <div className="cyber-card">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Incidents</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {incidents.length === 0 ? (
                  <div className="text-center py-4 text-gray-400">
                    <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No recent incidents</p>
                  </div>
                ) : (
                  incidents.map((incident) => (
                    <div key={incident.id} className="bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white text-sm font-medium">{incident.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                          {incident.severity}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs mb-2">{incident.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatDate(incident.date)}</span>
                        <span className={getStatusColor(incident.status)}>
                          {incident.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingPage;
