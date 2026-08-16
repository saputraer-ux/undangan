/**
 * Wedding Invitation CMS + RSVP -> Google Sheets
 *
 * Jalankan setupSystem() SATU KALI setelah menempelkan kode ini.
 * Tab RSVP lama tidak dihapus. Fungsi ini hanya membuat/melengkapi tab CONFIG.
 */
const RSVP_SHEET = 'RSVP';
const CONFIG_SHEET = 'CONFIG';

function setupSystem() {
  setupRsvp_();
  setupConfig_();
  return 'CONFIG dan RSVP siap digunakan.';
}

function setupSheet() {
  // Alias agar