let products = []
let brands = []
let categories = []
let orders = []


function getAllProducts() {
    axios.get('https://localhost:44319/api/Products/GetAll')
        .then(function (response) {
            products = response.data;
            createProductCards()
            let select = document.getElementById('products')

            products.forEach(product => {
                let option = document.createElement('option')
                option.innerHTML = product.name
                option.value = product.name
                select.appendChild(option)
            });
            createSearchOptions();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function createProductCards() {
    let cardContainer = document.getElementById('card-container');
    let cardRow = document.createElement('div')
    cardRow.classList.add('row')
    cardRow.id = 'card-row'
    cardContainer.appendChild(cardRow)

    products.forEach(product => {
        let col = document.createElement('div');
        col.classList.add('col-lg-4');
        col.classList.add('col-sm-4');
        cardRow.appendChild(col);

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

function search(e) {

    let cardRow = document.getElementById('card-row')
    cardRow.remove()

    let productInput = document.getElementById('products').value

    let manufacturerInput = document.getElementById('brands').value

    let categoryInput = document.getElementById('category').value

    axios.get(`https://localhost:44319/api/Products/GetAll?product=${productInput}&manufacturer=${manufacturerInput}&category=${categoryInput}`)
        .then(function (response) {
            products = response.data;
            createProductCards()
        })
        .catch(function (error) {
            console.log(error);
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
            let modalBody = document.getElementById('modal-body');

            let text = document.getElementById('manufacturer')
            text.innerHTML = product.description
            modalBody.appendChild(text)

            let title = document.getElementById('title')
            title.innerHTML = product.name + ` from ${product.manufacturers}`
        })
        .catch(function (error) {
            console.log(error);
        });
}

function createSearchOptions() {
    axios.get('https://localhost:44319/api/Products/GetManifactureres')
        .then(function (response) {
            brands = response.data
            let select = document.getElementById('brands')

            brands.forEach(product => {
                let option = document.createElement('option')
                option.innerHTML = product
                option.value = product
                select.appendChild(option)
            });
        })
        .catch(function (error) {
            console.log(error);
        });

    axios.get('https://localhost:44319/api/Products/GetCategory')
        .then(function (response) {
            categories = response.data
            let select = document.getElementById('category')

            categories.forEach(product => {
                let option = document.createElement('option')
                option.innerHTML = product
                option.value = product
                select.appendChild(option)
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function buy(e, id) {
    storageService.addToLocalStorage(id, "productItems")
}

getAllProducts();