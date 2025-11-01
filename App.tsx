import React, { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import { EMPLOYEE_OPTIONS } from './constants';
import type { FormData, StatusState } from './types';
import { submitReview } from './services/api';
import { IconPhoto, IconLoader, IconCircleCheck, IconAlertCircle, IconX, IconGoogle } from './components/Icons';

const initialFormData: FormData = {
  employeeName: '',
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error('Failed to read file as Base64 string.'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusState>({ message: '', type: null });
  const [showStatus, setShowStatus] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);
  
  useEffect(() => {
    if (status.message) {
      setShowStatus(true);
    } else {
      setShowStatus(false);
    }
  }, [status]);


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus({ message: '', type: null });
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.employeeName) {
      setStatus({ message: 'กรุณาเลือกพนักงาน', type: 'error' });
      return;
    }

    if (!file) {
      setStatus({ message: 'กรุณาเลือกรูปภาพเพื่อเป็นหลักฐาน', type: 'error' });
      return;
    }

    setIsLoading(true);
    setStatus({ message: 'กำลังอัปโหลดรีวิวของคุณ กรุณารอสักครู่...', type: 'info' });

    try {
      const base64Data = await fileToBase64(file);
      
      const payload = {
        employeeName: formData.employeeName,
        fileData: base64Data,
        fileName: file.name,
        mimeType: file.type,
      };

      await submitReview(payload);
      
      setStatus({ message: 'ขอบคุณ! รีวิวของคุณถูกส่งเรียบร้อยแล้ว', type: 'success' });
      setFormData(initialFormData);
      handleRemoveFile();
    } catch (error) {
      console.error('Submission Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
      setStatus({ message: `${errorMessage}`, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = () => {
    switch (status.type) {
      case 'success':
        return <IconCircleCheck className="h-6 w-6 mr-3 text-green-500" animated={true} />;
      case 'error':
        return <IconAlertCircle className="h-6 w-6 mr-3 text-red-500" />;
      case 'info':
        return <IconLoader className="h-6 w-6 mr-3 animate-spin text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3">
            <IconGoogle className="h-8 w-8 text-gray-700" />
            <h1 className="text-3xl font-bold text-main-font">ส่งหลักฐาน Google Review</h1>
          </div>
          <p className="text-body-font mt-2">ความคิดเห็นของคุณช่วยให้เราพัฒนา</p>
        </div>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-6">
            <div>
              <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 mb-1">👥 ชื่อพนักงาน</label>
              <select
                id="employeeName"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-50 text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="" disabled>-- เลือกพนักงาน --</option>
                 {EMPLOYEE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            
            <div>
              <label htmlFor="evidence" className="block text-sm font-medium text-gray-700 mb-1">📸 รูปภาพหลักฐาน</label>
              {previewUrl ? (
                <div className="mt-2 relative">
                  <img src={previewUrl} alt="Image preview" className="w-full h-auto max-h-60 object-contain rounded-lg border border-gray-200" />
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="absolute top-2 right-2 bg-white/70 backdrop-blur-sm rounded-full p-1 text-gray-600 hover:text-red-500 hover:bg-white transition-all duration-200"
                    aria-label="Remove image"
                  >
                    <IconX className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="mt-2 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <IconPhoto className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="evidence" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                        <span>อัปโหลดรูปภาพ</span>
                        <input id="evidence" name="evidence" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} ref={fileInputRef} required />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">ไฟล์ PNG, JPG ขนาดไม่เกิน 10MB</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1"
            >
              {isLoading ? (
                <>
                  <IconLoader className="h-5 w-5 mr-3 animate-spin" />
                  <span>กำลังส่ง...</span>
                </>
              ) : (
                'ส่งรีวิว'
              )}
            </button>
          </div>
        </form>
        
        <div className={`transition-all duration-500 ease-in-out ${showStatus ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {status.message && (
            <div className={`mt-6 p-4 rounded-lg flex items-start text-sm ${
              status.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' :
              status.type === 'error' ? 'bg-red-50 border border-red-200 text-red-800' :
              'bg-blue-50 border border-blue-200 text-blue-800'
            }`}>
              <div className="flex-shrink-0">{getStatusIcon()}</div>
              <div className="ml-1">
                <p className="font-medium">{status.message}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;