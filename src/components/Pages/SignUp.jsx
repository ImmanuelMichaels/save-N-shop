import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, CreditCard, FileText, Building, Calendar } from 'lucide-react';
import './SignUp.css';

const NigerianBankForm = () => {
  const [formData, setFormData] = useState({
    // Na Personal Information be this
    firstName: '',
    middleName: '',
    surname: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    motherMaidenName: '',
    
    // Na Contact Information be this
    email: '',
    phoneNumber: '',
    alternativePhone: '',
    residentialAddress: '',
    state: '',
    lga: '',
    
    // Na Identification be this
    identificationType: '',
    identificationNumber: '',
    bvn: '',
    
    // Na Employment Information be this
    employmentStatus: '',
    employer: '',
    occupation: '',
    monthlyIncome: '',
    
    // oya Na Next of Kin be this
    nokName: '',
    nokRelationship: '',
    nokPhone: '',
    nokAddress: '',
    
    // na Account Details dey here
    accountType: '',
    initialDeposit: ''
  });
  
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 
    'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 
    'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 
    'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 
    'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.surname.trim()) newErrors.surname = 'Surname is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital status is required';
      if (!formData.motherMaidenName.trim()) newErrors.motherMaidenName = 'Mother\'s maiden name is required';
    }
    
    if (step === 2) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = 'Phone number is required';
      } else if (!/^0[789][01]\d{8}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Enter valid Nigerian phone number';
      }
      if (!formData.residentialAddress.trim()) newErrors.residentialAddress = 'Address is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.lga.trim()) newErrors.lga = 'LGA is required';
    }
    
    if (step === 3) {
      if (!formData.identificationType) newErrors.identificationType = 'ID type is required';
      if (!formData.identificationNumber.trim()) newErrors.identificationNumber = 'ID number is required';
      if (!formData.bvn) {
        newErrors.bvn = 'BVN is required';
      } else if (!/^\d{11}$/.test(formData.bvn)) {
        newErrors.bvn = 'BVN must be 11 digits';
      }
    }
    
    if (step === 4) {
      if (!formData.employmentStatus) newErrors.employmentStatus = 'Employment status is required';
      if (formData.employmentStatus === 'employed' && !formData.employer.trim()) {
        newErrors.employer = 'Employer name is required';
      }
      if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required';
      if (!formData.monthlyIncome) newErrors.monthlyIncome = 'Monthly income is required';
      
      if (!formData.nokName.trim()) newErrors.nokName = 'Next of kin name is required';
      if (!formData.nokRelationship) newErrors.nokRelationship = 'Relationship is required';
      if (!formData.nokPhone) {
        newErrors.nokPhone = 'Next of kin phone is required';
      } else if (!/^0[789][01]\d{8}$/.test(formData.nokPhone)) {
        newErrors.nokPhone = 'Enter valid phone number';
      }
      if (!formData.nokAddress.trim()) newErrors.nokAddress = 'Next of kin address is required';
      
      if (!formData.accountType) newErrors.accountType = 'Account type is required';
    }
    
    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validateStep(currentStep);
    
    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      setErrors(newErrors);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateStep(4);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
      console.log('Form submitted:', formData);
    } else {
      setErrors(newErrors);
    }
  };

  if (isSubmitted) {
    return (
      <div className="signup-container">
        <div className="success-card">
          <div className="success-icon">
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="success-title">Application Submitted!</h2>
          <p className="success-text">Your account application has been received. You will be contacted within 48 hours for verification and account activation.</p>
          <p className="success-text" style={{marginTop: '1rem', fontSize: '0.9rem'}}>
            Reference Number: <strong>NBF{Date.now().toString().slice(-8)}</strong>
          </p>
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
              setFormData({
                firstName: '', middleName: '', surname: '', dateOfBirth: '', gender: '',
                maritalStatus: '', motherMaidenName: '', email: '', phoneNumber: '',
                alternativePhone: '', residentialAddress: '', state: '', lga: '',
                identificationType: '', identificationNumber: '', bvn: '', employmentStatus: '',
                employer: '', occupation: '', monthlyIncome: '', nokName: '', nokRelationship: '',
                nokPhone: '', nokAddress: '', accountType: '', initialDeposit: ''
              });
            }}
            className="btn-primary"
          >
            New Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1 className="signup-title">Bank Account Application</h1>
          <p className="signup-subtitle">Complete all steps to open your account</p>
          
          {/* na here Progress Indicator dey*/}
          <div style={{display: 'flex', gap: '0.5rem', marginTop: '1.5rem', justifyContent: 'center'}}>
            {[1, 2, 3, 4].map(step => (
              <div 
                key={step}
                style={{
                  flex: 1,
                  height: '4px',
                  backgroundColor: step <= currentStep ? '#000000' : '#e5e7eb',
                  borderRadius: '2px',
                  transition: 'background-color 0.3s'
                }}
              />
            ))}
          </div>
          <p style={{textAlign: 'center', marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280'}}>
            Step {currentStep} of 4
          </p>
        </div>

        <div className="signup-form">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <>
              <h3 style={{marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600'}}>Personal Information</h3>
              
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={20} />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`form-input ${errors.firstName ? 'input-error' : ''}`}
                    placeholder="Enter first name"
                  />
                </div>
                {errors.firstName && <p className="error-message">{errors.firstName}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Middle Name</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={20} />
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter middle name (optional)"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Surname *</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={20} />
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    className={`form-input ${errors.surname ? 'input-error' : ''}`}
                    placeholder="Enter surname"
                  />
                </div>
                {errors.surname && <p className="error-message">{errors.surname}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth *</label>
                <div className="input-wrapper">
                  <Calendar className="input-icon" size={20} />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`form-input ${errors.dateOfBirth ? 'input-error' : ''}`}
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                  />
                </div>
                {errors.dateOfBirth && <p className="error-message">{errors.dateOfBirth}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`form-input ${errors.gender ? 'input-error' : ''}`}
                  style={{paddingLeft: '1rem'}}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && <p className="error-message">{errors.gender}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Marital Status *</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className={`form-input ${errors.maritalStatus ? 'input-error' : ''}`}
                  style={{paddingLeft: '1rem'}}
                >
                  <option value="">Select marital status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
                {errors.maritalStatus && <p className="error-message">{errors.maritalStatus}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Mother's Maiden Name *</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={20} />
                  <input
                    type="text"
                    name="motherMaidenName"
                    value={formData.motherMaidenName}
                    onChange={handleChange}
                    className={`form-input ${errors.motherMaidenName ? 'input-error' : ''}`}
                    placeholder="Enter mother's maiden name"
                  />
                </div>
                {errors.motherMaidenName && <p className="error-message">{errors.motherMaidenName}</p>}
              </div>
            </>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 2 && (
            <>
              <h3 style={{marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600'}}>Contact Information</h3>
              
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <div className="input-wrapper">
                  <Phone className="input-icon" size={20} />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`form-input ${errors.phoneNumber ? 'input-error' : ''}`}
                    placeholder="08012345678"
                    maxLength="11"
                  />
                </div>
                {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Alternative Phone Number</label>
                <div className="input-wrapper">
                  <Phone className="input-icon" size={20} />
                  <input
                    type="tel"
                    name="alternativePhone"
                    value={formData.alternativePhone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="08012345678 (optional)"
                    maxLength="11"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Residential Address *</label>
                <div className="input-wrapper">
                  <MapPin className="input-icon" size={20} />
                  <input
                    type="text"
                    name="residentialAddress"
                    value={formData.residentialAddress}
                    onChange={handleChange}
                    className={`form-input ${errors.residentialAddress ? 'input-error' : ''}`}
                    placeholder="Enter full address"
                  />
                </div>
                {errors.residentialAddress && <p className="error-message">{errors.residentialAddress}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">State *</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`form-input ${errors.state ? 'input-error' : ''}`}
                  style={{paddingLeft: '1rem'}}
                >
                  <option value="">Select state</option>
                  {nigerianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && <p className="error-message">{errors.state}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Local Government Area (LGA) *</label>
                <div className="input-wrapper">
                  <MapPin className="input-icon" size={20} />
                  <input
                    type="text"
                    name="lga"
                    value={formData.lga}
                    onChange={handleChange}
                    className={`form-input ${errors.lga ? 'input-error' : ''}`}
                    placeholder="Enter LGA"
                  />
                </div>
                {errors.lga && <p className="error-message">{errors.lga}</p>}
              </div>
            </>
          )}

          {/* Step 3: Identification */}
          {currentStep === 3 && (
            <>
              <h3 style={{marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600'}}>Identification Details</h3>
              
              <div className="form-group">
                <label className="form-label">Identification Type *</label>
                <select
                  name="identificationType"
                  value={formData.identificationType}
                  onChange={handleChange}
                  className={`form-input ${errors.identificationType ? 'input-error' : ''}`}
                  style={{paddingLeft: '1rem'}}
                >
                  <option value="">Select ID type</option>
                  <option value="nin">National Identity Number (NIN)</option>
                  <option value="intl_passport">International Passport</option>
                  <option value="drivers_license">Driver's License</option>
                  <option value="voters_card">Voter's Card</option>
                </select>
                {errors.identificationType && <p className="error-message">{errors.identificationType}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Identification Number *</label>
                <div className="input-wrapper">
                  <CreditCard className="input-icon" size={20} />
                  <input
                    type="text"
                    name="identificationNumber"
                    value={formData.identificationNumber}
                    onChange={handleChange}
                    className={`form-input ${errors.identificationNumber ? 'input-error' : ''}`}
                    placeholder="Enter ID number"
                  />
                </div>
                {errors.identificationNumber && <p className="error-message">{errors.identificationNumber}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Bank Verification Number (BVN) *</label>
                <div className="input-wrapper">
                  <FileText className="input-icon" size={20} />
                  <input
                    type="text"
                    name="bvn"
                    value={formData.bvn}
                    onChange={handleChange}
                    className={`form-input ${errors.bvn ? 'input-error' : ''}`}
                    placeholder="Enter 11-digit BVN"
                    maxLength="11"
                  />
                </div>
                {errors.bvn && <p className="error-message">{errors.bvn}</p>}
                <p style={{fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem'}}>
                  Dial *565*0# from your registered phone number to get your BVN
                </p>
              </div>
            </>
          )}

          {/* Step 4: Employment & Account Details */}
          {currentStep === 4 && (
            <>
              <h3 style={{marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600'}}>Employment Information</h3>
              
              <div className="form-group">
                <label className="form-label">Employment Status *</label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  className={`form-input ${errors.employmentStatus ? 'input-error' : ''}`}
                  style={{paddingLeft: '1rem'}}
                >
                  <option value="">Select employment status</option>
                  <option value="employed">Employed</option>
                  <option value="self_employed">Self Employed</option>
                  <option value="student">Student</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="retired">Retired</option>
                </select>
                {errors.employmentStatus && <p className="error-message">{errors.employmentStatus}</p>}
              </div>

              {formData.employmentStatus === 'employed' && (
                <div className="form-group">
                  <label className="form-label">Employer Name *</label>
                  <div className="input-wrapper">
                    <Building className="input-icon" size={20} />
                    <input
                      type="text"
                      name="employer"
                      value={formData.employer}
                      onChange={handleChange}
                      className={`form-input ${errors.employer ? 'input-error' : ''}`}
                      placeholder="Enter employer name"
                    />
                  </div>
                  {errors.employer && <p className="error-message">{errors.employer}</p>}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Occupation *</label>
                <div className="input-wrapper">
                  <Building className="input-icon" size={20} />
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className={`form-input ${errors.occupation ? 'input-error' : ''}`}
                    placeholder="Enter occupation"
                  />
                </div>
                {errors.occupation && <p className="error-message">{errors.occupation}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Monthly Income Range *</label>
                <select
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  className={`form-input ${errors.monthlyIncome ? 'input-error' : ''}`}
                  style={{paddingLeft: '1rem'}}
                >
                  <option value="">Select income range</option>
                  <option value="below_50k">Below ₦50,000</option>
                  <option value="50k_100k">₦50,000 - ₦100,000</option>
                  <option value="100k_200k">₦100,000 - ₦200,000</option>
                  <option value="200k_500k">₦200,000 - ₦500,000</option>
                  <option value="above_500k">Above ₦500,000</option>
                </select>
                {errors.monthlyIncome && <p className="error-message">{errors.monthlyIncome}</p>}
              </div>

              <h3 style={{marginBottom: '1rem', marginTop: '2rem', fontSize: '1.125rem', fontWeight: '600'}}>Next of Kin</h3>

              <div className="form-group">
                <label className="form-label">Next of Kin Full Name *</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={20} />
                  <input
                    type="text"
                    name="nokName"
                    value={formData.nokName}
                    onChange={handleChange}
                    className={`form-input ${errors.nokName ? 'input-error' : ''}`}
                    placeholder="Enter next of kin name"
                  />
                </div>
                {errors.nokName && <p className="error-message">{errors.nokName}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Relationship *</label>
                <select
                  name="nokRelationship"
                  value={formData.nokRelationship}
                  onChange={handleChange}
                  className={`form-input ${errors.nokRelationship ? 'input-error' : ''}`}
                  style={{paddingLeft: '1rem'}}
                >
                  <option value="">Select relationship</option>
                  <option value="spouse">Spouse</option>
                  <option value="parent">Parent</option>
                  <option value="sibling">Sibling</option>
                  <option value="child">Child</option>
                  <option value="friend">Friend</option>
                  <option value="other">Other</option>
                </select>
                {errors.nokRelationship && <p className="error-message">{errors.nokRelationship}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Next of Kin Phone *</label>
                <div className="input-wrapper">
                  <Phone className="input-icon" size={20} />
                  <input
                    type="tel"
                    name="nokPhone"
                    value={formData.nokPhone}
                    onChange={handleChange}
                    className={`form-input ${errors.nokPhone ? 'input-error' : ''}`}
                    placeholder="08012345678"
                    maxLength="11"
                  />
                </div>
                {errors.nokPhone && <p className="error-message">{errors.nokPhone}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Next of Kin Address *</label>
                <div className="input-wrapper">
                  <MapPin className="input-icon" size={20} />
                  <input
                    type="text"
                    name="nokAddress"
                    value={formData.nokAddress}
                    onChange={handleChange}
                    className={`form-input ${errors.nokAddress ? 'input-error' : ''}`}
                    placeholder="Enter address"
                  />
                </div>
                {errors.nokAddress && <p className="error-message">{errors.nokAddress}</p>}
              </div>

              <h3 style={{marginBottom: '1rem', marginTop: '2rem', fontSize: '1.125rem', fontWeight: '600'}}>Account Type</h3>

              <div className="form-group">
                <label className="form-label">Select Account Type *</label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  className={`form-input ${errors.accountType ? 'input-error' : ''}`}
                  style={{paddingLeft: '1rem'}}
                >
                  <option value="">Select account type</option>
                  <option value="savings">Savings Account</option>
                  <option value="current">Current Account</option>
                  <option value="domiciliary">Domiciliary Account</option>
                </select>
                {errors.accountType && <p className="error-message">{errors.accountType}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Initial Deposit (Optional)</label>
                <div className="input-wrapper">
                  <span style={{position: 'absolute', left: '3rem', color: '#6b7280'}}>₦</span>
                  <input
                    type="number"
                    name="initialDeposit"
                    value={formData.initialDeposit}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="0.00"
                    style={{paddingLeft: '3.5rem'}}
                    min="0"
                  />
                </div>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div style={{display: 'flex', gap: '1rem', marginTop: '2rem'}}>
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="btn-primary"
                style={{
                  backgroundColor: '#fff',
                  color: '#000000',
                  border: '1px solid #000000'
                }}
              >
                Back
              </button>
            )}
            
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="btn-primary btn-submit"
                style={{flex: 1}}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-primary btn-submit"
                style={{flex: 1}}
              >
                Submit Application
              </button>
            )}
          </div>
        </div>

        <div className="signup-footer">
          <p className="footer-text" style={{fontSize: '0.75rem', textAlign: 'center'}}>
            By submitting this form, you agree to our Terms & Conditions and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default NigerianBankForm;