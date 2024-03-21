import { Product, User, Donation, Latest } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5;

  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchUser = async (id) => {
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchProducts = async (q, page) => {
  console.log(q);
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    connectToDB();
    const count = await Product.find({ name: { $regex: regex } }).count();
    const products = await Product.find({ name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, products };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products!");
  }
};

export const fetchProduct = async (id) => {
  try {
    connectToDB();
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};

export const fetchDonations = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;

  try {
    connectToDB();
    const count = await Donation.find({ Name: { $regex: regex } }).count();
    const donations = await Donation.aggregate([
      { $match: { Name: { $regex: regex } } },
      {
        $addFields: {
          // Convert the date string to a date object
          formattedDate: { $dateFromString: { dateString: "$Date", format: "%m-%d-%Y" } }
        }
      },
      { $sort: { formattedDate: -1 } }, // Sort by formattedDate in descending order
      { $skip: ITEM_PER_PAGE * (page - 1) },
      { $limit: ITEM_PER_PAGE }
    ]);

    return { count, donations };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch donations!");
  }
};

export const fetchLatest = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5;

  try {
    connectToDB();
    const count = await Latest.find({ Name: { $regex: regex } }).count();
    const donations = await Latest.find({ Name: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, donations };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch latest!");
  }
};

export const fetchDonationsForContactByName = async (contactName) => {
  try {
    connectToDB();
    const donations = await Donation.find({ Name: contactName }).sort({ Date: -1 });
    return donations;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch donations for contact by name!");
  }
};

export const getTotalDonatedAmount = async (contactName) => {
  try {
    const donations = await fetchDonationsForContactByName(contactName);
    const totalAmount = donations.reduce((total, donation) => {
      const amount = parseFloat(donation.Amount.replace(/[^0-9.-]+/g, ""));
      return total + amount;
    }, 0);
    return totalAmount;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to calculate total donated amount!");
  }
};
