import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { commitChangesToGitHub } from '../utils/github';

export default function DataGrid({ data, user }) {
  const [rows, setRows] = useState(data);

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const exportChanges = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CourtesyCalls");
    XLSX.writeFile(workbook, "updated_courtesy_calls.xlsx");
  };

  const pushToGitHub = async () => {
    await commitChangesToGitHub(rows, user);
    alert("Changes committed to GitHub successfully!");
  };

  return (
    <div>
      <table className="min-w-full border mt-4">
        <thead>
          <tr className="bg-blue-100">
            {Object.keys(rows[0]).map((key) => (
              <th key={key} className="border px-3 py-1">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {Object.keys(r).map((k) => (
                <td key={k} className="border px-3 py-1">
                  <input
                    value={r[k]}
                    onChange={(e) => handleChange(i, k, e.target.value)}
                    className="w-full bg-transparent"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex gap-3">
        <button onClick={exportChanges} className="bg-green-600 text-white px-4 py-2 rounded">Download Excel</button>
        <button onClick={pushToGitHub} className="bg-gray-800 text-white px-4 py-2 rounded">Commit to GitHub</button>
      </div>
    </div>
  );
}
