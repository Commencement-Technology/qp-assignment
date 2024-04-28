import { sequelize } from "../loaders/database";
import { InventoryModel } from "../models/Inventory";
import { OrderModel } from "../models/Order";
import { OrderItemsModel } from "../models/OrderItems";
import { InventoryService } from "./inventory.service";

class OrderService {
  private orderModel: typeof OrderModel;
  private orderItemsModel: typeof OrderItemsModel;
  private inventoryService: InventoryService;
  constructor(
    orderModel: typeof OrderModel,
    orderItemsModel: typeof OrderItemsModel,
    inventoryService: InventoryService
  ) {
    this.orderModel = orderModel;
    this.inventoryService = inventoryService;
    this.orderItemsModel = orderItemsModel;
  }

  async placeOrder(inventory: { items: string[]; userId: string }) {
    try {
      const { items, userId } = inventory;
      const transaction = await sequelize.transaction();
      try {
        /**
         * First check inventory stock
         */
        const availableInventories =
          await this.inventoryService.getMultipleInventories(items);

        const order = await this.orderModel.create(
          {
            userId,
          },
          { transaction }
        );

        const orderId = order.dataValues.id;

        const orderItems = availableInventories.map((availableInventory) => {
          return {
            orderId,
            itemId: availableInventory.dataValues.id,
          };
        });

        for await (const item of orderItems) {
          await this.inventoryService.updateInventoryQuantity(
            item.itemId,
            transaction
          );
        }

        const orderCreated = await this.orderItemsModel.bulkCreate(orderItems, {
          transaction,
        });

        await transaction.commit();
        return orderCreated;
      } catch (error) {
        await transaction.rollback();
      }
    } catch (error) {
      throw error;
    }
  }
}

export const orderService: OrderService = new OrderService(
  OrderModel,
  OrderItemsModel,
  new InventoryService(InventoryModel)
);
