// -------------------------------------------------------------------------------------------------
// GOOGLE APPS SCRIPT CODE - UPDATED VERSION (NO PHOTO STORAGE)
// 1. Go to https://script.google.com/home
// 2. Create a 'New Project' OR open your existing project
// 3. Delete any code in 'Code.gs' and paste this entire script.
// 4. Click 'Deploy' -> 'New Deployment' -> Select type 'Web app'.
// 5. Set 'Execute as': 'Me'
// 6. Set 'Who has access': 'Anyone' (IMPORTANT)
// 7. Click 'Deploy' and copy the 'Web App URL'.
// 8. Paste that URL into your HTML file where it says 'GOOGLE_SCRIPT_URL'.
// -------------------------------------------------------------------------------------------------

const SHEET_NAME = "Sheet1"; // Name of the tab to store data

function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        let sheet = ss.getSheetByName(SHEET_NAME);

        // Create sheet if not exists
        if (!sheet) {
            sheet = ss.insertSheet(SHEET_NAME);
            // Add Headers
            sheet.appendRow([
                "Date",
                "Time",
                "Full Name",
                "Country Code",
                "Phone Number",
                "Full Phone",
                "Email",
                "Privacy Consent",
                "Marketing Opt-In"
            ]);
        } else {
            // Check if headers exist (if A1 is not "Date", assume missing headers)
            const firstCell = sheet.getRange(1, 1).getValue();
            if (firstCell !== "Date") {
                sheet.insertRowBefore(1);
                sheet.getRange(1, 1, 1, 9).setValues([[
                    "Date", "Time", "Full Name", "Country Code", "Phone Number", "Full Phone", "Email", "Privacy Consent", "Marketing Opt-In"
                ]]);
            }
        }

        // Get current date and time in readable format
        const now = new Date();
        const dateStr = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd");
        const timeStr = Utilities.formatDate(now, Session.getScriptTimeZone(), "HH:mm:ss");

        // Append Data - All fields from the form (NO photo)
        sheet.appendRow([
            dateStr,                                    // Date
            timeStr,                                    // Time
            data.fullName || "",                        // Full Name
            "'" + (data.countryCode || ""),             // Country Code (Force Text)
            "'" + (data.phoneNumber || ""),             // Phone Number (Force Text)
            "'" + (data.phone || ""),                   // Full Phone (Force Text)
            data.email || "",                           // Email
            data.privacyConsent ? "Yes" : "No",         // Privacy Policy Consent
            data.marketingOptIn ? "Yes" : "No"          // Marketing Opt-In
        ]);

        return ContentService.createTextOutput(JSON.stringify({ "status": "success", "message": "Data saved" }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
