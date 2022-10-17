import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";

//events routes
import eventRoutes from "./event/event.routes.js";
import categoryRoutes from "./event/category.routes.js";
import locationRoutes from "./event/location.routes.js";
import severityRoutes from "./event/severity.routes.js";

const applyAllRoutes = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);

  //events
  app.use("/api/event", eventRoutes);
  app.use("/api/category", categoryRoutes);
  app.use("/api/location", locationRoutes);
  app.use("/api/severity", severityRoutes);
};

export default applyAllRoutes;
