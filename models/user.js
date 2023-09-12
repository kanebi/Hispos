import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const Package = sequelize.define(
  "Package",
  {
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL },
    currency: { type: DataTypes.CHAR, default: "USD" },
    type: { type: DataTypes.CHAR },
  },
  { sequelize }
);

export const PaymentMethod = sequelize.define(
  "PaymentMethod",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.CHAR },
  },
  { sequelize }
);

export const Setting = sequelize.define(
  "Setting",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    theme: { type: DataTypes.STRING, defaultValue: "light" },
    currency: { type: DataTypes.CHAR, allowNull: true, defaultValue: "USD" },
    country: { type: DataTypes.CHAR, allowNull: true },
  },
  { sequelize }
);

export const Company = sequelize.define(
  "Company",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT({ length: "long" }), allowNull: true },
    website: { type: DataTypes.TEXT({ length: "short" }), allowNull: true },
    isGroup: { type: DataTypes.BOOLEAN, defaultValue: false },
    logo: {
      type: DataTypes.STRING,
      defaultValue: "/default_images/company.png",
      allowNull: true,
    },
    // parentCompany: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: { model: Company, key: "id" },
    // },
  },
  { sequelize }
);

export const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    first_name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING, allowNull: true },
    // company: { type: DataTypes },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "/static/default_images/avatar.png",
    },
    lastLogin: { type: DataTypes.DATE },
    password: { type: DataTypes.STRING },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    isStaff: { type: DataTypes.BOOLEAN, defaultValue: false },
    role: {
      type: DataTypes.ENUM,
      values:
        ("Shop Manager",
        "Sales Personel",
        "Sales Manager",
        "Supervisor",
        "Staff"),
      defaultValue: "Staff",
    },
    // settingId: {
    //   type: DataTypes.INTEGER,
    //   references: { model: Setting, key: "id" },
    // },
  },
  { sequelize }
);

export const ERPAPIUser = sequelize.define(
  "ERPAPIUser",
  {
    
    api_key: {type:DataTypes.STRING},
    api_secret: {type:DataTypes.STRING},
    host_url: {type:DataTypes.STRING},
    
  },
  { sequelize }
);

export const Profile = sequelize.define(
  "Profile",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    salesPerson: {
      type: DataTypes.INTEGER,
      references: { model: User, key: "id" },
    },

    company: {
      type: DataTypes.INTEGER,
      references: { model: Company, key: "id" },
    },
  },
  { sequelize }
);

export const POSSession = sequelize.define(
  "POSSession",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    openingTime: { type: DataTypes.DATE, allowNull: false },
    closingTime: { type: DataTypes.DATE, allowNull: true },
    inventorySource: {
      type: DataTypes.ENUM,
      defaultValue: "All",
      values: ("All", "ERPNext", "Platform"),
    },
    
    autoClose:{type:DataTypes.BOOLEAN, comment:"Auto Close After 24hrs", defaultValue:false},
    opendedBy: {
      type: DataTypes.INTEGER,
      references: { model: User, key: "id" },
    },
    closedBy: {
      type: DataTypes.INTEGER,
      references: { model: User, key: "id" },
    },
    
    note : {type:DataTypes.STRING({length:"long"}), allowNull:true},
    startingBalance :{type: DataTypes.DECIMAL(2), allowNull:true},
    submitted: {type:DataTypes.BOOLEAN, defaultValue:false}
  },
  { sequelize }
);

export const Customer = sequelize.define(
  "Customer",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.CHAR, allowNull: true },
    full_name: { type: DataTypes.CHAR, allowNull: true },
    // paymentMethodId: {
    //   type: DataTypes.INTEGER,
    //   references: { model: PaymentMethod, key: "id" },
    // },
  },
  { sequelize }
);

export const Subscription = sequelize.define(
  "Subscription",
  {
    expiryDate: { type: DataTypes.DATE },
    // packageId: {
    //   type: DataTypes.INTEGER,this
    //   references: {
    //     model: Package,
    //     key: "id",
    //   },
    // },
    // userId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: .User,
    //     key: "id",
    //   },
    // },
  },
  { sequelize }
);

export const Shop = sequelize.define(
  "Shop",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT({ length: "long" }), allowNull: true },
    salesAttendant: {
      type: DataTypes.INTEGER,
      references: { model: User, key: "id" },
    },
    company: {
      type: DataTypes.INTEGER,
      references: { model: Company, key: "id" },
    },
  },
  { sequelize }
);

// User Assiociations
User.hasOne(Setting, { name: "setting", onDelete: "CASCADE" });
Setting.belongsTo(User);

User.hasMany(Subscription, { name: "subscriptions" });
Subscription.belongsTo(User);

// Subscription Associations
Package.hasOne(Subscription);
Subscription.belongsTo(Package);

// Customer Associations
PaymentMethod.hasOne(Customer, { name: "defaultPaymentMethod" });
Customer.belongsTo(PaymentMethod);

// Profile Associations
Profile.belongsToMany(PaymentMethod, {
  through: "profilePaymentMethods",
});

// Company Associations
Company.hasOne(Company, { as: "parentCompany" });
User.hasMany(Company, { as: "companies" });
Company.belongsTo(User);

// Shop Associations
User.hasMany(Shop, { foreignKey: { name: "manager" } });
User.hasMany(ERPAPIUser, { foreignKey: { name: "owner" } });
