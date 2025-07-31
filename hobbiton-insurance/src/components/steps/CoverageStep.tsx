import React from 'react';
import type { StepProps } from '../../types/index';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaArrowRight, FaArrowLeft, FaDollarSign } from 'react-icons/fa';

const coverageOptions = [
  {
    id: 'comprehensive',
    title: 'Comprehensive',
    description: 'Full coverage including damage to your vehicle',
    icon: '🛡️'
  },
  {
    id: 'third-party-fire-theft',
    title: 'Third Party, Fire & Theft',
    description: 'Covers damage to others, fire, and theft',
    icon: '🔥'
  },
  {
    id: 'third-party',
    title: 'Third Party Only',
    description: 'Basic coverage for damage to others',
    icon: '🚗'
  }
];

const excessOptions = [
  { value: '250', label: 'K250' },
  { value: '500', label: 'K500' },
  { value: '1000', label: 'K1,000' },
  { value: '1500', label: 'K1,500' },
  { value: '2000', label: 'K2,000' }
];

const CoverageStep: React.FC<StepProps> = ({
  formData,
  onUpdate,
  onNext,
  onPrevious,
  currentStep,
  totalSteps
}) => {
  const handleInputChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  const isStepValid = () => {
    return formData.coverage && formData.excess;
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
          <FaShieldAlt className="mx-auto h-16 w-16 text-pink-500 animate-float" />
        </motion.div>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold mt-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
        >
          Choose Your Coverage
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gray-400 mt-2"
        >
          Select the protection that best suits your needs
        </motion.p>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="space-y-6"
      >
        <div className="space-y-4">
          {coverageOptions.map((option, index) => (
            <motion.label
              key={option.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`block relative cursor-pointer group ${formData.coverage === option.id
                  ? 'glass-card border-pink-500/50'
                  : 'glass-card hover:bg-white/10'
                }`}
            >
              <input
                type="radio"
                name="coverage"
                value={option.id}
                checked={formData.coverage === option.id}
                onChange={(e) => handleInputChange('coverage', e.target.value)}
                className="absolute opacity-0"
              />
              <div className="p-6 flex items-start gap-4">
                <div className="text-2xl">{option.icon}</div>
                <div>
                  <div className="font-semibold text-white group-hover:text-pink-400 transition-colors">
                    {option.title}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {option.description}
                  </div>
                </div>
                <div className={`ml-auto w-4 h-4 rounded-full border-2 mt-1 transition-colors ${formData.coverage === option.id
                    ? 'bg-pink-500 border-pink-500'
                    : 'border-gray-500 group-hover:border-pink-500'
                  }`} />
              </div>
            </motion.label>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="glass-card"
        >
          <label className="block">
            <span className="text-gray-300 mb-2 block">Excess Amount</span>
            <div className="relative">
              <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={formData.excess || ''}
                onChange={(e) => handleInputChange('excess', e.target.value)}
                className="select-field pl-12"
              >
                <option value="">Select your excess amount</option>
                {excessOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Higher excess means lower premium but more out-of-pocket costs
            </p>
          </label>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <button
          onClick={onPrevious}
          className="btn-secondary flex items-center space-x-2"
        >
          <FaArrowLeft className="h-4 w-4" />
          <span>Back to Driver</span>
        </button>
        <button
          onClick={onNext}
          disabled={!isStepValid()}
          className="btn-primary flex items-center space-x-2"
        >
          <span>View Your Quote</span>
          <FaArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    </div>
  );
};

export default CoverageStep; 