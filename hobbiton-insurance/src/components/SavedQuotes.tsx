import React from 'react';
import type { QuoteData, FormData } from '../types/index';
import { motion } from 'framer-motion';
import { FaCar, FaUser, FaCalendar, FaTrash, FaFileImport } from 'react-icons/fa';

interface SavedQuotesProps {
  savedQuotes: QuoteData[];
  onLoadQuote: (formData: FormData) => void;
  onDeleteQuote: (quoteId: string) => void;
}

const SavedQuotes: React.FC<SavedQuotesProps> = ({ savedQuotes, onLoadQuote, onDeleteQuote }) => {
  if (savedQuotes.length === 0) {
    return (
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-4"
        >
          <FaCar className="mx-auto h-16 w-16 text-gray-400" />
        </motion.div>
        <h3 className="text-xl font-semibold text-white mb-2">No Saved Quotes</h3>
        <p className="text-gray-400">Complete a quote calculation to save it here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      {savedQuotes.map((quote, index) => (
        <motion.div
          key={quote.id}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card hover:bg-white/10 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaCar className="h-5 w-5 text-blue-500" />
                <span className="text-lg font-semibold text-white">
                  {quote.formData.year} {quote.formData.make} {quote.formData.model}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <FaUser className="h-4 w-4" />
                <span>{quote.formData.fullName}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <FaCalendar className="h-4 w-4" />
                <span>{new Date(quote.timestamp).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                K{quote.quote.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {quote.formData.coverage?.replace('-', ' ')}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onLoadQuote(quote.formData)}
              className="flex-1 btn-primary flex items-center justify-center space-x-2"
            >
              <FaFileImport className="h-4 w-4" />
              <span>Load Quote</span>
            </button>
            <button
              onClick={() => quote.id && onDeleteQuote(quote.id)}
              className="btn-secondary flex items-center justify-center space-x-2 px-4"
            >
              <FaTrash className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SavedQuotes; 