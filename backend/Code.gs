/**
 * RSVP Undangan Digital -> Google Sheets
 */
const SHEET_NAME = 'RSVP';

function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  const headers = ['Timestamp','Nama Tamu','Kehadiran','Jumlah Tamu','Ucapan'];
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1,1,1,headers.length).setValues([headers]);
    sheet.getRange(1,1,1,headers.length)
      .setFontWeight('bold')
      .setBackground('#dfeadf')
      .setFontColor('#35583c');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1,headers.length);
  }
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      setupSheet();
      sheet = ss.getSheetByName(SHEET_NAME);
    }

    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const name = sanitize_(data.name);
    const attendance = sanitize_(data.attendance);
    const pax = Number(data.pax || 0);
    const message = sanitize_(data.message);

    if (!name || !attendance) {
      return json_({ok:false,message:'Nama dan status kehadiran wajib diisi.'});
    }

    sheet.appendRow([new Date(),name,attendance,pax,message]);
    return json_({ok:true,message:'RSVP berhasil disimpan.'});
  } catch (err) {
    return json_({ok:false,message:String(err)});
  }
}

function doGet() {
  return json_({ok:true,service:'Wedding RSVP API',status:'online'});
}

function sanitize_(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim().slice(0,2000);
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
