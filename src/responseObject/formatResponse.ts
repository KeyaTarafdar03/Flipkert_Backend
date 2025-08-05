export const userCartFormater = async (user: any) => {
  try {
    const updatedUser = await user.populate("cart.product");
    const cart = updatedUser.cart;

    let newCart: any[] = [];

    cart.forEach((item: any) => {
      const product = item.product;

      const colorObj = product.colorCategory?.find(
        (i: any) => i.color === item.color
      );
      const sizeObj = product.sizeCategory?.find(
        (i: any) => i.size === item.size
      );

      const newProduct: any = {
        _id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        highlights: product.highlights,
        category: product.category,
        image: colorObj?.image || product.image,
        color: colorObj?.color,
        size: sizeObj?.size,
        isOutOfStock: colorObj?.image
          ? colorObj?.isOutOfStock
          : sizeObj?.size
          ? sizeObj?.isOutOfStock
          : product.isOutOfStock,
      };

      if (!newProduct.color) delete newProduct.color;
      if (!newProduct.size) delete newProduct.size;

      newCart.push({ count: item.count, product: newProduct });
    });

    return newCart;
  } catch (err: any) {
    console.error("Error in userCartFormater:", err.message);
    return [];
  }
};

export const userWishlistFormater = async (user: any) => {
  try {
    const updatedUser = await user.populate("wishlist.product");
    const wishlist = updatedUser.wishlist;

    let newWishlist: any[] = [];

    wishlist.forEach((item: any) => {
      const product = item.product;

      const colorObj = product.colorCategory?.find(
        (i: any) => i.color === item.color
      );

      const newProduct: any = {
        _id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        highlights: product.highlights,
        category: product.category,
        image: colorObj?.image || product.image,
        color: colorObj?.color,
        isOutOfStock: colorObj?.image
          ? colorObj?.isOutOfStock
          : product.isOutOfStock,
      };

      if (!newProduct.color) delete newProduct.color;

      newWishlist.push(newProduct);
    });

    return newWishlist;
  } catch (err: any) {
    console.error("Error in userWishlistFormater:", err.message);
    return [];
  }
};

export const userOrderFormater = async (user: any) => {
  try {
    const updatedUser = await user.populate({
      path: "order",
      populate: { path: "products.product" },
    });

    let orders = updatedUser.order;

    let newOrders: any[] = [];

    orders.forEach((order: any) => {
      let newProducts: any[] = [];
      order.products.forEach((product: any) => {
        const colorObj = product.product.colorCategory?.find(
          (i: any) => i.color === product.color
        );

        const sizeObj = product.product.sizeCategory?.find(
          (i: any) => i.size === product.size
        );

        const newProduct: any = {
          _id: product.product._id,
          name: product.product.name,
          price: product.product.price,
          description: product.product.description,
          highlights: product.product.highlights,
          category: product.product.category,
          image: colorObj?.image || product.product.image,
          color: colorObj?.color,
          size: sizeObj?.size,
        };

        if (!newProduct.color) delete newProduct.color;
        if (!newProduct.size) delete newProduct.size;

        newProducts.push({ count: product.count, product: newProduct });
      });

      const newOrder = {
        _id: order._id,
        totalAmount: order.totalAmount,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt,
        products: newProducts,
      };
      newOrders.push(newOrder);
    });
    return newOrders;
  } catch (err: any) {
    console.error("Error in userOrderFormater:", err.message);
    return [];
  }
};
