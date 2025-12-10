interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
  origin?: string;
  destination?: string;
  originPostcode?: string;
  destPostcode?: string;
  details?: string;
  weight?: string;
  type?: string;
  note?: string;
  itemDiscount?: number;
  discountedPrice?: number;
}

interface OrderPanelProps {
  orderItems: OrderItem[];
  total: number;
  onDeleteItem: (itemId: number) => void;
  onItemClick: (itemId: number, event: React.MouseEvent) => void;
}

export function OrderPanel({ orderItems, total, onDeleteItem, onItemClick }: OrderPanelProps) {
  // 将数字转换为中文大写金额
  const convertToChineseAmount = (num: number): string => {
    return num.toFixed(2);
  };

  const getDisplayPrice = (item: OrderItem) => {
    if (item.itemDiscount && item.itemDiscount > 0) {
      return item.discountedPrice || item.total;
    }
    return item.total;
  };

  return (
    <div className="flex-1 flex flex-col border-b border-gray-200">
      {/* Order Items */}
      <div className="flex-1 overflow-y-auto">
        {orderItems.map((item, index) => (
          <div key={item.id} onClick={(e) => onItemClick(item.id, e)}>
            {/* Items with full details (has origin/destination info) */}
            {item.origin ? (
              <div className="px-3 py-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50">
                {/* Header row */}
                <div className="flex items-center justify-between mb-3 text-sm">
                  <span>{item.name}</span>
                  <span className="mx-auto">x{item.quantity}</span>
                  <span>{item.unitPrice.toFixed(2)}</span>
                  <span className="text-orange-500 ml-4">€{getDisplayPrice(item).toFixed(2)}</span>
                </div>
                
                {/* Location info */}
                <div className="grid grid-cols-3 gap-2 mb-2 text-xs text-center">
                  <div>{item.origin}</div>
                  <div>&gt;&gt;&gt;</div>
                  <div>{item.destination}</div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-2 text-xs text-center text-gray-600">
                  <div>{item.originPostcode}</div>
                  <div></div>
                  <div>{item.destPostcode}</div>
                </div>
                
                {/* Package details */}
                {item.details && item.weight && item.type && (
                  <div className="grid grid-cols-3 gap-2 text-xs text-center mb-2">
                    <div>{item.details}</div>
                    <div>{item.weight}</div>
                    <div>{item.type}</div>
                  </div>
                )}

                {/* Discount indicator */}
                {item.itemDiscount && item.itemDiscount > 0 && (
                  <div className="text-xs text-green-600 mb-1">
                    已折扣 {item.itemDiscount}%（原价: €{item.total.toFixed(2)}）
                  </div>
                )}

                {/* Note */}
                {item.note && (
                  <div className="mt-2 p-2 bg-yellow-50 rounded text-xs text-gray-700">
                    备注：{item.note}
                  </div>
                )}
              </div>
            ) : (
              <div className="px-3 py-2 border-b border-gray-100 bg-gray-50 cursor-pointer hover:bg-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="mx-auto">x{item.quantity}</span>
                  <span>{item.unitPrice.toFixed(2)}</span>
                  <span className="text-orange-500 ml-4">€{getDisplayPrice(item).toFixed(2)}</span>
                </div>

                {/* Discount indicator */}
                {item.itemDiscount && item.itemDiscount > 0 && (
                  <div className="text-xs text-green-600 mt-1">
                    已折扣 {item.itemDiscount}%（原价: €{item.total.toFixed(2)}）
                  </div>
                )}

                {/* Note */}
                {item.note && (
                  <div className="mt-2 p-2 bg-yellow-50 rounded text-xs text-gray-700">
                    备注：{item.note}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="px-3 py-3 border-t-2 border-gray-200">
        <div className="flex items-center justify-end mb-2">
          <span className="text-gray-600 mr-2">合计:</span>
          <span className="text-orange-500 text-xl">€{total.toFixed(2)}</span>
        </div>
        <div className="text-right text-3xl">{convertToChineseAmount(total)}</div>
      </div>
    </div>
  );
}