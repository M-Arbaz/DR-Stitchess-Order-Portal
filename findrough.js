require('dotenv').config();
const axios = require('axios');
const SHOP = process.env.DR_STITCHESS_SHOP;
const ACCESS_TOKEN = process.env.DR_STITCHESS_API_TOKEN;

async function getOrdersLast30Days() {
    console.log("Fetching last 30 days orders...");
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    let orders = [];
    let page_info = null;
    let first = true;

    do {
        let params;
        if (first) {
            params = {
                status: 'any',
                created_at_min: thirtyDaysAgo,
                limit: 10
            };
            first = false;
        } else {
            params = { page_info };
        }

        const response = await axios.get(`https://${SHOP}/admin/api/2024-04/orders.json`, {
            headers: {
                'X-Shopify-Access-Token': ACCESS_TOKEN,
                'Content-Type': 'application/json'
            },
            params
        });

        orders = orders.concat(response.data.orders);

        // Pagination
        const linkHeader = response.headers['link'];
        page_info = null;
        if (linkHeader && linkHeader.includes('rel="next"')) {
            const match = linkHeader.match(/page_info=([^&>]+)/);
            if (match) page_info = match[1];
        }
    } while (page_info);

    return orders;
}

async function countColorOptions() {
    const orders = await getOrdersLast30Days();
    const colorCounts = {};

    orders.forEach(order => {
        order.line_items.forEach(item => {
            if (item.properties && Array.isArray(item.properties)) {
                const colorProp = item.properties.find(prop =>
                    ['Color', 'color', 'color-swatches-2'].includes(prop.name)
                );
                if (colorProp && colorProp.value) {
                    const color = colorProp.value.trim();
                    colorCounts[color] = (colorCounts[color] || 0) + item.quantity;
                }
            }
        });
    });

    console.log('Color option order counts in last 30 days:');
    Object.entries(colorCounts).forEach(([color, count]) => {
        console.log(`${color}: ${count}`);
    });
}

countColorOptions();