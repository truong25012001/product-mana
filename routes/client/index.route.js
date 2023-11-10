const productRouter = require("./product.route");
const homeRouter = require("./home.route");

const categoryMiddleware = require("../../middlewares/client/category.middleware");

const searchRoutes = require("./search.route");

const cartMiddleware = require("../../middlewares/client/cart.middleware");

const cartRoutes = require("./cart.route");

const checkoutRoutes = require("./checkout.route");

const userRoutes = require("./user.route");

const userMiddleware = require("../../middlewares/client/user.middleware");
module.exports = (app) => {
	app.use(categoryMiddleware.category);
	app.use(cartMiddleware.cartId);
	app.use(userMiddleware.infoUser);
	app.use('/', homeRouter);
	app.use('/product', productRouter);
	app.use('/search', searchRoutes);
	
	app.use("/cart", cartRoutes);
	app.use("/user", userRoutes);

	app.use("/checkout", checkoutRoutes);
}