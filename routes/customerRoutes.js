const express = require("express");
const router = express.Router();
const {
  index,
  add_customer,
  post_customer,
  view_customer,
  edit_customer,
  put_edit_customer,
  delete_customer,
  search_customer,
} = require("../controllers/customerController");
const { handleAsync } = require("../utils/handleAsync");

router.get("/", handleAsync(index));
router.get("/add", add_customer);
router.post("/add", handleAsync(post_customer));
router.get("/view/:id", handleAsync(view_customer));
router.get("/edit/:id", handleAsync(edit_customer));
router.put("/edit/:id", handleAsync(put_edit_customer));
router.delete("/delete/:id", handleAsync(delete_customer));
router.post("/search", handleAsync(search_customer));

module.exports = router;
