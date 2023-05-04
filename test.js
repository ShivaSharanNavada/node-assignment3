const { MongoClient, ObjectId } = require("mongodb");
const { expect } = require("chai");
//const chaiHttp = require("chai-http");
const request = require("supertest");
//const assert = require("assert");
const app = require("./app1");

const MONGODB_URI =
  "mongodb+srv://navadasharan:sharan445@cluster1.pmgqtck.mongodb.net/?retryWrites=true&w=majority";

describe("API endpoints", () => {
  let db, collection;
  let client;

  before(async () => {
    client = await MongoClient.connect(MONGODB_URI);
    db = client.db("people");
    collection = db.collection("friends");
  });

  after(async () => {
    await client.close();
  });

  //Test case for get api
  describe("GET /users", () => {
    it("should return an array of users", async () => {
      const res = await request(app).get("/users");
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });

  //Test case for post api
  let id;
  describe("POST /users", () => {
    it("should create a new user", async () => {
      const user = { name: "John Doe" };
      const res = await request(app).post("/users").send(user);
      expect(res.statusCode).to.equal(200);
    });
  });

  //Test case for put api
  describe("PUT /users", () => {
    it("should update a user", async () => {
      const user = { name: "John Doe" };
      const insertedId = await collection.insertOne(user);
      const updatedUser = {
        _id: insertedId.insertedId.toString(),
        name: "Jane Doe kk",
      };
      const res = await request(app).put("/users").send(updatedUser);
      expect(res.statusCode).to.equal(200);
      expect(res.body.status).to.be.true;
    });
  });

  //Test case for delete api
  describe("DELETE /users", () => {
    it("should delete a user", async () => {
      const user = { name: "John Doe" };
      const { insertedId } = await collection.insertOne(user);
      const res = await request(app).delete("/users").send({ _id: insertedId });
      expect(res.statusCode).to.equal(200);
      expect(res.body.status).to.be.true;
      const foundUser = await collection.findOne({ _id: insertedId });
      expect(foundUser).to.be.null;
    });
  });
});
