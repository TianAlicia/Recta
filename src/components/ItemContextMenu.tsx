interface ItemContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number; width?: number; height?: number };
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

  // 计算菜单位置：在元素左侧
  const menuWidth = 180;
  const menuLeft = position.x - menuWidth - 8; // 元素左侧，留8px间距
  const menuTop = position.y; // 与元素顶部对齐

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      {/* Menu */}
      <div
        className="fixed z-50 bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden"
        style={{
          left: `${menuLeft}px`,
          top: `${menuTop}px`,
          width: `${menuWidth}px`
        }}
      >
        <button
          onClick={() => {
            onDelete();
            onClose();
          }}
          className="w-full px-4 py-3 text-left border-b border-gray-200 hover:bg-gray-50 transition-colors text-sm"
        >
          删除
        </button>
        <button
          onClick={() => {
            onDiscount();
            onClose();
          }}
          className="w-full px-4 py-3 text-left border-b border-gray-200 hover:bg-gray-50 transition-colors text-sm"
        >
          折扣
        </button>
        <button
          onClick={() => {
            onNote();
            onClose();
          }}
          className="w-full px-4 py-3 text-left border-b border-gray-200 hover:bg-gray-50 transition-colors text-sm"
        >
          备注
        </button>
        {hasDetails && (
          <button
            onClick={() => {
              onViewDetails();
              onClose();
            }}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-sm"
          >
            查看详情
          </button>
        )}
      </div>
    </>
  );
}
