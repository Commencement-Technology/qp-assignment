import { DataTypes } from "sequelize";

import { sequelize } from "../loaders/database";

export const OrderItemsModel = sequelize.define(
  "OrderItems",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.UUID,
      allowNull: false
    },
  },
  {
    timestamps: true,
    modelName: "OrderItems",
    tableName: "OrderItems",
  }
);
  

OrderItemsModel.sync();
