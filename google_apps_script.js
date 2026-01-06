function doPost(e) {
    var lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        var data = JSON.parse(e.postData.contents);

        // Add headers if sheet is empty
        if (sheet.getLastRow() === 0) {
            sheet.appendRow([
                "Timestamp",
                "Full Name",
                "Country Code",
                "Phone Number",
                "Full Phone",
                "Email",
                "Privacy Consent",
                "Marketing Opt-In"
            ]);
        }

        // Append the data
        sheet.appendRow([
            new Date(),
            data.fullName || "",
            data.countryCode || "",
            data.phoneNumber || "",
            data.phone || "", // Combined phone
            data.email || "",
            data.privacyConsent || false,
            data.marketingOptIn || false
        ]);

        return ContentService
            .createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}

function doOptions(e) {
    // CORS Preflight handling (though mostly for client-side debugging, actual fetch uses no-cors)
    return ContentService.createTextOutput("").setMimeType(ContentService.MimeType.TEXT);
}
