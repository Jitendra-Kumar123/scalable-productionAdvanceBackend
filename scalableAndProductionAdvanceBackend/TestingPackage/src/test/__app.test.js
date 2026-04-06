const request = require("supertest")
const app = require("../app")


// describe("GET /test", ()=>{
//     it("should be 200 ok", async()=>{
//         const res = await request(app).get("/test");
//         expect(res.statusCode).toBe(200);
//         expect(res.body.message).toEqual("this is test api for testing the jest");
//     })
// })

describe("POST /register", () => {
    it("should be 200 ok", async () => {
        const res = await request(app).post("/register").send({
            
                userName: "Test_User",
                email: "test@example.com",
                password: "Password@123"
            
    })

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual("User Registered Successfully");
    })
})