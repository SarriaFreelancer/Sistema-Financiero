import express from "express";
import cors from "cors";

import dashboardRoutes from "./routes/dashboardRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import incomeRoutes from "./routes/incomeRoutes";
import clientRoutes from "./routes/clientRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import userRoutes from "./routes/userRoutes";
import reportRoutes from "./routes/reportRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/dashboard", dashboardRoutes);
app.use("/expenses", expenseRoutes);
app.use("/income", incomeRoutes);
app.use("/clients", clientRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/reports", reportRoutes);


app.get("/", (_req, res) => {
  res.send("Finance API running");
});

export default app;
