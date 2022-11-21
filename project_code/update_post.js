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

window.onload = async function () {
	const updateBody = JSON.parse(localStorage.getItem('updateBody'));
    document.getElementById('title').value = updateBody.item_name;
	document.getElementById('category').value = updateBody.category;
	document.getElementById('brand').value = updateBody.brand;
	document.getElementById('color').value = updateBody.color;
	document.getElementById('date_lost').value = updateBody.date_lost;
	document.getElementById('time_lost').value = updateBody.time_lost;
	document.getElementById('where_you_lost').value = updateBody.address;
    document.getElementById('add_info').value = updateBody.additonal;

	console.log(window.location.origin);


}

const bool = localStorage.getItem('updateBody').is_found;

async function updatePost() {
	const title = document.getElementById('title').value;
	const category = document.getElementById('category').value;
	const brand = document.getElementById('brand').value;
	const color = document.getElementById('color').value;
	const date_lost = document.getElementById('date_lost').value;
	const time_lost = document.getElementById('time_lost').value;
	const where_you_lost = document.getElementById('where_you_lost').value;
	const add_info = document.getElementById('add_info').value;

    const username = localStorage.getItem('username');
	if (!username) {
		localStorage.setItem('nextPage', './submit_lost_item.html');
		window.location.href = './login.html';
	}

    const response = await fetch(window.location.origin + '/item/update', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			username: username,
			item_name: title,
			category: category,
			brand: brand,
			color: color,
			date_lost: date_lost,
			time_lost: time_lost,
			address: where_you_lost,
			additonal: add_info,
			//is_found: submitType==='lost'?'n':'y',
		})
	});

    console.log(response);
	if (response.ok) {

		localStorage.removeItem('item');
		localStorage.removeItem('location');
		document.getElementById('title').value = '';
		document.getElementById('where_you_lost').value = '';
		if (response.redirected) {
			localStorage.setItem('nextPage', './post_detail.html');
			window.location.href = response.url;
		}
		const resp = await response.json();
		console.log(resp);
		if (resp.status === 'success') {
			window.location.href = './post_detail.html';
			// localStorage.setItem('nextPage', './post_detail.html');
		} else {
			alert('Error Processing Data');
		}
	} else {
		alert('Server Error');
	}
}
