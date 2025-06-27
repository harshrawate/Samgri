import Cart from "../models/cartModel.js";

export const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity = 1 } = req.body; // <-- default to 1

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity; // add selected quantity
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    
    if (!cart) {
      return res.json({ items: [] });
    }

    // Transform to send readable data to frontend
    const cartItems = cart.items.map(item => ({
      id: item.productId._id,
      name: item.productId.title,
      description: item.productId.description,
      price: item.productId.price,
      quantity: item.quantity,
      image: item.productId.media?.[0]?.url || '/placeholder.jpg',
    }));

    res.json({ items: cartItems });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

export const removeFromCart = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const initialLength = cart.items.length;

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await cart.save();
    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// PUT /api/cart/:productId
export const updateCartItemQuantity = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Quantity updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};







