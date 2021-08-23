import { container } from "tsyringe";

import "@shared/container/providers";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
