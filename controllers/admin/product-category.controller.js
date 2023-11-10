
const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");

// [GET] /admin/product-category
module.exports.index = async (req, res) => {
	let find = {
		deleted: false,
	};

	const records = await ProductCategory.find(find);

	const newRecords = createTreeHelper.tree(records);

	res.render("admin/pages/product-category/index", {
		pageTitle: "Danh mục sản phẩm",
		records: newRecords
	});
};

// // [GET] /admin/product-category
// module.exports.index = async (req, res) => {
// 	res.render("admin/pages/product-category/index", {
// 		pageTitle: "Danh mục sản phẩm",
// 	});
// }


module.exports.create = async (req, res) => {

	let find = {
		deleted: false,
	}


	const records = await ProductCategory.find(find);

	const newRecords = createTreeHelper.tree(records);

	res.render("admin/pages/product-category/create", {
		pageTitle: "Tạo danh mục sản phẩm",
		records: newRecords
	});
}

// [POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
	// const permissions = res.locals.role.permissions;
	// if(permissions.includes("products-category_create")){
	// 	console.log("Ban co quyen");
	// } else {
	// 	res.send("403");
	// 	return
	// }

	if (req.body.position == "") {
		const count = await ProductCategory.count();
		req.body.position = count + 1;
	} else {
		req.body.position = parseInt(req.body.position);
	}

	const record = new ProductCategory(req.body);
	await record.save();

	res.redirect(`${systemConfig.prefixAdmin}/product-category`);
};


// [GET] /admin/product-category/edit/:id
module.exports.edit = async (req, res) => {
	try {
		const id = req.params.id;

		const data = await ProductCategory.findOne({
			_id: id,
			deleted: false
		});

		const records = await ProductCategory.find({
			deleted: false
		});

		const newRecords = createTreeHelper.tree(records);

		res.render("admin/pages/product-category/edit", {
			pageTitle: "Chỉnh sửa danh mục sản phẩm",
			data: data,
			records: newRecords
		});
	} catch (error) {
		res.redirect(`${systemConfig.prefixAdmin}/product-category`);
	}
};

// [PATCH] /admin/product-category/edit/:id
module.exports.editPatch = async (req, res) => {
	const id = req.params.id;

	req.body.position = parseInt(req.body.position);

	await ProductCategory.updateOne({ _id: id }, req.body);

	res.redirect("back");
};
