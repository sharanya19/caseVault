// util/appRoutes.ts

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000/';

const API_PATH = {
    // Authentication routes
    LOGIN: `${BASE_URL}api/token/`,                  // Admin login
    REFRESH_TOKEN: `${BASE_URL}api/token/refresh/`,  // Token refresh

    // File upload and review routes
    UPLOAD_DOCUMENT: `${BASE_URL}api/upload/`,       // Upload document
    REVIEW_DOCUMENT: `${BASE_URL}api/review/`,       // Review uploaded document
    DOCUMENT_LIST: `${BASE_URL}api/documents/`,

    // Potential routes for future expansions
    // USERS: `${BASE_URL}api/users/`,                 // User management
    // SETTINGS: `${BASE_URL}api/settings/`,           // App settings
};

export {
    BASE_URL,
    API_PATH
};
