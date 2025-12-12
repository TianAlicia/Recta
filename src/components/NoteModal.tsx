import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
  currentNote?: string;
  itemName: string;
}

export function NoteModal({ isOpen, onClose, onSave, currentNote = '', itemName }: NoteModalProps) {
  const [note, setNote] = useState(currentNote);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNote(currentNote);
    }
  }, [isOpen, currentNote]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(note);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white w-[480px] rounded-lg shadow-xl p-6" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">添加备注</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item Name */}
        <div className="mb-4">
          <div className="text-sm text-gray-600">商品：</div>
          <div className="text-gray-800">{itemName}</div>
        </div>

        {/* Note Input */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-2">备注内容</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-2 py-1 border border-gray-200 rounded-lg resize-none"
            rows={4}
            placeholder="请输入备注信息..."
          />
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
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            确认
          </button>
        </div>
      </div>
    </div>
  );
}
