const request = require("supertest");
const app = require("../server");
describe("Post Endpoints", () => {
  it("should signup a new user", async () => {
    const res = await request(app).post("/api/users/signup").send({
      firstName: "Vrushali",
      lastName: "Joshi",
      email: "abc@gmail.com",
      mobile: "1234567890",
      isSubscribe: 1,
      password: "frasdsdsdt",
    });
    expect(res.statusCode).toEqual(200);
  });

  it("should validate mandatory fields", async () => {
    const res = await request(app).post("/api/users/signup").send({
      firstName: "",
      lastName: "",
      email: "abc@gmail.com",
      mobile: "1234567890",
      isSubscribe: 1,
      password: "frasdsdsdt",
    });
    expect(res.statusCode).toEqual(403);
    expect(res.text).toEqual(
      "First Name, Last Name, Email, Password fields are mandatory"
    );
  });

  it("Validate Password", async () => {
    const res = await request(app).post("/api/users/signup").send({
      firstName: "Vrushali",
      lastName: "Joshi",
      email: "abc@gmail.com",
      mobile: "1234567890",
      isSubscribe: 1,
      password: "frss",
    });
    expect(res.statusCode).toEqual(403);
    expect(res.text).toEqual(
      "Password Field should have at least Eight Characters"
    );
  });

  it("Subscribed to NewsLetter", async () => {
    const res = await request(app).post("/api/users/signup").send({
      firstName: "Vrushali",
      lastName: "Joshi",
      email: "abc@gmail.com",
      mobile: "1234567890",
      isSubscribe: 1,
      password: "frssdffsdffdfdfs",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual(
      `Hello Vrushali Joshi, Thank you for signing up. Your account is now created. You would be receiving our periodic newsletters to your email: abc@gmail.com`
    );
  });

  it("Not Subscribed to NewsLetter", async () => {
    const res = await request(app).post("/api/users/signup").send({
      firstName: "Vrushali",
      lastName: "Joshi",
      email: "abc@gmail.com",
      mobile: "1234567890",
      isSubscribe: 0,
      password: "frssdffsdffdfdfs",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual(
      `Hello Vrushali Joshi, Thank you for signing up. Your account is now created. `
    );
  });
});
