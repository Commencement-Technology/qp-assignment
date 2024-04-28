import { DataTypes } from "sequelize";

import { sequelize } from "../loaders/database";
import { OrderItemsModel } from "./OrderItems";

export const OrderModel = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    modelName: "order",
    tableName: "order",
  }
);

OrderModel.hasMany(OrderItemsModel, {
  foreignKey: {
    name: "orderId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

OrderItemsModel.belongsTo(OrderModel, {
  foreignKey: "orderId",
});


OrderModel.sync();