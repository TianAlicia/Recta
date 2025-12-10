// Mock API service to simulate backend data fetching

export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

// Mock data
const mockProducts: Product[] = [
  { id: 1, name: 'S号纸箱\n(20x15x10\ncm)', price: 1.50, image: 'https://images.unsplash.com/photo-1656543802898-41c8c46683a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkYm9hcmQlMjBib3h8ZW58MXx8fHwxNzY1MjI4MDc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { id: 2, name: 'M号纸箱\n(35x25x20\ncm)', price: 1.50 },
  { id: 3, name: 'L号纸箱\n(50x40x30\ncm)', price: 1.50 },
  { id: 4, name: '气泡膜 (1m)', price: 1.50 },
  { id: 5, name: '防震泡沫板', price: 1.50 },
  { id: 6, name: '封箱胶带', price: 1.50 },
  { id: 7, name: '胶带', price: 1.50 },
  { id: 8, name: '胶带', price: 1.50 },
  { id: 9, name: '胶带', price: 1.50 },
  { id: 10, name: '胶带', price: 1.50 },
  { id: 11, name: '胶带', price: 1.50 },
  { id: 12, name: '胶带', price: 1.50, image: 'https://images.unsplash.com/photo-1764266022094-c658e4301469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNraW5nJTIwdGFwZSUyMHJvbGx8ZW58MXx8fHwxNzY1MjcxMDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { id: 13, name: '胶带', price: 1.50 },
  { id: 14, name: '胶带', price: 1.50 },
  { id: 15, name: '胶带', price: 1.50, image: 'https://images.unsplash.com/photo-1764266022094-c658e4301469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNraW5nJTIwdGFwZSUyMHJvbGx8ZW58MXx8fHwxNzY1MjcxMDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { id: 16, name: '胶带', price: 1.50 },
  { id: 17, name: '胶带', price: 1.50 },
  { id: 18, name: '胶带', price: 1.50 },
  { id: 19, name: '胶带', price: 1.50 },
  { id: 20, name: '胶带', price: 1.50 },
  { id: 21, name: '胶带', price: 1.50, image: 'https://images.unsplash.com/photo-1764266022094-c658e4301469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNraW5nJTIwdGFwZSUyMHJvbGx8ZW58MXx8fHwxNzY1MjcxMDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { id: 22, name: '胶带', price: 1.50 },
  { id: 23, name: '胶带', price: 1.50 },
];

// Mock delay to simulate network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch all products
export async function fetchProducts(): Promise<Product[]> {
  await delay(300);
  
  return mockProducts;
}

// Fetch current order
export async function fetchOrder(): Promise<{ items: OrderItem[], total: number }> {
  await delay(200);
  
  const items = [
    {
      id: 1,
      name: 'UPS',
      origin: 'Madrid',
      destination: 'Barcelona',
      originPostcode: '02100',
      destPostcode: '08018',
      details: '50 x 40 x 30 CM\n50 x 40 x 30 CM',
      weight: '3KG\n3KG',
      type: '电脑\n电脑',
      quantity: 1,
      unitPrice: 2.50,
      total: 2.50
    },
    { id: 2, name: '胶带', quantity: 1, unitPrice: 2.50, total: 2.50 },
    { id: 3, name: '胶带', quantity: 1, unitPrice: 2.50, total: 2.50 },
    { id: 4, name: '胶带', quantity: 1, unitPrice: 2.50, total: 2.50 },
  ];
  
  const total = items.reduce((sum, item) => sum + item.total, 0);
  
  return { items, total };
}

// Fetch shipping services
export async function fetchShippingServices(): Promise<ShippingService[]> {
  await delay(150);
  
  return [
    { id: 'UPS', name: 'UPS', icon: '📦', price: 1.50 },
    { id: 'FEDEX', name: 'FEDEX', icon: '📦', price: 1.50 },
    { id: 'CORREO', name: 'CORREO', icon: '📦', price: 1.50 },
    { id: 'SEUR', name: 'SEUR', icon: '🚚', price: 1.50 },
    { id: 'CTT', name: 'CTT', icon: '🇵🇹', price: 1.50 },
    { id: 'MRW', name: 'MRW', icon: '📦', price: 1.50 },
    { id: 'GLS', name: 'GLS', icon: 'GLS', price: 1.50 },
  ];
}

// Add item to order
export async function addToOrder(productId: number, quantity: number = 1): Promise<OrderItem> {
  await delay(100);
  
  const products = await fetchProducts();
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  return {
    id: Date.now(),
    name: product.name,
    quantity,
    unitPrice: product.price,
    total: product.price * quantity
  };
}

// Process payment
export async function processPayment(
  method: 'card' | 'cash' | 'later',
  amount: number
): Promise<{ success: boolean; transactionId: string }> {
  await delay(500);
  
  return {
    success: true,
    transactionId: `TXN${Date.now()}`
  };
}

// Calculate shipping cost
export async function calculateShipping(
  service: string,
  weight: number,
  dimensions: { length: number; width: number; height: number }
): Promise<{ cost: number; estimatedDays: number }> {
  await delay(300);
  
  // Mock calculation based on weight and service
  const baseRate = 1.50;
  const weightFactor = weight * 0.5;
  const serviceFactor = service === '24H' ? 2 : service === 'EXPRESS' ? 1.5 : 1;
  
  return {
    cost: baseRate + weightFactor * serviceFactor,
    estimatedDays: service === '24H' ? 1 : service === 'EXPRESS' ? 2 : 5
  };
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  await delay(200);
  
  const allProducts = await fetchProducts();
  
  if (!query) {
    return allProducts;
  }
  
  return allProducts.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category?.toLowerCase().includes(query.toLowerCase())
  );
}