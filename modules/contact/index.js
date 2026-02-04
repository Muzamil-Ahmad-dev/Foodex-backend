import contactRoutes from "./contact.route.js";

export default (app) => {
  app.use("/api/contact", contactRoutes);
};