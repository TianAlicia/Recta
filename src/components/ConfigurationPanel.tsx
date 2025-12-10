import { useState, useEffect } from 'react';
import upsIcon from '../../iconRecta/ups.svg';
import fedexIcon from '../../iconRecta/fedex.svg';
import correoIcon from '../../iconRecta/GroupCorreo.svg';
import seurIcon from '../../iconRecta/g4193seur.svg';
import cttIcon from '../../iconRecta/CTT logo.svg';
import mrwIcon from '../../iconRecta/MRW logo.svg';
import glsIcon from '../../iconRecta/GroupGLS.svg';

interface ConfigurationPanelProps {
  onAddOrder: (orderData: any) => void;
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
  
  const courierIcons: Record<string, string> = {
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

  const services = [
    { id: 'EXPRESS', name: 'EXPRESS', price: 1.50 },
    { id: 'AIR', name: 'AIR', price: 1.50 },
    { id: '24H', name: '24H', price: 1.50, logo: '🟤' },
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
    <div className="flex flex-col h-full bg-white">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTabIndex(index)}
            className={`px-6 py-3 text-sm ${
              activeTabIndex === index
                ? 'bg-orange-500 text-white border-2 border-orange-500'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 可滚动区域：表单卡片 */}
      <div className="flex-1 overflow-y-auto p-3" style={{ backgroundColor: '#f8f8f8' }}>
        {/* 始发地卡片 */}
        <div className="mb-2 bg-white rounded-[10px] p-3" style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <div className="mb-2">始发地</div>
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">基础地址</span>
              <button className="text-orange-500 hover:text-orange-600">+</button>
            </div>
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="详细地址"
              value={formData.senderDetailAddress}
              onChange={(e) => handleInputChange('senderDetailAddress', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="block text-sm text-gray-600 mb-1">国家</label>
              <input
                type="text"
                value={formData.senderCountry}
                onChange={(e) => handleInputChange('senderCountry', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">邮编 *</label>
              <input
                type="text"
                value={formData.senderPostcode}
                onChange={(e) => handleInputChange('senderPostcode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">寄件人 *</label>
              <input
                type="text"
                value={formData.senderName}
                onChange={(e) => handleInputChange('senderName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">联系电话 *</label>
              <input
                type="text"
                value={formData.senderPhone}
                onChange={(e) => handleInputChange('senderPhone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* 目的地卡片 */}
        <div className="mb-2 bg-white rounded-[10px] p-3" style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <div className="mb-2">目的地</div>
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">基础地址</span>
              <button className="text-orange-500 hover:text-orange-600">+</button>
            </div>
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="详细地址"
              value={formData.receiverDetailAddress}
              onChange={(e) => handleInputChange('receiverDetailAddress', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="block text-sm text-gray-600 mb-1">国家</label>
              <input
                type="text"
                value={formData.receiverCountry}
                onChange={(e) => handleInputChange('receiverCountry', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">邮编 *</label>
              <input
                type="text"
                value={formData.receiverPostcode}
                onChange={(e) => handleInputChange('receiverPostcode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">收件人 *</label>
              <input
                type="text"
                value={formData.receiverName}
                onChange={(e) => handleInputChange('receiverName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">联系电话 *</label>
              <input
                type="text"
                value={formData.receiverPhone}
                onChange={(e) => handleInputChange('receiverPhone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* 包裹尺寸和重量卡片 */}
        <div className="mb-2 bg-white rounded-[10px] p-3" style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <div className="mb-2">包裹尺寸和重量</div>
          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="block text-sm text-gray-600 mb-1">长 (cm) *</label>
              <input
                type="text"
                value={formData.length}
                onChange={(e) => handleInputChange('length', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">宽 (cm) *</label>
              <input
                type="text"
                value={formData.width}
                onChange={(e) => handleInputChange('width', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">高 (cm) *</label>
              <input
                type="text"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">重量 (Kg) *</label>
              <input
                type="text"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* 物品类型和包裹数量卡片 */}
        <div className="mb-2 bg-white rounded-[10px] p-3" style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm text-gray-600 mb-1">物品类型</label>
              <input
                type="text"
                value={formData.itemType}
                onChange={(e) => handleInputChange('itemType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">包裹数量</label>
              <input
                type="text"
                value={formData.packageCount}
                onChange={(e) => handleInputChange('packageCount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 固定底部区域：快递公司选择、服务类型、增值服务 + 底部操作栏 */}
      <div className="border-t border-gray-200" style={{ backgroundColor: '#f8f8f8' }}>
        {/* 快递公司选择、服务类型、增值服务卡片 - 增加50% */}
        <div className="p-3">
          {/* 快递公司选择和服务类型卡片 */}
          <div className="mb-2">
            {/* 快递公司选择 */}
            <div className="mb-3">
              <div className="grid grid-cols-5 gap-3 mb-3">
                {couriers.slice(0, 5).map((courier) => (
                  <button
                    key={courier.id}
                    onClick={() => setSelectedCourier(courier.id)}
                    className={`p-3.5 border-2 rounded text-center relative ${
                      selectedCourier === courier.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm">{courier.name}</span>
                      <img src={courierIcons[courier.id]} alt={courier.name} className="w-6 h-7 object-contain" />
                    </div>
                    <div className="text-orange-500 text-sm">€{courier.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-3">
                {couriers.slice(5).map((courier) => (
                  <button
                    key={courier.id}
                    onClick={() => setSelectedCourier(courier.id)}
                    className={`p-3.5 border-2 rounded text-center relative ${
                      selectedCourier === courier.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm">{courier.name}</span>
                      <img src={courierIcons[courier.id]} alt={courier.name} className="w-6 h-7 object-contain" />
                    </div>
                    <div className="text-orange-500 text-sm">€{courier.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 服务类型 */}
            <div>
              <div className="mb-2 text-sm">服务类型</div>
              <div className="grid grid-cols-5 gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-3.5 border-2 rounded text-center relative ${
                      selectedService === service.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm">{service.name}</span>
                      {service.logo && <span className="text-lg">{service.logo}</span>}
                    </div>
                    <div className="text-orange-500 text-sm">€{service.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 增值服务卡片 */}
          <div className="bg-white rounded-[10px] p-3" style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <div className="mb-2 text-sm">增值服务</div>
            <div className="grid grid-cols-4 gap-2">
              {addons.map((addon) => (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-2.5 border-2 rounded text-center ${
                    selectedAddons.includes(addon.id)
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="mb-1 text-sm">{addon.name}</div>
                  <div className="text-orange-500 text-sm">+ €{addon.price.toFixed(2)}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 底部操作栏 - 三个卡片 */}
        <div className="p-3 border-t border-gray-200 flex items-center gap-3 origin-top" style={{ backgroundColor: '#f8f8f8', transform: 'scaleY(0.75)' }}>
          {/* 清空卡片 */}
          <div className="flex-1 bg-gray-400 rounded-[10px] p-4 flex items-center justify-center" style={{ backgroundColor: '#9CA3AF' }}>
            <button
              onClick={handleClear}
              className="text-white hover:text-gray-100 text-lg font-medium"
            >
              清空
            </button>
          </div>
          
          {/* 金钱卡片 */}
          <div className="flex-1 bg-white rounded-[10px] p-4 flex items-center justify-center" style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-2xl">€</span>
              <span className="text-3xl text-orange-500">{calculateTotal().toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
          
          {/* 添加卡片 */}
          <div className="flex-1 bg-orange-500 rounded-[10px] p-4 flex items-center justify-center">
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