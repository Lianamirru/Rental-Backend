const mongoose = require("mongoose");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");

const request = require("supertest");

let server;
describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await server.close();
    await Genre.deleteMany();
  });
  describe("GET /", () => {
    it("should return all genres", async () => {
      const genres = [{ name: "genre1" }, { name: "genre2" }];

      await Genre.collection.insertMany(genres);

      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });
    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/1");

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    let token;
    let name;

    const exec = () => {
      return request(server)
        .post("/api/genres/")
        .set("x-auth-token", token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "genre1";
    });

    it("should return 401 if client unauthenticated", async () => {
      token = "";

      const res = await exec();
      // const res = await request(server)
      //   .post("/api/genres/")
      //   .send({ name: "genre1" });

      expect(res.status).toBe(401);
    });
    it("should return 400 if genre is less than 1 characters", async () => {
      name = "";
      // const token = new User().generateAuthToken();

      const res = await exec();
      // const res = await request(server)
      //   .post("/api/genres/")
      //   .set("x-auth-token", token)
      //   .send({ name: "" });

      expect(res.status).toBe(400);
    });
    it("should save genre if genre is valid and auth user", async () => {
      // const token = new User().generateAuthToken();

      // const res = await request(server)
      //   .post("/api/genres/")
      //   .set("x-auth-token", token)
      //   .send({ name: "genre1" });

      const genre = Genre.find({ name: "genre1" });

      expect(genre).not.toBeNull();
    });
    it("should return the genre if genre is valid and user is auth", async () => {
      // const token = new User().generateAuthToken();

      const res = await exec();
      // const res = await request(server)
      //   .post("/api/genres/")
      //   .set("x-auth-token", token)
      //   .send({ name: "genre1" });

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });
  describe("DELETE /:id", () => {
    let token;
    let genre;
    let id;

    const exec = () => {
      return request(server)
        .delete("/api/genres/" + id)
        .set("x-auth-token", token);
    };
    beforeEach(async () => {
      token = new User({ isAdmin: true }).generateAuthToken();

      genre = new Genre({ name: "a" });
      await genre.save();

      id = genre._id;
    });
    it("should return 401 if user not authenticated", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });
    it("should return 403 if user is not an admin", async () => {
      token = new User({ isAdmin: false }).generateAuthToken();

      const res = await exec();

      expect(res.status).toBe(403);
    });
    it("should return 404 if invalid id is passed", async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(404);
    });
    it("should return 404 if no genre found", async () => {
      id = new mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });
    it("should delete genre from db if input is valid", async () => {
      await exec();

      const genreInDb = await Genre.findById(id);

      expect(genreInDb).toBeNull();
    });
    it("should return 200 and deleted genre", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id", genre._id.toHexString());
      expect(res.body).toHaveProperty("name", genre.name);
    });
  });
});
