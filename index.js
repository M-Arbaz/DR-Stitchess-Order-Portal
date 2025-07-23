require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const SHOP = process.env.DR_STITCHESS_SHOP;
const ACCESS_TOKEN = process.env.DR_STITCHESS_API_TOKEN;
app.set('trust proxy', true);
const path = require('path');
const corsOpts = {
  origin: '*',

  methods: ['GET', 'POST', 'PUT', 'DELETE'],

  allowedHeaders: ['Content-Type'],
};
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOpts));
console.clear()
async function getCollectionsByProductName(productName) {
  try {
    // Search for the product by name in all orders (limit to latest 250 for performance)
    const response = await axios.get(`https://${SHOP}/admin/api/2024-04/orders.json`, {
      headers: {
        'X-Shopify-Access-Token': ACCESS_TOKEN,
        'Content-Type': 'application/json'
      },
      params: {
        status: 'any',
        limit: 250
      }
    });

    // Find the product in any order
    for (const order of response.data.orders) {
      const product = order.line_items.find(item => item.title === productName);
      if (product) {
        // Get collections for this product
        const collectsResponse = await axios.get(`https://${SHOP}/admin/api/2024-04/collects.json`, {
          headers: {
            'X-Shopify-Access-Token': ACCESS_TOKEN,
            'Content-Type': 'application/json'
          },
          params: {
            product_id: product.product_id
          }
        });
        const collects = collectsResponse.data.collects;

        // Get collection titles
        let collectionTitles = [];
        for (const collect of collects) {
          const collectionResponse = await axios.get(`https://${SHOP}/admin/api/2024-04/custom_collections/${collect.collection_id}.json`, {
            headers: {
              'X-Shopify-Access-Token': ACCESS_TOKEN,
              'Content-Type': 'application/json'
            }
          });
          collectionTitles.push(collectionResponse.data.custom_collection.title);
        }

        // Determine gender from collection titles
        if (collectionTitles.some(title => /women/i.test(title))) {
          return "Female";
        }
        if (collectionTitles.some(title => /men/i.test(title))) {
          return "Male";
        }
        return "Unisex";
      }
    }
    return "Unisex"; // Not found
  } catch (err) {
    console.error('Error fetching collections:', err.response?.data || err.message);
    // return "Unisex";
  }
}

async function getShirtImageByProductName(productName, gender) {
  const ArrayWomen = [

{

name:"Slash Pocket Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Slash-Pocket.jpg?v=1753163537"

},

{

name:"Essential Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Essential.jpg?v=1753163537"

},

{

name:"Front Placket Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Front-Placket_4f8b7716-2bf5-4ef0-8d7e-2951f7999898.jpg?v=1753163537"

},

{

name:"V-Cut Neckline Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/V-Cut-Neckline.jpg?v=1753163537"

},

{

name:"V-Cut Panel Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/V-Cut-Panel.jpg?v=1753163537"

},

{

name:"Two-Pocket Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Two-Pocket.jpg?v=1753163537"

},

{

name:"Round Neckline Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Round-Neckline.jpg?v=1753163537"

},

{

name:"Tri-Pocket Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Tri-Pocket.jpg?v=1753163537"

},

{

name:"Extended V-Neckline Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Extended-V-Neckline.jpg?v=1753163537"

},

{

name:"Premium Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Premium-Scrub.jpg?v=1753163537"

},

{

name:"Criss Cross Neck-Line Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Criss-Cross.jpg?v=1753163537"

},

{

name:"Femme Collar Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Femme-Collar.jpg?v=1753163537"

},

{

name:"Duo-Pocket Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Duo-Pocket.jpg?v=1753163537"

},

{

name:"Kangroo-Pocket Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Kangroo-Pocket_12de7d39-0ce0-47ef-96bb-482a96a4d466.jpg?v=1753163537"

},

{

name:"Classic Slim Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Classic-Slim.jpg?v=1753163536"

},

{

name:"Classic One-pocket Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Classic-One-Pocket.jpg?v=1753163496"

},
// shirts
{

name:"Classic One-Pocket Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Classic-One-Pocket.jpg?v=1753163496"

},
{

name:"Slash Pocket Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Slash-Pocket.jpg?v=1753163537"

},

{

name:"Essential Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Essential.jpg?v=1753163537"

},

{

name:"Front Placket Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Front-Placket_4f8b7716-2bf5-4ef0-8d7e-2951f7999898.jpg?v=1753163537"

},

{

name:"V-Cut Neckline Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/V-Cut-Neckline.jpg?v=1753163537"

},

{

name:"V-Cut Panel Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/V-Cut-Panel.jpg?v=1753163537"

},

{

name:"Two-Pocket Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Two-Pocket.jpg?v=1753163537"

},

{

name:"Round Neckline Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Round-Neckline.jpg?v=1753163537"

},

{

name:"Tri-Pocket Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Tri-Pocket.jpg?v=1753163537"

},

{

name:"Extended V-Neckline Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Extended-V-Neckline.jpg?v=1753163537"

},

{

name:"Premium Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Premium-Scrub.jpg?v=1753163537"

},

{

name:"Criss Cross Neck-Line Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Criss-Cross.jpg?v=1753163537"

},

{

name:"Femme Collar Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Femme-Collar.jpg?v=1753163537"

},

{

name:"Duo-Pocket Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Duo-Pocket.jpg?v=1753163537"

},

{

name:"Kangroo-Pocket Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Kangroo-Pocket_12de7d39-0ce0-47ef-96bb-482a96a4d466.jpg?v=1753163537"

},

{

name:"Classic Slim Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Classic-Slim.jpg?v=1753163536"

},

]

const ArrayMen = [
  {

name:"Two Chest Pocket Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Two-Pocket.jpg?v=1753163537"

},
  {

name:"Essential Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Essential.jpg?v=1753163537"

},

{

name:"Classic Pen-Pocket Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Classic-Pen-Pocket.jpg?v=1753163496"

},

{

name:"Urban Collar Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Urban.jpg?v=1753163496"

},

{

name:"Pouch Pocket Scrub Kit",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Pouch-Pocket.jpg?v=1753163496"

},

{

name:"Premium Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Premium-Male.jpg?v=1753163496"

},

{

name:"Classic One-pocket Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Classic-One-Pocket.jpg?v=1753163496"

},

{

name:"Kangroo Pocket Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Kangroo-Pocket.jpg?v=1753163496"

},

{

name:"Front Loop Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Front-Loop.jpg?v=1753163496"

},

{

name:"Front Placket Scrub Set",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Front-Placket.jpg?v=1753163495"

},
// shirts
{

name:"Two Chest Pocket Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Two-Pocket.jpg?v=1753163537"

},
{

name:"Essential Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Essential.jpg?v=1753163537"

},
{

name:"Classic Pen-Pocket Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Classic-Pen-Pocket.jpg?v=1753163496"

},

{

name:"Urban Collar Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Urban.jpg?v=1753163496"

},

{

name:"Pouch Pocket Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Pouch-Pocket.jpg?v=1753163496"

},

{

name:"Premium Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Premium-Male.jpg?v=1753163496"

},

{

name:"Classic One-Pocket Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Classic-One-Pocket.jpg?v=1753163496"

},

{

name:"Kangroo Pocket Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Kangroo-Pocket.jpg?v=1753163496"

},

{

name:"Front Loop Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Front-Loop.jpg?v=1753163496"

},

{

name:"Front Placket Scrub Shirt",

src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Front-Placket.jpg?v=1753163495"

},

]
const src =
  gender === "Female"
    ? (ArrayWomen.find((item) => item.name === productName)?.src)
    : gender === "Male"
    ? (ArrayMen.find((item) => item.name === productName)?.src)
    : undefined;

return (
  src || "https://cdn.shopify.com/s/files/1/0631/3174/6535/files/images_1.png?v=1753172052"
);


}

async function getPantStyleImages(pantStyle) {
  const Array = [
    {
    name:"Cargo Pants",
    src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Cargo-Pants.jpg?v=1753163517"
  },
   {
    name:"Jogger Pants",
    src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Jogger-Pants.jpg?v=1753163518"
  },
 {
    name:"Flared Pants",
    src:"https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Flare-Pants.jpg?v=1753163517"
  },
];

const src = Array.find((item) => item.name === pantStyle)?.src;

return (
  src || "https://cdn.shopify.com/s/files/1/0631/3174/6535/files/images_1.png?v=1753172052"
);

}

async function getOrderByNumber(orderNumber) {
  // console.clear();
  try {
    const response = await axios.get(`https://${SHOP}/admin/api/2024-04/orders.json`, {
      headers: {
        'X-Shopify-Access-Token': ACCESS_TOKEN,
        'Content-Type': 'application/json'
      },
      params: {
        name: orderNumber,
        status: 'any',
        limit: 1
      }
    });

    const orders = response.data.orders;
    if (orders.length === 0) {
      console.log('Order not found.');
      return 'Order not found.';
    }
    const order = orders[0];
 if (order.cancelled_at || order.financial_status === 'voided') {
      console.log('Order is voided.');
      return "voided";
    }
    // Get product collections
    const productId = order.line_items[0].product_id;
    const collectsResponse = await axios.get(`https://${SHOP}/admin/api/2024-04/collects.json`, {
      headers: {
        'X-Shopify-Access-Token': ACCESS_TOKEN,
        'Content-Type': 'application/json'
      },
      params: {
        product_id: productId
      }
    });
    const collects = collectsResponse.data.collects;

    let collectionTitles = [];
    for (const collect of collects) {
      const collectionResponse = await axios.get(`https://${SHOP}/admin/api/2024-04/custom_collections/${collect.collection_id}.json`, {
        headers: {
          'X-Shopify-Access-Token': ACCESS_TOKEN,
          'Content-Type': 'application/json'
        }
      });
      collectionTitles.push(collectionResponse.data.custom_collection.title);
    }

    // Attach to order object
    order.collection_titles = collectionTitles;
  //  console.log(94)
    // console.log('Order ID:', order.id);
    // console.log('Order Number:', order.name);
    // console.log('Customer:', order.customer?.first_name, order.customer?.last_name);
   
   const filteredItems = order.line_items.filter(item => 
  !(item.properties && item.properties[0] && item.properties[0].name === '_gpo_parent_product_group')
);
const itemCount = filteredItems.length;
order.productCount = itemCount;

 return order;
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

app.get('/',(req,res) => {

    res.sendFile(`${__dirname}/public/index.html`);
})
app.get('/orders/:id', async (req, res) => {
    console.log('Fetching order by number:', req.params.id);
    // return;
    let generatedArray = [];
getOrderByNumber(req.params.id)
.then(async (info) =>{ 
  if (info === "voided"){
    return res.status(404).json({ info: `Order ${req.params.id} is voided or not found.` });
  } 
if(info.productCount > 1){
  // console.log('Multiple items found in order:', info.line_items.length, infoArray.length);
  info.line_items.forEach((item, index) => {
    // console.log(item.properties && item.properties[0] && item.properties[0].name === '_gpo_parent_product_group', 'true/false') && item.properties.length > 0 || item.properties[0].name !== '_gpo_parent_product_group'
    if(item.properties && item.properties[0] && item.properties[0].name === '_gpo_parent_product_group' ) {
      return;
    } else{
        
      console.log(`pushing ${index + 1}:`, "item");

      generatedArray.push(item);
    }
    
  });

// console.log('Generated Array:', generatedArray.length, generatedArray)
const htmlBlocks = await Promise.all(generatedArray.map(async item => {
  const gender = await getCollectionsByProductName(item.title);
  let pantStyle = await item.properties.find(prop => prop.name === 'Trouser Style')?.value || 'N/A';
    const pantStyleImage = await getPantStyleImages(pantStyle);
  const shirtStyle = await getShirtImageByProductName(item.title, gender);
  // shirtStyle();
  return `
    <div class="sepreate">
    <button onclick="removeItemFromList(event)" class="remove-item">X</button>
      <table class="order-table">
        <tbody>
          <tr>
            <th>Order ID</th>
            <td>${info.order_number}</td>
          </tr>
          <tr>
            <th>Product Title</th>
            <td>${item.title}</td>
          </tr>
          <tr>
            <th>Gender</th>
            <td>${gender}</td>
          </tr>
          <tr>
            <th>Fabric</th>
            <td>${item.name ? item.name : '<span style="font-size:0.7rem; color:red;">N/A no GPO option Found</span>'}</td>
          </tr>
          <tr>
            <th>Color</th>
            <td>${item.properties.find(prop => prop.name === 'Color' || prop.name === 'color' || prop.name === 'color-swatches-2')?.value ? item.properties.find(prop => prop.name === 'Color' || prop.name === 'color' || prop.name === 'color-swatches-2')?.value : '<span style="font-size:0.7rem; color:red;">N/A no GPO option Found</span>'}</td>
          </tr>
          <tr>
            <th>Size</th>
            <td>${item.properties.find(prop => prop.name === 'Sizes')?.value ? item.properties.find(prop => prop.name === 'Sizes')?.value : '<span style="font-size:0.7rem; color:red;">N/A no GPO option Found</span>'}</td>
          </tr>
          <tr>
            <th>Embroidery</th>
            <td>${item.properties.find(prop => prop.name === 'Embroidery')?.value ? item.properties.find(prop => prop.name === 'Embroidery')?.value : '<span style="font-size:0.7rem; color:red;">N/A no GPO option Found</span>'}</td>
          </tr>
          <tr>
            <th>Note</th>
            <td style="font-size: 0.7rem;">${info.note ? info.note : 'No Note'}</td>
          </tr>
          <tr>
            <th>Shirt Length</th>
            <td>${item.properties.find(prop => prop.name === 'Shirt length' || prop.name === 'Shirt Length')?.value ? item.properties.find(prop => prop.name === 'Shirt length' || prop.name === 'Shirt Length')?.value : '<span style="font-size:0.7rem; color:red;">N/A no GPO option Found</span>'}</td>
          </tr>
          <tr>
            <th>Trouser Length</th>
            <td>${item.properties.find(prop => prop.name === 'Trouser Length' || prop.name === 'Trouser length')?.value ? item.properties.find(prop => prop.name === 'Trouser Length' || prop.name === 'Trouser length')?.value : '<span style="font-size:0.7rem; color:red;">N/A no GPO option Found</span>'}</td>
          </tr>
          <tr>
            <th>Sleeve Length</th>
            <td>${item.properties.find(prop => prop.name === 'Sleeve length' || prop.name === 'Sleeve Length')?.value ? item.properties.find(prop => prop.name === 'Sleeve length' || prop.name === 'Sleeve Length')?.value : '<span style="font-size:0.7rem; color:red;">N/A no GPO option Found</span>'}</td>
          </tr>
          <tr>
            <th>Trouser Style</th>
            <td>${item.properties.find(prop => prop.name === 'Trouser Style')?.value ? item.properties.find(prop => prop.name === 'Trouser Style')?.value : '<span style="font-size:0.7rem; color:red;">N/A no GPO option Found</span>'}</td>
          </tr>
          <tr>
            <th>Shirt Style</th>
            <td> <img src=${shirtStyle} style='width:50px;height:50px' alt=${shirtStyle}></td>
          </tr>
        </tbody>
      </table>
      <div class="product-image">
        <img src=${shirtStyle} alt=${shirtStyle}>

            <img src="${pantStyleImage}" style="display:none" alt="Pant Style Image">

                     ${item.title === 'Men Cargo Pants' || item.title === 'Women Cargo Pants' ? `<img src="https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Cargo-Pants.jpg?v=1753163517" alt="Variant Image">`
             :item.title === 'Men Jogger Pants' || item.title === 'Women Jogger Pants' ? `<img src="https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Jogger-Pants.jpg?v=1753163518" alt="Variant Image">`
            :item.title === 'Women Flarred Pants' ? `<img src="https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Flare-Pants.jpg?v=1753163517" alt="Variant Image">`: `<img src="${pantStyleImage}" alt='Pant Style Image'>`}
      </div>
    </div>
  `;
}));

res.status(200).json({
  info: `
  <div class="multi">Multiple Items Found</div>
  <div style="flex-wrap:wrap;" class="order-table-container">
    ${htmlBlocks.join('')}
  </div>`
});
generatedArray=[];
// console.log('Generated Array:', generatedArray.length, generatedArray)
return;
}
else{
  let gender = await info.collection_titles.find(title => title.includes('Men')) ? 'Male' : info.collection_titles.find(title => title.includes('Women')) ? 'Female' : 'Unisex';
  let pantStyle = await info.line_items[0].properties.find(prop => prop.name === 'Trouser Style')?.value || 'N/A';
  const shirtStyle = await getShirtImageByProductName(info.line_items[0].title, gender);
  const pantStyleImage = await getPantStyleImages(pantStyle);
res.status(200).json({

  info:`   
  
    
  <div  class="order-table-container">
  <div class="sepreate">
    <button onclick="removeItemFromList(event)" class="remove-item">X</button>
        <table class="order-table" >
          <tbody>
                <tr>
                    <th>Order ID</th>
                       <td>${info.order_number}</td>
                    </tr>
                     <tr>
                    <th>Product Title</th>
                       <td>${info.line_items[0].title}</td>
                    </tr>
                      <tr>
                    <th>Gender</th>
                    <td>${gender}</td>
                    </tr>
                     <tr>
                    <th>Fabric</th>
                    <td>${info.line_items[0].variant_title ? info.line_items[0].variant_title : '<span style="font-size:0.7rem; color:red;">N/A no GPO option Found</span>'}</td>
                    </tr>
                    <tr>
                    <th>Color</th>
                    <td>${info.line_items[0].properties.find(prop => prop.name === 'Color' || prop.name === 'color' || prop.name === 'color-swatches-2')?.value ? info.line_items[0].properties.find(prop => prop.name === 'Color' || prop.name === 'color' || prop.name === 'color-swatches-2')?.value : '<span style="font-size:0.7rem; color:red;">N/A no GPO option Found</span>'}</td>
                    </tr>
                    <tr>
                    <th>Size</th>
                    <td>${info.line_items[0].properties.find(prop => prop.name === 'Sizes')?.value ? info.line_items[0].properties.find(prop => prop.name === 'Sizes')?.value : '<span style="font-size:0.7rem; color:red;">N/A no GPO option Found</span>'}</td>
                    </tr>
                    <tr>
                    <th>Embroidery</th>
                    <td>${info.line_items[0].properties.find(prop => prop.name === 'Embroidery')?.value ? info.line_items[0].properties.find(prop => prop.name === 'Embroidery')?.value : '<span style="font-size:0.7rem; color:red;">N/A no GPO option Found</span>'}</td>
                    </tr>
                    <tr>
                    <th>Note</th>
                    <td style="font-size: 0.7rem;">${info.note ? info.note : 'No Note'}</td>
                    </tr>
                    <tr>
                    <th>Shirt Length</th>
                    <td>${info.line_items[0].properties.find(prop => prop.name === 'Shirt length' || prop.name === 'Shirt Length')?.value ? info.line_items[0].properties.find(prop => prop.name === 'Shirt length' || prop.name === 'Shirt Length')?.value : '<span style="font-size:0.7rem; color:red;">N/A no GPO option Found</span>'}</td>
                    </tr>
                    <tr>
                    <th>Trouser Length</th>
                    <td>${info.line_items[0].properties.find(prop => prop.name === 'Trouser Length' || prop.name === 'Trouser length')?.value ? info.line_items[0].properties.find(prop => prop.name === 'Trouser Length' || prop.name === 'Trouser length')?.value : '<span style="font-size:0.7rem; color:red;">N/A no GPO option Found</span>'}</td>
                    </tr>
                    <tr>
                    <th>Sleeve Length</th>
                    <td>${info.line_items[0].properties.find(prop => prop.name === 'Sleeve length' || prop.name === 'Sleeve Length')?.value ? info.line_items[0].properties.find(prop => prop.name === 'Sleeve length' || prop.name === 'Sleeve Length')?.value : '<span style="font-size:0.7rem; color:red;">N/A no GPO option Found</span>'}</td>
                    </tr>
                    <tr>
                    <th>Trouser Style</th>
                    <td>${info.line_items[0].properties.find(prop => prop.name === 'Trouser Style')?.value ? info.line_items[0].properties.find(prop => prop.name === 'Trouser Style')?.value : '<span style="font-size:0.7rem; color:red;">N/A no GPO option Found</span>'}</td>
                    </tr>
                    <tr>
                    <th>Shirt Style</th>
                    <td>     <img src="${shirtStyle}" style='width:50px;height:50px' alt="Product Image"></td>
                    </tr>
     </tbody>
          
        </table>

        <div class="product-image">
            <img src="${shirtStyle}" alt="Product Image">
            <img style="display:none" src="${pantStyleImage}" alt="Pant Style Image">
            ${info.line_items[0].title === 'Men Cargo Pants' || info.line_items[0].title === 'Women Cargo Pants' ? `<img src="https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Cargo-Pants.jpg?v=1753163517" alt="Variant Image">`
             :info.line_items[0].title === 'Men Jogger Pants' || info.line_items[0].title === 'Women Jogger Pants' ? `<img src="https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Jogger-Pants.jpg?v=1753163518" alt="Variant Image">`
            :info.line_items[0].title === 'Women Flarred Pants' ? `<img src="https://cdn.shopify.com/s/files/1/0631/3174/6535/files/Flare-Pants.jpg?v=1753163517" alt="${info.line_items[0].title }">`: `<img src="${pantStyleImage}" alt='Pant Style Image'>`}
       </div>

        </div>
        </div>`
})
}
  



// console.log('Order details:', info);

})
  .catch(err => res.status(500).send('Error fetching order: ' + err.message));

  // .then((info) => res.status(200).json({status: 'Order details logged to console.', info:info}))
})
const server = http.createServer(app);
server.listen(3002, () => {
  console.log('HTTP server running on http://localhost:3002');
});