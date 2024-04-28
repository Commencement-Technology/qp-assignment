import { UserModel } from "./User";
import { OrderModel } from "./Order";

UserModel.hasMany(OrderModel, {
  foreignKey: {
    name: "user_id",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

OrderModel.belongsTo(UserModel, {
  foreignKey: "user_id",
});
