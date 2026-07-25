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

export interface ParsedCatatanExcelReport {
  studentNis: string;
  studentNisn: string;
  studentName: string;
  kelas: string | number;
  semester: 1 | 2;
  matchedStudentId?: string;
  grades: {
    code: string;
    namaMataPelajaran: string;
    nilaiAkhir: number;
    kKM: number;
    predikat: 'A' | 'B' | 'C' | 'D';
    deskripsiCapaian: string;
  }[];
  sakit: number;
  izin: number;
  tanpaKeterangan: number;
  catatanWaliKelas: string;
}

/**
 * Downloads a pre-filled Excel template for Catatan Siswa (Grades, Descriptions, Attendance, & Teacher Notes)
 */
export const downloadCatatanExcelTemplate = (
  students: StudentDetail[],
  subjects: { code: string; namaMataPelajaran: string; kKM: number }[],
  activeClass: string | number,
  activeSemester: 1 | 2
) => {
  // Filter students by active class, fallback to all students or sample list
  let targetStudents = students.filter(
    s => String(s.diterimaDiKelas).toLowerCase() === String(activeClass).toLowerCase()
  );

  if (targetStudents.length === 0) {
    targetStudents = students.slice(0, 10);
  }

  if (targetStudents.length === 0) {
    targetStudents = [
      {
        id: '1',
        nis: '2122010',
        nisn: '0149982310',
        namaLengkap: 'Budi Santoso Putra',
        diterimaDiKelas: activeClass,
      } as StudentDetail,
      {
        id: '2',
        nis: '2122011',
        nisn: '0149982311',
        namaLengkap: 'Siti Aminah Lestari',
        diterimaDiKelas: activeClass,
      } as StudentDetail
    ];
  }

  // 1. Sheet Matrix Format (1 Baris Per Siswa)
  const matrixRows = targetStudents.map(s => {
    const row: Record<string, any> = {
      'NIS': s.nis,
      'NISN': s.nisn,
      'Nama Siswa': s.namaLengkap,
      'Kelas': activeClass,
      'Semester': activeSemester,
    };

    subjects.forEach(sub => {
      row[`${sub.code} - Nilai`] = 85;
      row[`${sub.code} - Deskripsi Capaian`] = `Mencapai kompetensi dengan sangat baik dalam materi ${sub.namaMataPelajaran}.`;
    });

    row['Sakit (Hari)'] = 0;
    row['Izin (Hari)'] = 0;
    row['Tanpa Keterangan (Hari)'] = 0;
    row['Catatan Wali Kelas'] = 'Tingkatkan terus prestasi belajar, semangat, dan keaktifan di kelas.';

    return row;
  });

  const matrixSheet = XLSX.utils.json_to_sheet(matrixRows);
  
  // Set matrix sheet column widths
  const matrixCols = [
    { wch: 12 }, // NIS
    { wch: 14 }, // NISN
    { wch: 28 }, // Nama
    { wch: 10 }, // Kelas
    { wch: 10 }, // Semester
  ];
  subjects.forEach(() => {
    matrixCols.push({ wch: 12 }); // Nilai
    matrixCols.push({ wch: 50 }); // Deskripsi
  });
  matrixCols.push({ wch: 12 }, { wch: 12 }, { wch: 18 }, { wch: 50 });
  matrixSheet['!cols'] = matrixCols;

  // 2. Sheet Per Mapel Format (Baris Per Mapel)
  const perMapelRows: any[] = [];
  targetStudents.forEach(s => {
    subjects.forEach(sub => {
      perMapelRows.push({
        'NIS': s.nis,
        'NISN': s.nisn,
        'Nama Siswa': s.namaLengkap,
        'Kelas': activeClass,
        'Semester': activeSemester,
        'Kode Mapel': sub.code,
        'Mata Pelajaran': sub.namaMataPelajaran,
        'Nilai Akhir': 85,
        'KKM': sub.kKM || 70,
        'Deskripsi Capaian Pembelajaran': `Mencapai kompetensi dengan sangat baik dalam materi ${sub.namaMataPelajaran}.`,
        'Sakit': 0,
        'Izin': 0,
        'Tanpa Keterangan': 0,
        'Catatan Wali Kelas': 'Tingkatkan terus prestasi belajar.'
      });
    });
  });

  const perMapelSheet = XLSX.utils.json_to_sheet(perMapelRows);
  perMapelSheet['!cols'] = [
    { wch: 12 }, // NIS
    { wch: 14 }, // NISN
    { wch: 28 }, // Nama
    { wch: 10 }, // Kelas
    { wch: 10 }, // Semester
    { wch: 12 }, // Kode
    { wch: 28 }, // Mapel
    { wch: 12 }, // Nilai
    { wch: 8 },  // KKM
    { wch: 55 }, // Deskripsi
    { wch: 8 },  // Sakit
    { wch: 8 },  // Izin
    { wch: 14 }, // Tanpa Ket
    { wch: 45 }  // Catatan Wali
  ];

  // 3. Instructions Sheet
  const instructionsData = [
    {
      'PETUNJUK': 'FORMAT 1: Matrix (Setiap siswa 1 baris)',
      'PENJELASAN': 'Gunakan Lembar "Catatan Nilai (Matrix)". Setiap kolom memiliki judul [KODE_MAPEL] - Nilai dan [KODE_MAPEL] - Deskripsi Capaian.'
    },
    {
      'PETUNJUK': 'FORMAT 2: Per Mapel (Setiap siswa x mapel)',
      'PENJELASAN': 'Gunakan Lembar "Catatan Nilai (Per Mapel)". Isikan Kode Mapel, Nilai Akhir (0-100), dan Deskripsi Capaian.'
    },
    {
      'PETUNJUK': 'NILAI AKHIR',
      'PENJELASAN': 'Isikan angka rentang 0 - 100. Predikat A (>=90), B (>=80), C (>=70), D (<70) akan dihitung otomatis.'
    },
    {
      'PETUNJUK': 'DESKRIPSI CAPAIAN',
      'PENJELASAN': 'Isi dengan kalimat deskripsi capaian kompetensi siswa (misal: "Mencapai kompetensi dengan sangat baik dalam hal...").'
    },
    {
      'PETUNJUK': 'ABSENSI & CATATAN WALI KELAS',
      'PENJELASAN': 'Isikan jumlah hari Sakit, Izin, Tanpa Keterangan, serta teks Catatan Wali Kelas.'
    }
  ];

  const instructionsSheet = XLSX.utils.json_to_sheet(instructionsData);
  instructionsSheet['!cols'] = [{ wch: 35 }, { wch: 75 }];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, matrixSheet, 'Catatan Nilai (Matrix)');
  XLSX.utils.book_append_sheet(workbook, perMapelSheet, 'Catatan Nilai (Per Mapel)');
  XLSX.utils.book_append_sheet(workbook, instructionsSheet, 'Petunjuk Pengisian');

  XLSX.writeFile(
    workbook,
    `Template_Input_Catatan_Nilai_Kelas_${activeClass}_Sem${activeSemester}.xlsx`
  );
};

/**
 * Parses uploaded Excel file for Catatan Siswa (grades, descriptions, attendance, & notes)
 */
export const parseCatatanExcelFile = (
  file: File,
  subjectList: { code: string; namaMataPelajaran: string; kKM: number }[]
): Promise<ParsedCatatanExcelReport[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true, raw: false });
        
        if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
          throw new Error('Lembar kerja (sheet) tidak ditemukan dalam berkas Excel.');
        }

        // Try reading first relevant sheet that has data
        let targetSheetName = workbook.SheetNames[0];
        for (const name of workbook.SheetNames) {
          if (!name.toLowerCase().includes('petunjuk')) {
            targetSheetName = name;
            break;
          }
        }

        const worksheet = workbook.Sheets[targetSheetName];
        const rawRows: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '', raw: false });

        if (!rawRows || rawRows.length === 0) {
          throw new Error('File Excel kosong atau format tidak sesuai.');
        }

        const reportsMap = new Map<string, ParsedCatatanExcelReport>();

        rawRows.forEach((row, index) => {
          const nis = getFlexibleValue(row, ['NIS', 'No Induk', 'Nomor Induk']);
          const nisn = getFlexibleValue(row, ['NISN', 'No Induk Nasional']);
          const namaSiswa = getFlexibleValue(row, ['Nama Siswa', 'Nama Lengkap', 'Nama', 'NamaSiswa']);

          if (!nis && !nisn && !namaSiswa) return;

          const studentKey = (nis || nisn || namaSiswa).toLowerCase().trim();

          const kelasVal = getFlexibleValue(row, ['Kelas', 'Rombel', 'Diterima di Kelas'], '1A');
          const semVal = getFlexibleValue(row, ['Semester', 'Sem'], '1');
          const semester: 1 | 2 = String(semVal).includes('2') ? 2 : 1;

          const sakitNum = parseInt(getFlexibleValue(row, ['Sakit (Hari)', 'Sakit', 'S'], '0'), 10) || 0;
          const izinNum = parseInt(getFlexibleValue(row, ['Izin (Hari)', 'Izin', 'I'], '0'), 10) || 0;
          const alpaNum = parseInt(getFlexibleValue(row, ['Tanpa Keterangan (Hari)', 'Tanpa Keterangan', 'Alpa', 'A', 'TK'], '0'), 10) || 0;
          const catatanWali = getFlexibleValue(row, ['Catatan Wali Kelas', 'Catatan Wali', 'Catatan', 'Pesan Wali Kelas'], '');

          // Check if row is Per Mapel format (has 'Kode Mapel' or 'Mata Pelajaran')
          const singleMapelCode = getFlexibleValue(row, ['Kode Mapel', 'Kode', 'Mapel Kode']);
          const singleMapelName = getFlexibleValue(row, ['Mata Pelajaran', 'Nama Mata Pelajaran', 'Nama Mapel', 'Mapel']);

          if (!reportsMap.has(studentKey)) {
            reportsMap.set(studentKey, {
              studentNis: nis,
              studentNisn: nisn,
              studentName: namaSiswa || `Siswa ${index + 1}`,
              kelas: kelasVal,
              semester,
              grades: [],
              sakit: sakitNum,
              izin: izinNum,
              tanpaKeterangan: alpaNum,
              catatanWaliKelas: catatanWali
            });
          }

          const existingReport = reportsMap.get(studentKey)!;
          if (sakitNum > 0) existingReport.sakit = sakitNum;
          if (izinNum > 0) existingReport.izin = izinNum;
          if (alpaNum > 0) existingReport.tanpaKeterangan = alpaNum;
          if (catatanWali) existingReport.catatanWaliKelas = catatanWali;

          // Case A: Row per Subject format
          if (singleMapelCode || singleMapelName) {
            // Find subject match
            const matchedSub = subjectList.find(s =>
              s.code.toLowerCase() === singleMapelCode.toLowerCase() ||
              s.namaMataPelajaran.toLowerCase() === singleMapelName.toLowerCase() ||
              singleMapelName.toLowerCase().includes(s.namaMataPelajaran.toLowerCase()) ||
              s.namaMataPelajaran.toLowerCase().includes(singleMapelName.toLowerCase())
            ) || {
              code: singleMapelCode || `MAPEL_${index}`,
              namaMataPelajaran: singleMapelName || singleMapelCode || 'Mata Pelajaran',
              kKM: 70
            };

            const nilaiRaw = getFlexibleValue(row, ['Nilai Akhir', 'Nilai', 'Nilai Rapor', 'Score']);
            const nilaiAkhir = parseInt(nilaiRaw, 10) || 0;
            const kKM = parseInt(getFlexibleValue(row, ['KKM', 'Kriteria Minimum'], String(matchedSub.kKM || 70)), 10) || 70;
            const descRaw = getFlexibleValue(row, ['Deskripsi Capaian Pembelajaran', 'Deskripsi Capaian', 'Deskripsi', 'Capaian Pembelajaran']);

            let predikat: 'A' | 'B' | 'C' | 'D' = 'C';
            if (nilaiAkhir >= 90) predikat = 'A';
            else if (nilaiAkhir >= 80) predikat = 'B';
            else if (nilaiAkhir >= 70) predikat = 'C';
            else predikat = 'D';

            // Avoid duplicate subject entry in grades list
            const existingIndex = existingReport.grades.findIndex(g => g.code === matchedSub.code);
            const gradeItem = {
              code: matchedSub.code,
              namaMataPelajaran: matchedSub.namaMataPelajaran,
              nilaiAkhir,
              kKM,
              predikat,
              deskripsiCapaian: descRaw || 'Mencapai kompetensi dengan baik.'
            };

            if (existingIndex !== -1) {
              existingReport.grades[existingIndex] = gradeItem;
            } else {
              existingReport.grades.push(gradeItem);
            }
          } else {
            // Case B: Matrix format (Columns per subject)
            subjectList.forEach(sub => {
              const codePattern = sub.code.toLowerCase();
              const namePattern = sub.namaMataPelajaran.toLowerCase();

              // Look for columns like "PAI - Nilai", "PAI Nilai", "Nilai PAI", "Pendidikan Agama Islam - Nilai", etc.
              const possibleNilaiKeys = [
                `${sub.code} - Nilai`,
                `${sub.code} Nilai`,
                `Nilai ${sub.code}`,
                `Nilai_${sub.code}`,
                `${sub.namaMataPelajaran} - Nilai`,
                `${sub.namaMataPelajaran} Nilai`
              ];

              const possibleDescKeys = [
                `${sub.code} - Deskripsi Capaian`,
                `${sub.code} - Deskripsi`,
                `${sub.code} Deskripsi`,
                `Deskripsi ${sub.code}`,
                `Deskripsi_${sub.code}`,
                `${sub.namaMataPelajaran} - Deskripsi Capaian`,
                `${sub.namaMataPelajaran} - Deskripsi`,
                `${sub.namaMataPelajaran} Deskripsi`
              ];

              const nilaiVal = getFlexibleValue(row, possibleNilaiKeys, '');
              const descVal = getFlexibleValue(row, possibleDescKeys, '');

              if (nilaiVal !== '' || descVal !== '') {
                const nilaiAkhir = parseInt(nilaiVal, 10) || 0;
                let predikat: 'A' | 'B' | 'C' | 'D' = 'C';
                if (nilaiAkhir >= 90) predikat = 'A';
                else if (nilaiAkhir >= 80) predikat = 'B';
                else if (nilaiAkhir >= 70) predikat = 'C';
                else predikat = 'D';

                const existingIndex = existingReport.grades.findIndex(g => g.code === sub.code);
                const gradeItem = {
                  code: sub.code,
                  namaMataPelajaran: sub.namaMataPelajaran,
                  nilaiAkhir,
                  kKM: sub.kKM || 70,
                  predikat,
                  deskripsiCapaian: descVal || 'Mencapai kompetensi dengan baik.'
                };

                if (existingIndex !== -1) {
                  existingReport.grades[existingIndex] = gradeItem;
                } else {
                  existingReport.grades.push(gradeItem);
                }
              }
            });
          }
        });

        const results = Array.from(reportsMap.values());
        if (results.length === 0) {
          throw new Error('Tidak ada data catatan/nilai siswa yang dapat dibaca dari berkas Excel ini.');
        }

        resolve(results);
      } catch (err: any) {
        reject(err);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};


