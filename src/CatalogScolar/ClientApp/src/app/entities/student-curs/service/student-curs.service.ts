import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

import { isPresent } from "app/core/util/operators";
import { ApplicationConfigService } from "app/core/config/application-config.service";
import { createRequestOption } from "app/core/request/request-util";
import { IStudentCurs, getStudentCursIdentifier } from "../student-curs.model";

export type EntityResponseType = HttpResponse<IStudentCurs>;
export type EntityArrayResponseType = HttpResponse<IStudentCurs[]>;

@Injectable({ providedIn: "root" })
export class StudentCursService {
  protected resourceUrl =
    this.applicationConfigService.getEndpointFor("api/student-curs");

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  create(studentCurs: IStudentCurs): Observable<EntityResponseType> {
    return this.http.post<IStudentCurs>(this.resourceUrl, studentCurs, {
      observe: "response",
    });
  }

  update(studentCurs: IStudentCurs): Observable<EntityResponseType> {
    return this.http.put<IStudentCurs>(
      `${this.resourceUrl}/${getStudentCursIdentifier(studentCurs) as number}`,
      studentCurs,
      { observe: "response" }
    );
  }

  partialUpdate(studentCurs: IStudentCurs): Observable<EntityResponseType> {
    return this.http.patch<IStudentCurs>(
      `${this.resourceUrl}/${getStudentCursIdentifier(studentCurs) as number}`,
      studentCurs,
      { observe: "response" }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStudentCurs>(`${this.resourceUrl}/${id}`, {
      observe: "response",
    });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStudentCurs[]>(this.resourceUrl, {
      params: options,
      observe: "response",
    });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: "response",
    });
  }

  addStudentCursToCollectionIfMissing(
    studentCursCollection: IStudentCurs[],
    ...studentCursToCheck: (IStudentCurs | null | undefined)[]
  ): IStudentCurs[] {
    const studentCurs: IStudentCurs[] = studentCursToCheck.filter(isPresent);
    if (studentCurs.length > 0) {
      const studentCursCollectionIdentifiers = studentCursCollection.map(
        (studentCursItem) => getStudentCursIdentifier(studentCursItem)!
      );
      const studentCursToAdd = studentCurs.filter((studentCursItem) => {
        const studentCursIdentifier = getStudentCursIdentifier(studentCursItem);
        if (
          studentCursIdentifier == null ||
          studentCursCollectionIdentifiers.includes(studentCursIdentifier)
        ) {
          return false;
        }
        studentCursCollectionIdentifiers.push(studentCursIdentifier);
        return true;
      });
      return [...studentCursToAdd, ...studentCursCollection];
    }
    return studentCursCollection;
  }
}
