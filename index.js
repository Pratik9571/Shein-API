import express from "express";
import productRoutes from "./routes/product.routes.js";
import sellerRoutes from "./routes/seller.routes.js";

const app = express();

// to make app understand json
app.use(express.json());

// register routes
app.use(productRoutes);
app.use(sellerRoutes);

// Port
const PORT = 8001;
app.listen(PORT, (req, res) => {
  console.log(`App is listening to port ${PORT}.`);
});
