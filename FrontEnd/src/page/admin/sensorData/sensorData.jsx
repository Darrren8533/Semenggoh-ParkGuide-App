import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, DatePicker, Button, Spin, Alert, Tabs, Empty, ConfigProvider } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FireOutlined, ThunderboltOutlined, DashboardOutlined, WarningOutlined } from '@ant-design/icons';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import './sensorData.css';

// API base URL
const API_BASE_URL = 'http://localhost:3000'; // Modify according to your backend server address

const { RangePicker } = DatePicker;

// Custom icons for different sensor types
const SoilMoistureIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M12,20C8.69,20 6,17.31 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14C18,17.31 15.31,20 12,20Z" />
  </svg>
);

const RainIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z" />
  </svg>
);

const MotionIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M13.5,5.5C14.59,5.5 15.5,4.58 15.5,3.5C15.5,2.38 14.59,1.5 13.5,1.5C12.39,1.5 11.5,2.38 11.5,3.5C11.5,4.58 12.39,5.5 13.5,5.5M9.89,19.38L10.89,15L13,17V23H15V15.5L12.89,13.5L13.5,10.5C14.79,12 16.79,13 19,13V11C17.09,11 15.5,10 14.69,8.58L13.69,7C13.29,6.38 12.69,6 12,6C11.69,6 11.5,6.08 11.19,6.08L6,8.28V13H8V9.58L9.79,8.88L8.19,17L3.29,16L2.89,18L9.89,19.38Z" />
  </svg>
);

// Create mock data (used when API is unavailable)
const createMockData = () => {
  const mockLatestData = {
    timestamp: new Date().toISOString(),
    temperature: 24.5,
    humidity: 70.0,
    motion: 'YES',
    rain: 'NO',
    soilMoisture: 1012
  };
  
  const mockHistoricalData = Array(20).fill(0).map((_, i) => {
    const date = new Date();
    date.setHours(date.getHours() - i);
    
    return {
      id: i,
      timestamp: date.toISOString(),
      temperature: 24.5 + (Math.random() * 2 - 1),
      humidity: 70 + (Math.random() * 10 - 5),
      motion: Math.random() > 0.5 ? 'YES' : 'NO',
      rain: Math.random() > 0.8 ? 'YES' : 'NO',
      soilMoisture: 1012 + (Math.random() * 100 - 50)
    };
  });
  
  return { mockLatestData, mockHistoricalData };
};

const SensorData = () => {
  const [activeLink, setActiveLink] = useState('sensorData');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latestData, setLatestData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [chartData, setChartData] = useState([]);
  const [apiAvailable, setApiAvailable] = useState(true);
  const [useMockData, setUseMockData] = useState(false); // Whether to use mock data

  // Fetch latest sensor data
  const fetchLatestData = async () => {
    try {
      setLoading(true);
      
      if (useMockData) {
        const { mockLatestData } = createMockData();
        setLatestData(mockLatestData);
        setError(null);
        return;
      }
      
      const response = await fetch(`${API_BASE_URL}/api/sensor-data/latest`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        setApiAvailable(false);
        throw new Error('Server did not return JSON. API might not be available.');
      }
      
      const data = await response.json();
      setLatestData(data);
      setApiAvailable(true);
      setError(null);
    } catch (err) {
      console.error('Error fetching latest sensor data:', err);
      
      if (err.message.includes('Failed to fetch') || 
          err.message.includes('NetworkError') || 
          err.message.includes('Network request failed') ||
          err.message.includes('Unexpected token')) {
        
        setApiAvailable(false);
        
        // Use mock data
        if (!useMockData) {
          setUseMockData(true);
          const { mockLatestData } = createMockData();
          setLatestData(mockLatestData);
        }
        
        setError('API is not available. Using mock data for demonstration.');
      } else {
        setError(`Failed to load latest sensor data: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch historical data based on date range
  const fetchHistoricalData = async (startDate = null, endDate = null) => {
    try {
      setLoading(true);
      
      if (useMockData) {
        const { mockHistoricalData } = createMockData();
        setHistoricalData(mockHistoricalData);
        const chartData = processDataForCharts(mockHistoricalData);
        setChartData(chartData);
        setError(null);
        return;
      }
      
      let url = `${API_BASE_URL}/api/sensor-data/history`;
      
      if (startDate && endDate) {
        url += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
      }
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        setApiAvailable(false);
        throw new Error('Server did not return JSON. API might not be available.');
      }
      
      const data = await response.json();
      setHistoricalData(data);
      
      // Prepare data for charts
      const chartData = processDataForCharts(data);
      setChartData(chartData);
      
      setApiAvailable(true);
      setError(null);
    } catch (err) {
      console.error('Error fetching historical sensor data:', err);
      
      if (err.message.includes('Failed to fetch') || 
          err.message.includes('NetworkError') || 
          err.message.includes('Network request failed') ||
          err.message.includes('Unexpected token')) {
        
        setApiAvailable(false);
        
        // Use mock data
        if (!useMockData) {
          setUseMockData(true);
          const { mockHistoricalData } = createMockData();
          setHistoricalData(mockHistoricalData);
          const chartData = processDataForCharts(mockHistoricalData);
          setChartData(chartData);
        }
        
        setError('API is not available. Using mock data for demonstration.');
      } else {
        setError(`Failed to load historical sensor data: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Process data for chart visualization
  const processDataForCharts = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }
    
    return data.map(item => ({
      timestamp: new Date(item.timestamp).toLocaleTimeString(),
      temperature: item.temperature,
      humidity: item.humidity,
      soilMoisture: item.soilMoisture,
      motion: item.motion === 'YES' ? 1 : 0,
      rain: item.rain === 'YES' ? 1 : 0
    }));
  };

  // Handle date range change
  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    if (dates && dates[0] && dates[1]) {
      fetchHistoricalData(dates[0], dates[1]);
    }
  };

  // Toggle mock data mode
  const toggleMockData = () => {
    const newMode = !useMockData;
    setUseMockData(newMode);
    
    // Re-fetch data
    if (newMode) {
      const { mockLatestData, mockHistoricalData } = createMockData();
      setLatestData(mockLatestData);
      setHistoricalData(mockHistoricalData);
      setChartData(processDataForCharts(mockHistoricalData));
      setError('Using mock data for demonstration.');
    } else {
      setLatestData(null);
      setHistoricalData([]);
      setChartData([]);
      fetchLatestData();
      fetchHistoricalData();
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchLatestData();
    fetchHistoricalData();
    
    // Poll for latest data every 30 seconds
    const interval = setInterval(() => {
      if (!useMockData) {
        fetchLatestData();
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [useMockData]);

  // Define tab items
  const tabItems = [
    {
      key: '1',
      label: 'Temperature & Humidity',
      children: (
        <div className="chart-container">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#ff7300" name="Temperature (°C)" />
                <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#387908" name="Humidity (%)" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Empty description="No data available" />
          )}
        </div>
      )
    },
    {
      key: '2',
      label: 'Soil Moisture',
      children: (
        <div className="chart-container">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="soilMoisture" stroke="#8884d8" name="Soil Moisture" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Empty description="No data available" />
          )}
        </div>
      )
    },
    {
      key: '3',
      label: 'Events (Motion/Rain)',
      children: (
        <div className="chart-container">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis domain={[0, 1]} />
                <Tooltip />
                <Legend />
                <Line type="step" dataKey="motion" stroke="#ff4d4f" name="Motion (1=YES, 0=NO)" />
                <Line type="step" dataKey="rain" stroke="#1890ff" name="Rain (1=YES, 0=NO)" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Empty description="No data available" />
          )}
        </div>
      )
    }
  ];

  // Define table columns
  const columns = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
    },
    {
      title: 'Temperature (°C)',
      dataIndex: 'temperature',
      key: 'temperature',
      render: (text) => text.toFixed(1),
      sorter: (a, b) => a.temperature - b.temperature,
    },
    {
      title: 'Humidity (%)',
      dataIndex: 'humidity',
      key: 'humidity',
      render: (text) => text.toFixed(1),
      sorter: (a, b) => a.humidity - b.humidity,
    },
    {
      title: 'Motion',
      dataIndex: 'motion',
      key: 'motion',
      filters: [
        { text: 'YES', value: 'YES' },
        { text: 'NO', value: 'NO' },
      ],
      onFilter: (value, record) => record.motion === value,
    },
    {
      title: 'Rain',
      dataIndex: 'rain',
      key: 'rain',
      filters: [
        { text: 'YES', value: 'YES' },
        { text: 'NO', value: 'NO' },
      ],
      onFilter: (value, record) => record.rain === value,
    },
    {
      title: 'Soil Moisture',
      dataIndex: 'soilMoisture',
      key: 'soilMoisture',
      sorter: (a, b) => a.soilMoisture - b.soilMoisture,
    },
  ];

  const getStatusColor = (value, type) => {
    switch (type) {
      case 'temperature':
        return value > 30 ? 'danger' : value < 10 ? 'warning' : 'success';
      case 'humidity':
        return value > 85 ? 'warning' : value < 40 ? 'warning' : 'success';
      case 'soilMoisture':
        return value > 1500 ? 'danger' : value < 800 ? 'warning' : 'success';
      case 'motion':
        return value === 'YES' ? 'warning' : 'success';
      case 'rain':
        return value === 'YES' ? 'info' : 'success';
      default:
        return 'success';
    }
  };

  return (
    <ConfigProvider theme={{ 
      token: { 
        colorBgContainer: '#fff',
        borderRadius: 6
      } 
    }}>
      <div className="admin-layout">
        <AdminSidebar activeLink={activeLink} setActiveLink={setActiveLink} />
        <div className="admin-content">
          <div className="admin-header">
            <h1 className="page-title">Greenhouse Sensor Monitoring</h1>
            <div className="header-actions">
              <Button 
                type={useMockData ? "dashed" : "default"} 
                onClick={toggleMockData}
                icon={useMockData ? <DashboardOutlined /> : <DashboardOutlined />}
              >
                {useMockData ? "Use Real Data" : "Use Mock Data"}
              </Button>
              <Button 
                type="primary" 
                onClick={() => {
                  fetchLatestData();
                  fetchHistoricalData();
                }}
                icon={<WarningOutlined />}
              >
                Refresh Data
              </Button>
            </div>
          </div>

          {!apiAvailable && (
            <Alert
              message="Backend API Unavailable"
              description="The sensor data API is not available. Using mock data for demonstration."
              type="warning"
              showIcon
              icon={<WarningOutlined />}
              className="error-alert"
              style={{ margin: '0 24px 24px 24px' }}
            />
          )}
          
          {error && (
            <Alert 
              message={error} 
              type={useMockData ? "info" : "error"} 
              className="error-alert"
              showIcon
              style={{ margin: '0 24px 24px 24px' }}
            />
          )}
          
          <div className="content-wrapper">
            <div className="data-section">
              <div className="section-header">
                <h2>Current Readings</h2>
                <span className="last-updated">
                  {latestData ? `Last updated: ${new Date(latestData.timestamp).toLocaleString()}` : ''}
                  {useMockData && <span className="data-tag">Mock Data</span>}
                </span>
              </div>
              
              {loading && !latestData ? (
                <div className="loading-container">
                  <Spin size="large" />
                </div>
              ) : latestData ? (
                <Row gutter={[16, 16]} className="sensor-cards">
                  <Col xs={24} sm={12} md={8} lg={8} xl={4}>
                    <Card 
                      className={`sensor-card ${getStatusColor(latestData.temperature, 'temperature')}`}
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FireOutlined style={{ fontSize: '18px', color: 'var(--danger-color)' }} />
                          <span>Temperature</span>
                        </div>
                      }
                      bordered={false}
                      hoverable
                    >
                      <h3>{latestData.temperature.toFixed(1)} °C</h3>
                      <p className="reading-time">Last updated: {new Date(latestData.timestamp).toLocaleTimeString()}</p>
                    </Card>
                  </Col>
                  
                  <Col xs={24} sm={12} md={8} lg={8} xl={4}>
                    <Card 
                      className={`sensor-card ${getStatusColor(latestData.humidity, 'humidity')}`}
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <ThunderboltOutlined style={{ fontSize: '18px', color: 'var(--primary-color)' }} />
                          <span>Humidity</span>
                        </div>
                      }
                      bordered={false}
                      hoverable
                    >
                      <h3>{latestData.humidity.toFixed(1)} %</h3>
                      <p className="reading-time">Last updated: {new Date(latestData.timestamp).toLocaleTimeString()}</p>
                    </Card>
                  </Col>
                  
                  <Col xs={24} sm={12} md={8} lg={8} xl={4}>
                    <Card 
                      className={`sensor-card ${getStatusColor(latestData.motion, 'motion')}`}
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <MotionIcon style={{ fontSize: '18px', color: 'var(--warning-color)' }} />
                          <span>Motion</span>
                        </div>
                      }
                      bordered={false}
                      hoverable
                    >
                      <h3>{latestData.motion}</h3>
                      <p className="reading-time">Last updated: {new Date(latestData.timestamp).toLocaleTimeString()}</p>
                    </Card>
                  </Col>
                  
                  <Col xs={24} sm={12} md={8} lg={8} xl={4}>
                    <Card 
                      className={`sensor-card ${getStatusColor(latestData.rain, 'rain')}`}
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <RainIcon style={{ fontSize: '18px', color: 'var(--info-color)' }} />
                          <span>Rain</span>
                        </div>
                      }
                      bordered={false}
                      hoverable
                    >
                      <h3>{latestData.rain}</h3>
                      <p className="reading-time">Last updated: {new Date(latestData.timestamp).toLocaleTimeString()}</p>
                    </Card>
                  </Col>
                  
                  <Col xs={24} sm={12} md={8} lg={8} xl={4}>
                    <Card 
                      className={`sensor-card ${getStatusColor(latestData.soilMoisture, 'soilMoisture')}`}
                      title={
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <SoilMoistureIcon style={{ fontSize: '18px', color: 'var(--success-color)' }} />
                          <span>Soil Moisture</span>
                        </div>
                      }
                      bordered={false}
                      hoverable
                    >
                      <h3>{latestData.soilMoisture}</h3>
                      <p className="reading-time">Last updated: {new Date(latestData.timestamp).toLocaleTimeString()}</p>
                    </Card>
                  </Col>
                </Row>
              ) : (
                <div className="no-data-container">
                  <Empty description="No sensor data available" />
                </div>
              )}
            </div>

            <div className="data-section">
              <div className="section-header">
                <h2>Sensor Data Analysis</h2>
                {useMockData && <span className="data-tag">Mock Data</span>}
              </div>
              <Tabs defaultActiveKey="1" className="sensor-tabs" items={tabItems} />
            </div>
            
            <div className="data-section">
              <div className="section-header">
                <h2>Historical Data</h2>
                {useMockData && <span className="data-tag">Mock Data</span>}
                <div className="table-filters">
                  <RangePicker 
                    value={dateRange}
                    onChange={handleDateRangeChange}
                    className="date-picker"
                    disabled={useMockData}
                    style={{ borderRadius: 'var(--radius-md)' }}
                  />
                  <Button 
                    type="default" 
                    onClick={() => {
                      setDateRange([null, null]);
                      fetchHistoricalData();
                    }}
                    disabled={useMockData}
                  >
                    Reset
                  </Button>
                </div>
              </div>
              
              <Table 
                dataSource={historicalData} 
                columns={columns} 
                rowKey="id"
                loading={loading}
                pagination={{ 
                  pageSize: 10,
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '50'],
                }}
                scroll={{ x: 'max-content' }}
                className="sensor-table"
                locale={{ emptyText: <Empty description="No historical data available" /> }}
              />
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default SensorData;
