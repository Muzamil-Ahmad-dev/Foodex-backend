// backend/modules/payments/index.js
import paymentsRoutes from "./payments.route.js";

export default (app) => {
  app.use("/api/payments", paymentsRoutes);
};