// Navbar functions
function goLogin(){
    window.location.href = "./login.html";
}

function goHome() {
	window.location.href = "./index.html";
}

function goProfile(){
    window.location.href = "./profile.html";
}

function submitFound() {
	localStorage.removeItem('item');
	localStorage.removeItem('location');
}

// Submit Found Item functions
window.onload = async function () {
	const item = localStorage.getItem('item');
	const location = localStorage.getItem('location');
	const fromPage = localStorage.getItem('fromPage');
	if(fromPage && fromPage === 'index') {
		if (item && location) {
			document.getElementById('title').value = item;
			document.getElementById('where_you_found').value = location;
		}
	}
	console.log(window.location.origin);
}

async function submitFoundItem() {
	localStorage.removeItem('item');
	localStorage.removeItem('location');
	const title = document.getElementById('title').value;
	const category = document.getElementById('category').value;
	const brand = document.getElementById('brand').value;
	const color = document.getElementById('color').value;
	const date_found = document.getElementById('date_found').value;
	const time_found = document.getElementById('time_found').value;
	const where_you_found = document.getElementById('where_you_found').value;
	const add_info = document.getElementById('add_info').value;

	if (!title || !category || !date_found || !time_found || !where_you_found) {
        alert("Please fillout the information with *, then submit your post.");
		return;
    }
	
	const response = await fetch(localStorage.getItem('host') + '/item/create', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title: title,
			category: category,
			brand: brand,
			color: color,
			date_found: date_found,
			time_found: time_found,
			where_you_found: where_you_found,
			add_info: add_info
		})
	});

	const passBody = {
		title: title,
		category: category,
		brand: brand,
		color: color,
		date_found: date_found,
		time_found: time_found,
		where_you_found: where_you_found,
		add_info: add_info
	};

	if (response.ok) {
		const resp = await response.json();
		console.log(resp);
		if (resp.status === 'success') {
			window.location.href = './post_detail.html';
			localStorage.setItem('fromPage', 'submit_found_item');
			localStorage.setItem('passBody', JSON.stringify(passBody));
		} else {
			alert('error!one');
		}
	} else {
		console.log(response);
		alert('error!two');
	}
	localStorage.removeItem('item');
	localStorage.removeItem('location');
	document.getElementById('title').value = '';
	document.getElementById('where_you_found').value = '';
}