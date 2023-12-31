function doGet(e) {
  var template = HtmlService.createTemplateFromFile('adminPage');
  var id = e.parameter.id;
  template.id = id;
  return template.evaluate();
}


function onFormSubmit(formData) {
  // Implement your logic to trigger email with subject and email text
  console.log(formData);
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var adminSheet = sheet.getSheetByName("Admin");
  var subject = adminSheet.getRange("B" + formData.id).getValue();
  var mailText = adminSheet.getRange("C" + formData.id).getValue();

  var recipient = formData.email;

  // Send the email
  if (formData.email) {
    GmailApp.sendEmail(recipient, subject, mailText);
  }
}


function onEdit(e) {
  var sheet = e.source.getSheetByName('Admin'); // Replace 'Sheet1' with your sheet name
  var editedRange = e.range;
  var editedRow = editedRange.getRow();
  var editedColumn = editedRange.getColumn();
  var url = "https://script.google.com/macros/s/AKfycbzPWLd2ubjrwCd2ike15jPIlC0Idh2w3Eru978qhvepQ0UJI1aU16leKeU_a32zKf1z/exec?id=" + editedRow;
  if ((editedColumn == 2 || editedColumn == 3) && editedRange.getValue() != '') {
    sheet.getRange(editedRow, 1, 1, 1).setValue(url);
  }

}
