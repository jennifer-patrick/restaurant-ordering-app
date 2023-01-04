import { menuArray } from "./data.js"

const orderEl = document.getElementById("order-element")
const form = document.getElementById("form")
let orderArray = []

function renderMenu(){  
    menuArray.forEach(function(menuItem){  
        const menu = document.getElementById("menu")
        menu.innerHTML += `
        <div class="menu-item">
            <h1 class="emoji">${menuItem.emoji}</h1>
            <div class="menu-container">
                <h2 class="menu-item-name">${menuItem.name}</h2>
                <p class="ingredients">${menuItem.ingredients}</p>
                <h4 class="price">£${menuItem.price}</h4>
            </div>
            <button class="add-btn flex-right-align" id="add-btn" data-add="${menuItem.id}">+</button>
        </div>`
    })
}

renderMenu()

document.addEventListener("click", function(e){
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
        
    } else if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
        console.log(e.target.parentElement.classList.add("display-none"))
        
    } else if(e.target.id === `complete-btn`){
        completeOrder()
        
    } else if(e.target.id === `pay-btn`){
        completePayment(e)
    }
    
})

function handleAddClick(menuItemId){
    const targetItem = menuArray.filter(function(item){
        return item.id == menuItemId
   })
   
   const yourOrderEl = document.getElementById("your-order")
   
   if (yourOrderEl.classList.contains("display-none")){
       yourOrderEl.classList.toggle("display-none")
   }
   
   targetItem.forEach(function(item){
       orderArray.push({
           name: `${item.name}`,
           price: `${item.price}`,
           id: `${menuItemId}`
       })
    }) 
    
    renderYourOrder(menuItemId)
}

function renderYourOrder(menuItemId){
        
    // const orderItem = orderArray.filter(function(item){
    //     return item.id == menuItemId
    // })[0]
    
    
    let orderHTML = ``
    
    orderArray.forEach(function(item){
        orderHTML += `
        <div class="order-container">
            <h2>${item.name}</h2>
            <button class="remove-btn" data-remove="${item.id}">Remove</button>
            <h2 class="price flex-right-align">£${item.price}</h2>
       </div>
        `
    })
    
    orderEl.innerHTML = orderHTML
    
    getOrderPrice()
    
}

function handleRemoveClick(orderItemId){
    const orderItem = orderArray.filter(function(item){
        return item.id == orderItemId
    })[0]
    
    const filteredOrderArray = orderArray.filter(function(item){
        return item !== orderItem
    })
    
    orderArray = filteredOrderArray
    
    renderYourOrder()  
}


function getOrderPrice() {
    let orderPrice = 0
    
    // orderArray.forEach(function(item){
    //     orderPrice += item.price 
    // })
    
    for (let i=0;i<orderArray.length;i++){
        orderPrice += Number(orderArray[i].price)
    }
    
    (console.log(orderPrice))
    
     document.getElementById("price-element").innerHTML =`
     <h2>Order total:</h2>
    <h2 class="price flex-right-align">£${orderPrice}</h2>`
}

function completeOrder() {
    document.getElementById("modal").classList.toggle("display-none")
}

function completePayment(e) {
    const formData = new FormData(form)
    const name = formData.get("name")
    
    e.preventDefault()
    
    document.getElementById("modal").classList.toggle("display-none")
    
    document.getElementById("your-order").classList.toggle("order-complete")
    
    document.getElementById("your-order").innerHTML = `
    <h2>Thanks ${name}, your order is on its way!</h2>
    `
}
