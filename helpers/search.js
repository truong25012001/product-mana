module.exports = (query) => {
	let objectSearch = {
		keyword : "",
		regex : ""
	}

	if(query.keyword){
		objectSearch.exportskeyword = query.keyword;
		const regex = new RegExp(keyword,"i");
		objectSearch.regex = regex;
	}
	return objectSearch;
}