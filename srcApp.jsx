import React, { useState } from 'react';
import UploadExcel from './components/UploadExcel';
import DataGrid from './components/DataGrid';
import Login from './components/Login';

export default function App() {
  const [user, setUser] = useState(null);
  const [sheetData, setSheetData] = useState([]);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Courtesy Call Tracker</h1>
      <UploadExcel onData={setSheetData} />
      {sheetData.length > 0 && <DataGrid data={sheetData} user={user} />}
    </div>
  );
}
