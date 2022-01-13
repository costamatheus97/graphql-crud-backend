import { container } from "tsyringe";

import "@shared/container/providers";

import { ClinicsRepository } from "@modules/accounts/infra/typeorm/repositories/ClinicsRepository";
import { RadiologistsRepository } from "@modules/accounts/infra/typeorm/repositories/RadiologistsRepository";
import { VeterinariansRepository } from "@modules/accounts/infra/typeorm/repositories/VeterinariansRepository";
import { IClinicsRepository } from "@modules/accounts/repositories/IClinicsRepository";
import { IRadiologistsRepository } from "@modules/accounts/repositories/IRadiologistsRepository";
import { IVeterinariansRepository } from "@modules/accounts/repositories/IVeterinariansRepository";
import { ExamsRepository } from "@modules/exam/infra/typeorm/repositories/ExamsRepository";
import { IExamsRepository } from "@modules/exam/repositories/IExamsRepository";

container.registerSingleton<IClinicsRepository>(
  "ClinicsRepository",
  ClinicsRepository
);
container.registerSingleton<IExamsRepository>(
  "ExamsRepository",
  ExamsRepository
);
container.registerSingleton<IRadiologistsRepository>(
  "RadiologistsRepository",
  RadiologistsRepository
);
container.registerSingleton<IVeterinariansRepository>(
  "VeterinariansRepository",
  VeterinariansRepository
);
