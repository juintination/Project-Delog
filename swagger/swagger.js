const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "API Documentation",
      description: "Documentation for my API",
      contact: {
        name: "juintination",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js", "./swagger/swagger.yaml"],
}
const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }
