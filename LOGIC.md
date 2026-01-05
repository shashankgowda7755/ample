# 🎯 Watch Donation Certificate Generator

## Product Requirements Document (PRD) & Technical Documentation

---

## 📌 Product Overview

**Product Name**: Watch Donation Certificate Generator  
**Version**: 1.0  
**Last Updated**: January 2026  

### Purpose
A web application that generates personalized certificates for donors who contribute watches to the "Gift Your Watch" campaign. Users can upload/capture their photo, enter their details, and download a high-quality certificate to share on social media.

### Target Users
- Individual watch donors
- Campaign volunteers sharing on behalf of donors
- Social media users promoting the campaign

---

## 📋 Table of Contents

1. [Product Requirements (PRD)](#product-requirements-prd)
2. [File Structure & Dependencies](#file-structure--dependencies)
3. [External Scripts & CDN Links](#external-scripts--cdn-links)
4. [Application Flow](#application-flow)
5. [Core Functions Documentation](#core-functions-documentation)
6. [Google Apps Script Backend](#google-apps-script-backend)
7. [Styling & Design System](#styling--design-system)
8. [Output Specifications](#output-specifications)

---

## Product Requirements (PRD)

### User Stories

| ID | As a... | I want to... | So that... |
|----|---------|--------------|------------|
| US-01 | Donor | Enter my name and photo | I get a personalized certificate |
| US-02 | Donor | Capture photo from camera | I don't need to upload a file |
| US-03 | Donor | Crop my photo to fit | Only my face appears in the watch dial |
| US-04 | Donor | Preview before download | I can verify it looks correct |
| US-05 | Donor | Download high-quality PNG | I can print or share it |
| US-06 | Donor | Share directly to WhatsApp/Instagram | I can spread awareness easily |
| US-07 | Admin | Collect donor data | I can track campaign participation |

### Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | Accept user name input (required) | P0 |
| FR-02 | Accept WhatsApp number with country code (required) | P0 |
| FR-03 | Accept email address (required) | P0 |
| FR-04 | Allow photo upload from device | P0 |
| FR-05 | Allow photo capture from camera | P0 |
| FR-06 | Provide square (1:1) cropping tool | P0 |
| FR-07 | Display live preview with "DRAFT" watermark | P0 |
| FR-08 | Generate high-resolution PNG on download | P0 |
| FR-09 | Enable native sharing with image file | P1 |
| FR-10 | Store submissions to Google Sheets | P1 |
| FR-11 | Show loading indicator during processing | P1 |

### Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-01 | Page load time < 3 seconds |
| NFR-02 | Works on mobile browsers (iOS Safari, Android Chrome) |
| NFR-03 | Responsive design for all screen sizes |
| NFR-04 | Downloaded image resolution > 2000px wide |
| NFR-05 | No backend server required (static hosting) |

---

## File Structure & Dependencies

### Project Files

```
watchdonationcertificate/
├── index.html              # Main application (SPA)
├── poster_bg.png           # Certificate background template
├── google_apps_script.js   # Google Sheets backend code
├── LOGIC.md                # This documentation file
└── poster-generator/       # (Legacy React code - not in use)
```

### File Descriptions

| File | Size | Purpose |
|------|------|---------|
| `index.html` | ~47KB | Complete SPA with HTML, CSS, and JavaScript |
| `poster_bg.png` | ~400KB | Background template for certificate |
| `google_apps_script.js` | ~3KB | Backend script for Google Sheets |

---

## External Scripts & CDN Links

### JavaScript Libraries

| Library | Version | CDN URL | Purpose |
|---------|---------|---------|---------|
| **Tailwind CSS** | Latest | `https://cdn.tailwindcss.com?plugins=forms,container-queries` | Utility-first CSS framework |
| **html2canvas** | 1.4.1 | `https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js` | DOM-to-image conversion |
| **jsPDF** | 2.5.1 | `https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js` | PDF generation (optional) |
| **Cropper.js** | 1.5.13 | `https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js` | Image cropping tool |

### CSS Dependencies

| Resource | CDN URL | Purpose |
|----------|---------|---------|
| **Cropper.js CSS** | `https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css` | Cropper UI styles |
| **Inter Font** | `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900` | Primary font |
| **Playfair Display** | `https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700` | Serif accent font |
| **Material Symbols** | `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined` | Icon library |

### Complete Head Section Code

```html
<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>Watch Donation Certificate</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    
    <!-- HTML2Canvas & jsPDF -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    
    <!-- Cropper.js -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"></script>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
</head>
```

---

## Application Flow

### State Machine

```
┌─────────────────────────────────────────────────────────────────────┐
│                           APPLICATION STATES                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐     │
│   │ LANDING  │───▶│   FORM   │───▶│ PREVIEW  │───▶│ SUCCESS  │     │
│   │          │    │          │    │  (Draft) │    │(Download)│     │
│   └──────────┘    └────┬─────┘    └────┬─────┘    └──────────┘     │
│                        │               │                            │
│                        │               │                            │
│                   ┌────▼─────┐    ┌────▼─────┐                      │
│                   │  CAMERA  │    │   EDIT   │                      │
│                   │  MODAL   │    │  DETAILS │                      │
│                   └────┬─────┘    └──────────┘                      │
│                        │                                            │
│                   ┌────▼─────┐                                      │
│                   │ CROPPER  │                                      │
│                   │  MODAL   │                                      │
│                   └──────────┘                                      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Step Navigation Function

```javascript
function goToStep(stepId) {
    // Hide all steps
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    
    // Show target step
    const target = document.getElementById(`step-${stepId}`);
    if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
    }
    
    // Update certificate if going to preview
    if (stepId === 'preview') updateCertificateDOM();
}
```

---

## Core Functions Documentation

### State Variables

```javascript
// User data collected from form
let userData = {
    fullName: '',      // String: User's full name
    phone: '',         // String: Country code + phone number
    email: '',         // String: User's email address
    photo: null        // String: Base64 DataURL of cropped photo
};

// Cropper.js instance
let cropper = null;

// Camera MediaStream
let stream = null;

// Original image source for cropper
let activeImageSource = null;
```

### Photo Upload Flow

```javascript
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            openCropperModal(e.target.result);
        };
        reader.readAsDataURL(file);
    }
    event.target.value = ''; // Reset input
}
```

### Camera Capture Flow

```javascript
async function openCameraModal() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById('camera-feed').srcObject = stream;
        document.getElementById('camera-modal').classList.remove('hidden');
    } catch (err) {
        alert("Could not access camera. Please check permissions.");
    }
}

function capturePhoto() {
    if (!stream) return;
    
    const canvas = document.createElement('canvas');
    const video = document.getElementById('camera-feed');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    // Flip horizontal for mirror effect
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);

    const dataURL = canvas.toDataURL('image/jpeg');
    closeCameraModal();
    openCropperModal(dataURL);
}
```

### Cropper Configuration

```javascript
function openCropperModal(imageSrc) {
    const image = document.getElementById('cropper-image');
    activeImageSource = imageSrc;
    image.src = imageSrc;

    document.getElementById('cropper-modal').classList.remove('hidden');

    if (cropper) cropper.destroy();
    
    cropper = new Cropper(image, {
        aspectRatio: 1,        // 1:1 square crop
        viewMode: 1,           // Restrict to canvas
        dragMode: 'move',      // Move image, not box
        autoCropArea: 0.8,     // 80% initial crop
        background: false,     // No checkered bg
        guides: true,          // Grid lines
        responsive: true       // Window resize support
    });
}

function saveCrop() {
    if (!cropper) return;
    
    const canvas = cropper.getCroppedCanvas({
        width: 1080,           // High resolution
        height: 1080           // Square output
    });

    userData.photo = canvas.toDataURL('image/jpeg', 1.0);
    updatePhotoPreviews();
    closeCropperModal();
}
```

### Certificate Generation

```javascript
function updateCertificateDOM() {
    // Update name display
    document.getElementById('cert-user-name').textContent = userData.fullName;
    
    // Update photo
    document.getElementById('cert-user-photo').src = userData.photo;
    
    // Generate unique certificate ID
    const randomId = Math.floor(1000 + Math.random() * 9000);
    document.getElementById('cert-id').textContent = "WDC-2024-" + randomId;
    
    // Set current date
    const date = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    document.getElementById('cert-date').textContent = date.toLocaleDateString('en-US', options);
}
```

### Download Function

```javascript
function downloadPDF() {
    showLoading("Downloading certificate...");
    
    setTimeout(() => {
        const certElement = document.getElementById('final-cert-container')
            .querySelector('#certificate-visual') || 
            document.getElementById('certificate-visual');
        
        html2canvas(certElement, {
            scale: 4,              // 4x resolution for print quality
            useCORS: true,         // Allow cross-origin images
            backgroundColor: null, // Transparent background
            logging: false         // Disable console logs
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `Certificate-${userData.fullName.replace(/\s+/g, '-')}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            hideLoading();
        }).catch(err => {
            console.error(err);
            alert("Error downloading image.");
            hideLoading();
        });
    }, 100);
}
```

### Share Function

```javascript
function shareImpact() {
    showLoading("Preparing to share...");

    setTimeout(() => {
        const certElement = document.getElementById('final-cert-container')
            .querySelector('#certificate-visual') || 
            document.getElementById('certificate-visual');

        html2canvas(certElement, {
            scale: 3,              // 3x resolution for sharing
            useCORS: true,
            backgroundColor: null,
            logging: false
        }).then(canvas => {
            canvas.toBlob(blob => {
                if (blob) {
                    const file = new File(
                        [blob], 
                        `Certificate-${userData.fullName.replace(/\s+/g, '-')}.png`, 
                        { type: 'image/png' }
                    );

                    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                        navigator.share({
                            files: [file],
                            title: 'Watch Donation Certificate',
                            text: 'I just gifted my watch to support students! Join the movement.'
                        }).then(() => hideLoading())
                          .catch(() => hideLoading());
                    } else {
                        // Fallback for unsupported browsers
                        hideLoading();
                        alert("Image ready! Please download it manually to share.");
                        downloadPDF();
                    }
                }
            }, 'image/png');
        });
    }, 100);
}
```

### Data Submission

```javascript
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/[YOUR_SCRIPT_ID]/exec";

function submitToGoogleSheet() {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("YOUR_GOOGLE_SCRIPT")) {
        console.warn("Google Script URL not set. Data not saved.");
        return;
    }

    const payload = {
        fullName: userData.fullName,
        phone: userData.phone,
        email: userData.email,
        photo: userData.photo  // Base64 DataURL
    };

    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",       // Required for Apps Script
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload)
    }).then(() => {
        console.log("Data submitted to Google Sheets");
    }).catch(error => {
        console.error("Error submitting to Google Sheets:", error);
    });
}
```

---

## Google Apps Script Backend

### Complete Script Code

```javascript
// google_apps_script.js
// Deploy this to Google Apps Script as a Web App

const DRIVE_FOLDER_ID = ""; // Optional: Google Drive folder for photos
const SHEET_NAME = "Sheet1";

function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const ss = SpreadsheetApp.getActiveSpreadsheet();
        let sheet = ss.getSheetByName(SHEET_NAME);

        // Create sheet with headers if not exists
        if (!sheet) {
            sheet = ss.insertSheet(SHEET_NAME);
            sheet.appendRow(["Date", "Full Name", "Phone", "Email", "Photo URL/Base64"]);
        }

        let photoValue = "No Photo";

        // Handle Photo upload to Drive
        if (data.photo) {
            if (DRIVE_FOLDER_ID && DRIVE_FOLDER_ID.length > 5) {
                try {
                    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
                    const type = data.photo.split(';')[0].split('/')[1];
                    const decoded = Utilities.base64Decode(data.photo.split(',')[1]);
                    const blob = Utilities.newBlob(
                        decoded, 
                        'image/' + type, 
                        data.fullName + "_" + Date.now() + "." + type
                    );
                    const file = folder.createFile(blob);
                    photoValue = file.getUrl();
                } catch (err) {
                    photoValue = "Error: " + err.toString();
                }
            } else {
                photoValue = "Base64 Image (Drive not configured)";
            }
        }

        // Append row to sheet
        sheet.appendRow([
            new Date(),
            data.fullName,
            data.phone,
            data.email,
            photoValue
        ]);

        return ContentService
            .createTextOutput(JSON.stringify({ status: "success" }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
```

### Deployment Steps

1. Go to [script.google.com](https://script.google.com/home)
2. Create **New Project**
3. Paste the code above into `Code.gs`
4. Click **Deploy** → **New Deployment**
5. Select type: **Web app**
6. Set **Execute as**: Me
7. Set **Who has access**: Anyone
8. Click **Deploy** and copy the URL
9. Paste URL into `index.html` at `GOOGLE_SCRIPT_URL`

---

## Styling & Design System

### Tailwind Configuration

```javascript
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#A86853",
                "primary-dark": "#8F5644",
                "background-light": "#FAF9F6",
                "background-dark": "#1C1917",
                "surface-light": "#FFFFFF",
                "surface-dark": "#292524",
                "text-main": "#292524",
                "text-muted": "#78716C",
                "border-light": "#E7E5E4",
                "border-dark": "#44403C",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "serif": ["Playfair Display", "serif"],
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-out forwards",
                "fade-in-up": "fadeInUp 0.5s ease-out forwards",
            }
        }
    }
}
```

### Certificate Overlay Positioning

| Element | CSS Position | Dimensions |
|---------|--------------|------------|
| **Photo** | `top: 6.3%`, `left: 8.3%` | `width: 45.0%`, aspect-ratio 1:1 |
| **Name** | `top: 66%`, `left: 8%` | `width: 80%` |

---

## Output Specifications

### Download Output

| Property | Value |
|----------|-------|
| **Format** | PNG |
| **Scale** | 4x (High DPI) |
| **Approx. Resolution** | ~2400 × 3200 pixels |
| **Filename** | `Certificate-[Full-Name].png` |
| **Color** | Full color, transparent bg |

### Share Output

| Property | Value |
|----------|-------|
| **Format** | PNG |
| **Scale** | 3x |
| **Approx. Resolution** | ~1800 × 2400 pixels |
| **Sharing Method** | Web Share API (native) |

### Photo Crop Output

| Property | Value |
|----------|-------|
| **Format** | JPEG |
| **Quality** | 1.0 (100%) |
| **Resolution** | 1080 × 1080 pixels |
| **Aspect Ratio** | 1:1 (Square) |

---

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome (Desktop) | ✅ Full |
| Chrome (Android) | ✅ Full |
| Safari (iOS) | ✅ Full |
| Firefox | ✅ Full |
| Edge | ✅ Full |

### Required APIs

- `navigator.mediaDevices.getUserMedia()` - Camera
- `navigator.share()` - Native sharing
- `FileReader` - File reading
- `Blob` / `File` - Binary handling

---

*Document Version: 1.0 | Last Updated: January 2026*
