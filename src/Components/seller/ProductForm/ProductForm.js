// ProductForm.js
import React, { useState, useCallback, useEffect, useRef } from 'react';
import './ProductForm.css';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const navigate = useNavigate();

  // State management for form
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    images: [],
    videos: [],
    name: '',
    category: '',
    description: ''
  });
  const [imagePreview, setImagePreview] = useState([]);
  const [videoPreview, setVideoPreview] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});
  const [autoSave, setAutoSave] = useState(true);
  const autoSaveTimeoutRef = useRef(null);
  const maxImages = 9;
  const maxVideos = 1;

  // Constants for validation
  const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
  const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime'];
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_VIDEO_SIZE = 30 * 1024 * 1024; // 30MB
  const MIN_IMAGE_DIMENSION = 250;
  const MAX_PRODUCT_NAME_LENGTH = 120;

  // Tabs configuration
  const tabs = [
    { id: 'basic', label: 'Thông tin cơ bản' },
    { id: 'sales', label: 'Thông tin bán hàng' },
    { id: 'shipping', label: 'Vận chuyển' },
    { id: 'others', label: 'Thông tin khác' }
  ];

  // Handle tab switching
  const handleTabChange = (tabId) => {
    if (validateCurrentTab()) {
      setActiveTab(tabId);
    }
  };

  // Validate current tab before switching
  const validateCurrentTab = () => {
    const errors = {};
    
    if (activeTab === 'basic') {
      if (formData.images.length === 0) {
        errors.images = 'Vui lòng thêm ít nhất 1 hình ảnh sản phẩm';
      }
      if (!formData.name.trim()) {
        errors.name = 'Tên sản phẩm không được để trống';
      }
      if (!formData.category) {
        errors.category = 'Vui lòng chọn ngành hàng';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle image upload
  const handleImageUpload = useCallback(async (files) => {
    const newImages = [...formData.images];
    const newPreviews = [...imagePreview];
    const errors = { ...validationErrors };

    for (const file of files) {
      if (newImages.length >= maxImages) {
        errors.images = `Chỉ có thể tải lên tối đa ${maxImages} hình ảnh`;
        break;
      }

      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        errors.images = 'Định dạng file không hợp lệ';
        continue;
      }

      if (file.size > MAX_IMAGE_SIZE) {
        errors.images = 'Kích thước file vượt quá 5MB';
        continue;
      }

      try {
        // Check image dimensions
        const dimensions = await getImageDimensions(file);
        if (dimensions.width < MIN_IMAGE_DIMENSION || dimensions.height < MIN_IMAGE_DIMENSION) {
          errors.images = `Kích thước ảnh tối thiểu ${MIN_IMAGE_DIMENSION}x${MIN_IMAGE_DIMENSION} pixels`;
          continue;
        }

        newImages.push(file);
        newPreviews.push(URL.createObjectURL(file));
      } catch (error) {
        console.error('Error processing image:', error);
        errors.images = 'Có lỗi xảy ra khi xử lý ảnh';
      }
    }

    setFormData(prev => ({ ...prev, images: newImages }));
    setImagePreview(newPreviews);
    setValidationErrors(errors);
  }, [formData.images, imagePreview, validationErrors]);

  // Get image dimensions
  const getImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = reject;
    });
  };

  // Handle video upload
  const handleVideoUpload = useCallback(async (files) => {
    const newVideos = [...formData.videos];
    const newPreviews = [...videoPreview];
    const errors = { ...validationErrors };

    for (const file of files) {
      if (newVideos.length >= maxVideos) {
        errors.videos = 'Chỉ có thể tải lên 1 video';
        break;
      }

      if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
        errors.videos = 'Định dạng video không hợp lệ';
        continue;
      }

      if (file.size > MAX_VIDEO_SIZE) {
        errors.videos = 'Kích thước video vượt quá 30MB';
        continue;
      }

      try {
        const videoElement = document.createElement('video');
        const videoURL = URL.createObjectURL(file);
        
        videoElement.onloadedmetadata = () => {
          if (videoElement.duration > 60) {
            errors.videos = 'Thời lượng video không được vượt quá 60 giây';
            URL.revokeObjectURL(videoURL);
            return;
          }

          newVideos.push(file);
          newPreviews.push(videoURL);
          
          setFormData(prev => ({ ...prev, videos: newVideos }));
          setVideoPreview(newPreviews);
        };

        videoElement.src = videoURL;
      } catch (error) {
        console.error('Error processing video:', error);
        errors.videos = 'Có lỗi xảy ra khi xử lý video';
      }
    }

    setValidationErrors(errors);
  }, [formData.videos, videoPreview, validationErrors]);

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = [...e.dataTransfer.files];
    const imageFiles = files.filter(file => ALLOWED_IMAGE_TYPES.includes(file.type));
    const videoFiles = files.filter(file => ALLOWED_VIDEO_TYPES.includes(file.type));

    if (imageFiles.length) handleImageUpload(imageFiles);
    if (videoFiles.length) handleVideoUpload(videoFiles);
  }, [handleImageUpload, handleVideoUpload]);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }

      autoSaveTimeoutRef.current = setTimeout(() => {
        localStorage.setItem('productFormDraft', JSON.stringify(formData));
      }, 3000);
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [formData, autoSave]);

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('productFormDraft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Clean up previews on unmount
  useEffect(() => {
    return () => {
      imagePreview.forEach(url => URL.revokeObjectURL(url));
      videoPreview.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  // Thêm hàm xử lý reset form
  const handleReset = () => {
    setFormData({
      images: [],
      videos: [],
      name: '',
      category: '',
      description: ''
    });
    setImagePreview([]);
    setVideoPreview([]);
    setValidationErrors({});
    setCurrentStep(1);
    setActiveTab('basic');
    
    // Xóa draft trong localStorage
    localStorage.removeItem('productFormDraft');
  };

  return (
    <div className="product-form-container">
      {/* Navigation Breadcrumb */}
      <div className="breadcrumb">
        <span>Trang chủ</span> &gt; 
        <span>Sản phẩm</span> &gt; 
        <span>Thêm 1 sản phẩm mới</span>
      </div>

      {/* Main Form */}
      <div className="form-wrapper">
        {/* Left Sidebar */}
        <div className="sidebar">
          <div className="progress-steps">
            {tabs.map((tab, index) => (
              <div 
                key={tab.id}
                className={`step ${activeTab === tab.id ? 'active' : ''} ${
                  index < currentStep ? 'completed' : ''
                }`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {activeTab === 'basic' && (
            <div className="basic-info-section">
              {/* Image Upload Section */}
              <div 
                className="image-upload-section"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <h3>Hình ảnh sản phẩm</h3>
                <div className="image-grid">
                  {imagePreview.map((url, index) => (
                    <div key={index} className="image-preview">
                      <img src={url} alt={`Product ${index + 1}`} />
                      <button 
                        className="remove-image"
                        onClick={() => {
                          const newImages = [...formData.images];
                          const newPreviews = [...imagePreview];
                          newImages.splice(index, 1);
                          newPreviews.splice(index, 1);
                          setFormData(prev => ({ ...prev, images: newImages }));
                          setImagePreview(newPreviews);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {imagePreview.length < maxImages && (
                    <label className="upload-box">
                      <input
                        type="file"
                        multiple
                        accept={ALLOWED_IMAGE_TYPES.join(',')}
                        onChange={(e) => handleImageUpload(Array.from(e.target.files))}
                      />
                      <span>+</span>
                      <span>Thêm hình ảnh</span>
                    </label>
                  )}
                </div>
                {validationErrors.images && (
                  <div className="error-message">{validationErrors.images}</div>
                )}
              </div>

              {/* Video Upload Section */}
              <div className="video-upload-section">
                <h3>Video sản phẩm</h3>
                <div className="video-upload-area">
                  {videoPreview.length > 0 ? (
                    <div className="video-preview">
                      <video controls>
                        <source src={videoPreview[0]} type="video/mp4" />
                      </video>
                      <button
                        className="remove-video"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, videos: [] }));
                          setVideoPreview([]);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="upload-box">
                      <input
                        type="file"
                        accept={ALLOWED_VIDEO_TYPES.join(',')}
                        onChange={(e) => handleVideoUpload(Array.from(e.target.files))}
                      />
                      <span>+</span>
                      <span>Thêm video</span>
                    </label>
                  )}
                </div>
                {validationErrors.videos && (
                  <div className="error-message">{validationErrors.videos}</div>
                )}
              </div>

              {/* Product Details */}
              <div className="product-details-section">
                <div className="form-group">
                  <label>Tên sản phẩm</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= MAX_PRODUCT_NAME_LENGTH) {
                        setFormData(prev => ({ ...prev, name: value }));
                      }
                    }}
                    placeholder="Nhập tên sản phẩm"
                  />
                  {/* <span className="character-count">
                    {formData.name.length}/{MAX_PRODUCT_NAME_LENGTH}
                  </span> */}
                </div>

                <div className="form-group">
                  <label>Ngành hàng</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Chọn ngành hàng"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              className="btn-cancel"
              onClick={handleReset}
            >
              Hủy
            </button>
            <div className="right-actions">
              <button 
                className="btn-submit"
                onClick={() => {
                  if (validateCurrentTab()) {
                    // Xóa draft sau khi lưu thành công
                    localStorage.removeItem('productFormDraft');
                    // Chuyển hướng đến trang seller dashboard
                    navigate('/seller-dashboard');
                  }
                }}
              >
                Lưu 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;