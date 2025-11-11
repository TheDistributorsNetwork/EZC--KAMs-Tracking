import React from 'react';
import * as XLSX from 'xlsx';

export default function UploadExcel({ onData }) {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);
    onData(json);
  };

  return (
    <div className="my-4">
      <input type="file" accept=".xlsx,.xls" onChange={handleFile} className="border p-2 rounded" />
    </div>
  );
}
