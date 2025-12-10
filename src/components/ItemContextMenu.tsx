interface ItemContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  onDelete: () => void;
  onDiscount: () => void;
  onNote: () => void;
  onViewDetails: () => void;
  hasDetails: boolean;
}

export function ItemContextMenu({
  isOpen,
  position,
  onClose,
  onDelete,
  onDiscount,
  onNote,
  onViewDetails,
  hasDetails
}: ItemContextMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      {/* Menu */}
      <div
        className="fixed z-50 bg-white border-2 border-gray-800 shadow-lg w-[180px]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      >
        <button
          onClick={() => {
            onDelete();
            onClose();
          }}
          className="w-full px-6 py-4 text-left border-b-2 border-gray-800 hover:bg-gray-100 transition-colors"
        >
          删除
        </button>
        <button
          onClick={() => {
            onDiscount();
            onClose();
          }}
          className="w-full px-6 py-4 text-left border-b-2 border-gray-800 hover:bg-gray-100 transition-colors"
        >
          折扣
        </button>
        <button
          onClick={() => {
            onNote();
            onClose();
          }}
          className="w-full px-6 py-4 text-left border-b-2 border-gray-800 hover:bg-gray-100 transition-colors"
        >
          备注
        </button>
        {hasDetails && (
          <button
            onClick={() => {
              onViewDetails();
              onClose();
            }}
            className="w-full px-6 py-4 text-left hover:bg-gray-100 transition-colors"
          >
            查看详情
          </button>
        )}
      </div>
    </>
  );
}
