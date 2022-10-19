let orderedProducts = []

function getPurchasedProducts() {
    let productIds = storageService.getFromLocalStorage("productIds")
    if (productIds && productIds.length > 0) {
        axios.post('https://localhost:44319/api/Products/GetByIds', {
            productIds: productIds
        })
            .then(function (response) {
                orderedProducts = response.data
                createProductRow()
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

getPurchasedProducts()

function createProductRow() {
    let body = document.getElementById('product')
    let total = document.getElementById('total')
    total.innerHTML = subtotal() + 'den'

    orderedProducts.forEach(product => {
        let row = document.createElement('tr')
        body.appendChild(row)

        let td = document.createElement('td')
        row.appendChild(td)

        let nekiDiv = document.createElement('div')
        nekiDiv.classList.add('col-sm-10')
        td.appendChild(nekiDiv)

        let productName = document.createElement('h6')
        productName.innerHTML = product.name
        nekiDiv.appendChild(productName)

        let productPrice = document.createElement('td')
        productPrice.innerHTML = product.price
        row.appendChild(productPrice)

        let productQuantity = document.createElement('td')
        productQuantity.classList.add('text-center')
        productQuantity.innerHTML = 1
        row.appendChild(productQuantity)
    });
}

function subtotal() {
    return orderedProducts.map(x => x.price).reduce((a, b) => a + b, 0)
}

function create() {
    let productIds = storageService.getFromLocalStorage("productIds");

    if (productIds.length > 0) {
        let price = subtotal()
        let name = document.getElementById('name').value
        let lastName = document.getElementById('lastName').value
        let address = document.getElementById('address').value
        let email = document.getElementById('email').value
        console.log(name)

        axios.post('https://localhost:44319/api/Orders/Add', {
            productIds: productIds,
            price: price,
            name: name,
            lastName: lastName,
            address: address,
            email: email,
        })
            .then(function (response) {
                let body = document.getElementById('product')
                let total = document.getElementById('total')
                body.innerHTML = ''
                total.innerHTML = ''
                storageService.clearStorage("productIds")
                alert("Purchase finished")
                window.location.href = 'index.html'
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}