import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

import { isPresent } from "app/core/util/operators";
import { ApplicationConfigService } from "app/core/config/application-config.service";
import { createRequestOption } from "app/core/request/request-util";
import { ICurs, getCursIdentifier } from "../curs.model";

export type EntityResponseType = HttpResponse<ICurs>;
export type EntityArrayResponseType = HttpResponse<ICurs[]>;

@Injectable({ providedIn: "root" })
export class CursService {
  protected resourceUrl =
    this.applicationConfigService.getEndpointFor("api/curs");

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {}

  create(curs: ICurs): Observable<EntityResponseType> {
    return this.http.post<ICurs>(this.resourceUrl, curs, {
      observe: "response",
    });
  }

  update(curs: ICurs): Observable<EntityResponseType> {
    return this.http.put<ICurs>(
      `${this.resourceUrl}/${getCursIdentifier(curs) as number}`,
      curs,
      { observe: "response" }
    );
  }

  partialUpdate(curs: ICurs): Observable<EntityResponseType> {
    return this.http.patch<ICurs>(
      `${this.resourceUrl}/${getCursIdentifier(curs) as number}`,
      curs,
      { observe: "response" }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICurs>(`${this.resourceUrl}/${id}`, {
      observe: "response",
    });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICurs[]>(this.resourceUrl, {
      params: options,
      observe: "response",
    });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: "response",
    });
  }

  addCursToCollectionIfMissing(
    cursCollection: ICurs[],
    ...cursToCheck: (ICurs | null | undefined)[]
  ): ICurs[] {
    const curs: ICurs[] = cursToCheck.filter(isPresent);
    if (curs.length > 0) {
      const cursCollectionIdentifiers = cursCollection.map(
        (cursItem) => getCursIdentifier(cursItem)!
      );
      const cursToAdd = curs.filter((cursItem) => {
        const cursIdentifier = getCursIdentifier(cursItem);
        if (
          cursIdentifier == null ||
          cursCollectionIdentifiers.includes(cursIdentifier)
        ) {
          return false;
        }
        cursCollectionIdentifiers.push(cursIdentifier);
        return true;
      });
      return [...cursToAdd, ...cursCollection];
    }
    return cursCollection;
  }
}
