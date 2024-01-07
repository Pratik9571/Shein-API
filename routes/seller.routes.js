import express from "express";

const router = express.Router();

// mock db of seller
let sellerList = [
  {
    id: 100,
    name: {
      firstName: "Pratik",
      lastName: "Prajapati",
      address: "Bhaktapur",
      nationality: "Nepal",
    },
    phoneNumber: 723975629378,
    emailAddress: "pratik@gmail.com",
  },
];

// get seller list
router.get("/seller/list", (req, res) => {
  return res.status(201).send(sellerList);
});

// add seller to the list
router.post("/seller/add", (req, res) => {
  const newSeller = req.body;
  sellerList.push(newSeller);
  return res
    .status(201)
    .send({ message: " Seller has been sucessfully added." });
});

// delete seller
router.delete("/seller/delete/:id", (req, res) => {
  const sellerToBeDeleted = Number(req.params.id);
  const newSellerList = sellerList.find((item, index, self) => {
    if (sellerToBeDeleted !== item.id) return item;
  });
  sellerList = structuredClone(newSellerList);
  return res
    .status(201)
    .send({ message: "Seller has been sucessfully deleted" });
});

// to update seller
router.put("/seller/edit/:id", (req, res) => {
  const sellerToBeEdited = +req.params.id;
  const newValue = req.body;
  const requiredSeller = sellerList.find((item, index, self) => {
    if (item.id === sellerToBeEdited) {
      return item;
    } else {
      return res.status(404).send({ message: "The seller doesn't exists." });
    }
  });
  const newSeller = sellerList.map((item, index, self) => {
    if (item.id === sellerToBeEdited) {
      return { ...item, ...newValue };
    } else {
      return item;
    }
  });
  sellerList = structuredClone(newSeller);
  return res
    .status(201)
    .send({ message: "Seller has been sucessfully updated." });
});

export default router;
