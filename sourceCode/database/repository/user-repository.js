const { UserModel } = require("../models");

//Dealing with data base operations
class UserRepository {
  async CreateUser({ role, email, password, name, address, cui }) {
    const user = new UserModel({
      role,
      email,
      password,
      name,
      address,
      cui,
    });

    const customerResult = await user.save();
    return customerResult;
  }


  async FindUser({ email }) {
    const existingUser = await UserModel.findOne({ email: email });
    return existingUser;
  }

  async FindUserById({ id }) {
    const existingUser = await UserModel.findById(id).populate("address");

    // await existingUser.save();
    return existingUser;
  }

  async Wishlist(customerId) {
    const profile = await UserModel.findById(customerId).populate("wishlist");

    return profile.wishlist;
  }

  async AddWishlistItem(
    customerId,
    { _id, name, desc, price, available, banner }
  ) {
    const product = {
      _id,
      name,
      desc,
      price,
      available,
      banner,
    };

    const profile = await UserModel.findById(customerId).populate("wishlist");

    if (profile) {
      let wishlist = profile.wishlist;

      if (wishlist.length > 0) {
        let isExist = false;
        wishlist.map((item) => {
          if (item._id.toString() === product._id.toString()) {
            const index = wishlist.indexOf(item);
            wishlist.splice(index, 1);
            isExist = true;
          }
        });

        if (!isExist) {
          wishlist.push(product);
        }
      } else {
        wishlist.push(product);
      }

      profile.wishlist = wishlist;
    }

    const profileResult = await profile.save();

    return profileResult.wishlist;
  }

  async AddCartItem(customerId, { _id, name, price, banner }, qty, isRemove) {
    const profile = await UserModel.findById(customerId).populate("cart");

    if (profile) {
      const cartItem = {
        product: { _id, name, price, banner },
        unit: qty,
      };

      let cartItems = profile.cart;

      if (cartItems.length > 0) {
        let isExist = false;
        cartItems.map((item) => {
          if (item.product._id.toString() === _id.toString()) {
            if (isRemove) {
              cartItems.splice(cartItems.indexOf(item), 1);
            } else {
              item.unit = qty;
            }
            isExist = true;
          }
        });

        if (!isExist) {
          cartItems.push(cartItem);
        }
      } else {
        cartItems.push(cartItem);
      }

      profile.cart = cartItems;

      return await profile.save();
    }

    throw new Error("Unable to add to cart!");
  }

  async AddOrderToProfile(customerId, order) {
    const profile = await UserModel.findById(customerId);

    if (profile) {
      if (profile.orders == undefined) {
        profile.orders = [];
      }
      profile.orders.push(order);

      profile.cart = [];

      const profileResult = await profile.save();

      return profileResult;
    }

    throw new Error("Unable to add to order!");
  }
}

module.exports = UserRepository;
