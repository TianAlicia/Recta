import { useState } from 'react';
import { X } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
}

type PaymentMethod = 'card' | 'cash' | 'mixed';

export function PaymentModal({ isOpen, onClose, totalAmount }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardAmount, setCardAmount] = useState(0);
  const [cashAmount, setCashAmount] = useState(totalAmount);

  if (!isOpen) return null;

  const handleConfirm = () => {
    // 处理支付确认
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white w-[560px] rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg">收款</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Amount Display */}
          <div className="bg-orange-50 p-6 rounded-lg mb-6 text-center">
            <div className="text-gray-600 mb-2">应付金额</div>
            <div className="text-orange-500 text-2xl">¥{totalAmount.toFixed(2)}</div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <div className="text-gray-700 mb-3">选择支付方式</div>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 border-2 rounded-lg text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'border-orange-500 bg-orange-50 text-orange-500'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="6" width="20" height="12" rx="2" strokeWidth="2"/>
                    <path d="M2 10h20" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="text-sm">全部卡付</div>
              </button>

              <button
                onClick={() => setPaymentMethod('cash')}
                className={`p-4 border-2 rounded-lg text-center transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-orange-500 bg-orange-50 text-orange-500'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="6" width="20" height="12" rx="2" strokeWidth="2"/>
                    <path d="M2 10h20" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="text-sm">全部现金</div>
              </button>

              <button
                onClick={() => setPaymentMethod('mixed')}
                className={`p-4 border-2 rounded-lg text-center transition-all ${
                  paymentMethod === 'mixed'
                    ? 'border-orange-500 bg-orange-50 text-orange-500'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="6" width="20" height="12" rx="2" strokeWidth="2"/>
                    <path d="M2 10h20M10 14h4" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="text-sm">混合支付</div>
              </button>
            </div>
          </div>

          {/* Mixed Payment Input */}
          {paymentMethod === 'mixed' && (
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="text-sm text-gray-700 mb-3">部分卡付</div>
              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="6" width="20" height="12" rx="2" strokeWidth="2"/>
                    <path d="M2 10h20" strokeWidth="2"/>
                  </svg>
                  卡付金额
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">¥</span>
                  <input
                    type="number"
                    value={cardAmount}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setCardAmount(val);
                      setCashAmount(totalAmount - val);
                    }}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded bg-white text-sm"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="6" width="20" height="12" rx="2" strokeWidth="2"/>
                    <path d="M2 10h20" strokeWidth="2"/>
                  </svg>
                  剩余现金支付
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">¥</span>
                  <input
                    type="number"
                    value={cashAmount}
                    readOnly
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded bg-gray-50 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="text-sm text-gray-700 mb-3">支付摘要</div>
            {paymentMethod === 'card' && (
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="6" width="20" height="12" rx="2" strokeWidth="2"/>
                    <path d="M2 10h20" strokeWidth="2"/>
                  </svg>
                  银行卡支付
                </div>
                <div>¥{totalAmount.toFixed(2)}</div>
              </div>
            )}
            {paymentMethod === 'cash' && (
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="6" width="20" height="12" rx="2" strokeWidth="2"/>
                    <path d="M2 10h20" strokeWidth="2"/>
                  </svg>
                  现金支付
                </div>
                <div>¥{totalAmount.toFixed(2)}</div>
              </div>
            )}
            {paymentMethod === 'mixed' && (
              <>
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="6" width="20" height="12" rx="2" strokeWidth="2"/>
                      <path d="M2 10h20" strokeWidth="2"/>
                    </svg>
                    银行卡支付
                  </div>
                  <div>¥{cardAmount.toFixed(2)}</div>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="2" y="6" width="20" height="12" rx="2" strokeWidth="2"/>
                      <path d="M2 10h20" strokeWidth="2"/>
                    </svg>
                    现金支付
                  </div>
                  <div>¥{cashAmount.toFixed(2)}</div>
                </div>
              </>
            )}
            <div className="border-t border-gray-200 pt-2 mt-2 flex items-center justify-between">
              <div className="text-sm">合计</div>
              <div className="text-orange-500">¥{totalAmount.toFixed(2)}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              确认结账
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
