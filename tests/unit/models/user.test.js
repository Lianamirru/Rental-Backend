const { User } = require("../../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");

describe("user.generateAuthToken", () => {
  it("should return valid token", () => {
    let user = new User({
      name: "nnnnn",
      email: "ad@ad.com",
      password: "kfdlmfd",
    });
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    expect(decoded).toMatchObject({
      _id: user._id.toHexString(),
      name: "nnnnn",
      email: "ad@ad.com",
      isAdmin: false,
    });
  });
});
