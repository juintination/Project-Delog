const request = require("supertest")
const faker = require("faker")
const app = require("../app")

describe("Go Fit Server API TEST", () => {
  it("should test that true === true", () => {
    expect(true)
  })
})

describe("POST /users", () => {
  it("should create a new user", (done) => {
    const userData = {
      name: faker.name.findName(),
      birth: faker.date.past().toISOString().split("T")[0],
      email: faker.internet.email(),
      pwd: faker.internet.password(),
    }

    request(app)
      .post("/user/create")
      .send(userData)
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err)

        expect(res.body).toHaveProperty("name", userData.name)
        expect(res.body).toHaveProperty("email", userData.email)

        done()
      })
  })
})
