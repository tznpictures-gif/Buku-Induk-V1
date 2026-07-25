import * as XLSX from 'xlsx';
import { StudentDetail } from '../types';

export const EXCEL_COLUMNS = [
  'NIS',
  'NISN',
  'Nama Lengkap',
  'Nama Panggilan',
  'Jenis Kelamin (L/P)',
  'Tempat Lahir',
  'Tanggal Lahir (DD MMMM YYYY)',
  'Agama',
  'Diterima di Kelas',
  'Status Siswa (Aktif/Lulus/Pindah/Keluar)',
  'Nama Ayah',
  'Nama Ibu',
  'No HP Orang Tua',
  'Alamat Siswa'
];

export const downloadExcelTemplate = () => {
  const sampleData = [
    {
      'NIS': '2122010',
      'NISN': '0149982310',
      'Nama Lengkap': 'Budi Santoso Putra',
      'Nama Panggilan': 'Budi',
      'Jenis Kelamin (L/P)': 'L',
      'Tempat Lahir': 'Bandung',
      'Tanggal Lahir (DD MMMM YYYY)': '10 Mei 2015',
      'Agama': 'Islam',
      'Diterima di Kelas': '1A',
      'Status Siswa (Aktif/Lulus/Pindah/Keluar)': 'Aktif',
      'Nama Ayah': 'Rahmat Santoso',
      'Nama Ibu': 'Siti Rohmah',
      'No HP Orang Tua': '081234567890',
      'Alamat Siswa': 'Jl. Merdeka No. 100, Bandung'
    },
    {
      'NIS': '2122011',
      'NISN': '0149982311',
      'Nama Lengkap': 'Siti Aminah Lestari',
      'Nama Panggilan': 'Siti',
      'Jenis Kelamin (L/P)': 'P',
      'Tempat Lahir': 'Jakarta',
      'Tanggal Lahir (DD MMMM YYYY)': '15 Agustus 2015',
      'Agama': 'Islam',
      'Diterima di Kelas': '1A',
      'Status Siswa (Aktif/Lulus/Pindah/Keluar)': 'Aktif',
      'Nama Ayah': 'Herman Lestari',
      'Nama Ibu': 'Dewi Sartika',
      'No HP Orang Tua': '085712345678',
      'Alamat Siswa': 'Jl. Riau No. 45, Bandung'
    },
    {
      'NIS': '2122012',
      'NISN': '0149982312',
      'Nama Lengkap': 'Ahmad Fauzi Nurrahman',
      'Nama Panggilan': 'Ahmad',
      'Jenis Kelamin (L/P)': 'L',
      'Tempat Lahir': 'Cimahi',
      'Tanggal Lahir (DD MMMM YYYY)': '20 November 2015',
      'Agama': 'Islam',
      'Diterima di Kelas': '1B',
      'Status Siswa (Aktif/Lulus/Pindah/Keluar)': 'Aktif',
      'Nama Ayah': 'Nurrahman Hidayat',
      'Nama Ibu': 'Endang Kusuma',
      'No HP Orang Tua': '081398765432',
      'Alamat Siswa': 'Jl. Aceh No. 12, Bandung'
    },
    {
      'NIS': '2122013',
      'NISN': '0149982313',
      'Nama Lengkap': 'Anisa Dewi Rahmawati',
      'Nama Panggilan': 'Anisa',
      'Jenis Kelamin (L/P)': 'P',
      'Tempat Lahir': 'Bandung',
      'Tanggal Lahir (DD MMMM YYYY)': '04 Februari 2014',
      'Agama': 'Islam',
      'Diterima di Kelas': '2A',
      'Status Siswa (Aktif/Lulus/Pindah/Keluar)': 'Aktif',
      'Nama Ayah': 'Bambang Rahmawati',
      'Nama Ibu': 'Fitriani',
      'No HP Orang Tua': '081122334455',
      'Alamat Siswa': 'Jl. Sunda No. 88, Bandung'
    },
    {
      'NIS': '2122014',
      'NISN': '0149982314',
      'Nama Lengkap': 'Muhammad Rizky Pratama',
      'Nama Panggilan': 'Rizky',
      'Jenis Kelamin (L/P)': 'L',
      'Tempat Lahir': 'Sumedang',
      'Tanggal Lahir (DD MMMM YYYY)': '18 Juni 2013',
      'Agama': 'Islam',
      'Diterima di Kelas': '3A',
      'Status Siswa (Aktif/Lulus/Pindah/Keluar)': 'Aktif',
      'Nama Ayah': 'Agus Pratama',
      'Nama Ibu': 'Sri Wahyuni',
      'No HP Orang Tua': '082134567890',
      'Alamat Siswa': 'Jl. Asia Afrika No. 10, Bandung'
    },
    {
      'NIS': '2122015',
      'NISN': '0149982315',
      'Nama Lengkap': 'Nabila Putri Cahyani',
      'Nama Panggilan': 'Nabila',
      'Jenis Kelamin (L/P)': 'P',
      'Tempat Lahir': 'Garut',
      'Tanggal Lahir (DD MMMM YYYY)': '09 September 2012',
      'Agama': 'Islam',
      'Diterima di Kelas': '4A',
      'Status Siswa (Aktif/Lulus/Pindah/Keluar)': 'Aktif',
      'Nama Ayah': 'Eko Cahyono',
      'Nama Ibu': 'Maya Sariningrum',
      'No HP Orang Tua': '085298765432',
      'Alamat Siswa': 'Jl. Dago No. 120, Bandung'
    }
  ];

  const worksheet = XLSX.utils.json_to_sheet(sampleData, { header: EXCEL_COLUMNS });
  
  // Set column widths for better readability in Excel
  worksheet['!cols'] = [
    { wch: 12 }, // NIS
    { wch: 15 }, // NISN
    { wch: 28 }, // Nama Lengkap
    { wch: 15 }, // Nama Panggilan
    { wch: 18 }, // Jenis Kelamin
    { wch: 15 }, // Tempat Lahir
    { wch: 25 }, // Tanggal Lahir
    { wch: 12 }, // Agama
    { wch: 16 }, // Diterima di Kelas
    { wch: 25 }, // Status Siswa
    { wch: 22 }, // Nama Ayah
    { wch: 22 }, // Nama Ibu
    { wch: 18 }, // No HP
    { wch: 35 }, // Alamat
  ];

  const instructionsData = [
    {
      'NAMA KOLOM': 'NIS',
      'KEWARJIBAN': 'Opsional (Sangat Disarankan)',
      'KETERANGAN & FORMAT': 'Nomor Induk Siswa lokal. Contoh: 2122010. Jika kosong akan dibuatkan otomatis.'
    },
    {
      'NAMA KOLOM': 'NISN',
      'KEWARJIBAN': 'Opsional',
      'KETERANGAN & FORMAT': 'Nomor Induk Siswa Nasional (10 digit). Contoh: 0149982310.'
    },
    {
      'NAMA KOLOM': 'Nama Lengkap',
      'KEWARJIBAN': 'WAJIB',
      'KETERANGAN & FORMAT': 'Nama lengkap sesuai ijazah/akta kelahiran. Contoh: Budi Santoso'
    },
    {
      'NAMA KOLOM': 'Jenis Kelamin (L/P)',
      'KEWARJIBAN': 'WAJIB',
      'KETERANGAN & FORMAT': 'Isi L untuk Laki-laki, P untuk Perempuan.'
    },
    {
      'NAMA KOLOM': 'Diterima di Kelas',
      'KEWARJIBAN': 'Opsional (Default: 1A)',
      'KETERANGAN & FORMAT': 'Pilihan Rombel/Kelas: 1A, 1B, 2A, 2B, 3A, 3B, 4A, 4B, 5A, 5B, 6A, 6B.'
    },
    {
      'NAMA KOLOM': 'Status Siswa',
      'KEWARJIBAN': 'Opsional (Default: Aktif)',
      'KETERANGAN & FORMAT': 'Pilihan status: Aktif, Lulus, Pindah, atau Keluar.'
    }
  ];

  const instructionsSheet = XLSX.utils.json_to_sheet(instructionsData);
  instructionsSheet['!cols'] = [
    { wch: 25 },
    { wch: 25 },
    { wch: 60 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Siswa');
  XLSX.utils.book_append_sheet(workbook, instructionsSheet, 'Petunjuk Pengisian');

  XLSX.writeFile(workbook, 'Template_Import_Siswa_SD_Lengkap.xlsx');
};

// Helper function to extract normalized value from Excel row regardless of header variations
const getFlexibleValue = (row: Record<string, any>, possibleKeys: string[], defaultVal: string = ''): string => {
  const rowKeys = Object.keys(row);
  for (const pKey of possibleKeys) {
    const normalizedTarget = pKey.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const rKey of rowKeys) {
      const normalizedRowKey = rKey.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (normalizedRowKey === normalizedTarget || normalizedRowKey.includes(normalizedTarget)) {
        const val = row[rKey];
        if (val !== undefined && val !== null && String(val).trim() !== '') {
          // Clean up numeric formatting like 2.122e+06 or trailing decimals
          let strVal = String(val).trim();
          if (/^\d+\.0+$/.test(strVal)) {
            strVal = strVal.replace(/\.0+$/, '');
          }
          return strVal;
        }
      }
    }
  }
  return defaultVal;
};

export const parseExcelFile = (file: File): Promise<Omit<StudentDetail, 'id'>[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true, raw: false });
        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          throw new Error('Lembar kerja (sheet) tidak ditemukan dalam berkas Excel.');
        }

        const worksheet = workbook.Sheets[firstSheetName];
        const rawRows: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '', raw: false });

        if (!rawRows || rawRows.length === 0) {
          throw new Error('File Excel kosong atau format tidak sesuai.');
        }

        const parsedStudents: Omit<StudentDetail, 'id'>[] = rawRows.map((row) => {
          const namaLengkap = getFlexibleValue(row, ['Nama Lengkap', 'Nama Siswa', 'Nama', 'NamaLengkap', 'Fullname']);

          if (!namaLengkap) return null;

          const nis = getFlexibleValue(row, ['NIS', 'No Induk', 'Nomor Induk']);
          const nisn = getFlexibleValue(row, ['NISN', 'No Induk Nasional']);

          const jkRaw = getFlexibleValue(row, ['Jenis Kelamin (L/P)', 'Jenis Kelamin', 'JK', 'Gender', 'Sex'], 'L').toUpperCase();
          const jenisKelamin: 'L' | 'P' = jkRaw.startsWith('P') || jkRaw.includes('PEREMPUAN') ? 'P' : 'L';

          const statusRaw = getFlexibleValue(row, ['Status Siswa (Aktif/Lulus/Pindah/Keluar)', 'Status Siswa', 'Status'], 'Aktif');
          let statusSiswa: 'Aktif' | 'Lulus' | 'Pindah' | 'Keluar' = 'Aktif';
          
          if (/lulus/i.test(statusRaw)) statusSiswa = 'Lulus';
          else if (/pindah/i.test(statusRaw)) statusSiswa = 'Pindah';
          else if (/keluar|putus|do/i.test(statusRaw)) statusSiswa = 'Keluar';

          const kelasVal = getFlexibleValue(row, ['Diterima di Kelas', 'Kelas Diterima', 'Kelas', 'Rombel'], '1A');
          let diterimaDiKelas: string | number = kelasVal || '1A';
          if (/^\d+$/.test(kelasVal)) {
            const num = parseInt(kelasVal, 10);
            diterimaDiKelas = isNaN(num) ? '1A' : Math.min(Math.max(num, 1), 6);
          }

          const namaPanggilan = getFlexibleValue(row, ['Nama Panggilan', 'Panggilan'], namaLengkap.split(' ')[0]);
          const tempatLahir = getFlexibleValue(row, ['Tempat Lahir', 'TempatLahir', 'Tempat'], 'Bandung');
          const tanggalLahir = getFlexibleValue(row, ['Tanggal Lahir (DD MMMM YYYY)', 'Tanggal Lahir', 'Tgl Lahir'], '01 Januari 2015');
          const agama = getFlexibleValue(row, ['Agama', 'Religion'], 'Islam');
          const alamatSiswa = getFlexibleValue(row, ['Alamat Siswa', 'Alamat', 'AlamatSiswa'], 'Bandung');

          const namaAyah = getFlexibleValue(row, ['Nama Ayah', 'Ayah'], '-');
          const namaIbu = getFlexibleValue(row, ['Nama Ibu', 'Ibu'], '-');
          const noHpOrangTua = getFlexibleValue(row, ['No HP Orang Tua', 'No HP', 'HP', 'Telepon Orang Tua'], '-');

          return {
            nis: nis || `2122${Math.floor(100 + Math.random() * 900)}`,
            nisn: nisn || `014${Math.floor(1000000 + Math.random() * 9000000)}`,
            namaLengkap,
            namaPanggilan,
            jenisKelamin,
            tempatLahir,
            tanggalLahir,
            agama,
            kewarganegaraan: 'WNI',
            anakKe: 1,
            jumlahSaudaraKandung: 1,
            jumlahSaudaraTiri: 0,
            jumlahSaudaraAngkat: 0,
            statusAnak: 'Kandung',
            bahasaSehariHari: 'Bahasa Indonesia',
            alamatSiswa,
            rtRw: '001/001',
            dusunDesa: 'Citarum',
            kecamatan: 'Bandung Wetan',
            kabupaten: 'Kota Bandung',
            tinggalDengan: 'Orang Tua',
            jarakKeSekolah: '1 km',
            transportasi: 'Jalan Kaki',
            sekolahAsal: 'TK/PAUD',
            diterimaDiKelas,
            tanggalDiterima: '12 Juli 2021',
            statusSiswa,
            parentData: {
              namaAyah,
              nikAyah: '-',
              tahunLahirAyah: '1980',
              pendidikanAyah: 'SMA',
              pekerjaanAyah: 'Wiraswasta',
              penghasilanAyah: 'Rp 3.000.000 - Rp 5.000.000',
              namaIbu,
              nikIbu: '-',
              tahunLahirIbu: '1982',
              pendidikanIbu: 'SMA',
              pekerjaanIbu: 'Ibu Rumah Tangga',
              penghasilanIbu: 'Tidak Berpenghasilan',
              alamatOrangTua: alamatSiswa,
              noHpOrangTua
            },
            physicalData: {
              tinggiBadan: 130,
              beratBadan: 30,
              golonganDarah: 'O',
              pendengaran: 'Baik',
              penglihatan: 'Normal',
              gigi: 'Baik'
            }
          };
        }).filter(Boolean) as Omit<StudentDetail, 'id'>[];

        if (parsedStudents.length === 0) {
          throw new Error('Tidak ada baris siswa valid ditemukan. Pastikan kolom "Nama Lengkap" atau "Nama Siswa" terisi.');
        }

        resolve(parsedStudents);
      } catch (err: any) {
        reject(err);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

