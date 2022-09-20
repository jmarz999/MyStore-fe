let products = []

function getAll() {
    axios.get('https://localhost:44319/api/Products/GetAll')
        .then(function (response) {
            console.log(response)
            products = response.data;
            createProductCards()
        })
        .catch(function (error) {
            console.log(error);
        });
}

function createProductCards() {
    let cardContainer = document.getElementById('card-container');

    products.forEach(product => {
        let col = document.createElement('div');
        col.classList.add('col-lg-4');
        col.classList.add('col-sm-4');
        cardContainer.appendChild(col);

        let boxMain = document.createElement('div');
        boxMain.classList.add('box_main');
        col.appendChild(boxMain);

        let title = document.createElement('h4');
        title.classList.add('shirt_text');
        title.innerHTML = product.name;
        boxMain.appendChild(title);

        let price = document.createElement('p');
        price.classList.add('price_text');
        price.innerHTML = `Price <span style="color: #262626;">${product.price} den</span>`;
        boxMain.appendChild(price);

        let imageContainer = document.createElement('div');
        imageContainer.classList.add('tshirt_img');
        boxMain.appendChild(imageContainer);

        let image = document.createElement('img');
        image.src = product.img;
        imageContainer.appendChild(image);

        let btnContainer = document.createElement('div');
        btnContainer.classList.add('btn_main');
        boxMain.appendChild(btnContainer);

        let buyBtnContainer = document.createElement('div');
        buyBtnContainer.classList.add('buy_bt');
        btnContainer.appendChild(buyBtnContainer);

        let buyBtn = document.createElement('a');
        buyBtn.innerHTML = 'Buy Now';
        buyBtn.onclick = function (e) {
            buy(e, product.id)
        };
        buyBtnContainer.appendChild(buyBtn);

        let seeMoreBtnContainer = document.createElement('div');
        seeMoreBtnContainer.classList.add('seemore_bt');
        btnContainer.appendChild(seeMoreBtnContainer);

        let seeMoreBtn = document.createElement('a');
        seeMoreBtn.innerHTML = 'See More';
        seeMoreBtn.setAttribute('data-toggle', 'modal')
        seeMoreBtn.setAttribute('data-target', '#exampleModal')
        seeMoreBtn.onclick = function (e) {
            createModal(e, product.id)
        }
        seeMoreBtnContainer.appendChild(seeMoreBtn);
       
        if (storageService.existingStorage(product.id, "productIds")) {
            buyBtn.innerHTML = "Remove From Cart"
            buyBtn.onclick = function (event) { removeFromCart(event, product.id) }
        } else {
            buyBtn.innerHTML = "Add To Cart"
            buyBtn.onclick = function (event) { addToCart(event, product.id) }
        }
    });

}

function addToCart(event, id) {
    storageService.addToLocalStorage(id, "productIds");
    event.target.innerHTML = "Remove from Cart";
    event.target.onclick = function (event) { removeFromCart(event, id); };
}

function removeFromCart(event, id) {
    storageService.removeFromLocalStorage(id, "productIds");
    event.target.innerHTML = "Add To Cart";
    event.target.onclick = function (event) { addToCart(event, id); };
}

function createModal(e, productId) {

    axios.get(`https://localhost:44319/api/Products/GetById?id=${productId}`)
        .then(function (response) {
            let product = response.data;
            console.log(product)

            let modalBody = document.getElementById('modal-body');
            let text = document.createElement('span')
            text.innerHTML = product.description
            modalBody.appendChild(text)
            let title = document.getElementById('title')
            title.innerHTML = product.name
        })
        .catch(function (error) {
            console.log(error);
        });
}

function buy(e, id) {
    storageService.addToLocalStorage(id, "productItems")
}

getAll();