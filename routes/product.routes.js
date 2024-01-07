import express from "express";

const router = express.Router();

// mock db of product
let productList = [
  {
    id: 110,
    productDetail: {
      productName: "ABS protection light",
      price: 20.76,
      ratings: 4.94,
      color: "white, yellow, blue",
      stock: 2,
    },
  },
  {
    id: 111,
    productDetail: {
      productName: "Duck night light",
      price: 26.69,
      ratings: 5.0,
      color: " yellow",
      stock: 5,
    },
  },
];

// to get product list
router.get("/product/list", (req, res) => {
  return res.status(201).send(productList);
});

// to add
router.post("/product/add", (req, res) => {
  const newProduct = req.body;
  productList.push(newProduct);
  return res
    .status(201)
    .send({ message: "Product has been sucessfully added." });
});

// to delete
router.delete("/product/delete/:id", (req, res) => {
  const productToBeDeleted = Number(req.params.id);
  const newProductList = productList.filter((item, index, self) => {
    if (productToBeDeleted !== item.id) return item;
  });
  productList = structuredClone(newProductList);
  return res
    .status(201)
    .send({ message: "Product has been sucessfully deleted." });
});

// to edit product
router.put("/product/edit/:id", (req, res) => {
  const productToBeEdited = +req.params.id;
  const newValue = req.body;

  const requiredProduct = productList.find((item, index, self) => {
    if (productToBeEdited === item.id) {
      return item;
    } else {
      return res.status(404).send({ message: "The product doesn't exists." });
    }
  });
  const newProduct = productList.map((item, index, self) => {
    if (item.id === productToBeEdited) {
      return { ...item, ...newValue };
    } else {
      return item;
    }
  });
  productList = structuredClone(newProduct);
  return res
    .status(201)
    .send({ message: "Product has been sucessfully updated." });
});

export default router;
