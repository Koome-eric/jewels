import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true, 
      unique: true,
      
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true,
      },
      primaryemailaddress: {
        type: String, 
        unique: true,
      },
      primarystreet: {
        type: String,
      },
      primarycity: {
        type: String,
      },
      primarystate: {
        type: String,
      },
      donationnumber: {
        type: Number,
        min: 0,
      },
      donationamount: {
        type: String,
      },
      lastdate: {
        type: String,
      },
      img: {
        type: String,
      },
      accountnumber: {
        type: Number,
        unique: true,
        min: 0, 
      },
      primaryzipcode	: {
        type: Number,
        min: 0, 
      },
      firstdonationdate: {
        type: String,
      },
      largestdonationdate: {
        type: String,
      },
      firstdonation: {
        type: String,
      },
      largestdonation: {
        type: String,
      },
      latestdonation: {
        type: String,
      },
    },
  { timestamps: true }
);

const donationSchema = new mongoose.Schema(
    {
      Name: {
          type: String,
          required: true,
          unique: true,
        },
        Date: {
          type: String, 
          unique: true,
        },
        Amount: {
          type: String,
        },
        Type: {
          type: String,
        },
        Fund: {
          type: String,
        },
        img: {
          type: String,
        },
        account: {
          type: Number,
          min: 0, 
        },
        Campaign: {
          type: String,
        
        },
      },
    { timestamps: true }
  );

  const latestSchema = new mongoose.Schema(
    {
      Name: {
          type: String,
          required: true,
          unique: true,
        },
        Date: {
          type: String, 
          unique: true,
        },
        Amount: {
          type: String,
        },
        Type: {
          type: String,
        },
        Fund: {
          type: String,
        },
        img: {
          type: String,
        },
        account: {
          type: Number,
          min: 0, 
        },
        Campaign: {
          type: String,
        
        },
      },
    { timestamps: true }
  );
  
export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export const Donation = mongoose.models.Donation || mongoose.model("Donation", donationSchema);
export const Latest = mongoose.models.Latest || mongoose.model("Latest", latestSchema);

