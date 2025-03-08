'use client';

import { useEffect, useState, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { Bar, Line } from 'react-chartjs-2';
import { Droplets, Download, ArrowBigLeft, Sun, Moon } from 'lucide-react';
import supabase from "@/lib/supabase";
import FileSaver from 'file-saver';  // Import FileSaver for downloading files

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface MonitoringData {
  id: number;
  kelembapan: number;
  hujan: number;
  kedalaman: number;
  waktu: string;
}

export default function MonitoringPage() {
  const [data, setData] = useState<MonitoringData[]>([]);
  const [page, setPage] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const router = useRouter();

  const fetchData = useCallback(async (limit: number) => {
    const { data: fetchedData, error } = await supabase
      .from("monitoring")
      .select("id, kelembapan, hujan, kedalaman, waktu")
      .order("id", { ascending: false })
      .limit(limit);  // Fetching the last `limit` records

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    setData(fetchedData || []);
  }, []);

  useEffect(() => {
    fetchData(10);  // Default fetch 10 records
    const intervalId = setInterval(() => fetchData(10), 5000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  const labels = data.map(item => new Date(item.waktu).toLocaleTimeString());

  // Utility function to convert data to CSV
  const convertToCSV = (data: MonitoringData[]): string => {
    const header = ['ID', 'Kelembapan (%)', 'Curah Hujan (mm)', 'Kedalaman Air (cm)', 'Waktu'];
    const rows = data.map(item => [
      item.id,
      item.kelembapan,
      item.hujan,
      item.kedalaman,
      new Date(item.waktu).toLocaleString(),
    ]);

    const csvContent = [header, ...rows].map(e => e.join(",")).join("\n");
    return csvContent;
  };

  // Function to trigger the CSV download
  const downloadData = (limit: number) => {
    fetchData(limit).then(() => {
      const csvContent = convertToCSV(data);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      FileSaver.saveAs(blob, `data-monitoring-${limit}.csv`);  // Use FileSaver to download
    });
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}>

      {/* Tombol Mode Gelap/Terang */}
      <button
        className="absolute top-4 right-4 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-900" />}
      </button>

      <button
        className={`flex items-center px-4 py-2 rounded-md mb-4 transition ${darkMode ? "bg-green-700 hover:bg-green-800 text-white" : "bg-green-500 hover:bg-green-600 text-black"}`}
        onClick={() => router.back()}
      >
        <ArrowBigLeft className="mr-2" size={20} /> Kembali
      </button>

      <h1 className={`text-4xl font-bold text-center mb-6 flex items-center justify-center ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}>
        <Droplets className="mr-2" size={40} /> Grafik Monitoring Persawahan 
      </h1>

      {/* Grafik Batang */}
      <div className={`max-w-4xl mx-auto border rounded-lg shadow-lg p-6 mb-6 transition ${darkMode ? "bg-gray-900 border-yellow-400" : "bg-gray-200 border-gray-500"}`}>
        <h2 className={`text-xl font-semibold text-center mb-4 ${darkMode ? "text-yellow-400" : "text-yellow-700"}`}>Grafik Data Monitoring (Bar)</h2>
        <Bar data={{
          labels,
          datasets: [
            {
              label: 'Kelembapan (%)',
              data: data.map(item => item.kelembapan),
              backgroundColor: '#4CAF50',
              borderColor: '#388E3C',
              borderWidth: 2,
            },
            {
              label: 'Curah Hujan (mm)',
              data: data.map(item => item.hujan),
              backgroundColor: '#000000',
              borderColor: '#000000',
              borderWidth: 2,
            },
            {
              label: 'Kedalaman Air (cm)',
              data: data.map(item => item.kedalaman),
              backgroundColor: '#FFC107',
              borderColor: '#FFA000',
              borderWidth: 2,
            },
          ]
        }} />
      </div>

      {/* Grafik Garis */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {['Kelembapan', 'Curah Hujan', 'Kedalaman Air'].map((label, index) => {
          const colors = ['#4CAF50', '#000000', '#FFC107'];
          const dataKeys = ['kelembapan', 'hujan', 'kedalaman'] as const;
          const dataKey = dataKeys[index];

          return (
            <div key={index} className={`border rounded-lg shadow-lg p-4 transition ${darkMode ? "bg-gray-900 border-yellow-400" : "bg-gray-200 border-gray-500"}`}>
              <h2 className={`text-md font-semibold text-center mb-2 ${darkMode ? "text-yellow-400" : "text-yellow-700"}`}>{label} (Line Chart)</h2>
              <Line data={{
                labels,
                datasets: [{
                  label: `${label} Data`,
                  data: data.map(item => item[dataKey]),
                  borderColor: colors[index],
                  borderWidth: 2,
                  fill: false,
                }],
              }} />
            </div>
          );
        })}
      </div>

      {/* Tabel dengan Scroll */}
      <div className={`max-w-4xl mx-auto border rounded-lg shadow-lg p-6 mb-6 transition ${darkMode ? "bg-gray-900 border-yellow-400" : "bg-gray-200 border-gray-500"}`}>
        <h2 className={`text-xl font-semibold text-center mb-4 ${darkMode ? "text-yellow-400" : "text-yellow-700"}`}>Data Terbaru</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Kelembapan (%)</th>
                <th className="p-2">Curah Hujan (mm)</th>
                <th className="p-2">Kedalaman Air (cm)</th>
                <th className="p-2">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.id}</td>
                  <td className="p-2">{item.kelembapan}</td>
                  <td className="p-2">{item.hujan}</td>
                  <td className="p-2">{item.kedalaman}</td>
                  <td className="p-2">{new Date(item.waktu).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tombol Download */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => downloadData(100)}  // Trigger download for 100 records
          className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md transition flex items-center ${darkMode ? "bg-yellow-400 text-black hover:bg-yellow-500" : "bg-yellow-500 text-black hover:bg-yellow-600"}`}
        >
          <Download className="mr-2" size={20} /> Download 100 Data
        </button>
        <button
          onClick={() => downloadData(200)}  // Trigger download for 200 records
          className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md transition flex items-center ${darkMode ? "bg-green-500 text-black hover:bg-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}
        >
          <Download className="mr-2" size={20} /> Download 200 Data
        </button>
      </div>
    </div>
  );
}
