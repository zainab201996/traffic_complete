import { app } from "./app.js";
const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default server;
