const mongoose = require("mongoose");

module.exports.connect = async() => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log("kết nối thành công!!");
	} catch (error) {
		console.log("Thất bại!!");
		
	}
}

