import { sequelize } from "./db.js";
import { Company, User } from "./user.js";
import * as salesModel from "./sales.js";
import { DataTypes } from "sequelize";
const DISABLE_SEQUELIZE_DEFAULTS = {
  timestamps: false,
  freezeTableName: true,
};

export const ItemGroup = sequelize.define(
  "ItemGroup",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    name: { type: DataTypes.STRING, unique: true },
  },
  { sequelize }
);

export const Item = sequelize.define(
  "item",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.CHAR, unique: true },
    name: { type: DataTypes.STRING },
    imported: { type: DataTypes.BOOLEAN, defaultValue: false },
    source: { type: DataTypes.STRING, defaultValue: "Platform" },
    price_amount: { type: DataTypes.DECIMAL(2), defaultValue: 0.0 },
    price_currency: { type: DataTypes.STRING, defaultValue: "USD" },
    opening_stock: { type: DataTypes.INTEGER, defaultValue: 1 },
    stock_uom: { type: DataTypes.DECIMAL, defaultValue: 0 },
    available_stock_quantity: {
      type: DataTypes.VIRTUAL,
      defaultValue: 0,
      set() {
        // calc orders and return remaining
      },
    },
    allow_negative_stock: { type: DataTypes.BOOLEAN, defaultValue: false },

    default_item_manufacturer: { type: DataTypes.STRING, allowNull: true },
    weight_uom: { type: DataTypes.CHAR, allowNull: true },
    valuation_rate: { type: DataTypes.DECIMAL, allowNull: true },
    disabled: { type: DataTypes.BOOLEAN, defaultValue: false },
    weight_per_unit: { type: DataTypes.DECIMAL, allowNull: true },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "/default_images/bascket.png",
    },
    variant_of: {
      type: DataTypes.STRING,
      allowNull: true,
      references: { model: "Item", key: "code" },
    },
    group: {
      type: DataTypes.STRING,
      references: { model: ItemGroup, key: "name" },
    },
    barcode: { type: DataTypes.STRING, allowNull: true },
    brand: { type: DataTypes.STRING, allowNull: true },
    variant_based_on: {
      type: DataTypes.ENUM,
      defaultValue: "Item Attribute",
      values: ("Item Attribute", "None"),
      allowNull: true,
    },
    min_order_qty: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0,
      allowNull: true,
    },
    has_variants: {
      type: DataTypes.VIRTUAL,
      set() {
        return false;
      },
    },
    description: { type: DataTypes.TEXT({ length: "long" }), allowNull: true },
  },
  { sequelize }
);

export const ExtraFields = sequelize.define("ExtraField", {
  name: { type: DataTypes.STRING },
  value: { type: DataTypes.STRING },
});

export const ImportConfig = sequelize.define(
  "ImportConfig",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    name: { type: DataTypes.STRING, unique: true },
    extra_fields: { type: DataTypes.ARRAY(DataTypes.STRING) },
    create_sales_invoice: { type: DataTypes.BOOLEAN },

    type: { type: DataTypes.ENUM, values: ("ERP-Next", "File") },
    to_item_company: { type: DataTypes.BOOLEAN, defaultValue: false },
    all_items: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_sales_item: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_grouped_asset: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_fixed_asset: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_purchase_item: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_sub_contracted_item: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_stock_item: { type: DataTypes.BOOLEAN, defaultValue: true },
    is_customer_provided_item: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { sequelize }
);

const ItemImport = sequelize.define(
  "ItemImport",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    config: {type:DataTypes.STRING, references:{
      model:ImportConfig, key:"name"
    }},
    name: { type: DataTypes.STRING, unique: true },
    json_data: { type: DataTypes.JSON },
    
  },
  { sequelize }
);
// User Association
User.hasOne(Item, { foreignkey: "uploader" });
Item.belongsTo(User);

Item.hasMany(salesModel.CartItem);

ExtraFields.hasMany(Item);

ItemImport.hasMany(Item);
// Item.belongsToMany(ImportConfig);

Company.hasMany(ImportConfig, {foreignKey:{name:"destination_company",field:"name"}})
