import { AcademicYearData, SchoolData, StudentDetail, StudentSemesterRecord, SubjectItem } from '../types';

export interface SpreadsheetConfig {
  spreadsheetId: string;
  accessToken: string;
  autoSync: boolean;
  googleUserEmail?: string;
  googleUserName?: string;
}

const STORAGE_CONFIG_KEY = 'buku_induk_spreadsheet_config';

export const getSavedSpreadsheetConfig = (): SpreadsheetConfig | null => {
  try {
    const raw = localStorage.getItem(STORAGE_CONFIG_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse spreadsheet config from localStorage:', err);
    return null;
  }
};

export const saveSpreadsheetConfig = (config: Partial<SpreadsheetConfig>) => {
  try {
    const existing = getSavedSpreadsheetConfig() || {
      spreadsheetId: '',
      accessToken: '',
      autoSync: true,
    };
    const updated = { ...existing, ...config };
    localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save spreadsheet config:', err);
    return null;
  }
};

export const clearSpreadsheetConfig = () => {
  localStorage.removeItem(STORAGE_CONFIG_KEY);
};

export interface SyncReport {
  success: boolean;
  spreadsheetId?: string;
  spreadsheetUrl?: string;
  errors: string[];
  lastSyncedAt?: Date;
}

/**
 * Creates a brand new Google Spreadsheet with structured worksheets for the application
 */
export const createGoogleSpreadsheet = async (
  accessToken: string,
  title: string = 'Buku Induk Siswa SD'
): Promise<{ success: boolean; spreadsheetId?: string; spreadsheetUrl?: string; error?: string }> => {
  if (!accessToken) {
    return { success: false, error: 'Access Token Google tidak ditemukan. Silakan hubungkan akun Google.' };
  }

  try {
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: { title },
        sheets: [
          { properties: { title: 'Data_Sekolah' } },
          { properties: { title: 'Tahun_Ajaran' } },
          { properties: { title: 'Mata_Pelajaran' } },
          { properties: { title: 'Data_Siswa' } },
          { properties: { title: 'Catatan_Semester' } },
          { properties: { title: 'Aplikasi_Backup_JSON' } },
        ],
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || `Gagal membuat spreadsheet (${response.status})`);
    }

    const data = await response.json();
    const spreadsheetId = data.spreadsheetId;
    const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

    saveSpreadsheetConfig({ spreadsheetId, accessToken });

    return {
      success: true,
      spreadsheetId,
      spreadsheetUrl,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || String(err),
    };
  }
};

/**
 * Safely parses spreadsheet ID or Google Spreadsheet URL
 */
export const extractSpreadsheetId = (inputUrlOrId: string): string => {
  if (!inputUrlOrId) return '';
  const trimmed = inputUrlOrId.trim();
  const match = trimmed.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return trimmed;
};

/**
 * Ensures all required sheets/tabs exist in the target Spreadsheet
 */
const ensureSheetTabsExist = async (spreadsheetId: string, accessToken: string) => {
  try {
    const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) return;
    const meta = await res.json();
    const existingTitles = new Set(meta.sheets?.map((s: any) => s.properties?.title) || []);

    const required = ['Data_Sekolah', 'Tahun_Ajaran', 'Mata_Pelajaran', 'Data_Siswa', 'Catatan_Semester', 'Aplikasi_Backup_JSON'];
    const missing = required.filter(title => !existingTitles.has(title));

    if (missing.length > 0) {
      const requests = missing.map(title => ({
        addSheet: { properties: { title } },
      }));

      await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requests }),
      });
    }
  } catch (err) {
    console.warn('Tab verification warning:', err);
  }
};

/**
 * Syncs all application state to Google Spreadsheet tabs
 */
export const syncAllDataToGoogleSheets = async (
  spreadsheetIdInput: string,
  accessToken: string,
  schoolData: SchoolData,
  academicYear: AcademicYearData,
  students: StudentDetail[],
  semesterRecords: StudentSemesterRecord[],
  subjects: SubjectItem[]
): Promise<SyncReport> => {
  const report: SyncReport = {
    success: false,
    errors: [],
  };

  const spreadsheetId = extractSpreadsheetId(spreadsheetIdInput);
  if (!spreadsheetId) {
    report.errors.push('ID Google Spreadsheet belum diisi.');
    return report;
  }

  if (!accessToken) {
    report.errors.push('Akses Token Google OAuth belum tersedia. Silakan hubungkan akun Google.');
    return report;
  }

  try {
    // 1. Ensure sheet tabs exist
    await ensureSheetTabsExist(spreadsheetId, accessToken);

    // 2. Prepare Data_Sekolah rows
    const schoolRows = [
      [
        'NPSN', 'Nama Sekolah', 'NSS', 'Alamat', 'Kelurahan', 'Kecamatan',
        'Kabupaten/Kota', 'Provinsi', 'Kode Pos', 'Telepon', 'Email', 'Website',
        'Kepala Sekolah', 'NIP Kepala Sekolah', 'Logo URL'
      ],
      [
        schoolData.npsn || '', schoolData.namaSekolah || '', schoolData.nss || '',
        schoolData.alamat || '', schoolData.kelurahan || '', schoolData.kecamatan || '',
        schoolData.kabupaten || '', schoolData.provinsi || '', schoolData.kodePos || '',
        schoolData.telepon || '', schoolData.email || '', schoolData.website || '',
        schoolData.namaKepalaSekolah || '', schoolData.nipKepalaSekolah || '', schoolData.logoUrl || ''
      ]
    ];

    // 3. Prepare Tahun_Ajaran rows
    const academicRows = [
      ['Tahun Ajaran', 'Kurikulum', 'Semester Aktif', 'Tanggal Rapor', 'Rombel List (JSON)', 'Wali Kelas (JSON)'],
      [
        academicYear.tahunAjaran || '',
        academicYear.kurikulum || '',
        String(academicYear.semesterAktif || 1),
        academicYear.tanggalRapor || '',
        JSON.stringify(academicYear.rombelList || []),
        JSON.stringify(academicYear.waliKelasMap || {})
      ]
    ];

    // 4. Prepare Mata_Pelajaran rows
    const subjectRows = [
      ['Kode', 'Nama Mata Pelajaran', 'KKM', 'Kelompok'],
      ...subjects.map(s => [
        s.code || '',
        s.namaMataPelajaran || '',
        String(s.kKM || 75),
        s.kelompok || 'Wajib'
      ])
    ];

    // 5. Prepare Data_Siswa rows
    const studentRows = [
      [
        'ID', 'NIS', 'NISN', 'Nama Lengkap', 'Nama Panggilan', 'Jenis Kelamin',
        'Tempat Lahir', 'Tanggal Lahir', 'Agama', 'Kewarganegaraan', 'Status Anak',
        'Anak Ke', 'Jumlah Saudara Kandung', 'Bahasa Sehari-hari', 'Alamat Siswa',
        'RT RW', 'Desa/Dusun', 'Kecamatan', 'Kabupaten', 'Tinggal Dengan',
        'Jarak ke Sekolah', 'Transportasi', 'Sekolah Asal', 'Diterima di Kelas',
        'Tanggal Diterima', 'Status Siswa', 'Tahun Lulus', 'No Ijazah', 'Foto URL',
        'Ayah', 'Pekerjaan Ayah', 'Ibu', 'Pekerjaan Ibu', 'No HP Orang Tua',
        'Wali', 'Pekerjaan Wali', 'Physical Data (JSON)'
      ],
      ...students.map(std => [
        std.id || '',
        std.nis || '',
        std.nisn || '',
        std.namaLengkap || '',
        std.namaPanggilan || '',
        std.jenisKelamin || 'L',
        std.tempatLahir || '',
        std.tanggalLahir || '',
        std.agama || 'Islam',
        std.kewarganegaraan || 'Indonesia',
        std.statusAnak || 'Kandung',
        String(std.anakKe || 1),
        String(std.jumlahSaudaraKandung || 0),
        std.bahasaSehariHari || 'Indonesia',
        std.alamatSiswa || '',
        std.rtRw || '',
        std.dusunDesa || '',
        std.kecamatan || '',
        std.kabupaten || '',
        std.tinggalDengan || 'Orang Tua',
        std.jarakKeSekolah || '',
        std.transportasi || '',
        std.sekolahAsal || '',
        String(std.diterimaDiKelas || '1A'),
        std.tanggalDiterima || '',
        std.statusSiswa || 'Aktif',
        std.tahunLulus || '',
        std.noIjazah || '',
        std.fotoUrl || '',
        std.parentData?.namaAyah || '',
        std.parentData?.pekerjaanAyah || '',
        std.parentData?.namaIbu || '',
        std.parentData?.pekerjaanIbu || '',
        std.parentData?.noHpOrangTua || '',
        std.parentData?.namaWali || '',
        std.parentData?.pekerjaanWali || '',
        JSON.stringify(std.physicalData || {})
      ])
    ];

    // 6. Prepare Catatan_Semester rows
    const recordRows = [
      [
        'Student ID', 'Kelas', 'Semester', 'Tahun Ajaran',
        'Sakit', 'Izin', 'Tanpa Keterangan', 'Catatan Wali Kelas',
        'Ekstrakurikuler (JSON)', 'Nilai Grades (JSON)'
      ],
      ...semesterRecords.map(rec => [
        String(rec.studentId).trim(),
        String(rec.kelas || '1A').trim(),
        String(rec.semester || 1),
        rec.tahunAjaran || academicYear.tahunAjaran,
        String(rec.sakit || 0),
        String(rec.izin || 0),
        String(rec.tanpaKeterangan || 0),
        rec.catatanWaliKelas || '',
        JSON.stringify(rec.ekstrakurikuler || []),
        JSON.stringify(rec.grades || [])
      ])
    ];

    // 7. Prepare Aplikasi_Backup_JSON rows
    const nowIso = new Date().toISOString();
    const backupRows = [
      ['Key', 'JSON_Value', 'Updated_At'],
      ['school_data', JSON.stringify(schoolData), nowIso],
      ['academic_year', JSON.stringify(academicYear), nowIso],
      ['subjects', JSON.stringify(subjects), nowIso],
      ['students', JSON.stringify(students), nowIso],
      ['semester_records', JSON.stringify(semesterRecords), nowIso]
    ];

    // 8. Clear ranges first to avoid trailing stale data
    const rangesToClear = [
      'Data_Sekolah!A1:Z10',
      'Tahun_Ajaran!A1:Z10',
      'Mata_Pelajaran!A1:Z500',
      'Data_Siswa!A1:AK5000',
      'Catatan_Semester!A1:Z5000',
      'Aplikasi_Backup_JSON!A1:Z20'
    ];

    for (const range of rangesToClear) {
      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:clear`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // 9. Batch update values to Google Sheet
    const batchUpdatePayload = {
      valueInputOption: 'USER_ENTERED',
      data: [
        { range: 'Data_Sekolah!A1', values: schoolRows },
        { range: 'Tahun_Ajaran!A1', values: academicRows },
        { range: 'Mata_Pelajaran!A1', values: subjectRows },
        { range: 'Data_Siswa!A1', values: studentRows },
        { range: 'Catatan_Semester!A1', values: recordRows },
        { range: 'Aplikasi_Backup_JSON!A1', values: backupRows },
      ],
    };

    const updateRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batchUpdatePayload),
      }
    );

    if (!updateRes.ok) {
      const errJson = await updateRes.json();
      throw new Error(errJson.error?.message || `Gagal menulis ke Google Sheet (${updateRes.status})`);
    }

    report.success = true;
    report.spreadsheetId = spreadsheetId;
    report.spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
    report.lastSyncedAt = new Date();

    // Save configuration
    saveSpreadsheetConfig({ spreadsheetId, accessToken });

    return report;
  } catch (err: any) {
    report.errors.push(err.message || String(err));
    return report;
  }
};

/**
 * Loads data from Google Spreadsheet tabs into local state format
 */
export const loadDataFromGoogleSheets = async (
  spreadsheetIdInput: string,
  accessToken: string
): Promise<{
  success: boolean;
  schoolData?: SchoolData;
  academicYear?: AcademicYearData;
  students?: StudentDetail[];
  semesterRecords?: StudentSemesterRecord[];
  subjects?: SubjectItem[];
  error?: string;
}> => {
  const spreadsheetId = extractSpreadsheetId(spreadsheetIdInput);
  if (!spreadsheetId) {
    return { success: false, error: 'ID Google Spreadsheet belum diisi.' };
  }

  if (!accessToken) {
    return { success: false, error: 'Akses Token Google OAuth belum tersedia.' };
  }

  try {
    // Try fetching from Aplikasi_Backup_JSON first for fast 100% loss-less restore
    const jsonRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Aplikasi_Backup_JSON!A1:Z20`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (jsonRes.ok) {
      const jsonBody = await jsonRes.json();
      const rows = jsonBody.values || [];
      if (rows.length > 1) {
        let schoolData: SchoolData | undefined;
        let academicYear: AcademicYearData | undefined;
        let subjects: SubjectItem[] | undefined;
        let students: StudentDetail[] | undefined;
        let semesterRecords: StudentSemesterRecord[] | undefined;

        for (let i = 1; i < rows.length; i++) {
          const key = rows[i][0];
          const valStr = rows[i][1];
          if (!key || !valStr) continue;
          try {
            const parsed = JSON.parse(valStr);
            if (key === 'school_data') schoolData = parsed;
            if (key === 'academic_year') academicYear = parsed;
            if (key === 'subjects') subjects = parsed;
            if (key === 'students') students = parsed;
            if (key === 'semester_records') semesterRecords = parsed;
          } catch (e) {
            console.warn(`Error parsing backup JSON for key ${key}:`, e);
          }
        }

        if (schoolData && students) {
          return {
            success: true,
            schoolData,
            academicYear,
            subjects,
            students,
            semesterRecords: semesterRecords || [],
          };
        }
      }
    }

    // Fallback: Read from tabular worksheets
    const ranges = [
      'Data_Sekolah!A2:O5',
      'Tahun_Ajaran!A2:F5',
      'Mata_Pelajaran!A2:D500',
      'Data_Siswa!A2:AK5000',
      'Catatan_Semester!A2:J5000',
    ];

    const rangeQuery = ranges.map(r => `ranges=${encodeURIComponent(r)}`).join('&');
    const batchGetRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?${rangeQuery}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!batchGetRes.ok) {
      const err = await batchGetRes.json();
      throw new Error(err.error?.message || 'Gagal membaca data dari Google Spreadsheet.');
    }

    const batchData = await batchGetRes.json();
    const valueRanges = batchData.valueRanges || [];

    // Parse Data_Sekolah
    const schoolRow = valueRanges[0]?.values?.[0] || [];
    const schoolData: SchoolData = {
      npsn: schoolRow[0] || '',
      namaSekolah: schoolRow[1] || 'SD Negeri Ciburial',
      nss: schoolRow[2] || '',
      alamat: schoolRow[3] || '',
      kelurahan: schoolRow[4] || '',
      kecamatan: schoolRow[5] || '',
      kabupaten: schoolRow[6] || '',
      provinsi: schoolRow[7] || '',
      kodePos: schoolRow[8] || '',
      telepon: schoolRow[9] || '',
      email: schoolRow[10] || '',
      website: schoolRow[11] || '',
      namaKepalaSekolah: schoolRow[12] || '',
      nipKepalaSekolah: schoolRow[13] || '',
      logoUrl: schoolRow[14] || '',
    };

    // Parse Tahun_Ajaran
    const acadRow = valueRanges[1]?.values?.[0] || [];
    let rombelList: string[] = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'];
    let waliKelasMap: Record<string, any> = {};

    try {
      if (acadRow[4]) rombelList = JSON.parse(acadRow[4]);
      if (acadRow[5]) waliKelasMap = JSON.parse(acadRow[5]);
    } catch (e) {
      console.warn('Error parsing JSON from academic year sheet:', e);
    }

    const academicYear: AcademicYearData = {
      tahunAjaran: acadRow[0] || '2024/2025',
      kurikulum: acadRow[1] || 'Kurikulum Merdeka',
      semesterAktif: Number(acadRow[2]) === 2 ? 2 : 1,
      tanggalRapor: acadRow[3] || '2025-06-21',
      rombelList,
      waliKelasMap,
    };

    // Parse Mata_Pelajaran
    const subjRows = valueRanges[2]?.values || [];
    const subjects: SubjectItem[] = subjRows.map((r: any) => ({
      code: r[0] || '',
      namaMataPelajaran: r[1] || '',
      kKM: Number(r[2]) || 75,
      kelompok: r[3] || 'Wajib',
    }));

    // Parse Data_Siswa
    const stdRows = valueRanges[3]?.values || [];
    const students: StudentDetail[] = stdRows.map((r: any) => {
      let physicalData = {
        tinggiBadan: 125,
        beratBadan: 25,
        golonganDarah: 'O',
        pendengaran: 'Baik',
        penglihatan: 'Baik',
        gigi: 'Baik',
      };
      try {
        if (r[36]) physicalData = JSON.parse(r[36]);
      } catch (e) {}

      return {
        id: r[0] || `STD-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        nis: r[1] || '',
        nisn: r[2] || '',
        namaLengkap: r[3] || '',
        namaPanggilan: r[4] || '',
        jenisKelamin: r[5] === 'P' ? 'P' : 'L',
        tempatLahir: r[6] || '',
        tanggalLahir: r[7] || '',
        agama: r[8] || 'Islam',
        kewarganegaraan: r[9] || 'Indonesia',
        statusAnak: r[10] || 'Kandung',
        anakKe: Number(r[11]) || 1,
        jumlahSaudaraKandung: Number(r[12]) || 0,
        jumlahSaudaraTiri: 0,
        jumlahSaudaraAngkat: 0,
        bahasaSehariHari: r[13] || 'Indonesia',
        alamatSiswa: r[14] || '',
        rtRw: r[15] || '',
        dusunDesa: r[16] || '',
        kecamatan: r[17] || '',
        kabupaten: r[18] || '',
        tinggalDengan: r[19] || 'Orang Tua',
        jarakKeSekolah: r[20] || '1 km',
        transportasi: r[21] || 'Jalan Kaki',
        sekolahAsal: r[22] || '',
        diterimaDiKelas: r[23] || '1A',
        tanggalDiterima: r[24] || '',
        statusSiswa: r[25] || 'Aktif',
        tahunLulus: r[26] || '',
        noIjazah: r[27] || '',
        fotoUrl: r[28] || '',
        parentData: {
          namaAyah: r[29] || '',
          nikAyah: '',
          tahunLahirAyah: '',
          pendidikanAyah: '',
          pekerjaanAyah: r[30] || '',
          penghasilanAyah: '',
          namaIbu: r[31] || '',
          nikIbu: '',
          tahunLahirIbu: '',
          pendidikanIbu: '',
          pekerjaanIbu: r[32] || '',
          penghasilanIbu: '',
          noHpOrangTua: r[33] || '',
          namaWali: r[34] || '',
          pekerjaanWali: r[35] || '',
          alamatOrangTua: r[14] || '',
        },
        physicalData,
      };
    });

    // Parse Catatan_Semester
    const recRows = valueRanges[4]?.values || [];
    const semesterRecords: StudentSemesterRecord[] = recRows.map((r: any) => {
      let ekstrakurikuler = [];
      let grades = [];
      try {
        if (r[8]) ekstrakurikuler = JSON.parse(r[8]);
        if (r[9]) grades = JSON.parse(r[9]);
      } catch (e) {}

      return {
        studentId: String(r[0] || '').trim(),
        kelas: String(r[1] || '1A').trim(),
        semester: Number(r[2]) === 2 ? 2 : 1,
        tahunAjaran: r[3] || academicYear.tahunAjaran,
        sakit: Number(r[4]) || 0,
        izin: Number(r[5]) || 0,
        tanpaKeterangan: Number(r[6]) || 0,
        catatanWaliKelas: r[7] || '',
        ekstrakurikuler,
        grades,
      };
    });

    return {
      success: true,
      schoolData,
      academicYear,
      subjects: subjects.length > 0 ? subjects : undefined,
      students,
      semesterRecords,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || String(err),
    };
  }
};
