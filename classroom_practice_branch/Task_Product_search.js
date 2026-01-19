
//The Task: The "Product Search & Discount" API

const http = require("http");
const url = require("url");
const fs=(require("fs"));

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { name, price , discount} = parsedUrl.query;

    if(parsedUrl.pathname === "/product" && name && price && discount){
        const discountedPrice = price - (price * (discount / 100));

        const timeStamp = new Date().toISOString();
        const logMessage = `product: ${name}, original price: ${price}, discount: ${discount}%, d iscounted Price: ${discountedPrice} - ${timeStamp}\n`;

        fs.appendFile("product_log.txt", logMessage, (err) => {
            if (err) {
                console.error("Error writing to log file:", err);
            }
        });
    }

});
