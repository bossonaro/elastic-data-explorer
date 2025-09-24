// Utility functions for exporting data in different formats

export const exportToCSV = (data: Record<string, any>[], filename: string) => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');
  
  downloadFile(csvContent, `${filename}.csv`, 'text/csv');
};

export const exportToXLS = (data: Record<string, any>[], filename: string) => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  let xlsContent = `<table><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
  
  data.forEach(row => {
    xlsContent += `<tr>${headers.map(h => `<td>${row[h] || ''}</td>`).join('')}</tr>`;
  });
  
  xlsContent += '</table>';
  
  downloadFile(xlsContent, `${filename}.xls`, 'application/vnd.ms-excel');
};

export const exportToXLSX = (data: Record<string, any>[], filename: string) => {
  // For XLSX, we'll use a simple XML format that Excel can read
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const xmlContent = `<?xml version="1.0"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
<Worksheet ss:Name="Sheet1">
<Table>
<Row>
${headers.map(h => `<Cell><Data ss:Type="String">${h}</Data></Cell>`).join('')}
</Row>
${data.map(row => 
  `<Row>
${headers.map(h => {
  const value = row[h];
  const type = typeof value === 'number' ? 'Number' : 'String';
  return `<Cell><Data ss:Type="${type}">${value || ''}</Data></Cell>`;
}).join('')}
</Row>`
).join('')}
</Table>
</Worksheet>
</Workbook>`;
  
  downloadFile(xmlContent, `${filename}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
};

const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  window.URL.revokeObjectURL(url);
};