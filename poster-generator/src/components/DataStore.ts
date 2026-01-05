import { UserData } from '../types';

// Replace with your actual Google Apps Script URL
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

export const saveUserData = async (userData: UserData): Promise<void> => {
    // If no URL configured, skip saving
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('YOUR_')) {
        console.log('Google Script URL not configured. Data not saved to sheets.');
        console.log('User data:', {
            fullName: userData.fullName,
            email: userData.email,
            phone: userData.phone,
            customText: userData.customText,
        });
        return;
    }

    try {
        // Prepare data for sending (exclude photo to reduce payload size)
        const dataToSend = {
            fullName: userData.fullName,
            email: userData.email,
            phone: userData.phone,
            customText: userData.customText || '',
            timestamp: new Date().toISOString(),
        };

        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Data saved successfully');
    } catch (error) {
        console.error('Failed to save data:', error);
        throw error;
    }
};

/*
===============================================
GOOGLE APPS SCRIPT SETUP INSTRUCTIONS
===============================================

1. Go to Google Sheets and create a new spreadsheet
2. Add headers in Row 1:
   - A1: Timestamp
   - B1: Full Name
   - C1: Email
   - D1: Phone
   - E1: Custom Text

3. Go to Extensions > Apps Script

4. Replace the default code with:

const SHEET_ID = 'YOUR_SHEET_ID'; // Get this from your spreadsheet URL
const SHEET_NAME = 'Sheet1'; // Or your sheet name

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    sheet.appendRow([
      new Date(data.timestamp || new Date()),
      data.fullName,
      data.email,
      data.phone,
      data.customText
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Poster Generator API is running');
}

5. Click Deploy > New Deployment
6. Select "Web app" as type
7. Set "Execute as" to "Me"
8. Set "Who has access" to "Anyone"
9. Click Deploy and authorize when prompted
10. Copy the Web app URL and paste it in GOOGLE_SCRIPT_URL above

===============================================
*/
