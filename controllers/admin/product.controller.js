const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const paginationHelper = require("../../helpers/pagination");
const searchHelper = require("../../helpers/search");

const systemConfig = require("../../config/system");

const ProductCategory = require("../../models/product-category.model");

const createTreeHelper = require("../../helpers/createTree");
module.exports.index = async (req, res) => {

	// Đoạn bộ lọc
	const filterStatus = filterStatusHelper(req.query);


	let find = {
		deleted: false,
	}


	// Lấy ra status trên URL
	if (req.query.status) {
		find.status = req.query.status;
	}

	const objectSearch = searchHelper(req.query);
	if (objectSearch.regex) {
		find.title = objectSearch.regex;
	}
	// Pagination
	const countProducts = await Product.count(find);

	let objectPagination = paginationHelper(
		{
			currentPage: 1,
			limitItems: 4
		},
		req.query,
		countProducts
	)

	// console.log(objectPagination.currentPage);
	// End 

	// Sort
	let sort = {};
	if (req.query.sortKey && req.query.sortValue) {
		sort[req.query.sortKey] = req.query.sortValue;
	} else {
		sort.position = "desc";
	}
	//End Sort


	const products = await Product.find(find)
		.sort(sort)
		.limit(objectPagination.limitItems)
		.skip(objectPagination.skip);

	res.render("admin/pages/product/index", {
		pageTitle: "Danh sách sản phẩm",
		product: products,
		filterStatus: filterStatus,
		keyword: objectSearch.keyword,
		pagination: objectPagination
	})
}

//[PATCH] 

module.exports.changeStatus = async (req, res) => {
	const status = req.params.status;
	const id = req.params.id;

	await Product.updateOne({ _id: id }, { status: status });
	req.flash("success", "Cập nhập thành công!");
	res.redirect('back');
}

// [PATHCH]


module.exports.changeMulti = async (req, res) => {
	const type = req.body.type;
	const ids = req.body.ids.split(", ");
	switch (type) {
		case "active":
			await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
			break;
		case "inactive":
			await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
			break;
		case "delete-all":
			await Product.updateMany({ _id: { $in: ids } }, {
				deleted: true,
				deletedAt: new Date(),

			});
			break;
		case "change-position":

			for (const item of ids) {
				let [id, position] = item.split("-");
				position = parseInt(position);

				await Product.updateOne({ _id: id }, { position: position });
			}
			break;
		default:
			break;
	}

	res.redirect("back");

}

// [DELTE]


module.exports.deleteItem = async (req, res) => {

	const id = req.params.id;

	await Product.updateOne({ _id: id }, {
		deleted: true,
		deletedAt: new Date()
	});

	res.redirect('back');
}

//[GET]
module.exports.create = async (req, res) => {

	let find = {
		deleted: false
	};

	const category = await ProductCategory.find(find);

	const newCategory = createTreeHelper.tree(category);

	res.render("admin/pages/product/create", {
		pageTitle: "Thêm mới sản phẩm",
		category: newCategory
	});
}

// [POST]/admin/product/create
module.exports.createPost = async (req, res) => {
	// res.render("admin/pages/product/create", {
	// 	pageTitle: "Thêm mới sản phẩm",
	// });



	req.body.price = parseInt(req.body.price);
	req.body.discountPercentage = parseInt(req.body.discountPercentage);
	req.body.stock = parseInt(req.body.stock);


	if (req.body.position == "") {
		const countProducts = await Product.count();
		req.body.position = countProducts + 1;
	} else {
		req.body.position = parseInt(req.body.position);
	}



	const product = new Product(req.body);

	await product.save();

	res.redirect(`${systemConfig.prefixAdmin}/product`);
}

// [GET] /admin/product/edit/:id
module.exports.edit = async (req, res) => {
	try {
		const find = {
			deleted: false,
			_id: req.params.id
		};

		const product = await Product.findOne(find);


		const category = await ProductCategory.find({
			deleted: false
		});

		const newCategory = createTreeHelper.tree(category);

		res.render("admin/pages/product/edit", {
			pageTitle: "Chỉnh sửa sản phẩm",
			product: product,
			category: newCategory
		});
	} catch (error) {
		res.redirect(`${systemConfig.prefixAdmin}/products`);
	}
};


// [PATCH]/admin/product/edit/:id
module.exports.editPatch = async (req, res) => {
	const id = req.params.id;

	req.body.price = parseInt(req.body.price);
	req.body.discountPercentage = parseInt(req.body.discountPercentage);
	req.body.stock = parseInt(req.body.stock);
	req.body.position = parseInt(req.body.position);



	if (req.file) {
		req.body.thumbnail = `/uploads/${req.file.filename}`;
	}

	try {
		await Product.updateOne({
			_id: id
		}, req.body);
		req.flash("success", "Cập nhật thành công!");
	} catch (error) {
		req.flash("error", "Cập nhật thất bại!");
	}

	res.redirect(`${systemConfig.prefixAdmin}/product`);

}


// [GET] /admin/product/detail/:id
module.exports.detail = async (req, res) => {
	try {
		const find = {
			deleted: false,
			_id: req.params.id
		};

		const product = await Product.findOne(find);

		res.render("admin/pages/product/detail", {
			pageTitle: product.title,
			product: product
		});
	} catch (error) {
		res.redirect(`${systemConfig.prefixAdmin}/products`);
	}
};






