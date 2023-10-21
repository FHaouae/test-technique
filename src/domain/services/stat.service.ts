import { IVisa, IVisaStat } from '../entities/interfaces';

export class StatService {
  compute(visas: IVisa[], date: Date): IVisaStat[] {
    const result: IVisaStat[] = [];

    visas.forEach(visa => {
      if (visa.doneAt === undefined) {

        const visaDueDate = new Date(visa.at).getTime() + visa.timeLimit * 24 * 60 * 60 * 1000;
        const currentDate = date.getTime();

        if (currentDate > visaDueDate) {
          const lateness = Math.floor((currentDate - visaDueDate) / (24 * 60 * 60 * 1000));
          result.push({
            document: visa.document,
            validation: visa.validation,
            lateness: lateness
          });
        }
      }
    });

    return result.sort((a, b) => b.lateness - a.lateness);
  }
}

