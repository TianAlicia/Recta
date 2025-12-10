import { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MemberModal({ isOpen, onClose }: MemberModalProps) {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchData, setSearchData] = useState({
    id: '中国',
    name: '315040',
    phone: 'Marco',
    wechat1: '315040',
    wechat2: '315040'
  });

  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for addresses
  const addresses = [
    { id: 1, name: 'PALMNET TECH S.L.', phone: '+34 655 078 339', address: 'Carrer de la Marina, 102 Barcelona', postcode: '08018' },
    { id: 2, name: 'PALMNET TECH S.L.', phone: '+34 655 078 339', address: 'Carrer de la Marina, 102 Barcelona', postcode: '08018' },
    { id: 3, name: 'PALMNET TECH S.L.', phone: '+34 655 078 339', address: 'Carrer de la Marina, 102 Barcelona', postcode: '08018' },
    { id: 4, name: 'PALMNET TECH S.L.', phone: '+34 655 078 339', address: 'Carrer de la Marina, 102 Barcelona', postcode: '08018' },
    { id: 5, name: 'PALMNET TECH S.L.', phone: '+34 655 078 339', address: 'Carrer de la Marina, 102 Barcelona', postcode: '08018' },
  ];

  // Mock data for orders
  const orders = Array.from({ length: 120 }, (_, i) => ({
    id: i + 1,
    name: 'UPS BCN-MAD, 胶带',
    status: '未支付',
    date: '29-11-2025',
    time: '19:10',
    amount: 2.50
  }));

  const toggleItem = (id: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const toggleAll = () => {
    if (selectedItems.size === orders.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(orders.map(o => o.id)));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white w-[90%] max-w-5xl max-h-[90vh] overflow-hidden rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg">搜索会员</h2>
        </div>

        {/* Search Form */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-5 gap-3 mb-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">ID</label>
              <input
                type="text"
                value={searchData.id}
                onChange={(e) => setSearchData({ ...searchData, id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">姓名 *</label>
              <input
                type="text"
                value={searchData.name}
                onChange={(e) => setSearchData({ ...searchData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">联系电话 *</label>
              <input
                type="text"
                value={searchData.phone}
                onChange={(e) => setSearchData({ ...searchData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">微信号 *</label>
              <input
                type="text"
                value={searchData.wechat1}
                onChange={(e) => setSearchData({ ...searchData, wechat1: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">微信号 *</label>
              <input
                type="text"
                value={searchData.wechat2}
                onChange={(e) => setSearchData({ ...searchData, wechat2: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* Addresses Section */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="text-sm text-gray-600 mb-2">寄件人</div>
          <div className="space-y-2">
            {addresses.map((addr) => (
              <div key={addr.id} className="flex items-center text-sm py-2 border-b border-gray-100">
                <div className="flex-1">{addr.name}</div>
                <div className="w-40">{addr.phone}</div>
                <div className="flex-1">{addr.address}</div>
                <div className="w-20">{addr.postcode}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-4">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-6 py-3 text-sm ${
              activeTab === 'pending'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-600'
            }`}
          >
            待付订单
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 text-sm ${
              activeTab === 'history'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-600'
            }`}
          >
            历史订单
          </button>
          <div className="flex-1"></div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
              ↩ 撤回
            </button>
            <button className="px-6 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600">
              结算 →
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="flex-1 overflow-y-auto max-h-[400px]">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-sm text-gray-600 w-12">
                  <input
                    type="checkbox"
                    checked={selectedItems.size === orders.length}
                    onChange={toggleAll}
                    className="rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm text-gray-600">商品</th>
                <th className="px-4 py-3 text-left text-sm text-gray-600">日期</th>
                <th className="px-4 py-3 text-left text-sm text-gray-600">时间</th>
                <th className="px-4 py-3 text-right text-sm text-gray-600">金额</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice((currentPage - 1) * 10, currentPage * 10).map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(order.id)}
                      onChange={() => toggleItem(order.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {order.name}
                    <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{order.date}</td>
                  <td className="px-4 py-3 text-sm">{order.time}</td>
                  <td className="px-4 py-3 text-sm text-orange-500 text-right">€{order.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer with Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            已选{selectedItems.size}项
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded bg-orange-500 text-white">
              {currentPage}
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              3
            </button>
            <span className="px-2">...</span>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              25
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(25, prev + 1))}
              disabled={currentPage === 25}
              className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(25)}
              disabled={currentPage === 25}
              className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
