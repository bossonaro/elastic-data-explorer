export interface IndexData {
  name: string;
  fields: string[];
  sampleData: Record<string, any>[];
}

export const mockElasticsearchIndices: IndexData[] = [
  {
    name: "user_logs_detailed",
    fields: ["timestamp", "user_id", "action", "ip_address", "user_agent", "session_id", "page_url", "referrer", "device_type", "browser_version", "os", "country", "city", "response_time", "status_code", "method", "request_size", "response_size", "_nome_fonte", "_autor_dado", "_data_carga", "_dominio"],
    sampleData: [
      {
        timestamp: "2024-01-15T10:30:45Z",
        user_id: "user_12345",
        action: "login",
        ip_address: "192.168.1.100",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        session_id: "sess_abc123",
        page_url: "/dashboard",
        referrer: "https://google.com",
        device_type: "desktop",
        browser_version: "Chrome 120.0",
        os: "Windows 10",
        country: "BR",
        city: "São Paulo",
        response_time: 250,
        status_code: 200,
        method: "POST",
        request_size: 1024,
        response_size: 2048,
        _nome_fonte: "Sistema de Logs Web",
        _autor_dado: "analytics_service",
        _data_carga: "2024-01-15T10:00:00Z",
        _dominio: "logs.webapp.com"
      },
      {
        timestamp: "2024-01-15T10:31:22Z",
        user_id: "user_67890",
        action: "page_view",
        ip_address: "192.168.1.101",
        user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        session_id: "sess_def456",
        page_url: "/products",
        referrer: "https://facebook.com",
        device_type: "mobile",
        browser_version: "Safari 17.0",
        os: "macOS 13.0",
        country: "US",
        city: "New York",
        response_time: 180,
        status_code: 200,
        method: "GET",
        request_size: 512,
        response_size: 4096,
        _nome_fonte: "Sistema de Logs Web",
        _autor_dado: "analytics_service",
        _data_carga: "2024-01-15T10:00:00Z",
        _dominio: "logs.webapp.com"
      }
    ]
  },
  {
    name: "user_logs",
    fields: ["timestamp", "user_id", "action", "ip_address", "user_agent", "_nome_fonte", "_autor_dado", "_data_carga", "_dominio"],
    sampleData: [
      {
        timestamp: "2024-01-15T10:30:45Z",
        user_id: "user_12345",
        action: "login",
        ip_address: "192.168.1.100",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        _nome_fonte: "Sistema de Logs Básico",
        _autor_dado: "log_collector",
        _data_carga: "2024-01-15T09:00:00Z",
        _dominio: "logs.system.com"
      },
      {
        timestamp: "2024-01-15T10:31:22Z",
        user_id: "user_67890",
        action: "page_view",
        ip_address: "192.168.1.101",
        user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        _nome_fonte: "Sistema de Logs Básico",
        _autor_dado: "log_collector",
        _data_carga: "2024-01-15T09:00:00Z",
        _dominio: "logs.system.com"
      }
    ]
  },
  {
    name: "product_catalog",
    fields: ["product_id", "name", "category", "price", "stock", "created_at", "_nome_fonte", "_autor_dado", "_data_carga", "_dominio"],
    sampleData: [
      {
        product_id: "prod_001",
        name: "Smartphone Pro Max",
        category: "Electronics",
        price: 999.99,
        stock: 150,
        created_at: "2024-01-10T08:00:00Z",
        _nome_fonte: "Catálogo de Produtos",
        _autor_dado: "product_team",
        _data_carga: "2024-01-10T07:00:00Z",
        _dominio: "catalog.ecommerce.com"
      },
      {
        product_id: "prod_002",
        name: "Wireless Headphones",
        category: "Electronics",
        price: 299.99,
        stock: 75,
        created_at: "2024-01-12T14:30:00Z",
        _nome_fonte: "Catálogo de Produtos",
        _autor_dado: "product_team",
        _data_carga: "2024-01-12T14:00:00Z",
        _dominio: "catalog.ecommerce.com"
      }
    ]
  },
  {
    name: "sales_transactions",
    fields: ["transaction_id", "customer_id", "amount", "payment_method", "status", "date", "_nome_fonte", "_autor_dado", "_data_carga", "_dominio"],
    sampleData: [
      {
        transaction_id: "txn_abc123",
        customer_id: "cust_456",
        amount: 1299.98,
        payment_method: "credit_card",
        status: "completed",
        date: "2024-01-15T15:45:30Z",
        _nome_fonte: "Sistema de Vendas",
        _autor_dado: "sales_processor",
        _data_carga: "2024-01-15T15:00:00Z",
        _dominio: "sales.payment.com"
      },
      {
        transaction_id: "txn_def456",
        customer_id: "cust_789",
        amount: 299.99,
        payment_method: "paypal",
        status: "pending",
        date: "2024-01-15T16:20:15Z",
        _nome_fonte: "Sistema de Vendas",
        _autor_dado: "sales_processor",
        _data_carga: "2024-01-15T16:00:00Z",
        _dominio: "sales.payment.com"
      }
    ]
  },
  {
    name: "system_metrics",
    fields: ["metric_name", "value", "unit", "host", "timestamp", "environment", "_nome_fonte", "_autor_dado", "_data_carga", "_dominio"],
    sampleData: [
      {
        metric_name: "cpu_usage",
        value: 75.3,
        unit: "percent",
        host: "web-server-01",
        timestamp: "2024-01-15T16:00:00Z",
        environment: "production",
        _nome_fonte: "Sistema de Métricas",
        _autor_dado: "monitoring_agent",
        _data_carga: "2024-01-15T16:00:00Z",
        _dominio: "metrics.monitoring.com"
      },
      {
        metric_name: "memory_usage",
        value: 8.2,
        unit: "GB",
        host: "web-server-01",
        timestamp: "2024-01-15T16:00:00Z",
        environment: "production",
        _nome_fonte: "Sistema de Métricas",
        _autor_dado: "monitoring_agent",
        _data_carga: "2024-01-15T16:00:00Z",
        _dominio: "metrics.monitoring.com"
      }
    ]
  }
];

// Simulate fetching all data for an index (for download)
export const generateFullIndexData = (indexName: string, rowCount: number = 1000): Record<string, any>[] => {
  const index = mockElasticsearchIndices.find(idx => idx.name === indexName);
  if (!index) return [];

  const fullData: Record<string, any>[] = [];
  
  for (let i = 0; i < rowCount; i++) {
    const sampleRecord = index.sampleData[i % index.sampleData.length];
    const newRecord = { ...sampleRecord };
    
    // Modify some fields to create variation
    Object.keys(newRecord).forEach(key => {
      if (key.includes('id')) {
        newRecord[key] = `${newRecord[key]}_${i + 1}`;
      } else if (typeof newRecord[key] === 'number') {
        newRecord[key] = newRecord[key] + (Math.random() * 100 - 50);
      } else if (key.includes('timestamp') || key.includes('date')) {
        const baseDate = new Date();
        baseDate.setMinutes(baseDate.getMinutes() - i);
        newRecord[key] = baseDate.toISOString();
      }
    });
    
    fullData.push(newRecord);
  }
  
  return fullData;
};