import React, { useState, useEffect } from 'react';
import type { StepProps } from '../../types';
import { motion } from 'framer-motion';
import { FaCar, FaSearch, FaInfoCircle } from 'react-icons/fa';
import { Combobox } from '@headlessui/react';

interface VehicleOption {
  year: string;
  make: string;
  model: string;
  variant?: string;
}

const VehicleStep: React.FC<StepProps> = ({
  formData,
  onUpdate,
  onNext,
  currentStep,
  totalSteps,
}) => {
  const [query, setQuery] = useState('');
  const [vehicles, setVehicles] = useState<VehicleOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleOption | null>(null);
  const [mileage, setMileage] = useState(formData.mileage || '');

  // Simulated vehicle data - in a real app, this would come from an API
  const fetchVehicles = async (searchQuery: string) => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockVehicles: VehicleOption[] = [
      { year: '2024', make: 'Toyota', model: 'Camry', variant: 'Hybrid' },
      { year: '2024', make: 'Honda', model: 'Civic', variant: 'Sport' },
      { year: '2024', make: 'Tesla', model: 'Model 3', variant: 'Long Range' },
      { year: '2023', make: 'BMW', model: '3 Series', variant: '330i' },
      { year: '2023', make: 'Mercedes', model: 'C-Class', variant: 'C300' },
    ].filter(vehicle =>
      Object.values(vehicle).some(value =>
        value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    setVehicles(mockVehicles);
    setLoading(false);
  };

  useEffect(() => {
    if (query.length >= 2) {
      fetchVehicles(query);
    }
  }, [query]);

  const handleVehicleSelect = (vehicle: VehicleOption) => {
    setSelectedVehicle(vehicle);
    onUpdate({
      year: vehicle.year,
      make: vehicle.make,
      model: vehicle.model,
    });
  };

  const handleMileageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setMileage(value);
    onUpdate({ mileage: value });
  };

  const handleNext = () => {
    if (selectedVehicle && mileage) {
      onNext();
    }
  };

  const isValid = selectedVehicle && mileage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <FaCar className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Tell us about your vehicle</h2>
        <p className="text-gray-300">Search by make, model, or year to get started</p>
      </div>

      <div className="relative">
        <Combobox value={selectedVehicle} onChange={handleVehicleSelect}>
          <div className="relative">
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Combobox.Input
                className="w-full h-12 pl-10 pr-4 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400"
                placeholder="Start typing to search vehicles..."
                displayValue={(vehicle: VehicleOption | null) =>
                  vehicle
                    ? `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant || ''}`
                    : ''
                }
                onChange={(e) => setQuery(e.target.value)}
              />
              {loading && (
                <div className="absolute right-3 top-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                </div>
              )}
            </div>

            <Combobox.Options className="absolute z-10 w-full mt-1 bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-auto">
              {vehicles.map((vehicle, idx) => (
                <Combobox.Option
                  key={idx}
                  value={vehicle}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-3 px-4 ${active ? 'bg-primary text-white' : 'text-gray-300'
                    }`
                  }
                >
                  {({ selected }) => (
                    <div className="flex items-center">
                      <FaCar className="h-5 w-5 mr-3" />
                      <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                        {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.variant}
                      </span>
                    </div>
                  )}
                </Combobox.Option>
              ))}
              {query.length >= 2 && vehicles.length === 0 && (
                <div className="py-3 px-4 text-gray-400">No vehicles found</div>
              )}
            </Combobox.Options>
          </div>
        </Combobox>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-white mb-1 block">Annual Mileage</span>
          <div className="relative">
            <input
              type="text"
              value={mileage}
              onChange={handleMileageChange}
              className="w-full h-12 pl-4 pr-10 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white"
              placeholder="Enter annual mileage"
            />
            <div className="absolute right-3 top-3 text-gray-400">
              <FaInfoCircle className="h-5 w-5" title="Estimated annual mileage affects your quote" />
            </div>
          </div>
        </label>
      </div>

      <div className="flex justify-between items-center mt-8">
        <div className="text-sm text-gray-400">
          Step {currentStep} of {totalSteps}
        </div>
        <button
          onClick={handleNext}
          disabled={!isValid}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${isValid
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
        >
          Next Step
        </button>
      </div>
    </motion.div>
  );
};

export default VehicleStep; 