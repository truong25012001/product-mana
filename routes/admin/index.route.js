const dashboardRouter = require("./dashboard.route");
const productdRouter = require("./product.route");
const systemConfig = require("../../config/system");
const productdCategoryRouter = require("./product-category.route");

const authMiddleware = require("../../middlewares/admin/auth.middlewares");

const roleRoutes = require("./role.route");
const accountRoutes = require("./account.route");

const authRoutes = require("./auth.route");

const myAccountRoutes = require("./my-account.route");

module.exports = (app) => {
	const PATH_ADMIN = systemConfig.prefixAdmin;
	app.use(
		PATH_ADMIN + "/dashboard",
		authMiddleware.requireAuth,
		dashboardRouter
	);
	app.use(PATH_ADMIN + "/product", authMiddleware.requireAuth, productdRouter);
	app.use(
		PATH_ADMIN + "/products-category",
		authMiddleware.requireAuth,
		productdCategoryRouter
	);
	app.use(PATH_ADMIN + "/roles", authMiddleware.requireAuth, roleRoutes);
	app.use(PATH_ADMIN + "/accounts", authMiddleware.requireAuth, accountRoutes);
	app.use(PATH_ADMIN + "/auth", authRoutes);

	app.use(PATH_ADMIN + "/my-account", authMiddleware.requireAuth, myAccountRoutes);
}