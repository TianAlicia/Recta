import { useState, useEffect } from 'react';
import upsIcon from '../iconRecta/ups.svg';
import fedexIcon from '../iconRecta/fedex.svg';
import correoIcon from '../iconRecta/GroupCorreo.svg';
import seurIcon from '../iconRecta/g4193seur.svg';
import cttIcon from '../iconRecta/CTT logo.svg';
import mrwIcon from '../iconRecta/MRW logo.svg';
import glsIcon from '../iconRecta/GroupGLS.svg';

import { TrashIcon } from './icons/TrashIcon';

interface ConfigurationPanelProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAddOrder: (orderData: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewingOrderData?: any;
}

export function ConfigurationPanel({ onAddOrder, viewingOrderData }: ConfigurationPanelProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const [selectedCourier, setSelectedCourier] = useState('FEDEX');
  const [selectedService, setSelectedService] = useState('24H');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    // 寄件信息
    senderBaseAddress: '',
    senderDetailAddress: '',
    senderCountry: '中国',
    senderPostcode: '315040',
    senderName: 'Marco',
    senderPhone: '315040',
    
    // 收件信息
    receiverBaseAddress: '',
    receiverDetailAddress: '',
    receiverCountry: '中国',
    receiverPostcode: '315040',
    receiverName: 'Marco',
    receiverPhone: '315040',
    
    // 包裹详情
    length: '11',
    width: '11',
    height: '1',
    weight: '1',
    itemType: '电脑',
    packageCount: '1',
  });

  // Load viewing order data when it changes
  useEffect(() => {
    if (viewingOrderData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        senderBaseAddress: '',
        senderDetailAddress: '',
        senderCountry: viewingOrderData.origin || '中国',
        senderPostcode: viewingOrderData.originPostcode || '315040',
        senderName: 'Marco',
        senderPhone: '315040',
        receiverBaseAddress: '',
        receiverDetailAddress: '',
        receiverCountry: viewingOrderData.destination || '中国',
        receiverPostcode: viewingOrderData.destPostcode || '315040',
        receiverName: 'Marco',
        receiverPhone: '315040',
        length: '11',
        width: '11',
        height: '1',
        weight: '1',
        itemType: viewingOrderData.type?.split('\n')[0] || '电脑',
        packageCount: '1',
      });
      setSelectedCourier(viewingOrderData.name || 'FEDEX');
    }
  }, [viewingOrderData]);

  const tabs = ['Marco', 'Lluvia', 'Lluvia', 'Lluvia', 'Lluvia', 'Lluvia'];
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const courierIcons: Record<string, any> = {
    'UPS': upsIcon,
    'FEDEX': fedexIcon,
    'CORREO': correoIcon,
    'SEUR': seurIcon,
    'CTT': cttIcon,
    'MRW': mrwIcon,
    'GLS': glsIcon,
  };
  
  const couriers = [
    { id: 'UPS', name: 'UPS', price: 1.50 },
    { id: 'FEDEX', name: 'FEDEX', price: 1.50 },
    { id: 'CORREO', name: 'CORREO', price: 1.50 },
    { id: 'SEUR', name: 'SEUR', price: 1.50 },
    { id: 'CTT', name: 'CTT', price: 1.50 },
    { id: 'MRW', name: 'MRW', price: 1.50 },
    { id: 'GLS', name: 'GLS', price: 1.50 },
  ];

  const services: { id: string; name: string; price: number; logo?: string }[] = [
    { id: 'EXPRESS', name: 'EXPRESS', price: 1.50 },
    { id: 'AIR', name: 'AIR', price: 1.50 },
    { id: '24H', name: '24H', price: 1.50 },
  ];

  const addons = [
    { id: 'sign1', name: '签名', price: 1.50 },
    { id: 'sign2', name: '签名', price: 1.50 },
    { id: 'sign3', name: '签名', price: 1.50 },
    { id: 'sign4', name: '签名', price: 1.50 },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const calculateTotal = () => {
    let total = 0;
    const courier = couriers.find(c => c.id === selectedCourier);
    const service = services.find(s => s.id === selectedService);
    if (courier) total += courier.price;
    if (service) total += service.price;
    total += selectedAddons.length * 1.50;
    return total;
  };

  const handleClear = () => {
    setFormData({
      senderBaseAddress: '',
      senderDetailAddress: '',
      senderCountry: '',
      senderPostcode: '',
      senderName: '',
      senderPhone: '',
      receiverBaseAddress: '',
      receiverDetailAddress: '',
      receiverCountry: '',
      receiverPostcode: '',
      receiverName: '',
      receiverPhone: '',
      length: '',
      width: '',
      height: '',
      weight: '',
      itemType: '',
      packageCount: '',
    });
    setSelectedCourier('FEDEX');
    setSelectedService('24H');
    setSelectedAddons([]);
  };

  const handleAddOrder = () => {
    const orderData = {
      name: selectedCourier,
      origin: formData.senderCountry,
      destination: formData.receiverCountry,
      originPostcode: formData.senderPostcode,
      destPostcode: formData.receiverPostcode,
      details: `${formData.length} x ${formData.width} x ${formData.height} CM`,
      weight: `${formData.weight}KG`,
      type: formData.itemType,
      unitPrice: calculateTotal(),
    };
    
    onAddOrder(orderData);
  };

  return (
    <div className="flex flex-col h-full gap-1">
      {/* Tabs */}
      <div className="bg-[#f9fafb] rounded-sm">
        <div className="text-[#364153] text-xs mb-2">已填写</div>
        <div className="flex gap-0.5 overflow-x-auto">
          {tabs.map((tab, index) => (
            <div key={index} className="relative group shrink-0">
              <button
                onClick={() => setActiveTabIndex(index)}
                className={`w-24 flex flex-col justify-between p-1 rounded border transition-colors text-left relative ${
                  activeTabIndex === index
                    ? 'border-transparent ring-[1.5px] ring-inset ring-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="text-[#364153] text-base truncate w-full">{tab}</div>
                <div className="flex justify-end w-full">
                  <TrashIcon className="text-gray-400 hover:text-red-600 transition-colors" width={10} height={12} />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 可滚动区域：表单卡片 */}
      <div className="flex-1 flex flex-col overflow-y-auto rounded-sm gap-0.5">
        {/* 始发地卡片 */}
        <div className="bg-white rounded-sm p-3">
          <div className="text-xs mb-2">始发地</div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="详细地址"
              value={formData.senderDetailAddress}
              onChange={(e) => handleInputChange('senderDetailAddress', e.target.value)}
              className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">国家</label>
              <input
                type="text"
                value={formData.senderCountry}
                onChange={(e) => handleInputChange('senderCountry', e.target.value)}
                className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">邮编 *</label>
              <input
                type="text"
                value={formData.senderPostcode}
                onChange={(e) => handleInputChange('senderPostcode', e.target.value)}
                className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">寄件人 *</label>
              <input
                type="text"
                value={formData.senderName}
                onChange={(e) => handleInputChange('senderName', e.target.value)}
                className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">联系电话 *</label>
              <input
                type="text"
                value={formData.senderPhone}
                onChange={(e) => handleInputChange('senderPhone', e.target.value)}
                className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* 目的地卡片 */}
        <div className="bg-white rounded-sm p-3">
          <div className="text-xs mb-2">目的地</div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="详细地址"
              value={formData.receiverDetailAddress}
              onChange={(e) => handleInputChange('receiverDetailAddress', e.target.value)}
              className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">国家</label>
              <input
                type="text"
                value={formData.receiverCountry}
                onChange={(e) => handleInputChange('receiverCountry', e.target.value)}
                className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">邮编 *</label>
              <input
                type="text"
                value={formData.receiverPostcode}
                onChange={(e) => handleInputChange('receiverPostcode', e.target.value)}
                className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">收件人 *</label>
              <input
                type="text"
                value={formData.receiverName}
                onChange={(e) => handleInputChange('receiverName', e.target.value)}
                className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">联系电话 *</label>
              <input
                type="text"
                value={formData.receiverPhone}
                onChange={(e) => handleInputChange('receiverPhone', e.target.value)}
                className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* 包裹尺寸和重量卡片 */}
        <div className="bg-white rounded-sm p-3">
          <div className="text-xs mb-2">包裹尺寸和重量</div>
          <div className="grid grid-cols-4 gap-1">
            <div>
              <label className="block text-xs text-gray-600 mb-1">长 (cm) *</label>
              <input
                type="text"
                value={formData.length}
                onChange={(e) => handleInputChange('length', e.target.value)}
                className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">宽 (cm) *</label>
              <input
                type="text"
                value={formData.width}
                onChange={(e) => handleInputChange('width', e.target.value)}
                className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">高 (cm) *</label>
              <input
                type="text"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">重量 (Kg) *</label>
              <input
                type="text"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* 物品类型和包裹数量卡片 */}
        <div className="bg-white rounded-sm p-3">
          <div className="grid grid-cols-2 gap-1">
            <div>
              <label className="block text-xs text-gray-600 mb-1">物品类型</label>
              <input
                type="text"
                value={formData.itemType}
                onChange={(e) => handleInputChange('itemType', e.target.value)}
                className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">包裹数量</label>
              <input
                type="text"
                value={formData.packageCount}
                onChange={(e) => handleInputChange('packageCount', e.target.value)}
                className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 固定底部区域：快递公司选择、服务类型、增值服务 + 底部操作栏 */}
      <div>
        {/* 快递公司选择、服务类型、增值服务卡片 - 增加50% */}
        <div className="bg-gray-100 rounded-sm">
          {/* 快递公司选择和服务类型卡片 */}
        <div className="mb-1 rounded-sm" style={{ backgroundColor: 'F9FAFB', boxShadow: '0 2px 2px rgba(0,0,0,0.05)' }}>
          
          <div className="mb-1">
            {/* 快递公司选择 */}
            <div className="mb-1">
              <div className="grid grid-cols-5 gap-0.5 mb-1">
                {couriers.map((courier) => (
                  <button
                    key={courier.id}
                    onClick={() => setSelectedCourier(courier.id)}
                  className={`p-1.5 border rounded text-center font-medium relative overflow-hidden min-w-0 transition-colors flex flex-col justify-between h-[60px] ${
                    selectedCourier === courier.id
                      ? 'border-transparent ring-[1.5px] ring-inset ring-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:bg-gray-100 bg-white'
                  }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <span className="text-sm truncate">{courier.name}</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={courierIcons[courier.id].src} alt={courier.name} className="w-18 h-6 object-contain ml-1" />
                    </div>
                    <div className="text-orange-500 text-xs text-right w-full">€{courier.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 服务类型 */}
            <div>
              <div className="mb-2 text-xs">服务类型</div>
              <div className="grid grid-cols-5 gap-0.5">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                  className={`p-2 border rounded text-center font-medium relative overflow-hidden min-w-0 transition-colors flex flex-col justify-between h-[60px] ${
                    selectedService === service.id
                      ? 'border-transparent ring-[1.5px] ring-inset ring-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:bg-gray-100 bg-white'
                  }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <span className="text-sm truncate">{service.name}</span>
                      {service.logo && <span className="text-lg ml-1">{service.logo}</span>}
                    </div>
                    <div className="text-orange-500 text-xs text-right w-full">€{service.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

          {/* 增值服务卡片 */}
          <div className="mb-1 rounded-sm" style={{ backgroundColor: 'F9FAFB', boxShadow: '0 2px 2px rgba(0,0,0,0.05)' }}>
            <div className="mb-2 text-xs">增值服务</div>
            <div className="grid grid-cols-8 gap-0.5">
              {addons.map((addon) => (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-1 border rounded text-center transition-colors flex flex-col justify-between h-12 ${
                    selectedAddons.includes(addon.id)
                      ? 'border-transparent ring-[1.5px] ring-inset ring-orange-500 bg-orange-50'
                      : 'bg-white border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="text-xs text-left w-full">{addon.name}</div>
                  <div className="text-orange-500 text-xs text-right w-full">+ €{addon.price.toFixed(2)}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 底部操作栏 - 三个卡片 */}
        <div className="flex items-stretch gap-1 origin-top">
          {/* 清空卡片 */}
          <div className="flex-1 bg-gray-100 rounded-tl-sm p-2 flex items-center justify-center">
            <button
              onClick={handleClear}
              className="text-red-600 hover:text-gray-100 text-lg font-medium"
            >
              清空
            </button>
          </div>
          
          {/* 金钱卡片 */}
          <div className="flex-1 bg-white p-2 flex items-center justify-between" style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <span className="text-gray-400 text-2xl">€</span>
            <span className="text-2xl text-orange-500">{calculateTotal().toFixed(2).replace('.', ',')}</span>
          </div>
          
          {/* 添加卡片 */}
          <div className="flex-1 bg-orange-500 rounded-tr-sm p-2 flex items-center justify-center">
            <button
              onClick={handleAddOrder}
              className="text-white hover:text-orange-100 text-lg font-medium"
            >
              添加
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}