import { DataTypes } from "sequelize";
import  { sequelize } from "./db.js";
import  { Item } from "./inventory.js";
import  { PaymentMethod, Customer, User } from "./user.js";

export const  Coupon = sequelize.define("Coupon", {
    code : {type : DataTypes.CHAR, unique:true},
    amount : {type: DataTypes.DECIMAL, defaultValue:0.0},
    currency : {type:DataTypes.CHAR, default:'USD'}
}, {sequelize})


export const CartItem = sequelize.define(
  "CartItem",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    
    rate : {type:DataTypes.DECIMAL, allowNull:true},
    quantity: {type : DataTypes.INTEGER, defaultValue:1},
    
    total_sum : {type: DataTypes.VIRTUAL, get(){
    const price_amount = this.rate || this.getItem().price 
        const total = price_amount * this.quantity
        return total
    }}
  },
  { sequelize }
);

export const Order = sequelize.define(
  "Order",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.UUID },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    total_sum : {type:DataTypes.VIRTUAL, get(){
        
        var total_items_sum = 0 ;
        for (let i = 0; i < this.getItems().length; i++) {
            const item = this.getItems[i];
            total_items_sum += item.price 
            
            
        }
        
        if(this.getCoupon()){
        total_sum  = total_items_sum - this.getCoupon().amount
        }
        else {
        return total_items_sum
        }
    }}, 
    // convertedCoupon: {type:}
    
  },
  { sequelize }
);



// // Order Association
PaymentMethod.hasOne(Order);
Order.hasMany(CartItem, {as:'carts'})


// Customer Association 
Customer.hasMany(Order)


// Coupon Association 
User.hasMany(Coupon)

