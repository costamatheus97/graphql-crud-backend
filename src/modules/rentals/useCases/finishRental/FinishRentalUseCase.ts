import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class FinishRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) {
      throw new AppError("Selected rental does not exists");
    }

    const dateNow = this.dateProvider.dateNow();

    let difference = this.dateProvider.compareInHours(
      rental.start_date,
      dateNow
    );

    if (difference === 0) {
      difference = 1;
    }

    const usedDays = Math.ceil(difference / 24);

    const exceededDays = this.dateProvider.compareInDays(
      rental.expected_return_date,
      dateNow
    );

    let total = 0;

    if (exceededDays > 0) {
      const fine = exceededDays * car.fine_amount;

      total = fine;
    }

    total += usedDays * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailability(car.id, true);

    return rental;
  }
}

export { FinishRentalUseCase };
