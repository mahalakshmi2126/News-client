import React, { useState, useEffect } from 'react';import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7days');

  const [newsPerDayData, setNewsPerDayData] = useState([]);
  const [topContributors, setTopContributors] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [overviewStats, setOverviewStats] = useState([]);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.get(`http://localhost:5000/api/analytics?range=${timeRange}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNewsPerDayData(res.data.newsPerDay || []);
      setTopContributors(res.data.topContributors || []);
      setCategoryData(res.data.categoryData || []);
      setOverviewStats(res.data.overviewStats || []);
    } catch (err) {
      console.error('Error fetching analytics data:', err);
    }
  };

  const handleSendReport = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(`http://localhost:5000/api/analytics/send-report?range=${timeRange}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Report sent successfully');
    } catch (err) {
      toast.error('Failed to send report');
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-text-primary">
            Analytics Dashboard
          </h1>
          <p className="text-text-secondary">
            Monitor news performance and contributor activity
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background text-sm"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm mb-1">{stat.title}</p>
                <p className="text-2xl font-semibold text-text-primary">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-xs font-medium ${
                    stat.changeType === 'positive' ? 'text-success' : 'text-error'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-text-secondary ml-1">vs last period</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name={stat.icon} size={24} className="text-accent" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* News Per Day Chart */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-medium text-text-primary mb-4">
            News Articles Per Day
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={newsPerDayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value) => [value, 'Articles']}
                />
                <Bar dataKey="count" fill="#3182ce" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-medium text-text-primary mb-4">
            Articles by Category
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Contributors */}
      <div className="bg-white rounded-lg shadow-card">
        <div className="p-6 border-b border-border-light">
          <h2 className="text-lg font-medium text-text-primary">
            Top Contributors
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {topContributors.map((contributor, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">
                      {contributor.name}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {contributor.articles} articles published
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-text-primary">
                    {contributor.views.toLocaleString()}
                  </p>
                  <p className="text-sm text-text-secondary">
                    total views
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="bg-white rounded-lg shadow-card p-6">
        <h2 className="text-lg font-medium text-text-primary mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="justify-start">
            <Icon name="Download" size={16} className="mr-2" />
            Export Analytics
          </Button>
          <Button variant="outline" className="justify-start" onClick={handleSendReport}>
            <Icon name="Mail" size={16} className="mr-2" />
            Send Report
          </Button>
          <Button variant="outline" className="justify-start">
            <Icon name="Calendar" size={16} className="mr-2" />
            Schedule Report
          </Button>
          <Button variant="outline" className="justify-start">
            <Icon name="Settings" size={16} className="mr-2" />
            Configure Alerts
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default Analytics; 