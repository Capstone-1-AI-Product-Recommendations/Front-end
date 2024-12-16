// const CartItem = ({ item }) => {
//   const [quantity, setQuantity] = useState(item.quantity || 1);
//   const userId = JSON.parse(localStorage.getItem('user'))?.user_id;

//   const handleQuantityUpdate = async (newQuantity) => {
//     try {
//       if (newQuantity < 1) return;
      
//       await cartService.updateItemInCart(userId, {
//         cart_item_id: item.cart_item_id,
//         quantity: newQuantity
//       });

//       setQuantity(newQuantity);
//     } catch (error) {
//       console.error('Error updating quantity:', error);
//     }
//   };

//   return (
//     <div className="cart-item">
//       {/* ...existing code... */}
//       <div className="quantity-controls">
//         <button 
//           onClick={() => handleQuantityUpdate(quantity - 1)}
//           disabled={quantity <= 1}
//         >
//           -
//         </button>
//         <span>{quantity}</span>
//         <button 
//           onClick={() => handleQuantityUpdate(quantity + 1)}
//         >
//           +
//         </button>
//       </div>
//       {/* ...existing code... */}
//     </div>
//   );
// };