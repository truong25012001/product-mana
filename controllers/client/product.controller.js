const Product = require("../../models/product.model.js");

const ProductCategory = require("../../models/product-category.model.js");

const productsHelper = require("../../helpers/products");

const productsCategoryHelper = require("../../helpers/products-category");

module.exports.index = async (req, res) => {
	const products = await Product.find({
		status: "active",
		deleted: false

	}).sort({ position: "desc" });

	const newProducts = productsHelper.priceNewProducts(products);

	res.render("client/page/products/index", {
		pageTitle: "Danh sách sản phẩm",
		newProducts: newProducts
	});
}

// [GET] /product/:slugProduct
module.exports.detail = async (req, res) => {

	try {
		const find = {
			deleted: false,
			slug: req.params.slugProduct,
			status: "active"
		}

		const product = await Product.findOne(find);

		if (product.product_category_id) {
			const category = await ProductCategory.findOne({
				_id: product.product_category_id,
				status: "active",
				deleted: false
			});

			product.category = category;
		}

		product.priceNew = productsHelper.priceNewProduct(product);

		res.render("client/page/products/detail", {
			pageTitle: "Chi tiết sản phẩm",
			product: product
		});

	} catch (error) {
		res.redirect(`/product`);
	}

}

//[GET] /product
module.exports.category = async (req, res) => {


	const category = await ProductCategory.findOne({
		deleted: false,
		status: "active",
		slug: req.params.slugCategory
	});

	const listSubCategory = await productsCategoryHelper.getSubCategory(category.id);

	const listSubCategoryId = listSubCategory.map(item => item.id);

	const product = await Product.find({
		product_category_id: { $in: [category.id, ...listSubCategoryId] },
		deleted: false
	}).sort({ position: "desc" });

	const newProducts = productsHelper.priceNewProducts(product);



	res.render("client/page/products/index", {
		pageTitle: category.title,
		newProducts: newProducts
	});

}