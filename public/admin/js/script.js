// console.log("ok rồi!!");

// Button status
// cái button-status tự định nghĩa nên phải dùng ngoặc vuông
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
	let url = new URL(window.location.href);

	buttonStatus.forEach(button => {
		button.addEventListener("click", () => {
			const status = button.getAttribute("button-status");
			if (status) {
				url.searchParams.set("status", status);
			} else {
				url.searchParams.delete("status");
			}
			console.log(url.href);
			window.location.href = url.href;
		})
	})
}

//End Button status


// Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
	let url = new URL(window.location.href);
	formSearch.addEventListener("submit", (e) => {
		e.preventDefault();
		const keyword = e.target.elements.keyword.value;
		if (keyword) {
			url.searchParams.set('keyword', keyword);
		} else {
			url.searchParams.delete("keyword");
		}

		window.location.href = url.href;

	})
}
//End Form Search

// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
	let url = new URL(window.location.href);
	buttonPagination.forEach(button => {
		button.addEventListener("click", () => {
			const page = button.getAttribute("button-pagination");
			url.searchParams.set("page", page);
			window.location.href = url.href;
		})
	})
}

//End Pagination

// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
	const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
	const inputId = checkboxMulti.querySelectorAll("input[name='id']");

	inputCheckAll.addEventListener("click", () => {
		console.log(inputCheckAll.checked);
		if (inputCheckAll.checked) {
			inputId.forEach(input => {
				input.checked = true;
			});
		} else {
			inputId.forEach(input => {
				input.checked = false;
			});
		}
	});

	inputId.forEach(input => {
		input.addEventListener("click", () => {
			const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;

			if (countChecked == inputId.length) {
				inputCheckAll.checked = true;
			} else {
				inputCheckAll.checked = false;
			}
		})
	})

}
//End Checkbox Multi


// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
	formChangeMulti.addEventListener("submit", (e) => {

		e.preventDefault();
		const checkboxMulti = document.querySelector("[checkbox-multi]");
		const inputchecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

		const typeChange = e.target.type.value;
		if (typeChange == "delete-all") {
			const isConfirm = confirm("Bạn có chắc muốn xóa những sản phẩm này??");

			if (!isConfirm) {
				return;
			}
		}

		if (inputchecked.length > 0) {
			let ids = [];
			const inputIds = formChangeMulti.querySelector("input[name='ids']");
			inputchecked.forEach(input => {
				const id = input.value;
				if (typeChange == "change-position") {
					const position = input.closest("tr").querySelector("input[name='position']").value;

					ids.push(`${id}-${position}`);


				} else {
					ids.push(id);
				}

			});

			inputIds.value = ids.join(", ");

			formChangeMulti.submit();
		} else {
			alert("Không chọn sub cc à!!");
		}

	});
}
//End Form Change Multi

//Show Alert
const showAlert = document.querySelector("[show-alert]");

if (showAlert) {
	const time = parseInt(showAlert.getAttribute("data-time"));
	setTimeout(() => {
		showAlert.classList.add("alert-hidden");
	}, time);
	console.log(showAlert);

}
//End Show Alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
	const uploadImageInput = document.querySelector("[upload-image-input]");
	const uploadImagePreview = document.querySelector("[upload-image-preview]");
	uploadImageInput.addEventListener("change", (e) => {
		console.log(e);
		const file = e.target.files[0];
		if (file) {
			uploadImagePreview.src = URL.createObjectURL(file);
		}
	})
}
//End Upload Image