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
          // Split the date string into an array of [MM, DD, YYYY]
          splitDate: { $split: ["$Date", "/"] }
        }
      },
      {
        $addFields: {
          // Convert parts of the date to integers
          year: { $toInt: { $arrayElemAt: ["$splitDate", 2] } },
          month: { $toInt: { $arrayElemAt: ["$splitDate", 0] } },
          day: { $toInt: { $arrayElemAt: ["$splitDate", 1] } }
        }
      },
      { $sort: { year: -1, month: -1, day: -1 } }, // Sort by year, then month, then day in descending order
      { $skip: ITEM_PER_PAGE * (page - 1) },
      { $limit: ITEM_PER_PAGE },
      {
        $project: {
          // Remove the temporary fields used for sorting
          splitDate: 0, year: 0, month: 0, day: 0
        }
      }
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

