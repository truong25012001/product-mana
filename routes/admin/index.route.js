const dashboardRouter = require("./dashboard.route");
const productdRouter = require("./product.route");
const systemConfig = require("../../config/system");
const productdCategoryRouter = require("./product-category.route");

const roleRoutes = require("./role.route");
const accountRoutes = require("./account.route");

const authRoutes = require("./auth.route");

module.exports = (app) => {
	const PATH_ADMIN = systemConfig.prefixAdmin;
	app.use(PATH_ADMIN + '/dashboard', dashboardRouter);
	app.use(PATH_ADMIN + '/product',productdRouter);
	app.use(PATH_ADMIN + '/product-category',productdCategoryRouter);
	app.use(PATH_ADMIN + "/roles", roleRoutes);
	app.use(PATH_ADMIN + "/accounts", accountRoutes);
	app.use(PATH_ADMIN + "/auth", authRoutes);
}