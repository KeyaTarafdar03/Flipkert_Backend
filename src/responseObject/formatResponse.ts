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
