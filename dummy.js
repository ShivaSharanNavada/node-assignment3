const { MongoClient } = require("mongodb");
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const request = require("supertest");
const assert = require("assert");
const app = require("./app1");

const MONGODB_URI =
  "mongodb+srv://navadasharan:sharan445@cluster1.pmgqtck.mongodb.net/?retryWrites=true&w=majority";

chai.use(chaiHttp);
describe("API endpoints", () => {
  let client, db, collection;

  it("should do something", function () {
    before(async () => {
      client = await MongoClient.connect(MONGODB_URI);
      db = client.db("people");
      collection = db.collection("friends");
    });
  });

  describe("GET /users", () => {
    it("should return an array of users", async () => {
      const res = await request(app).get("/users");
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an("array");
    });
  });

  describe("POST /users", () => {
    it("should create a new user", async () => {
      const user = { name: "John Doe" };
      const res = await request(app).post("/users").send(user);
      expect(res.statusCode).to.equal(200);
      expect(res.body.insertedCount).to.equal(1);
      const insertedUser = await collection.findOne({
        _id: res.body.insertedId,
      });
      expect(insertedUser.name).to.equal(user.name);
    });
  });

  describe("PUT /users", () => {
    it("should update a user", async () => {
      const user = { name: "John Doe" };
      const insertedId = await collection.insertOne(user);
      const updatedUser = { _id: insertedId, name: "Jane Doe 123" };
      const res = await request(app).put("/users").send(updatedUser);
      expect(res.statusCode).to.equal(200);
      expect(res.body.status).to.be.true;
      const foundUser = await collection.findOne({ _id: insertedId });
      expect(foundUser.name).to.equal(updatedUser.name);
    });
  });

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
