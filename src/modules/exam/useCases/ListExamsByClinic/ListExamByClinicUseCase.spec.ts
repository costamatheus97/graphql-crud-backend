import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Example name",
      description: "Example description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Nissan",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with same license plate", async () => {
    await createCarUseCase.execute({
      name: "Example name1",
      description: "Example description",
      daily_rate: 100,
      license_plate: "BCD-1234",
      fine_amount: 60,
      brand: "Nissan",
      category_id: "category",
    });

    expect(
      createCarUseCase.execute({
        name: "Example name2",
        description: "Example description",
        daily_rate: 100,
        license_plate: "BCD-1234",
        fine_amount: 60,
        brand: "Nissan",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Car already exists"));
  });

  it("should be able to create cars available by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Availability Test",
      description: "Example description",
      daily_rate: 100,
      license_plate: "CDE-1234",
      fine_amount: 60,
      brand: "Nissan",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
