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
    <div className="flex flex-col h-full gap-1">
      {/* Header with Search */}
      <div className="px-2 py-1 flex items-center gap-2 bg-white rounded-b-xs">
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
              backgroundImage: (!searchValue && !isFocused) ? `url(${rectaLogo.src})` : 'none',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left 0rem center',
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
      <div className="flex-1 overflow-y-auto rounded-sm">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-3 gap-1">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  onProductClick(product);
                }}
                className="bg-white rounded-sm text-left transition-all relative flex flex-col hover:bg-gray-50 min-h-18 overflow-hidden"
              >
                {/* 商品图片（上方） */}
                {product.image ? (
                  <div className="flex-shrink-0 w-full aspect-square flex items-center justify-center relative bg-gray-100">
                    <div className="absolute inset-0">
                      <ImageWithFallback 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                ) : null}
                
                {/* 底部内容区域 */}
                <div className="flex-1 flex flex-col justify-between px-2 py-1">
                  {/* 商品名 */}
                  <div className="flex-1 flex">
                    <div className="text-sm font-medium whitespace-pre-line">{product.name}</div>
                  </div>
                  
                  {/* 价格（底部右侧） */}
                  <div className="flex-shrink-0 flex justify-end">
                    <div className="text-orange-500 text-xs font-medium">€{product.price.toFixed(2)}</div>
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