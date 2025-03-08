'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import supabase from "@/lib/supabase";
import Image from 'next/image';
import { Droplets, CloudRain, Calendar, Layers, Sun, Moon, ArrowBigLeft } from 'lucide-react'; 
import { useRouter } from 'next/navigation';


export default function Homepage() {
  const [data, setData] = useState<{ kelembapan: number; hujan: number; waktu: string; kedalaman: number } | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const router = useRouter();

  const fetchLatestData = async () => {
    const { data, error } = await supabase
      .from("monitoring")
      .select("kelembapan, hujan, waktu, kedalaman")
      .order("id", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    setData(data);
  };

  useEffect(() => {
    fetchLatestData();
    const intervalId = setInterval(fetchLatestData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`relative min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>

      {/* Tombol Kembali */}
      <button 
        onClick={() => router.back()}
        className="absolute top-4 left-4 p-2 sm:p-3 rounded-full shadow-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
      >
        <ArrowBigLeft size={24} className="text-white sm:text-28" />
      </button>

      {/* Tombol Mode Gelap/Terang */}
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 sm:p-3 rounded-full shadow-lg bg-yellow-500 hover:bg-yellow-400 transition duration-300"
      >
        {darkMode ? (
          <Sun size={20} className="text-black sm:text-28" />
        ) : (
          <Moon size={20} className="text-black sm:text-28" />
        )}
      </button>

      <div className="relative z-10 text-center max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg mb-6 text-yellow-400">
          Monitoring Kondisi Sawah
        </h1>

        <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
          Pantau kondisi Persawahan Anda secara real-time dan akurat dengan alat kami yang canggih.
        </p>

        {/* Data Terkini */}
        <div className="mt-10 space-y-6">
          <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${darkMode ? 'text-yellow-500' : 'text-green-700'}`}>Data Terkini:</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
            <div className="p-4 sm:p-5 rounded-xl shadow-lg text-black flex flex-col items-center bg-green-500 hover:scale-105 transition-transform">
              <Droplets size={30} className="text-black sm:text-40" />
              <p className="text-sm sm:text-lg font-semibold mt-2">Kelembapan</p>
              {data ? <p className="text-xs sm:text-sm md:text-xl">{data.kelembapan} %</p> : <p>Mengambil data...</p>}
            </div>
            <div className="p-4 sm:p-5 rounded-xl shadow-lg text-black flex flex-col items-center bg-yellow-400 hover:scale-105 transition-transform">
              <CloudRain size={30} className="text-black sm:text-40" />
              <p className="text-sm sm:text-lg font-semibold mt-2">Curah Hujan</p>
              {data ? <p className="text-xs sm:text-sm md:text-xl">{data.hujan} mm</p> : <p>Mengambil data...</p>}
            </div>
            <div className="p-4 sm:p-5 rounded-xl shadow-lg text-black flex flex-col items-center bg-green-700 hover:scale-105 transition-transform">
              <Layers size={30} className="text-black sm:text-40" />
              <p className="text-sm sm:text-lg font-semibold mt-2">Kedalaman Air</p>
              {data ? <p className="text-xs sm:text-sm md:text-xl">{data.kedalaman} cm</p> : <p>Mengambil data...</p>}
            </div>
            <div className="p-4 sm:p-5 rounded-xl shadow-lg text-black flex flex-col items-center bg-yellow-600 hover:scale-105 transition-transform">
              <Calendar size={30} className="text-black sm:text-40" />
              <p className="text-sm sm:text-lg font-semibold mt-2">Waktu</p>
              {data ? <p className="text-xs sm:text-sm md:text-xl">{new Date(data.waktu).toLocaleString()}</p> : <p>Mengambil data...</p>}
            </div>
          </div>
        </div>

        <div className="my-12">
          <Image
            src="/tani.jpg"
            alt="Monitoring Kelembapan Tanah"
            width={600}
            height={400}
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="flex flex-col space-y-4 mt-6 items-center text-center">
          <Link href="/monitoring" className="relative inline-block px-6 sm:px-8 py-2 sm:py-3 text-lg sm:text-xl font-bold text-black bg-green-400 rounded-full shadow-lg hover:scale-105 transition duration-300 ease-in-out">
            Grafik Monitoring
          </Link>
        </div>
      </div>
    </div>
  );
}
