import React, { useState, useEffect } from 'react';
import type { FormData, QuoteData } from './types/index';
import { signInUser, onAuthChange, saveQuote, getSavedQuotes } from './config/firebase';
import { calculateQuote } from './utils/quoteCalculator';
import VehicleStep from './components/steps/VehicleStep';
import DriverStep from './components/steps/DriverStep';
import CoverageStep from './components/steps/CoverageStep';
import QuoteStep from './components/steps/QuoteStep';
import SavedQuotes from './components/SavedQuotes';
import Modal from './components/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCar, FaUser, FaShieldAlt, FaCalculator, FaSave, FaArrowRight } from 'react-icons/fa';

const FORM_VERSION = '1.0.0';
const TOTAL_STEPS = 4;

const steps = [
  { id: 1, icon: FaCar, label: 'Vehicle', color: 'from-blue-500 to-blue-600' },
  { id: 2, icon: FaUser, label: 'Driver', color: 'from-purple-500 to-purple-600' },
  { id: 3, icon: FaShieldAlt, label: 'Coverage', color: 'from-pink-500 to-pink-600' },
  { id: 4, icon: FaCalculator, label: 'Quote', color: 'from-green-500 to-green-600' }
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [savedQuotes, setSavedQuotes] = useState<QuoteData[]>([]);
  const [showSavedQuotes, setShowSavedQuotes] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const user = await signInUser();
        if (user) {
          setUserId(user.uid);
          const quotes = await getSavedQuotes(user.uid);
          setSavedQuotes(quotes);
        }

        const savedData = localStorage.getItem('insuranceQuote');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          if (parsedData.version === FORM_VERSION) {
            setFormData(parsedData.data);
          }
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Update showQuoteModal when reaching the final step
  useEffect(() => {
    if (currentStep === TOTAL_STEPS) {
      setShowQuoteModal(true);
    }
  }, [currentStep]);

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem('insuranceQuote', JSON.stringify({
        version: FORM_VERSION,
        data: formData
      }));
    }
  }, [formData]);

  const handleFormUpdate = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const clearForm = () => {
    // Clear all form fields
    setFormData({
      // Vehicle Information
      year: '',
      make: '',
      model: '',
      mileage: '',

      // Driver Information
      fullName: '',
      age: '',
      licenseYears: '',
      claims: '',

      // Coverage Information
      coverage: '',
      excess: '',

      // Additional Information
      address: '',
      phone: '',
      email: ''
    });

    // Remove from localStorage
    localStorage.removeItem('insuranceQuote');

    // Reset to first step
    setCurrentStep(1);
    setShowQuoteModal(false);
  };

  const handleSaveQuote = async () => {
    if (!userId) return;

    const quote = calculateQuote(formData);
    const quoteData: Omit<QuoteData, 'id'> = {
      userId,
      formData,
      quote,
      timestamp: new Date(),
      status: 'saved'
    };

    try {
      const quoteId = await saveQuote(quoteData);
      if (quoteId) {
        const quotes = await getSavedQuotes(userId);
        setSavedQuotes(quotes);
        setShowSavedQuotes(true);
        clearForm();
      }
    } catch (error) {
      console.error('Error saving quote:', error);
    }
  };

  const handleLoadQuote = (loadedFormData: FormData) => {
    setFormData(loadedFormData);
    setCurrentStep(1);
    setShowSavedQuotes(false);
  };

  const handleDeleteQuote = async (quoteId: string) => {
    setSavedQuotes(prev => prev.filter(quote => quote.id !== quoteId));
  };

  const renderCurrentStep = () => {
    const stepProps = {
      formData,
      onUpdate: handleFormUpdate,
      onNext: handleNext,
      onPrevious: handlePrevious,
      currentStep,
      totalSteps: TOTAL_STEPS
    };

    switch (currentStep) {
      case 1:
        return <VehicleStep {...stepProps} />;
      case 2:
        return <DriverStep {...stepProps} />;
      case 3:
        return <CoverageStep {...stepProps} />;
      case 4:
        return <QuoteStep {...stepProps} />;
      default:
        return <VehicleStep {...stepProps} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-blue-500 mt-4 text-lg">Loading your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-lg z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaShieldAlt className="text-blue-500 h-8 w-8" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                InsureFlow
              </span>
            </div>
            <button
              onClick={() => setShowSavedQuotes(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              <FaSave className="text-blue-500" />
              <span>Saved Quotes</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-8">
        {/* Steps Progress */}
        <div className="mb-12">
          <div className="flex justify-between items-center max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative">
                <motion.div
                  className={`w-16 h-16 rounded-full flex items-center justify-center 
                    ${currentStep >= step.id ? `bg-gradient-to-r ${step.color}` : 'bg-gray-700'} 
                    transition-all cursor-pointer hover:scale-110`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => currentStep >= step.id && setCurrentStep(step.id)}
                >
                  <step.icon className="h-6 w-6 text-white" />
                </motion.div>
                <span className="mt-2 text-sm font-medium text-gray-400">{step.label}</span>
                {index < steps.length - 1 && (
                  <div
                    className="absolute left-[calc(100%+0.5rem)] top-8 w-[calc(100%-2rem)] h-0.5 bg-gray-700"
                  >
                    <div
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ width: currentStep > step.id ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-2xl"
            >
              {renderCurrentStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Modals */}
      <Modal
        isOpen={showSavedQuotes}
        onClose={() => setShowSavedQuotes(false)}
        title="Your Saved Quotes"
      >
        <SavedQuotes
          savedQuotes={savedQuotes}
          onLoadQuote={handleLoadQuote}
          onDeleteQuote={handleDeleteQuote}
        />
      </Modal>

      <Modal
        isOpen={showQuoteModal}
        onClose={() => {
          setShowQuoteModal(false);
          clearForm();
        }}
        title="Ready to Save Your Quote?"
      >
        <div className="space-y-6">
          <p className="text-gray-300 text-lg">
            Great news! We've calculated your personalized insurance quote.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleSaveQuote}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FaSave className="h-5 w-5" />
              <span>Save Quote</span>
            </button>
            <button
              onClick={clearForm}
              className="flex-1 bg-white/10 text-white py-3 px-6 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FaArrowRight className="h-5 w-5" />
              <span>Start New Quote</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
