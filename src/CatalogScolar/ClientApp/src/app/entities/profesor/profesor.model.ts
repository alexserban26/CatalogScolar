export interface IProfesor {
  id?: number;
  nume?: string;
  mail?: string;
}

export class Profesor implements IProfesor {
  constructor(public id?: number, public nume?: string, public mail?: string) {}
}

export function getProfesorIdentifier(profesor: IProfesor): number | undefined {
  return profesor.id;
}
