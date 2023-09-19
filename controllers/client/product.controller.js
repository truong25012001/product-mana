const Product = require("../../models/product.model.js");
module.exports.index = async(req, res) => {
	const products = await Product.find({
		status: "active",
		deleted: false
		
	}).sort({position: "desc"});

	const newProducts = products.map(item => {
		item.priceNew = (item.price*(100 - item.discountPercentage)/100).toFixed(0);
		return item;
	})

	
	res.render("client/page/products/index",{
		pageTitle:"Danh sách sản phẩm",
		 newProducts : newProducts
	});
}

//[GET] /product
module.exports.detail = async (req, res) => {

	try {
		const find = {
			deleted: false,
			slug: req.params.slug,
			status: "active"
		}

		const product = await Product.findOne(find);
		res.render("client/page/products/detail",{
			pageTitle:"Chi tiết sản phẩm",
			 product: product
		});

	} catch (error) {
		res.redirect(`/product`);
	}
	
}