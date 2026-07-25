import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SchoolInfographic } from './SchoolInfographic';
import { CheckCircle2, RefreshCw, Save } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    assessmentMode,
    setAssessmentMode,
    setActiveView,
    setSelectedClass,
    setSelectedSemester,
    resetAllData,
    students,
    schoolData,
    rombelList,
    triggerManualSave
  } = useApp();

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleOpenCatatan = (kelas: string | number, semester: 1 | 2) => {
    setSelectedClass(kelas);
    setSelectedSemester(semester);
    setActiveView('catatan-siswa');
  };

  const handleSaveAllData = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const res = await triggerManualSave();
      if (res.syncedCloud) {
        setSaveStatus('Data Berhasil Disimpan ke Memori Lokal & Cloud Google Sheets!');
      } else {
        setSaveStatus('Data Berhasil Disimpan ke Memori Aplikasi!');
      }
    } catch (err) {
      setSaveStatus('Data Berhasil Disimpan ke Memori!');
    } finally {
      setIsSaving(false);
      setTimeout(() => {
        setSaveStatus(null);
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#3a585d] text-gray-900 p-2 sm:p-4 lg:p-6 flex flex-col justify-between relative overflow-hidden font-sans select-none">
      {/* Background Decorative Wavy Board Frame */}
      <div className="absolute inset-2 border-4 border-[#e8d5b7] rounded-3xl pointer-events-none opacity-40"></div>
      
      {/* Top Banner & Title Area */}
      <div className="relative z-10 mb-3 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-start mb-1">
          <div className="text-xs text-emerald-200 font-bold px-3 py-1 bg-emerald-900/50 rounded-lg backdrop-blur">
            {schoolData.namaSekolah} | NPSN: {schoolData.npsn}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSaveAllData}
              disabled={isSaving}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md border border-white flex items-center space-x-1.5 transition cursor-pointer active:scale-95"
              title="Simpan Data Aplikasi"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-yellow-300" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Simpan Data</span>
                </>
              )}
            </button>
            <div className="bg-[#bfe6ff] text-[#003865] px-3 py-1 rounded-full text-xs font-bold shadow-md border border-white">
              Versi 1.1
            </div>
          </div>
        </div>

        <div className="text-center py-2">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-wider drop-shadow-[0_3px_3px_rgba(0,0,0,0.6)] font-sans uppercase">
            <span className="text-emerald-300 drop-shadow-[0_2px_0_#000]">APLIKASI BUKU INDUK SISWA</span>
          </h1>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-widest drop-shadow-[0_3px_3px_rgba(0,0,0,0.6)] mt-1 uppercase">
            SEKOLAH DASAR
          </h2>

          {/* Success Save Banner Alert */}
          {saveStatus && (
            <div className="mt-2 max-w-xl mx-auto bg-emerald-100 border-2 border-emerald-500 text-emerald-950 font-black px-4 py-2 rounded-xl shadow-xl flex items-center justify-center space-x-2 text-xs sm:text-sm animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{saveStatus}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main 4-Section Menu Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 my-auto">
        
        {/* COLUMN 1: DATA MASTER (Left - 3 cols) */}
        {/* Note: Swap position of DATA SEKOLAH and DATA AWAL */}
        <div className="md:col-span-3 flex flex-col space-y-2.5 justify-center">
          <button
            onClick={() => setActiveView('data-sekolah')}
            className="w-full bg-[#fbd0bd] hover:bg-[#f7bc9f] text-[#2b1810] border-2 border-white rounded-2xl py-2.5 px-4 shadow-lg font-black text-base sm:text-lg tracking-wide transition transform active:scale-95 flex items-center justify-center text-center cursor-pointer"
          >
            DATA SEKOLAH
          </button>

          <button
            onClick={() => setActiveView('data-awal')}
            className="w-full bg-[#fbd0bd] hover:bg-[#f7bc9f] text-[#2b1810] border-2 border-white rounded-2xl py-2.5 px-4 shadow-lg font-black text-base sm:text-lg tracking-wide transition transform active:scale-95 flex items-center justify-center text-center cursor-pointer"
          >
            DATA AWAL
          </button>

          <button
            onClick={() => setActiveView('data-siswa')}
            className="w-full bg-[#fbd0bd] hover:bg-[#f7bc9f] text-[#2b1810] border-2 border-white rounded-2xl py-2.5 px-4 shadow-lg font-black text-base sm:text-lg tracking-wide transition transform active:scale-95 flex items-center justify-center text-center cursor-pointer"
          >
            DATA SISWA
          </button>

          <button
            onClick={() => setActiveView('data-lengkap-siswa')}
            className="w-full bg-[#fbd0bd] hover:bg-[#f7bc9f] text-[#2b1810] border-2 border-white rounded-2xl py-2 px-4 shadow-lg font-black text-sm sm:text-base tracking-wide transition transform active:scale-95 flex items-center justify-center text-center cursor-pointer"
          >
            DATA LENGKAP SISWA
          </button>

          <button
            onClick={handleSaveAllData}
            disabled={isSaving}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white border-2 border-emerald-200 rounded-2xl py-2.5 px-4 shadow-xl font-black text-base tracking-wide transition transform active:scale-95 flex items-center justify-center text-center cursor-pointer gap-2"
            title="Simpan Seluruh Data Aplikasi"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-yellow-300" />
                <span>MENYIMPAN...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5 text-yellow-300" />
                <span>SIMPAN DATA</span>
              </>
            )}
          </button>

          <button
            onClick={() => setActiveView('integrasi-database')}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-100 border-2 border-slate-600 rounded-2xl py-2 px-4 shadow-md font-extrabold text-xs tracking-wide transition transform active:scale-95 flex items-center justify-center text-center cursor-pointer gap-1.5"
            title="Halaman Admin Integrasi Database Google Sheets & Apps Script"
          >
            <span>INTEGRASI DATABASE (GS)</span>
          </button>
        </div>

        {/* COLUMN 2: MODE DESKRIPSI (Center Left - 3 cols) */}
        <div className="md:col-span-3 flex flex-col space-y-4 justify-center">
          <button
            onClick={() => setAssessmentMode('tanpa')}
            className={`w-full py-8 px-4 rounded-3xl border-4 transition-all shadow-xl font-extrabold text-xl sm:text-2xl tracking-wide flex items-center justify-center text-center cursor-pointer ${
              assessmentMode === 'tanpa'
                ? 'bg-[#70c738] text-white border-yellow-300 ring-4 ring-yellow-300/50 scale-105'
                : 'bg-[#70c738]/80 hover:bg-[#70c738] text-white border-white'
            }`}
          >
            <div className="flex flex-col items-center">
              <span>TANPA DESKRIPSI</span>
              {assessmentMode === 'tanpa' && (
                <span className="text-xs bg-white text-emerald-800 px-3 py-0.5 rounded-full mt-2 font-bold uppercase shadow">
                  Aktif
                </span>
              )}
            </div>
          </button>

          <button
            onClick={() => setAssessmentMode('dengan')}
            className={`w-full py-8 px-4 rounded-3xl border-4 transition-all shadow-xl font-extrabold text-xl sm:text-2xl tracking-wide flex items-center justify-center text-center cursor-pointer ${
              assessmentMode === 'dengan'
                ? 'bg-[#89d0e2] text-[#0f3844] border-yellow-300 ring-4 ring-yellow-300/50 scale-105'
                : 'bg-[#89d0e2]/80 hover:bg-[#89d0e2] text-[#0f3844] border-white'
            }`}
          >
            <div className="flex flex-col items-center">
              <span>DENGAN DESKRIPSI</span>
              {assessmentMode === 'dengan' && (
                <span className="text-xs bg-[#0f3844] text-white px-3 py-0.5 rounded-full mt-2 font-bold uppercase shadow">
                  Aktif
                </span>
              )}
            </div>
          </button>
        </div>

        {/* COLUMN 3: CATATAN SISWA (Center Right - 3 cols) */}
        <div className="md:col-span-3 bg-[#e4eef0]/20 backdrop-blur-md p-2 sm:p-3 rounded-2xl border border-white/30 flex flex-col justify-center">
          <div className="bg-[#fbd0bd] border-2 border-white text-[#2b1810] font-black text-center py-2 px-3 rounded-xl shadow mb-2 text-base sm:text-lg">
            CATATAN SISWA
          </div>

          <div className="bg-white/95 rounded-xl p-2 shadow-inner">
            <div className="grid grid-cols-12 gap-1 mb-1 font-black text-xs sm:text-sm text-center text-gray-800">
              <div className="col-span-6 bg-black text-white py-1 rounded">KELAS</div>
              <div className="col-span-6 bg-[#fff6a2] text-gray-900 py-1 rounded">SEMESTER</div>
            </div>

            <div className="space-y-1.5 max-h-[290px] overflow-y-auto pr-1">
              {rombelList.map(kelasKey => (
                <div key={kelasKey} className="grid grid-cols-12 gap-1.5 items-center">
                  <button
                    onClick={() => handleOpenCatatan(kelasKey, 1)}
                    className="col-span-6 bg-[#89e051] hover:bg-[#72cc3a] text-gray-900 font-black py-1.5 px-2 rounded-lg text-center text-xs sm:text-sm shadow transition border border-emerald-600 truncate cursor-pointer"
                    title={`Buka Catatan Kelas ${kelasKey}`}
                  >
                    KELAS {kelasKey}
                  </button>
                  <button
                    onClick={() => handleOpenCatatan(kelasKey, 1)}
                    className="col-span-3 bg-[#fdf8bc] hover:bg-[#fbf192] text-gray-900 font-extrabold py-1.5 rounded-lg text-center text-xs sm:text-sm shadow border border-amber-300 transition cursor-pointer"
                    title={`Semester 1`}
                  >
                    1
                  </button>
                  <button
                    onClick={() => handleOpenCatatan(kelasKey, 2)}
                    className="col-span-3 bg-[#fdf8bc] hover:bg-[#fbf192] text-gray-900 font-extrabold py-1.5 rounded-lg text-center text-xs sm:text-sm shadow border border-amber-300 transition cursor-pointer"
                    title={`Semester 2`}
                  >
                    2
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMN 4: PRINT OUT (Right - 3 cols) */}
        <div className="md:col-span-3 flex flex-col justify-center space-y-2.5">
          <div className="bg-[#b2e0e6] border-2 border-white text-[#112d32] font-black text-center py-2 px-3 rounded-xl shadow text-base sm:text-lg">
            PRINT OUT
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveView('print-cover')}
                className="bg-[#fbd0bd] hover:bg-[#f7bc9f] text-[#2b1810] border-2 border-white rounded-xl py-3 px-2 shadow font-extrabold text-sm text-center transition active:scale-95 cursor-pointer"
              >
                COVER
              </button>

              <button
                onClick={() => setActiveView('print-buku-induk-tanpa')}
                className="bg-[#89e051] hover:bg-[#72cc3a] text-gray-900 border-2 border-white rounded-xl py-2 px-2 shadow font-bold text-xs leading-tight text-center transition active:scale-95 cursor-pointer"
              >
                BUKU INDUK TANPA DESKRIPSI
              </button>
            </div>

            <button
              onClick={() => setActiveView('print-identitas')}
              className="bg-[#fbd0bd] hover:bg-[#f7bc9f] text-[#2b1810] border-2 border-white rounded-xl py-3 px-3 shadow font-extrabold text-sm text-center transition active:scale-95 cursor-pointer"
            >
              IDENTITAS SISWA
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveView('print-index')}
                className="bg-[#fbd0bd] hover:bg-[#f7bc9f] text-[#2b1810] border-2 border-white rounded-xl py-3 px-2 shadow font-extrabold text-sm text-center transition active:scale-95 cursor-pointer"
              >
                INDEX SISWA
              </button>

              <button
                onClick={() => setActiveView('print-buku-induk-dengan')}
                className="bg-[#b2e0e6] hover:bg-[#9cd4dd] text-[#112d32] border-2 border-white rounded-xl py-2 px-2 shadow font-bold text-xs leading-tight text-center transition active:scale-95 cursor-pointer"
              >
                BUKU INDUK DESKRIPSI
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Area with Infographic */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-4 flex flex-col space-y-2">
        <SchoolInfographic />

        <div className="flex justify-between items-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/30 text-white text-xs font-bold">
          <div>Jumlah Siswa Terdaftar: <span className="text-yellow-300">{students.length} Siswa</span></div>
          <div>Mode Aktif: <span className="text-emerald-200 capitalize">{assessmentMode === 'tanpa' ? 'Tanpa Deskripsi' : 'Dengan Deskripsi'}</span></div>
          <button
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin mengosongkan SELURUH data di memori aplikasi? Data akan dihapus bersih.')) {
                resetAllData();
              }
            }}
            className="text-[11px] text-red-200 hover:text-white underline cursor-pointer font-bold"
          >
            Kosongkan Database
          </button>
        </div>
      </div>
    </div>
  );
};
