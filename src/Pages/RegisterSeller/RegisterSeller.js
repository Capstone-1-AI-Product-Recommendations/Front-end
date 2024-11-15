import React, { useState } from 'react';
import RegisterSeller from '../../Components/seller/RegisterSeller/RegisterSeller';
import ShippingSetting from "../../Components/seller/ShippingSetting/ShippingSetting";
import TaxInformation  from "../../Components/seller/TaxInformation/TaxInformation";
import IdentityInformation from "../../Components/seller/IdentityInformation/IdentityInformation";
import SuccessRegistration from "../../Components/seller/SuccessRegistration/SuccessRegistration";


const RegisterSellerStep = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shopName: '',
    shopAddress: '',
    shippingMethod: '',
    taxNumber: '',
    identityNumber: ''
  });

  // Hàm xử lý khi dữ liệu thay đổi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Hàm điều khiển chuyển bước
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  // Hàm gửi dữ liệu khi hoàn tất
  const submitForm = () => {
    console.log('Form submitted:', formData);
    // Thực hiện gửi dữ liệu đến server tại đây
  };

  // Render bước hiện tại
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <RegisterSeller
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <ShippingSetting
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <TaxInformation
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <IdentityInformation
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <SuccessRegistration
            prevStep={prevStep}
            submitForm={submitForm}
          />
        );
      default:
        return (
          <RegisterSellerStep
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        );
    }
  };

  return (
    <div>
      {renderStep()}
    </div>
  );
};

export default RegisterSellerStep;
