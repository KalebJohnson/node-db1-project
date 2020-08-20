const server = require("./api/server.js");
const accountsRouter = require("./api/ACR/accountsRouter")
const express = require("express")

server.use(express.json())

server.use("/accounts", accountsRouter)


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});

