// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   height: string;
//   length: string;
//   thickness: string;
//   finish: string;
//   rebate: string;
// }

// interface CartStore {
//   items: CartItem[];
//   subtotal: number;
//   vat: number;
//   total: number;
//   addItem: (item: CartItem) => void;
//   removeItem: (itemId: string) => void;
//   updateQuantity: (itemId: string, quantity: number) => void;
//   clearCart: () => void;
// }

// const calculateTotals = (items: CartItem[]) => {
//   const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const vat = subtotal * 0.20; // 20% VAT
//   const total = subtotal + vat;
//   return { subtotal, vat, total };
// };

// export const useCart = create<CartStore>()(
//   persist(
//     (set) => ({
//       items: [],
//       subtotal: 0,
//       vat: 0,
//       total: 0,
//       addItem: (newItem) =>
//         set((state) => {
//           const existingItemIndex = state.items.findIndex(
//             (item) => item.id === newItem.id
//           );

//           let updatedItems;
//           if (existingItemIndex >= 0) {
//             updatedItems = state.items.map((item, index) =>
//               index === existingItemIndex
//                 ? { ...item, quantity: item.quantity + newItem.quantity }
//                 : item
//             );
//           } else {
//             updatedItems = [...state.items, newItem];
//           }

//           return {
//             items: updatedItems,
//             ...calculateTotals(updatedItems),
//           };
//         }),
//       removeItem: (itemId) =>
//         set((state) => {
//           const updatedItems = state.items.filter((item) => item.id !== itemId);
//           return {
//             items: updatedItems,
//             ...calculateTotals(updatedItems),
//           };
//         }),
//       updateQuantity: (itemId, quantity) =>
//         set((state) => {
//           const updatedItems = state.items.map((item) =>
//             item.id === itemId ? { ...item, quantity } : item
//           );
//           return {
//             items: updatedItems,
//             ...calculateTotals(updatedItems),
//           };
//         }),
//       clearCart: () =>
//         set({
//           items: [],
//           subtotal: 0,
//           vat: 0,
//           total: 0,
//         }),
//     }),
//     {
//       name: 'cart-storage',
//     }
//   )
// ); 