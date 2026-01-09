// Asyn JS - Practice 2

// Task-1 : The order status
function checkOrderStatus(orderId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof orderId === "number") {
                resolve("Order Shipped");
            }
            else {
                reject("Invalid Order ID");
            }
        }, 1000);
    });
}

async function getOrderStatus(orderId) {
    try {
        const res = await checkOrderStatus(orderId);
        console.log(res);
    } 
    catch (error) {
        console.log(error);
    }       
}

getOrderStatus(123);
getOrderStatus("123");
getOrderStatus("ABC");

// Task-2 : The "Multi-Step" Authentication

function getUser(username){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve({ name: "Rahul", type:"Premium"});
        }, 1500);
    });
}

function checkSubscription(user){
    return new Promise((resolve,reject) => {
        if (user.type === "Premium"){
            resolve("Access Granted to Netflix");
        }
        else {
            reject("Please Subscribe");
        }
    });
}

async function Consumer(username){
    try {
        const user = await getUser(username);
        const access = await checkSubscription(user);
        console.log(access);
    }
    catch (error) {
        console.log(error);
    }
}

Consumer("Rahul");

// Task-3 : Smart-Shop Dashboard

//A. functon that return promises
function fetchUser(id){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "Rahul", isPremium: true });
    }, 1000);
  });  
}

function fetchOrders(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { item: "Laptop", price: 1000, status: "delivered" },
        { item: "Phone", price: 500, status: "pending" }
      ]);
    }, 2000);
  });
}

//B. async function
async function displayDashboard(id) {
  try {
    //awaits
    const user = await fetchUser(id); 
    const orders = await fetchOrders(id);

    //filters
    const deliveredOrders = orders.filter(  
      order => order.status === "delivered"
    );

    //maps
    const discountedOrders = deliveredOrders.map(order => {
      if (user.isPremium) {
        return {
          ...order,
          price: order.price * 0.9   
        };
      }
      return order;
    });
    
    //prints
    const total = discountedOrders.reduce(
      (sum, order) => sum + order.price,
      0
    );

    console.log(`Welcome ${user.name}!`);
    console.log("Delivered Orders:", discountedOrders);
    console.log("Final Total:", total);

  } 
  catch (error) {
    console.log("Dashboard Error:", error);
  }
}

displayDashboard(1);

