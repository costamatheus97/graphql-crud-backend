import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const add24hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Teste",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "teste-1234",
      fine_amount: 40,
      category_id: "12345",
      brand: "Brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: add24hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a rental if the car is already rented", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Teste2",
      description: "Car Test2",
      daily_rate: 100,
      license_plate: "test-1234",
      fine_amount: 40,
      category_id: "123456",
      brand: "Brand2",
    });

    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: add24hours,
    });

    expect(
      createRentalUseCase.execute({
        user_id: "123456",
        car_id: car.id,
        expected_return_date: add24hours,
      })
    ).rejects.toEqual(new AppError("Selected car is not available"));
  });

  it("should not be able to create a rental if the user have a rent in progress", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Teste3",
      description: "Car Test3",
      daily_rate: 100,
      license_plate: "test-1334",
      fine_amount: 40,
      category_id: "133456",
      brand: "Brand3",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Teste3",
      description: "Car Test3",
      daily_rate: 100,
      license_plate: "test-1354",
      fine_amount: 40,
      category_id: "133456",
      brand: "Brand3",
    });

    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: add24hours,
    });

    expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: car2.id,
        expected_return_date: add24hours,
      })
    ).rejects.toEqual(
      new AppError("You cannot rent multiple cars at the same time")
    );
  });

  it("should not be able to create a rental if the return date is less than 24 hours", async () => {
    expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Minimum rent time is 24 hours"));
  });
});
