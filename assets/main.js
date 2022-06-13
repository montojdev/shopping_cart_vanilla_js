let shop = document.getElementById('shop')

let basket = JSON.parse(localStorage.getItem("data"));
basket = !basket ? [] : basket;

let generateShop = () => {
	return shopItemsData.map(ele => {
		console.log(basket);
		let {id,name,desc,price,img} = ele; //object desestructing
		// id = parseInt(id);
		let search = basket.find((x) => x.id == id) || []
		return `
		<div class="item" id=product-id-${id}>
			<img src=${img} alt="my first image">
			<div class="details">
				<h3>${name}</h3>
				<p>${desc}</p>
				<div class="price-quantity">
					<h2>$ ${price}</h2>
					<div class="button">
						<i onclick="decrement(${id})" class="bi bi-dash"></i>
						<div id=${id} class="quantity">
							${search.item === undefined ? 0 : search.item}
						</div>
						<i onclick="increment(${id})" class="bi bi-plus"></i>
					</div>
				</div>
			</div>
		</div>
	`}).join("");
}

shop.innerHTML = generateShop();

const increment = (id) => {
	debugger
	let search = basket.find(ele => ele.id == id);
	if (search === undefined || search === 0) {
		basket.push({
			id: id,
			item: 1
		})
	} else {
		search.item++;
	}
	localStorage.setItem("data", JSON.stringify(basket));
	// console.log(basket);
	updateQuantity(id);
}

const decrement = (id) => {
	let search = basket.find(x => x.id == id);
	// if (search && search.item > 0) {
	// 	search.item -= 1;
	// } else if (search.item === undefined || search.item === 0) {
	// 	return;
	// }
	if (!search.item) return;
	search.item -= 1;
	
	updateQuantity(id);
	basket = basket.filter(ele => ele.item !== 0);
	localStorage.setItem("data", JSON.stringify(basket));
}

const updateQuantity = id => {
	let search = basket.find(x => x.id == id);
	document.getElementById(id).textContent = search.item;	
	setShopIconItems();
}

//sum the items to print them on the shop icon
const setShopIconItems = ()=>{
	let cartAmount = document.querySelector("#cartAmount");
	let totalItems = basket.map(ele => ele.item).reduce((acum,cur)=> acum + cur, 0); //map returns an arr, then walk the array using reduce method
	cartAmount.textContent = totalItems;
}
setShopIconItems();