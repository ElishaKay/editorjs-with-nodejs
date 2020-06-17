//This test is created with Jest and SuperTest
//Note: This test use different file for testing its completly same just routes are replaced by app

//Importing all required files and node modules
const blog = require("./blogs-route-test");
const comment = require("./comment-route-test");
const supertest = require("supertest");
const request = supertest(blog);
const request2 = supertest(comment);
//Creating few variables for further use
let blogid;
//Creating array to store comment id's
let commentid = [];
//Creating test
describe("Testing blog & comment API", () => {
	//Get all blogs stored in DB
	it("Extracting all blogs", async () => {
		const response = await request.get("/");
		expect(response.status).toBe(200);
	});
	//Adding new blog and store blogs id in blogid
	it("Adding new blog", async () => {
		const response = await request.post("/add").send({
			title: "Created during testing",
			blog: "test",
			thumbnail:
				"https://files.realpython.com/media/Getting-Started-with-Testing-in-Python_Watermarked.9f22be97343d.jpg",
		});
		blogid = response.body.id;
		expect(response.status).toBe(201);
		expect(response.body.title).toBe("Created during testing");
	});
	//Getting newly created blog
	it("Find blog by id", async () => {
		const response = await request.get(`/find/${blogid}`);
		expect(response.status).toBe(200);
		expect(response.body.title).toBe("Created during testing");
	});
	//Creating new comment and storing its id in commentid array
	it("Adding new comment", async () => {
		const response = await request2.post("/add").send({
			comment: "1st comment generated by test",
			blogid,
		});
		commentid.push(response.body.id);
		expect(response.status).toBe(201);
		expect(response.body.comment).toBe("1st comment generated by test");
	});
	// Creating new comment and storing its id in commentid array
	it("Adding new comment", async () => {
		const response = await request2.post("/add").send({
			comment: "2st comment generated by test",
			blogid,
		});
		commentid.push(response.body.id);
		expect(response.status).toBe(201);
		expect(response.body.comment).toBe("2st comment generated by test");
	});
	//Updating blog
	it("Update blog", async () => {
		const response = await request.patch(`/update?id=${blogid}`).send({
			title: "Blog title is updated",
			blog: "Test",
			thumbnail:
				"https://files.realpython.com/media/Getting-Started-with-Testing-in-Python_Watermarked.9f22be97343d.jpg",
		});
		expect(response.status).toBe(200);
		expect(response.body[0]).toBe(1);
	});
	//Updating comment
	it("Update comment", async () => {
		const response = await request2.patch(`/update?id=${commentid[0]}`).send({
			comment: "1st comment updated",
		});
		expect(response.status).toBe(200);
	});
	//Deleting 1st comment
	it("Delete comment by id", async () => {
		const response = await request2.get(`/delete?id=${commentid[0]}`);
		expect(response.status).toBe(200);
	});
	//Deleting blog this should delete the blog and all the comments linked to it
	it("Delete blog by id", async () => {
		const response = await request.get(`/delete?id=${blogid}`);
		expect(response.status).toBe(200);
	});
	//Testing does the second blog is deleted while deleting
	it("Find comment by id", async () => {
		const response = await request2.get(`/findbyid/${commentid[1]}`);
		expect(response.status).toBe(404);
	});
});