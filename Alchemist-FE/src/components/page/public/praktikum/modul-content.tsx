import { Roboto } from 'next/font/google';
import React from 'react';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const ModulPengenalanAsamBasa = () => (
  <div
    className={`space-y-6 ${roboto.className} text-slate-700 leading-relaxed text-lg md:text-xl pr-8 md:pr-32 pb-32`}
  >
    <p>
      Asam dan basa merupakan dua jenis zat yang banyak ditemukan dalam kehidupan sehari-hari maupun
      di laboratorium. Keduanya memiliki sifat yang berbeda dan dapat dikenali melalui karakteristik
      tertentu, seperti rasa, tingkat keasaman, serta perubahan warna pada indikator. Menurut teori
      Arrhenius, asam adalah zat yang menghasilkan ion hidrogen (H⁺) ketika dilarutkan dalam air,
      sedangkan basa adalah zat yang menghasilkan ion hidroksida (OH⁻) ketika dilarutkan dalam air.
      Teori ini menjadi dasar untuk memahami perilaku asam dan basa dalam berbagai reaksi kimia.
    </p>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Karakteristik Asam</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Memiliki rasa masam.</li>
        <li>Mengubah lakmus biru menjadi merah.</li>
        <li>Bereaksi dengan beberapa logam menghasilkan gas hidrogen.</li>
        <li>Memiliki nilai pH kurang dari 7.</li>
      </ul>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Karakteristik Basa</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Memiliki rasa pahit.</li>
        <li>Terasa licin ketika disentuh.</li>
        <li>Mengubah lakmus merah menjadi biru.</li>
        <li>Memiliki nilai pH lebih dari 7.</li>
      </ul>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Skala pH</h3>
      <p className="mb-2">
        Tingkat keasaman atau kebasaan suatu larutan dinyatakan menggunakan skala pH yang berkisar
        dari 0 hingga 14.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>pH &lt; 7 → Bersifat asam</li>
        <li>pH = 7 → Bersifat netral</li>
        <li>pH &gt; 7 → Bersifat basa</li>
      </ul>
      <p className="mt-2">
        Semakin kecil nilai pH, semakin kuat sifat asam suatu larutan. Sebaliknya, semakin besar
        nilai pH, semakin kuat sifat basanya.
      </p>
    </div>

    <div className="my-8 flex flex-col items-center">
      <div className="flex justify-between w-full max-w-2xl text-xs font-bold text-slate-500 mb-2">
        <span>Asam</span>
        <span>Netral</span>
        <span>Basa</span>
      </div>
      <div className="w-full max-w-2xl h-8 rounded-full overflow-hidden flex bg-gradient-to-r from-red-600 via-yellow-400 to-purple-800 shadow-inner"></div>
      <div className="flex justify-between w-full max-w-2xl text-xs font-bold text-slate-500 mt-2 px-1">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num) => (
          <span key={num}>{num}</span>
        ))}
      </div>
      <div className="flex justify-between w-full max-w-2xl text-xs font-bold text-slate-500 mt-4 px-8">
        <span>pH &lt; 7</span>
        <span>pH = 7</span>
        <span>pH &gt; 7</span>
      </div>
    </div>
  </div>
);

export const ModulIndikator = () => (
  <div
    className={`space-y-6 ${roboto.className} text-slate-700 leading-relaxed text-lg md:text-xl pr-8 md:pr-32 pb-32`}
  >
    <div>
      <h3 className="font-bold text-slate-800 mb-2">Tujuan Pembelajaran</h3>
      <p>Setelah mempelajari materi ini, peserta didik diharapkan mampu:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Memahami pengertian indikator asam dan basa.</li>
        <li>Menjelaskan fungsi indikator dalam mengidentifikasi sifat larutan.</li>
        <li>Mengenal berbagai jenis indikator asam dan basa.</li>
        <li>Menjelaskan perubahan warna indikator pada suasana asam, netral, dan basa.</li>
        <li>Menggunakan indikator untuk menentukan sifat suatu larutan secara sederhana.</li>
      </ul>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Pengertian Indikator Asam dan Basa</h3>
      <p>
        Dalam kehidupan sehari-hari maupun kegiatan laboratorium, sering kali kita menemukan
        berbagai jenis larutan yang memiliki sifat berbeda-beda. Ada larutan yang bersifat asam,
        seperti air jeruk dan cuka, ada yang bersifat basa seperti sabun dan deterjen, serta ada
        pula yang bersifat netral seperti air murni.
      </p>
      <p className="mt-2">
        Untuk mengetahui sifat suatu larutan, diperlukan suatu zat yang disebut indikator asam dan
        basa. Indikator asam dan basa adalah zat yang dapat menunjukkan perubahan warna ketika
        berada dalam larutan asam, netral, atau basa. Perubahan warna tersebut digunakan sebagai
        petunjuk untuk menentukan sifat suatu larutan.
      </p>
      <p className="mt-2">
        Indikator bekerja karena molekul penyusunnya bereaksi terhadap konsentrasi ion hidrogen (H⁺)
        atau ion hidroksida (OH⁻) yang terdapat dalam larutan. Akibatnya, indikator akan menampilkan
        warna yang berbeda sesuai tingkat keasaman atau kebasaan larutan.
      </p>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Fungsi Indikator Asam dan Basa</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Menentukan apakah suatu larutan bersifat asam, basa, atau netral.</li>
        <li>Membantu mengukur kisaran pH larutan.</li>
        <li>Digunakan dalam proses titrasi untuk mengetahui titik akhir reaksi.</li>
        <li>Membantu analisis kualitas air dan bahan kimia.</li>
      </ul>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Jenis-Jenis Indikator Asam dan Basa</h3>
      <h4 className="font-semibold text-slate-800 mt-2">1. Indikator Alami</h4>
      <p>
        Indikator alami berasal dari tumbuhan yang mengandung zat warna alami (pigmen) yang sensitif
        terhadap perubahan pH.
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>
          <strong>Kubis Ungu:</strong> Asam → merah, Netral → ungu, Basa → hijau hingga kuning
        </li>
        <li>
          <strong>Bunga Sepatu:</strong> Asam → merah terang, Basa → hijau kehitaman
        </li>
        <li>
          <strong>Kunyit:</strong> Asam → kuning, Basa → merah kecokelatan
        </li>
        <li>
          <strong>Bunga Telang:</strong> Asam → merah muda/ungu, Netral → biru, Basa → hijau
        </li>
      </ul>

      <h4 className="font-semibold text-slate-800 mt-4">2. Indikator Buatan</h4>
      <p>
        Indikator buatan dibuat secara khusus di laboratorium dan memiliki rentang perubahan warna
        yang lebih jelas.
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>
          <strong>Lakmus:</strong> Merah tetap merah (Asam), Merah jadi biru (Basa). Biru jadi merah
          (Asam), Biru tetap biru (Basa).
        </li>
        <li>
          <strong>Fenolftalein (PP):</strong> Asam/Netral → tidak berwarna, Basa → merah muda.
        </li>
        <li>
          <strong>Metil Jingga (MO):</strong> Asam → merah, Netral → oranye, Basa → kuning.
        </li>
        <li>
          <strong>Bromtimol Biru (BTB):</strong> Asam → kuning, Netral → hijau, Basa → biru.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Indikator Universal</h3>
      <p>
        Indikator universal merupakan campuran beberapa indikator yang dapat menunjukkan nilai pH
        secara lebih lengkap. Rentang warnanya:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>pH 1–3 → merah (asam kuat)</li>
        <li>pH 4–6 → kuning hingga oranye (asam lemah)</li>
        <li>pH 7 → hijau (netral)</li>
        <li>pH 8–10 → biru (basa lemah)</li>
        <li>pH 11–14 → ungu (basa kuat)</li>
      </ul>
    </div>
  </div>
);

export const ModulDasarTitrasi = () => (
  <div
    className={`space-y-6 ${roboto.className} text-slate-700 leading-relaxed text-lg md:text-xl pr-8 md:pr-32 pb-32`}
  >
    <div>
      <h3 className="font-bold text-slate-800 mb-2">Pengertian Titrasi Asam Basa</h3>
      <p>
        Titrasi asam basa merupakan metode analisis kuantitatif yang dilakukan dengan mereaksikan
        larutan asam dan larutan basa yang konsentrasinya telah diketahui hingga mencapai keadaan
        setara secara stoikiometri.
      </p>
      <p className="mt-2">
        Dengan kata lain, titrasi digunakan untuk menentukan konsentrasi suatu larutan dengan cara
        menambahkan larutan lain yang telah diketahui konsentrasinya secara bertahap sampai reaksi
        berlangsung sempurna.
      </p>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Prinsip Dasar Titrasi Asam Basa</h3>
      <p>
        Titrasi asam basa didasarkan pada reaksi netralisasi antara asam dan basa. Reaksi
        netralisasi adalah reaksi antara ion hidrogen (H⁺) dari asam dengan ion hidroksida (OH⁻)
        dari basa yang menghasilkan air.
      </p>
      <p className="mt-2 font-mono bg-slate-100 p-2 rounded">Asam + Basa → Garam + Air</p>
      <p className="mt-2 font-mono bg-slate-100 p-2 rounded">HCl + NaOH → NaCl + H₂O</p>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Istilah-Istilah Penting</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Titran:</strong> Larutan yang konsentrasinya telah diketahui dengan pasti dan
          digunakan untuk menitrasi larutan lain (biasanya di buret).
        </li>
        <li>
          <strong>Titrat:</strong> Larutan yang akan ditentukan konsentrasinya (biasanya di
          erlenmeyer).
        </li>
        <li>
          <strong>Titik Ekuivalen:</strong> Keadaan ketika jumlah mol asam tepat sama dengan jumlah
          mol basa yang bereaksi.
        </li>
        <li>
          <strong>Titik Akhir Titrasi:</strong> Kondisi ketika indikator menunjukkan perubahan warna
          yang menandakan reaksi telah mendekati atau mencapai titik ekuivalen.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Jenis-Jenis Titrasi Asam Basa</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Asam Kuat dengan Basa Kuat:</strong> Titik ekuivalen di sekitar pH 7. (contoh: HCl
          dengan NaOH)
        </li>
        <li>
          <strong>Asam Kuat dengan Basa Lemah:</strong> Titik ekuivalen di pH kurang dari 7.
          (contoh: HCl dengan NH₄OH)
        </li>
        <li>
          <strong>Asam Lemah dengan Basa Kuat:</strong> Titik ekuivalen di pH lebih dari 7. (contoh:
          CH₃COOH dengan NaOH)
        </li>
      </ul>
    </div>
  </div>
);

export const ModulPerhitungan = () => (
  <div
    className={`space-y-6 ${roboto.className} text-slate-700 leading-relaxed text-lg md:text-xl pr-8 md:pr-32 pb-32`}
  >
    <div>
      <h3 className="font-bold text-slate-800 mb-2">Konsep Mol dan Molaritas</h3>
      <p>Hubungan antara mol dan molaritas dituliskan sebagai:</p>
      <div className="bg-slate-100 p-4 rounded-lg my-2 font-mono text-center font-bold text-lg">
        n = M × V
      </div>
      <p>Keterangan: n = jumlah mol, M = molaritas (mol/L), V = volume larutan (L).</p>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Dasar Perhitungan Titrasi</h3>
      <p>
        Pada titik ekuivalen, jumlah mol asam sama dengan jumlah mol basa. Untuk reaksi dengan
        perbandingan 1:1, berlaku rumus:
      </p>
      <div className="bg-slate-100 p-4 rounded-lg my-2 font-mono text-center font-bold text-lg">
        M₁ × V₁ = M₂ × V₂
      </div>
      <p>Jika perbandingan koefisien reaksi tidak sama, digunakan rumus umum:</p>
      <div className="bg-slate-100 p-4 rounded-lg my-2 font-mono text-center font-bold text-lg">
        M₁ × V₁ × a = M₂ × V₂ × b
      </div>
      <p>Keterangan: a = koefisien/valensi zat 1, b = koefisien/valensi zat 2.</p>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Contoh Soal</h3>
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <p className="font-semibold">
          Sebanyak 25 mL HCl dititrasi menggunakan NaOH 0,1 M. Volume NaOH yang diperlukan untuk
          mencapai titik akhir adalah 20 mL. Tentukan konsentrasi HCl!
        </p>
        <div className="mt-4 space-y-1 font-mono text-sm">
          <p>M₁ × V₁ = M₂ × V₂</p>
          <p>M_HCl × 25 = 0,1 × 20</p>
          <p>M_HCl × 25 = 2</p>
          <p>M_HCl = 2 / 25 = 0,08 M</p>
        </div>
      </div>
    </div>
  </div>
);

export const ModulPenerapan = () => (
  <div
    className={`space-y-6 ${roboto.className} text-slate-700 leading-relaxed text-lg md:text-xl pr-8 md:pr-32 pb-32`}
  >
    <div>
      <h3 className="font-bold text-slate-800 mb-2">Penerapan Titrasi dalam Industri</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Industri Makanan dan Minuman:</strong> Mengukur kadar asam pada minuman seperti
          jus buah, yogurt, saus. Kadar asam mempengaruhi rasa dan keamanan produk.
        </li>
        <li>
          <strong>Industri Farmasi:</strong> Menentukan kadar zat aktif obat agar sesuai standar
          dosis.
        </li>
        <li>
          <strong>Analisis Air:</strong> Mengukur tingkat keasaman air, menguji kualitas air minum,
          dan mengontrol limbah.
        </li>
        <li>
          <strong>Pertanian:</strong> Menentukan tingkat keasaman tanah untuk menyesuaikan jenis
          pupuk atau kapur yang dibutuhkan tanaman.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Keunggulan Metode Titrasi</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Akurat dan teliti.</li>
        <li>Relatif murah tanpa alat yang sangat mahal.</li>
        <li>Mudah dilakukan di laboratorium sekolah maupun profesional.</li>
        <li>Hasil dapat diperoleh dengan cepat.</li>
      </ul>
    </div>
  </div>
);

export const ModulKeselamatan = () => (
  <div
    className={`space-y-6 ${roboto.className} text-slate-700 leading-relaxed text-lg md:text-xl pr-8 md:pr-32 pb-32`}
  >
    <div>
      <h3 className="font-bold text-slate-800 mb-2">Tujuan Pembelajaran</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Memahami pentingnya Keselamatan dan Kesehatan Kerja (K3) di laboratorium.</li>
        <li>Mengetahui tata tertib serta prosedur standar bekerja di laboratorium kimia.</li>
        <li>Mengenal fungsi Alat Pelindung Diri (APD) utama.</li>
        <li>Mampu melakukan pertolongan pertama pada kecelakaan kerja ringan.</li>
      </ul>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Tata Tertib Laboratorium</h3>
      <p>
        Bekerja di laboratorium kimia memiliki risiko bahaya dari bahan beracun, mudah terbakar,
        maupun korosif. Oleh karena itu, peserta didik wajib mematuhi aturan berikut:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>Dilarang makan, minum, atau merokok di dalam laboratorium.</li>
        <li>
          Wajib menggunakan <strong>Jas Laboratorium</strong> lengan panjang selama melakukan
          praktikum.
        </li>
        <li>
          Wajib mengenakan sepatu tertutup (bukan sandal) untuk melindungi kaki dari tumpahan bahan
          kimia.
        </li>
        <li>
          Bagi yang berambut panjang, rambut harus diikat rapi agar tidak mengganggu atau terkena
          api.
        </li>
        <li>
          Gunakan kacamata pelindung (goggles) dan sarung tangan saat menangani bahan berbahaya.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Penanganan Bahan Kimia</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Jangan menghirup</strong> uap bahan kimia secara langsung. Jika ingin mencium
          baunya, kibaskan tangan di atas mulut botol ke arah hidung.
        </li>
        <li>
          Selalu baca label bahan kimia dengan teliti sebelum digunakan. Perhatikan simbol bahaya
          (Korosif, Mudah Terbakar, Toksik, dll).
        </li>
        <li>
          Jika mengencerkan asam pekat (misal H₂SO₄),{' '}
          <strong>selalu tuangkan asam ke dalam air</strong>, bukan sebaliknya.
        </li>
        <li>Jangan mencicipi bahan kimia apa pun.</li>
      </ul>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Pertolongan Pertama pada Kecelakaan</h3>
      <p>
        Jika terjadi kecelakaan, tetap tenang dan segera lapor ke guru atau laboran. Langkah darurat
        awal:
      </p>
      <ul className="list-disc pl-6 space-y-1 mt-2">
        <li>
          <strong>Kulit terkena asam/basa:</strong> Segera bilas dengan air mengalir yang banyak
          selama 10-15 menit.
        </li>
        <li>
          <strong>Mata terkena percikan:</strong> Gunakan alat pencuci mata (eye wash) dan bilas
          dengan air mengalir tanpa digosok.
        </li>
        <li>
          <strong>Luka bakar:</strong> Rendam bagian yang terkena dengan air dingin, jangan diolesi
          pasta gigi.
        </li>
      </ul>
    </div>
  </div>
);

export const ModulPengelolaanLimbah = () => (
  <div
    className={`space-y-6 ${roboto.className} text-slate-700 leading-relaxed text-lg md:text-xl pr-8 md:pr-32 pb-32`}
  >
    <div>
      <h3 className="font-bold text-slate-800 mb-2">Pentingnya Pengelolaan Limbah</h3>
      <p>
        Semua sisa bahan kimia dari hasil praktikum (seperti titrasi) tidak boleh dibuang
        sembarangan ke wastafel. Limbah kimia yang langsung dibuang dapat mencemari lingkungan,
        membunuh organisme air, dan merusak perpipaan karena sifatnya yang korosif.
      </p>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Penggolongan Limbah Kimia</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Limbah Asam & Basa:</strong> Berasal dari sisa titrasi asam-basa. Limbah ini
          bersifat korosif dan bisa merusak lingkungan.
        </li>
        <li>
          <strong>Limbah Pelarut Organik:</strong> Seperti etanol, aseton, dan kloroform. Tidak
          boleh dicampur dengan limbah asam/basa.
        </li>
        <li>
          <strong>Limbah Padat:</strong> Sisa kertas saring, pecahan kaca, atau endapan reaksi.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Prosedur Pembuangan Limbah Asam Basa</h3>
      <p>Untuk limbah dari praktikum titrasi asam-basa, prosedur standarnya adalah:</p>
      <ul className="list-decimal pl-6 space-y-2 mt-2">
        <li>
          <strong>Netralisasi:</strong> Sebelum dibuang, sisa asam atau basa harus dinetralkan
          terlebih dahulu. Tambahkan asam lemah atau basa lemah sedikit demi sedikit hingga pH
          berada di kisaran 6 - 8.
        </li>
        <li>
          <strong>Pengenceran:</strong> Setelah dinetralkan, limbah dapat diencerkan dengan air yang
          sangat banyak sebelum dialirkan ke saluran pembuangan khusus laboratorium.
        </li>
        <li>
          <strong>Pemisahan Wadah:</strong> Jika mengandung logam berat (meskipun jarang pada
          titrasi asam-basa dasar), limbah harus ditampung dalam jerigen khusus berlabel{' '}
          <em>&quot;Limbah B3 Anorganik&quot;</em> dan diserahkan ke pihak pengelola limbah.
        </li>
      </ul>
    </div>
  </div>
);

export const ModulAlatBahanTitrasi = () => (
  <div
    className={`space-y-6 ${roboto.className} text-slate-700 leading-relaxed text-lg md:text-xl pr-8 md:pr-32 pb-32`}
  >
    <div>
      <h3 className="font-bold text-slate-800 mb-2">Peralatan Utama Titrasi</h3>
      <p>Untuk melakukan titrasi yang akurat, dibutuhkan beberapa alat laboratorium khusus:</p>
      <ul className="list-disc pl-6 space-y-3 mt-2">
        <li>
          <strong>Buret:</strong> Tabung kaca panjang berskala yang dilengkapi kran di bagian bawah.
          Berfungsi untuk mengeluarkan dan mengukur volume titran dengan ketelitian hingga 0,1 mL
          atau 0,05 mL.
        </li>
        <li>
          <strong>Statif dan Klem:</strong> Alat yang terbuat dari besi untuk menjepit dan menopang
          buret agar dapat berdiri tegak lurus secara stabil.
        </li>
        <li>
          <strong>Erlenmeyer:</strong> Wadah berbentuk kerucut untuk menampung titrat (larutan
          sampel). Bentuknya dirancang khusus agar saat cairan diguncang/diaduk, larutan tidak mudah
          tumpah.
        </li>
        <li>
          <strong>Pipet Volume (Pipet Gondok):</strong> Alat pengambil cairan dengan volume yang
          sangat presisi (misal tepat 10 mL atau 25 mL) untuk mengambil titrat.
        </li>
        <li>
          <strong>Bulb (Karet Penghisap):</strong> Alat untuk membantu menyedot larutan ke dalam
          pipet volume dengan aman tanpa menggunakan mulut.
        </li>
        <li>
          <strong>Corong Kaca:</strong> Digunakan untuk membantu memasukkan titran ke dalam buret
          dari bagian atas agar tidak tumpah.
        </li>
      </ul>
    </div>

    <div>
      <h3 className="font-bold text-slate-800 mb-2">Bahan-Bahan Titrasi</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Titran (Larutan Standar):</strong> Larutan yang sudah diketahui konsentrasinya
          secara pasti. Contoh: NaOH 0.1 M. Ditempatkan di dalam buret.
        </li>
        <li>
          <strong>Titrat (Sampel):</strong> Larutan yang akan dicari atau dihitung konsentrasinya.
          Contoh: Larutan HCl atau CH₃COOH yang belum diketahui molaritasnya. Ditempatkan di
          erlenmeyer.
        </li>
        <li>
          <strong>Indikator:</strong> Zat kimia yang diteteskan ke dalam titrat untuk menunjukkan
          titik akhir titrasi melalui perubahan warna. Contoh: Fenolftalein (PP).
        </li>
        <li>
          <strong>Aquades:</strong> Air murni (H₂O) yang digunakan untuk membilas peralatan seperti
          erlenmeyer sebelum titrasi dimulai untuk memastikan kebersihan alat.
        </li>
      </ul>
    </div>

    <div className="bg-slate-100 p-4 rounded-xl border border-primary/20">
      <h4 className="font-bold text-primary mb-1">Tips Pemakaian:</h4>
      <p className="text-sm">
        Pastikan untuk meneteskan cairan dari buret secara perlahan (tetes demi tetes) saat
        mendekati titik akhir titrasi, sambil terus memutar-mutar/menggoyangkan erlenmeyer agar
        reaksi merata.
      </p>
    </div>
  </div>
);
