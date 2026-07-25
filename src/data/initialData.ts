import { AcademicYearData, SchoolData, StudentDetail, StudentSemesterRecord } from '../types';

export const initialSchoolData: SchoolData = {
  namaSekolah: '',
  npsn: '',
  nss: '',
  alamat: '',
  kelurahan: '',
  kecamatan: '',
  kabupaten: '',
  provinsi: '',
  kodePos: '',
  telepon: '',
  email: '',
  website: '',
  namaKepalaSekolah: '',
  nipKepalaSekolah: '',
  logoUrl: ''
};

export const initialAcademicYear: AcademicYearData = {
  tahunAjaran: '2026/2027',
  kurikulum: 'Kurikulum Merdeka',
  semesterAktif: 1,
  tanggalRapor: '',
  rombelList: ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'],
  waliKelasMap: {
    '1A': { nama: '', nip: '' },
    '1B': { nama: '', nip: '' },
    '2A': { nama: '', nip: '' },
    '2B': { nama: '', nip: '' },
    '3A': { nama: '', nip: '' },
    '3B': { nama: '', nip: '' },
    '4A': { nama: '', nip: '' },
    '4B': { nama: '', nip: '' },
    '5A': { nama: '', nip: '' },
    '5B': { nama: '', nip: '' },
    '6A': { nama: '', nip: '' },
    '6B': { nama: '', nip: '' },
  }
};

export const initialStudents: StudentDetail[] = [];

export const defaultSubjects = [
  { code: 'PAI', namaMataPelajaran: 'Pendidikan Agama dan Budi Pekerti', kKM: 75 },
  { code: 'PPKN', namaMataPelajaran: 'Pendidikan Pancasila dan Kewarganegaraan', kKM: 75 },
  { code: 'BIND', namaMataPelajaran: 'Bahasa Indonesia', kKM: 75 },
  { code: 'MTK', namaMataPelajaran: 'Matematika', kKM: 70 },
  { code: 'IPAS', namaMataPelajaran: 'Ilmu Pengetahuan Alam dan Sosial (IPAS)', kKM: 70 },
  { code: 'SBDP', namaMataPelajaran: 'Seni Budaya dan Prakarya', kKM: 75 },
  { code: 'PJOK', namaMataPelajaran: 'Pendidikan Jasmani, Olahraga & Kesehatan', kKM: 75 },
  { code: 'SUNDA', namaMataPelajaran: 'Bahasa Daerah (Sunda)', kKM: 75 },
  { code: 'BING', namaMataPelajaran: 'Bahasa Inggris', kKM: 70 },
];

export const initialSemesterRecords: StudentSemesterRecord[] = [];

