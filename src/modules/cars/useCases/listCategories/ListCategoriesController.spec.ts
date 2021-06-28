import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("ListCategoryController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("admin", 8);
    const id = uuidV4();

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license )
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'XXXXXXX')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/api/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/api/categories/")
      .send({
        name: "Category Supertest 2",
        description: "Category Supertest Description 2",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get("/api/categories");

    expect(response.status).toBe(200);
    // expect(response.body.length).toBe(1);
    // expect(response.body[0]).toHaveProperty("id");
    // expect(response.body[0]).toEqual(
    //   expect.objectContaining({
    //     name: "Category name 2",
    //     description: "Category description",
    //   })
    // );
  });
});
