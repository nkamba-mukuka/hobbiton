import React, { useState, useEffect } from 'react';
import type { StepProps } from '../../types';
import { motion } from 'framer-motion';
import { FaCar, FaSearch, FaInfoCircle, FaTachometerAlt } from 'react-icons/fa';
import { Combobox } from '@headlessui/react';

interface VehicleOption {
  year: string;
  make: string;
  model: string;
  variant?: string;
  image?: string;
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
  const [showTooltip, setShowTooltip] = useState(false);

  // Simulated vehicle data - in a real app, this would come from an API
  const fetchVehicles = async (searchQuery: string) => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockVehicles: VehicleOption[] = [
      {
        year: '2024',
        make: 'Tesla',
        model: 'Model 3',
        variant: 'Long Range',
        image: 'https://example.com/tesla-model-3.jpg'
      },
      {
        year: '2024',
        make: 'BMW',
        model: 'i4',
        variant: 'M50',
        image: 'https://example.com/bmw-i4.jpg'
      },
      {
        year: '2024',
        make: 'Porsche',
        model: 'Taycan',
        variant: 'Turbo S',
        image: 'https://example.com/porsche-taycan.jpg'
      },
      {
        year: '2024',
        make: 'Mercedes-Benz',
        model: 'EQS',
        variant: '580 4MATIC',
        image: 'https://example.com/mercedes-eqs.jpg'
      },
      {
        year: '2024',
        make: 'Audi',
        model: 'e-tron GT',
        variant: 'RS',
        image: 'https://example.com/audi-etron-gt.jpg'
      },
    ].filter(vehicle =>
      Object.values(vehicle).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
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

  const formatMileage = (value: string) => {
    return value ? parseInt(value).toLocaleString() : '';
  };

  const handleNext = () => {
    if (selectedVehicle && mileage) {
      onNext();
    }
  };

  const isValid = selectedVehicle && mileage;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          <FaCar className="mx-auto h-16 w-16 text-blue-500 animate-float" />
        </motion.div>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold mt-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          Let's Start with Your Vehicle
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gray-400 mt-2"
        >
          Search for your vehicle or enter its details below
        </motion.p>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="glass-card"
      >
        <div className="relative">
          <Combobox value={selectedVehicle} onChange={handleVehicleSelect}>
            <div className="relative">
              <div className="relative w-full">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Combobox.Input
                  className="input-field pl-12"
                  placeholder="Type to search vehicles (e.g., Tesla Model 3, BMW i4)"
                  displayValue={(vehicle: VehicleOption | null) =>
                    vehicle
                      ? `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant || ''}`
                      : ''
                  }
                  onChange={(e) => setQuery(e.target.value)}
                />
                {loading && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <div className="loading-dots">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                )}
              </div>

              <Combobox.Options className="absolute z-10 w-full mt-2 overflow-auto rounded-xl bg-gray-800/80 backdrop-blur-xl border border-white/10 shadow-xl max-h-60">
                {vehicles.map((vehicle, idx) => (
                  <Combobox.Option
                    key={idx}
                    value={vehicle}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-4 px-6 ${active ? 'bg-blue-500/20 text-white' : 'text-gray-300'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <div className="flex items-center">
                        <FaCar className={`h-5 w-5 mr-3 ${selected ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span className={`block truncate ${selected ? 'font-semibold text-blue-500' : ''}`}>
                          {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.variant}
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
                {query.length >= 2 && vehicles.length === 0 && (
                  <div className="py-4 px-6 text-gray-400">No vehicles found</div>
                )}
              </Combobox.Options>
            </div>
          </Combobox>
        </div>

        <div className="mt-6">
          <label className="block">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Annual Mileage</span>
              <div
                className="relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <FaInfoCircle className="h-5 w-5 text-gray-400 cursor-help" />
                {showTooltip && (
                  <div className="tooltip tooltip-top absolute -top-12 left-1/2 transform -translate-x-1/2 w-48 text-center">
                    Your annual mileage helps us calculate an accurate premium
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <FaTachometerAlt className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formatMileage(mileage)}
                onChange={handleMileageChange}
                className="input-field pl-12"
                placeholder="Enter annual mileage"
              />
            </div>
          </label>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div className="text-sm text-gray-400">
          Step {currentStep} of {totalSteps}
        </div>
        <button
          onClick={handleNext}
          disabled={!isValid}
          className="btn-primary"
        >
          Continue to Driver Details
        </button>
      </motion.div>
    </div>
  );
};

export default VehicleStep; 