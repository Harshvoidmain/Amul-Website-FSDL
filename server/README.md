Express REST API for the project

Install dependencies:

```bash
npm install express cors
npm install --save-dev nodemon
```

Run in development (auto-restart):

```bash
npm run server:dev
```

Run production:

```bash
npm run server:start
```

API endpoints (base `/api/products`):

- `GET /api/products` — list all products
- `GET /api/products/:id` — get product by id
- `POST /api/products` — create product (json body: `name`, `price`, `description`)
- `PUT /api/products/:id` — update product
- `DELETE /api/products/:id` — delete product

Orders endpoints (base `/api/orders`):

- `GET /api/orders` — list all orders
- `GET /api/orders/:id` — get order by id
- `POST /api/orders` — create order (json body: `items` (array), `total`, optional `customer`)
- `PUT /api/orders/:id` — update order
- `DELETE /api/orders/:id` — delete order
