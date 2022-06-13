let label = document.getElementById("label");
let shoppingCart = document.querySelector('#shopping-cart');


let basket = JSON.parse(localStorage.getItem("data")); 
basket = basket === undefined ? [] : basket;

const updateShopIconItems = () => {
	let shopItem = document.querySelector('#cartAmount');
	let totalItems = basket.map(ele => ele.item).reduce((acum,cur) => acum + cur,0);
	shopItem.textContent = totalItems;
}

const generateTotal = () => {
	let total = 0;

	if (basket.length) {
		total = basket.map(product => {
			let search = shopItemsData.find(ele => ele.id == product.id);
			return product.item * search.price;
		}).reduce((acum,cur) => acum + cur, 0 );

		label.innerHTML = `
			<h2> Total Bill: $ ${total} </h2>
			<button class="checkout btnHome">Checkout</button>
			<button class="removeAll btnHome">Clear Cart</button>
		`;
	} else {
		label.innerHTML = `
			<h2>Shopping Cart is Empty</h2>
			<a href="index.html">
				<button class="btnHome">Back to Home</button>
			</a>
		`;
	}
}



let generateCartItems = () => {
		shoppingCart.innerHTML = basket.map(ele => {
			debugger
			let {id, item} = ele;
			let search = shopItemsData.find(ele => ele.id == id) || [];
			console.log(search);
			let {img, name, price} = search; 
			return `
				<div class="cart-item">
					<img width="100" src="${img}" alt=""/>
					<div class="details">
					
						<div class="title-price-x">
							<h4>
								<p>${name}</p>
								<p class="price">$ ${price}</p>
							</h4>
							<i onclick="deleteElement(${id})" class="bi bi-x-lg"></i>
						</div>

						<div class="button">
							<i onclick="decrement(${id})" class="bi bi-dash"></i>
							<div id=${id} class="quantity">${item}</div>
							<i onclick="increment(${id})" class="bi bi-plus"></i>
						</div>

						<h3 id="total-${id}">Total: ${item > 0 ? item * search.price : 0}</h3>

					</div>
				</div>
			`;
		}).join("");
	updateShopIconItems();
	generateTotal();
}

generateCartItems();

const decrement = id => {
	let search = basket.find(ele => ele.id === id);
	if (!search.item) return
	search.item -= 1;
	updateQuantity({id: search.id, quantity: search.item});
	basket = basket.filter(ele => ele.item != 0);
	generateCartItems();
	localStorage.setItem("data", JSON.stringify(basket));
	updateTotal(id);
}

const increment = (id) => {
	let search = basket.find(ele => ele.id === id);
	if (!search) {
		basket.push({id: id, item: 1})
		updateQuantity({id: id, quantity: 1});
	} else {
		search.item +=1;
		updateQuantity({id: id, quantity: search.item});
	}
	localStorage.setItem("data", JSON.stringify(basket));
	search.item > 0 ? updateTotal(id) : '';
}

const updateQuantity = json => {
	document.getElementById(json.id).textContent = json.quantity;
	updateShopIconItems();
	generateTotal();
}

const updateTotal = id => {
	let totalHE = document.getElementById('total-'+id);
	let basketSearch = basket.find(ele => ele.id == id);
	let dataSearch = shopItemsData.find(ele => ele.id == id);
	if (basketSearch) {
		let total = basketSearch.item * dataSearch.price;
		totalHE.textContent = 'Total: '+ total; 
	} else {
		totalHE.textContent = 'Total: ' + 0;
	}
}

const deleteElement = (id) => {
	basket = basket.filter(ele => ele.id != id);
	localStorage.setItem("data", JSON.stringify(basket));
	generateCartItems();
}

document.querySelector('.removeAll').addEventListener('click', function (e) {
	e.stopPropagation();
	basket = [];
	localStorage.setItem("data", JSON.stringify(basket));
	generateCartItems();
});



