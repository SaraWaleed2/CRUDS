let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let CreateBtn = document.getElementById("createBtn")
let tbody = document.getElementById("tbody")
let delteAll = document.getElementById("delteAll")
let mood = "create";
let temp;
let searchmood = 'title';
let search = document.getElementById("search");




// console.log(title,price,taxes,ads,discount,total,count,category,CreateBtn);

function totalPrice() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
        // total.classList.add("color")
        total.style.backgroundColor = "rgb(24, 158, 140)";

    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "rgb(4, 219, 189)";
        // total.classList.remove("colorx");
    }
}

//////////////////////////////////////////////////
//handel data

// let allProducts = [];
let allProducts;
if (localStorage.products != null) {
    allProducts = JSON.parse(localStorage.products)
} else {
    allProducts = [];
}
CreateBtn.onclick = () => {
    let productObj = {
        // id: (allProducts.length),
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()

    }
    if (mood === "create") {
        if (productObj.count > 1) {
            for (var x = 0; x < productObj.count; x++) {
                allProducts.push(productObj)
            }
        }
        else {
            allProducts.push(productObj)
        }
    }
    else {
        allProducts[temp] = productObj
        mood = "create"
        CreateBtn.innerHTML = "Create"
        count.style.display = "block"
    }
    localStorage.setItem("products", JSON.stringify(allProducts))
    // console.log(allProducts);

    clearInputs()
    showData()
}


//////////////////////////////////////////////////
//Clear Inputs

function clearInputs() {
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    total.innerHTML = ""
    count.value = ""
    category.value = ""

}

//////////////////////////////////////////////////
//Show Data

function showData() {
    totalPrice()
    let table = ""
    for (var x = 0; x < allProducts.length; x++) {
        table += `<tr>
<td>${x+1}</td>
<td>${allProducts[x].title}</td>
<td>${allProducts[x].price}</td>
<td>${allProducts[x].taxes}</td>
<td>${allProducts[x].ads}</td>
<td>${allProducts[x].discount}</td>
<td>${allProducts[x].total}</td>
<td>${allProducts[x].count}</td>
<td>${allProducts[x].category}</td>
<td><button class="btn" id="updateBtn" onclick="updateData(${x})">Update</button></td>
<td><button class="btn" id="deleteBtn" onclick="deleteData(${x})">Delete</button></td>
</tr>
    `
    }
    tbody.innerHTML = table
    if (allProducts.length > 0) {
        delteAll.innerHTML = `<button style="width:100%;" class="btn" onclick="deleteAllData()">Delete All(${allProducts.length})</button>`
    } else {
        delteAll.innerHTML = ""
    }
    //     let data = allProducts.map((obj) => {
    //         return `
    //         <tr>
    //                         <td>${obj.id}</td>
    //                         <td>${obj.title}</td>
    //                         <td>${obj.price}</td>
    //                         <td>${obj.taxes}</td>
    //                         <td>${obj.ads}</td>
    //                         <td>${obj.discount}</td>
    //                         <td>${obj.total}</td>
    //                         <td>${obj.count}</td>
    //                         <td>${obj.category}</td>
    //                         <td><button class="btn" id="updateBtn">Update</button></td>
    //                         <td><button class="btn" id="deleteBtn" onclick="deleteData(${obj.id})">Delete</button></td>
    //                     </tr>
    //         `
    //     })

    //     tbody.innerHTML = data.join("")
    //     // console.log(data);
}

showData()

//////////////////////////////////////////////////
//deleteData
function deleteData(x) {
    // console.log(x);
    allProducts.splice(x, 1)
    // console.log(allProducts);
    localStorage.products = JSON.stringify(allProducts);
    showData()
}

//////////////////////////////////////////////////
//deleteAllData

function deleteAllData() {
    localStorage.clear();
    allProducts.splice(0)
    showData()
}

//////////////////////////////////////////////////
//update

function updateData(x) {
    // console.log(x);
    title.value = allProducts[x].title
    price.value = allProducts[x].price
    taxes.value = allProducts[x].taxes
    ads.value = allProducts[x].ads
    discount.value = allProducts[x].discount
    totalPrice()
    category.value = allProducts[x].category
    count.style.display = "none"
    CreateBtn.innerHTML = "Update"
    mood = "update"
    temp = x;
    scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}

//////////////////////////////////////////////////
//Search

function getSearchMood(id) {
    if (id == "SearchTBtn") {
        searchmood = 'title';
        search.placeholder = "Search By Title"
    }
    else {
        searchmood = "category"
        search.placeholder = "Search By Category"
    }
    search.focus()
    search.value = "";
    showData();
    // console.log(searchmood);
}

function searchData(value) {
    let table = "";
    if (searchmood == 'title') {
        for (var x = 0; x < allProducts.length; x++) {
            if (allProducts[x].title.includes(value.toLowerCase())) {
                table += `<tr>
                <td>${x}</td>
                <td>${allProducts[x].title}</td>
                <td>${allProducts[x].price}</td>
                <td>${allProducts[x].taxes}</td>
                <td>${allProducts[x].ads}</td>
                <td>${allProducts[x].discount}</td>
                <td>${allProducts[x].total}</td>
                <td>${allProducts[x].count}</td>
                <td>${allProducts[x].category}</td>
                <td><button class="btn" id="updateBtn" onclick="updateData(${x})">Update</button></td>
                <td><button class="btn" id="deleteBtn" onclick="deleteData(${x})">Delete</button></td>
                </tr>
                    `
            }
        }
    } else {
        for (var x = 0; x < allProducts.length; x++) {
            if (allProducts[x].category.includes(value.toLowerCase())) {
                // if (allProducts[x].category.toLowerCase().includes(value)) {
                table += `<tr>
                <td>${x}</td>
                <td>${allProducts[x].title}</td>
                <td>${allProducts[x].price}</td>
                <td>${allProducts[x].taxes}</td>
                <td>${allProducts[x].ads}</td>
                <td>${allProducts[x].discount}</td>
                <td>${allProducts[x].total}</td>
                <td>${allProducts[x].count}</td>
                <td>${allProducts[x].category}</td>
                <td><button class="btn" id="updateBtn" onclick="updateData(${x})">Update</button></td>
                <td><button class="btn" id="deleteBtn" onclick="deleteData(${x})">Delete</button></td>
                </tr>
                    `
            }
        }
    }
    tbody.innerHTML = table
}