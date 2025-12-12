import { useState } from 'react';
import { X, Percent } from 'lucide-react';

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyDiscount: (discountPercent: number) => void;
  currentDiscount?: number;
}

export function DiscountModal({ isOpen, onClose, onApplyDiscount, currentDiscount = 0 }: DiscountModalProps) {
  const [selectedDiscount, setSelectedDiscount] = useState<number>(currentDiscount);
  const [customDiscount, setCustomDiscount] = useState<string>('0');

  if (!isOpen) return null;

  const quickDiscounts = [
    { label: '9折', percent: 10 },
    { label: '8折', percent: 20 },
    { label: '7折', percent: 30 },
    { label: '5折', percent: 50 },
  ];

  const handleQuickSelect = (percent: number) => {
    setSelectedDiscount(percent);
    setCustomDiscount(percent.toString());
  };

  const handleCustomInput = (value: string) => {
    setCustomDiscount(value);
    const numValue = parseFloat(value) || 0;
    setSelectedDiscount(numValue);
  };

  const handleApply = () => {
    onApplyDiscount(selectedDiscount);
    onClose();
  };

  const handleCancel = () => {
    setSelectedDiscount(currentDiscount);
    setCustomDiscount(currentDiscount.toString());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleCancel}>
      <div className="bg-white w-[500px] rounded-lg shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Percent className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg">设置折扣</h2>
          </div>
          <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Selection */}
        <div className="mb-6">
          <div className="text-sm text-gray-700 mb-3">快捷选择</div>
          <div className="grid grid-cols-4 gap-3">
            {quickDiscounts.map((discount) => (
              <button
                key={discount.percent}
                onClick={() => handleQuickSelect(discount.percent)}
                className={`p-4 border-2 rounded-lg text-center transition-all ${
                  selectedDiscount === discount.percent
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="mb-1">{discount.label}</div>
                <div className="text-orange-500 text-sm">-{discount.percent}%</div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Discount */}
        <div className="mb-4">
          <div className="text-sm text-gray-700 mb-3">自定义折扣百分比</div>
          <div className="relative">
            <input
              type="number"
              value={customDiscount}
              onChange={(e) => handleCustomInput(e.target.value)}
              min="0"
              max="100"
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg text-lg"
              placeholder="0"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
          </div>
        </div>

        {/* Current Discount Display */}
        <div className="mb-6">
          <span className="text-sm text-gray-700">当前折扣：</span>
          <span className="text-orange-500 ml-1">{selectedDiscount}%</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            应用折扣
          </button>
        </div>
      </div>
    </div>
  );
}
