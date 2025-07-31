import React from 'react';
import type { StepProps } from '../../types/index';
import { motion } from 'framer-motion';
import { FaUser, FaIdCard, FaBirthdayCake, FaHistory, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const DriverStep: React.FC<StepProps> = ({ formData, onUpdate, onNext, onPrevious, currentStep, totalSteps }) => {
  const handleInputChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  const isStepValid = () => {
    return formData.fullName && formData.age && formData.licenseYears && formData.claims !== undefined;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          <FaUser className="mx-auto h-16 w-16 text-purple-500 animate-float" />
        </motion.div>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold mt-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Tell Us About the Driver
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gray-400 mt-2"
        >
          We'll use this information to calculate your personalized quote
        </motion.p>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="glass-card"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block">
              <span className="text-gray-300 mb-2 block">Full Name</span>
              <div className="relative">
                <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="input-field pl-12"
                  placeholder="Enter your full name"
                  value={formData.fullName || ''}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>
            </label>
          </div>

          <div>
            <label className="block">
              <span className="text-gray-300 mb-2 block">Age</span>
              <div className="relative">
                <FaBirthdayCake className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  className="input-field pl-12"
                  placeholder="e.g., 25"
                  min="16"
                  max="100"
                  value={formData.age || ''}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                />
              </div>
            </label>
          </div>

          <div>
            <label className="block">
              <span className="text-gray-300 mb-2 block">Years with License</span>
              <div className="relative">
                <FaIdCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  className="input-field pl-12"
                  placeholder="e.g., 5"
                  min="0"
                  max="50"
                  value={formData.licenseYears || ''}
                  onChange={(e) => handleInputChange('licenseYears', e.target.value)}
                />
              </div>
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="block">
              <span className="text-gray-300 mb-2 block">Number of Claims in Last 3 Years</span>
              <div className="relative">
                <FaHistory className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  className="input-field pl-12"
                  placeholder="e.g., 0"
                  min="0"
                  max="10"
                  value={formData.claims || ''}
                  onChange={(e) => handleInputChange('claims', e.target.value)}
                />
              </div>
            </label>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <button
          onClick={onPrevious}
          className="btn-secondary flex items-center space-x-2"
        >
          <FaArrowLeft className="h-4 w-4" />
          <span>Back to Vehicle</span>
        </button>
        <button
          onClick={onNext}
          disabled={!isStepValid()}
          className="btn-primary flex items-center space-x-2"
        >
          <span>Continue to Coverage</span>
          <FaArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    </div>
  );
};

export default DriverStep; 