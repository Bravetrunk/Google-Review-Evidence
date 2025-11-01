import { SCRIPT_URL } from '../constants';
import type { ApiPayload, ApiResponse } from '../types';

export const submitReview = async (payload: ApiPayload): Promise<ApiResponse> => {
  let response: Response;

  try {
    response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Network error during submission:", error);
    throw new Error("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของคุณแล้วลองอีกครั้ง");
  }

  if (!response.ok) {
    console.error(`Server error: ${response.status} ${response.statusText}`);
    throw new Error(`The server encountered an error (Status: ${response.status}). This may be due to a server-side configuration issue, such as incorrect Google Drive folder permissions.`);
  }

  try {
    const data: ApiResponse = await response.json();
    
    // Check for logical errors returned in a 200 OK response
    if (data.status === 'error') {
      const serverMessage = data.message || 'The server reported an error after processing the request.';
      
      // Intercept the specific Google Apps Script error and provide a more helpful message.
      if (serverMessage.includes('getFolderById') && serverMessage.includes('DriveApp')) {
        throw new Error("Server configuration error: Could not access the Google Drive folder. Please verify the Folder ID in the Google Apps Script and check its sharing permissions.");
      }
      
      throw new Error(serverMessage);
    }
    
    return data;
  } catch (error) {
    // This catches both JSON parsing errors and the logical error thrown from the check above.
    console.error("Error processing server response:", error);
    if (error instanceof Error && !error.message.includes('JSON')) {
        // Re-throw logical errors from the payload so they are displayed to the user.
        throw error;
    }
    // This is likely a JSON parsing error, meaning the response was not valid JSON.
    throw new Error("ได้รับรูปแบบการตอบกลับที่ไม่ถูกต้องจากเซิร์ฟเวอร์");
  }
};