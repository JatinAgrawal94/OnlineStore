let products = [];
// Temporary product_id for testing. Change it to RANDOMLY GENERATE WITH MYSQL per instructions.
let product_id = 0;
// Temporary user_id for testing. Change it to assign ID when someone makes an account.
let user_id = 1;

document.getElementById('add-item-button').addEventListener('click', open_add_item_modal);
document.getElementById('save-review-button').addEventListener('click', function() {
    const product_id = document.getElementById('add-review-modal').dataset.product_id;
    save_review(Number(product_id));
});



// Open results.
function open_results_modal() {
    close_all_modals();
    const results_modal = document.getElementById('results-modal');
    results_modal.style.display = "block";
}

// Display modal corresponding to button clicked.
const buttons = document.querySelectorAll('#button-grid button');
buttons.forEach((button, index) => {
    button.addEventListener('click', function() {
        close_all_modals();
        const modal = document.getElementById(`modal-${index + 1}`);
        if (modal) {
            modal.style.display = "block";
        }
    });
});

// Add submit button to each search modal that opens the results page. Will need to customize based on search options.
const submit_buttons = document.querySelectorAll('.search-modals button');
submit_buttons.forEach((submitButton, index) => {
    submitButton.addEventListener('click', open_results_modal);
});

// Adds a close button to every modal throughout all the code.
const close_buttons = document.querySelectorAll('.close');
close_buttons.forEach((closeButton) => {
    closeButton.addEventListener('click', close_all_modals);
});

// Update page to display products passed to it.
function display_products(products) {

    const product_list = document.getElementById('product-list');
    product_list.innerHTML = "";
    if(products.length==0){
        const p=document.createElement('p')
        p.innerHTML="No Products to Display"
        product_list.append(p)
    }else{

        const tr = document.createElement('tr');
        tr.innerHTML = `
        <th>TITLE</th>
        <th>DESCRIPTION}</th>
        <th>PRICE</th>
        <th>Posted By</th>
        <th>Date</th>
        <th>Review</th>`;
        product_list.appendChild(tr);
        
        products.forEach(product => {
            const product_div = document.createElement('tr');
            // Change this to get the Username from the database with the user_id. Display the username instead of ID.
            // Also, check the database if the user has already favorited a seller/item or not. If so, change Favorite to Unfavorite dynamically.
        product_div.innerHTML = `
            <th>${product.TITLE}</th>
            <th>${product.DESCRIPTION}</th>
            <th>$${product.PRICE}</th>
            <th>${product.USERNAME}</th>
            <th>${product.DATE.split('T')[0]}</th>
            <th><div class="button-container">
                <button onclick="open_add_review_modal(${product.PRODUCTID})">Add</button>
                <button onclick="open_show_reviews_modal(${product.PRODUCTID})">Show</button>
            </div></th>      
            `;
            product_list.appendChild(product_div);
        });
    }
}

// Open the add item modal
// FUNCTION TO ADD NEW ITEMS.
function open_add_item_modal() {
    const modal = document.getElementById('add-item-modal');
    let button=modal.getElementsByTagName('button')[0];
    let form=document.getElementById('add-item-form')
    modal.style.display = "block";
}

function insertProducttoDB(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",'/product/new', true);
    xhttp.setRequestHeader('Content-type',"application/json")
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(xhttp.responseText==3){
                alert("You can't add more than 3 products in a day.");
            }else if(xhttp.status==200){
                document.location.reload();
            }
        }
    };
    let data={
        'TITLE':document.getElementById('new-item-title').value,
        "PRICE":parseInt(document.getElementById('new-item-price').value),
        "CATEGORY":document.getElementById('new-item-category').value,
        "DESCRIPTION":document.getElementById('new-item-description').value,
        "USERNAME":localStorage.getItem('username')
    }
    xhttp.send(JSON.stringify(data));
}



// Open the add-review modal.
function open_add_review_modal() {
    // console.log("Hello ji")
    const modal = document.getElementById('add-review-modal');
    modal.dataset.product_id = 1;
    modal.style.display = "block";
}
const addreview= document.getElementById('addreview')
const showreview=document.getElementById('showreview')
// addreview.addEventListener("click",(e)=>{
//     open_add_review_modal(addreview.getAttribute('data-productid'))
// })

// showreview.addEventListener("click",(e)=>{
//     open_show_reviews_modal(showreview.getAttribute('data-productid'))
// })

// Open the reviews modal.
function open_show_reviews_modal(product_id) {
    const modal = document.getElementById('show-reviews-modal');
    modal.dataset.product_id = product_id
    const reviews_list = document.getElementById('review-list');
    reviews_list.innerHTML = '';
    const product = products.find(p => p.product_id === product_id);
    
    if (product && product.reviews && product.reviews.length > 0) {
        product.reviews.forEach(review => {
            const review_div = document.createElement('div');
            // Change this to get the Username from the database with the user_id. Display the username instead of ID.
            // So instead of "User 1" it should say something like "jatin0810"
            review_div.innerHTML = `
                <button onclick="remove_review(${review.user_id}, ${product_id})">X</button> User ${review.user_id}: ${review.rating}${review.review_text ? ', ' + review.review_text : ''}
            `;
            reviews_list.appendChild(review_div);
        });
    } else {
        reviews_list.textContent = 'None';
    }
    
    modal.style.display = "block";
}

// Save a new review.
function save_review(product_id) {
    const rating = document.getElementById('review-rating').value;
    const review_text = document.getElementById('review-text').value;
    //  Make sure the user_id it saves is the one of the currently authorized user. Currently, it uses the number 1 as a test user.
    const review = {
        user_id: user_id,
        rating: rating,
        review_text: review_text
    };
    const product = products.find(p => p.product_id === product_id);
    product.reviews.push(review);
    close_all_modals();
}

function remove_review(user_id, product_id) {
    // Make sure a user can only remove their own review. Do a database check to see if the review was made by the currently authorized user.
    // For the sake of this assignment it might be easiest to store the current user's ID in the browser's localtstorage and use that for our
    // authentication. It isn't secure, but this assignment is about databases, not security.
    const product = products.find(p => p.product_id === product_id);
    // This doesn't work if someone can leave more than 1 review for the same product. I assume you will block that.
    const review_index = product.reviews.findIndex(r => r.user_id === user_id);
    product.reviews.splice(review_index, 1);
    open_show_reviews_modal(product_id);
}

function close_all_modals() {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        modals[i].style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        close_all_modals();
    }
}

document.getElementById('logout-button').addEventListener('click',(e)=>{
    localStorage.removeItem('username')
    window.location.replace('/')
})

suggestion=document.getElementById("category-suggestions-input")

// suggestion.addEventListener('load',(e)=>{
//     console.log(e.target.value)
//     getProductsAccToCategory(e.target.value)
// })

suggestion.addEventListener('input',(e)=>{
    getProductsAccToCategory(e.target.value)
})

function getProductsAccToCategory(filter){
   
    var xhttp = new XMLHttpRequest();
    if(filter.trim()==""){
        xhttp.open("GET",`/product/category?category=all`, true);    
    }else{
        xhttp.open("GET",`/product/category?category=${filter}`, true);
    }
    xhttp.setRequestHeader('Content-type',"application/json")
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let result=JSON.parse(xhttp.responseText);
            display_products(result['response'])
        }
    };
    xhttp.send()
    
}

document.addEventListener('DOMContentLoaded',()=>{
    getProductsAccToCategory("");
})