const app = require("./app")
const http = require("http")

app.set("port", process.env.PORT || 8080)

http.createServer(app).listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"))
})
