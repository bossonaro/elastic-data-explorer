export interface IndexData {
  name: string;
  fields: string[];
  sampleData: Record<string, any>[];
}

export const mockElasticsearchIndices: IndexData[] = [
  {
    name: "user_logs",
    fields: ["timestamp", "user_id", "action", "ip_address", "user_agent"],
    sampleData: [
      {
        timestamp: "2024-01-15T10:30:45Z",
        user_id: "user_12345",
        action: "login",
        ip_address: "192.168.1.100",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      {
        timestamp: "2024-01-15T10:31:22Z",
        user_id: "user_67890",
        action: "page_view",
        ip_address: "192.168.1.101",
        user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
      }
    ]
  },
  {
    name: "product_catalog",
    fields: ["product_id", "name", "category", "price", "stock", "created_at"],
    sampleData: [
      {
        product_id: "prod_001",
        name: "Smartphone Pro Max",
        category: "Electronics",
        price: 999.99,
        stock: 150,
        created_at: "2024-01-10T08:00:00Z"
      },
      {
        product_id: "prod_002",
        name: "Wireless Headphones",
        category: "Electronics",
        price: 299.99,
        stock: 75,
        created_at: "2024-01-12T14:30:00Z"
      }
    ]
  },
  {
    name: "sales_transactions",
    fields: ["transaction_id", "customer_id", "amount", "payment_method", "status", "date"],
    sampleData: [
      {
        transaction_id: "txn_abc123",
        customer_id: "cust_456",
        amount: 1299.98,
        payment_method: "credit_card",
        status: "completed",
        date: "2024-01-15T15:45:30Z"
      },
      {
        transaction_id: "txn_def456",
        customer_id: "cust_789",
        amount: 299.99,
        payment_method: "paypal",
        status: "pending",
        date: "2024-01-15T16:20:15Z"
      }
    ]
  },
  {
    name: "system_metrics",
    fields: ["metric_name", "value", "unit", "host", "timestamp", "environment"],
    sampleData: [
      {
        metric_name: "cpu_usage",
        value: 75.3,
        unit: "percent",
        host: "web-server-01",
        timestamp: "2024-01-15T16:00:00Z",
        environment: "production"
      },
      {
        metric_name: "memory_usage",
        value: 8.2,
        unit: "GB",
        host: "web-server-01",
        timestamp: "2024-01-15T16:00:00Z",
        environment: "production"
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