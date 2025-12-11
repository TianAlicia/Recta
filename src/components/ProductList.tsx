import { useState, useMemo } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import rectaLogo from '../assets/RECTA.svg';

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

interface ProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export function ProductList({ products, onProductClick }: ProductListProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  // 根据搜索关键词过滤商品
  const filteredProducts = useMemo(() => {
    if (!searchValue.trim()) {
      return products;
    }
    
    const searchLower = searchValue.toLowerCase().trim();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchLower)
    );
  }, [products, searchValue]);

  return (
    <div className="flex flex-col h-full">
      {/* Header with Search */}
      <div className="p-3 border-b border-gray-200 flex items-center gap-2">
        <button className="text-gray-400 hover:text-gray-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full py-1 text-sm border-none outline-none"
            style={{
              backgroundImage: (!searchValue && !isFocused) ? `url(${rectaLogo})` : 'none',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left 0.5rem center',
              backgroundSize: '70px 20px',
              paddingLeft: (!searchValue && !isFocused) ? '5rem' : '0.5rem'
            }}
          />
        </div>
        {searchValue && (
          <button 
            onClick={() => setSearchValue('')}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto p-2" style={{ backgroundColor: '#f8f8f8' }}>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-3 gap-1.5">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  setSelectedProductId(product.id);
                  onProductClick(product);
                }}
                className="bg-white rounded-[10px] text-left transition-all relative flex flex-col hover:bg-gray-100"
                style={{
                  border: selectedProductId === product.id ? '2px solid rgb(249 115 22)' : '1px solid transparent',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  minHeight: '80px'
                }}
              >
                {/* 商品图片（左侧） */}
                {product.image ? (
                  <div className="flex-shrink-0 w-20 h-20">
                    <ImageWithFallback 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover rounded-l-[10px]"
                    />
                  </div>
                ) : null}
                
                {/* 右侧内容区域 */}
                <div className="flex-1 flex flex-col justify-between px-3 py-2">
                  {/* 商品名 */}
                  <div className="flex-1 flex items-center">
                    <div className="text-sm whitespace-pre-line">{product.name}</div>
                  </div>
                  
                  {/* 价格（底部右侧） */}
                  <div className="flex-shrink-0 flex justify-end">
                    <div className="text-orange-500 text-sm font-medium">€{product.price.toFixed(2)}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            未找到匹配的商品
          </div>
        )}
      </div>
    </div>
  );
}