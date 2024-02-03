const request = require("supertest")
const app = require("../app")

describe("Go Fit Server API TEST", () => {
  test("should test that true === true", () => {
    expect(true).toBe(true)
  })

  test("should create a new user", (done) => {
    request(app)
      .post("/user/create")
      .send({
        name: "guest",
        birth: "2024-02-03",
        email: "guest@e2e.com",
        pwd: "guest",
      })
      .then((response) => {
        expect(response.status).toBe(200)
        done()
      })
      .catch((error) => {
        done(error)
      })
  })
})
