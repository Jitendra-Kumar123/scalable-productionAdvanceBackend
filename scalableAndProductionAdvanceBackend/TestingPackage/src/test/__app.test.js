const request = require("supertest")
const app = require("../app")


describe("GET /test", ()=>{
    it("should be 200 ok", async()=>{
        const res = await request(app).get("/test");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual("this is test api for testing the jest");
    })
})