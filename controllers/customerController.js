const Customer = require("../models/customer");

const index = async (req, res, next) => {
  let perPage = 12;
  let page = req.query.page || 1;
  const customers = await Customer.aggregate([{ $sort: { updatedAt: -1 } }])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();
  const count = await Customer.count();
  res.render("index", {
    customers,
    current: page,
    title: "UserAdmin",
    pages: Math.ceil(count / perPage),
  });
};

const add_customer = (req, res, next) => {
  res.render("customer/add", { title: "Add Customer" });
};

const post_customer = async (req, res, next) => {
  const customer = new Customer({ ...req.body });
  await customer.save();
  req.flash("success", "Customer added successfully");
  res.redirect("/");
};

const view_customer = async (req, res, next) => {
  const id = req.params.id;
  const customer = await Customer.findById(id);
  res.render("customer/view", { customer, title: "View Customer" });
};

const edit_customer = async (req, res, next) => {
  const id = req.params.id;
  const customer = await Customer.findById(id);
  res.render("customer/edit", { customer, title: "Edit Customer" });
};

const put_edit_customer = async (req, res, next) => {
  const id = req.params.id;
  const customer = await Customer.findByIdAndUpdate(id, { ...req.body });
  await customer.save();
  res.redirect(`/view/${customer.id}`);
};

const delete_customer = async (req, res, next) => {
  const id = req.params.id;
  await Customer.findByIdAndDelete(id);
  res.redirect("/");
};

const search_customer = async (req, res, next) => {
  const searchTerm = req.body.searchTerm;
  const customers = await Customer.find({
    $or: [
      { firstName: { $regex: new RegExp(searchTerm, "i") } },
      { lastName: { $regex: new RegExp(searchTerm, "i") } },
    ],
  });
  res.render("search", { title: "Search Results", customers });
};

module.exports = {
  index,
  add_customer,
  post_customer,
  view_customer,
  edit_customer,
  put_edit_customer,
  delete_customer,
  search_customer,
};
