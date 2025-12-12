'use client';

import { useState, useEffect } from 'react';
import { ProductList } from '@/components/ProductList';
import { ConfigurationPanel } from '@/components/ConfigurationPanel';
import { OrderPanel } from '@/components/OrderPanel';
import { Keypad } from '@/components/Keypad';
import { MemberModal } from '@/components/MemberModal';
import { PaymentModal } from '@/components/PaymentModal';
import { DiscountModal } from '@/components/DiscountModal';
import { ItemContextMenu } from '@/components/ItemContextMenu';
import { NoteModal } from '@/components/NoteModal';
import * as mockApi from '@/services/mockApi';

export default function Home() {
  const [products, setProducts] = useState<mockApi.Product[]>([]);
  const [orderItems, setOrderItems] = useState<mockApi.OrderItem[]>([]);
  const [total, setTotal] = useState(0);
  const [originalTotal, setOriginalTotal] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [inputValue, setInputValue] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isItemDiscountModalOpen, setIsItemDiscountModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    position: { x: number; y: number; width?: number; height?: number };
    itemId: number | null;
  }>({
    isOpen: false,
    position: { x: 0, y: 0 },
    itemId: null,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [viewingOrderData, setViewingOrderData] = useState<any>(null);
  const [nextOrderId, setNextOrderId] = useState(5);

  useEffect(() => {
    // Mock API calls to fetch initial data
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [productsData, orderData] = await Promise.all([
        mockApi.fetchProducts(),
        mockApi.fetchOrder()
      ]);
      
      setProducts(productsData);
      setOrderItems(orderData.items);
      setTotal(orderData.total);
      setOriginalTotal(orderData.total);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const recalculateTotal = (items: mockApi.OrderItem[]) => {
    const newTotal = items.reduce((sum, item) => {
      if (item.itemDiscount && item.itemDiscount > 0) {
        return sum + (item.discountedPrice || item.total);
      }
      return sum + item.total;
    }, 0);
    
    // Apply global discount
    const finalTotal = newTotal * (1 - discountPercent / 100);
    setOriginalTotal(newTotal);
    setTotal(finalTotal);
  };

  const calculateDiscountedTotal = (originalAmount: number, discount: number) => {
    return originalAmount * (1 - discount / 100);
  };

  const handleProductClick = (product: mockApi.Product) => {
    const newItem: mockApi.OrderItem = {
      id: nextOrderId,
      name: product.name,
      quantity: 1,
      unitPrice: product.price,
      total: product.price
    };
    
    const newItems = [...orderItems, newItem];
    setOrderItems(newItems);
    recalculateTotal(newItems);
    setNextOrderId(prev => prev + 1);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddOrderFromConfig = (orderData: any) => {
    const newItem: mockApi.OrderItem = {
      id: nextOrderId,
      name: orderData.name,
      origin: orderData.origin,
      destination: orderData.destination,
      originPostcode: orderData.originPostcode,
      destPostcode: orderData.destPostcode,
      details: orderData.details,
      weight: orderData.weight,
      type: orderData.type,
      quantity: 1,
      unitPrice: orderData.unitPrice,
      total: orderData.unitPrice
    };
    
    const newItems = [...orderItems, newItem];
    setOrderItems(newItems);
    recalculateTotal(newItems);
    setNextOrderId(prev => prev + 1);
  };

  const handleDeleteItem = (itemId: number) => {
    const newItems = orderItems.filter(i => i.id !== itemId);
    setOrderItems(newItems);
    recalculateTotal(newItems);
  };

  const handleItemClick = (itemId: number, event: React.MouseEvent) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    setContextMenu({
      isOpen: true,
      position: { 
        x: rect.left, 
        y: rect.top,
        width: rect.width,
        height: rect.height
      },
      itemId,
    });
  };

  const handleApplyItemDiscount = (discount: number) => {
    if (contextMenu.itemId === null) return;
    
    const newItems = orderItems.map(item => {
      if (item.id === contextMenu.itemId) {
        const discountedPrice = item.total * (1 - discount / 100);
        return {
          ...item,
          itemDiscount: discount,
          discountedPrice,
        };
      }
      return item;
    });
    
    setOrderItems(newItems);
    recalculateTotal(newItems);
  };

  const handleSaveNote = (note: string) => {
    if (contextMenu.itemId === null) return;
    
    const newItems = orderItems.map(item => {
      if (item.id === contextMenu.itemId) {
        return { ...item, note };
      }
      return item;
    });
    
    setOrderItems(newItems);
  };

  const handleViewDetails = () => {
    if (contextMenu.itemId === null) return;
    
    const item = orderItems.find(i => i.id === contextMenu.itemId);
    if (item && item.origin) {
      setViewingOrderData(item);
    }
  };

  const handleKeypadInput = (value: string) => {
    if (value === 'C') {
      setInputValue('');
    } else if (value === '清空') {
      setOrderItems([]);
      setTotal(0);
      setOriginalTotal(0);
      setDiscountPercent(0);
      setInputValue('');
    } else if (value === '返回') {
      // Handle return
    } else {
      setInputValue(prev => prev + value);
    }
  };

  const handleMemberClick = () => {
    setIsMemberModalOpen(true);
  };

  const handleCardClick = () => {
    setIsPaymentModalOpen(true);
  };

  const handleCashClick = () => {
    setIsPaymentModalOpen(true);
  };

  const handleDiscountClick = () => {
    setIsDiscountModalOpen(true);
  };

  const handleApplyDiscount = (discount: number) => {
    setDiscountPercent(discount);
    setTotal(calculateDiscountedTotal(originalTotal, discount));
  };

  const currentItem = orderItems.find(i => i.id === contextMenu.itemId);

  return (
    <div className="flex h-screen bg-gray-200 gap-1">
      {/* Left Panel - Products */}
      <div className="w-[300px]">
        <ProductList products={products} onProductClick={handleProductClick} />
      </div>

      {/* Middle Panel - Configuration */}
      <div className="flex-1">
        <ConfigurationPanel onAddOrder={handleAddOrderFromConfig} viewingOrderData={viewingOrderData} />
      </div>

      {/* Right Panel - Order & Keypad */}
      <div className="w-[380px] flex flex-col gap-[1px]">
        <OrderPanel 
          orderItems={orderItems} 
          total={total} 
          onDeleteItem={handleDeleteItem}
          onItemClick={handleItemClick}
        />
        <Keypad 
          onInput={handleKeypadInput} 
          inputValue={inputValue} 
          onMemberClick={handleMemberClick}
          onCardClick={handleCardClick}
          onCashClick={handleCashClick}
          onDiscountClick={handleDiscountClick}
        />
      </div>

      {/* Member Modal */}
      <MemberModal isOpen={isMemberModalOpen} onClose={() => setIsMemberModalOpen(false)} />
      
      {/* Payment Modal */}
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} totalAmount={total} />
      
      {/* Discount Modal */}
      <DiscountModal 
        isOpen={isDiscountModalOpen} 
        onClose={() => setIsDiscountModalOpen(false)} 
        onApplyDiscount={handleApplyDiscount}
        currentDiscount={discountPercent}
      />

      {/* Item Context Menu */}
      <ItemContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={() => setContextMenu({ ...contextMenu, isOpen: false })}
        onDelete={() => {
          if (contextMenu.itemId) handleDeleteItem(contextMenu.itemId);
        }}
        onDiscount={() => setIsItemDiscountModalOpen(true)}
        onNote={() => setIsNoteModalOpen(true)}
        onViewDetails={handleViewDetails}
        hasDetails={!!currentItem?.origin}
      />

      {/* Item Discount Modal */}
      <DiscountModal
        isOpen={isItemDiscountModalOpen}
        onClose={() => setIsItemDiscountModalOpen(false)}
        onApplyDiscount={handleApplyItemDiscount}
        currentDiscount={currentItem?.itemDiscount || 0}
      />

      {/* Note Modal */}
      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSave={handleSaveNote}
        currentNote={currentItem?.note || ''}
        itemName={currentItem?.name || ''}
      />
    </div>
  );
}
