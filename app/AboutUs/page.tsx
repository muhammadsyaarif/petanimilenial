// pages/about.tsx

export default function AboutUs() {
          return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white p-8">
              <h1 className="text-4xl font-bold mb-4">About Us</h1>
              <p className="text-lg max-w-2xl text-center mb-4">
                Kami adalah tim yang berdedikasi untuk menciptakan solusi monitoring lingkungan yang akurat dan efisien. 
                Dengan teknologi terbaru, kami membantu Anda memantau kondisi lingkungan secara real-time. Untuk tujuan ini, kami mengembangkan alat yang bernama <strong>MOSUJAGA</strong>, sebuah sistem monitoring kelembapan tanah yang dapat membantu dalam pemeliharaan lahan pertanian dan perkebunan.
              </p>
              <p className="text-lg max-w-2xl text-center mb-4">
                <strong>KELEMBAPAN</strong> dirancang dengan beberapa komponen utama untuk memantau kondisi kelembapan tanah dengan lebih mudah dan cepat. Berikut adalah alat dan bahan yang diperlukan:
              </p>
              <ul className="text-lg max-w-2xl text-left list-disc pl-8">
                <li><strong>Wemos D1 Mini</strong>: Mikrokontroler berbasis ESP8266 yang berfungsi sebagai pusat kendali untuk menghubungkan sensor kelembapan tanah dan mengirim data ke platform monitoring melalui Wi-Fi.</li>
                <li><strong>Sensor Kelembapan Tanah</strong>: Sensor ini digunakan untuk mendeteksi kadar kelembapan tanah, dengan output data analog yang mewakili tingkat kelembapan tanah. Alat ini sangat bermanfaat untuk pemantauan tanah, terutama dalam bidang pertanian dan perkebunan.</li>
                <li><strong>Catu Daya</strong>: Power supply atau baterai untuk menjalankan mikrokontroler Wemos dan sensor, memastikan alat dapat bekerja dalam berbagai kondisi lingkungan.</li>
              </ul>
              <p className="text-lg max-w-2xl text-center mt-4">
                Dengan sistem ini, <strong>KELEMBAPAN</strong> memberikan solusi untuk memantau kelembapan tanah secara real-time, membantu pemilik lahan dalam mengambil keputusan tepat untuk penyiraman atau perawatan tanah lainnya. Alat ini dapat mengirim data kelembapan secara nirkabel ke perangkat atau aplikasi monitoring, memudahkan pemantauan dari jarak jauh.
              </p>
            </div>
          );
        }
        