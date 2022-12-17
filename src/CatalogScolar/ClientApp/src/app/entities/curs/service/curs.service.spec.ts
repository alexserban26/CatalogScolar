import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { ICurs, Curs } from "../curs.model";

import { CursService } from "./curs.service";

describe("Curs Service", () => {
  let service: CursService;
  let httpMock: HttpTestingController;
  let elemDefault: ICurs;
  let expectedResult: ICurs | ICurs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CursService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nume: "AAAAAAA",
    };
  });

  describe("Service methods", () => {
    it("should find an element", () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe((resp) => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: "GET" });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it("should create a Curs", () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service
        .create(new Curs())
        .subscribe((resp) => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: "POST" });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it("should update a Curs", () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nume: "BBBBBB",
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service
        .update(expected)
        .subscribe((resp) => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: "PUT" });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it("should partial update a Curs", () => {
      const patchObject = Object.assign(
        {
          nume: "BBBBBB",
        },
        new Curs()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service
        .partialUpdate(patchObject)
        .subscribe((resp) => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: "PATCH" });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it("should return a list of Curs", () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nume: "BBBBBB",
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe((resp) => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: "GET" });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it("should delete a Curs", () => {
      service.delete(123).subscribe((resp) => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: "DELETE" });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe("addCursToCollectionIfMissing", () => {
      it("should add a Curs to an empty array", () => {
        const curs: ICurs = { id: 123 };
        expectedResult = service.addCursToCollectionIfMissing([], curs);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(curs);
      });

      it("should not add a Curs to an array that contains it", () => {
        const curs: ICurs = { id: 123 };
        const cursCollection: ICurs[] = [
          {
            ...curs,
          },
          { id: 456 },
        ];
        expectedResult = service.addCursToCollectionIfMissing(
          cursCollection,
          curs
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Curs to an array that doesn't contain it", () => {
        const curs: ICurs = { id: 123 };
        const cursCollection: ICurs[] = [{ id: 456 }];
        expectedResult = service.addCursToCollectionIfMissing(
          cursCollection,
          curs
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(curs);
      });

      it("should add only unique Curs to an array", () => {
        const cursArray: ICurs[] = [{ id: 123 }, { id: 456 }, { id: 98608 }];
        const cursCollection: ICurs[] = [{ id: 123 }];
        expectedResult = service.addCursToCollectionIfMissing(
          cursCollection,
          ...cursArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it("should accept varargs", () => {
        const curs: ICurs = { id: 123 };
        const curs2: ICurs = { id: 456 };
        expectedResult = service.addCursToCollectionIfMissing([], curs, curs2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(curs);
        expect(expectedResult).toContain(curs2);
      });

      it("should accept null and undefined values", () => {
        const curs: ICurs = { id: 123 };
        expectedResult = service.addCursToCollectionIfMissing(
          [],
          null,
          curs,
          undefined
        );
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(curs);
      });

      it("should return initial array if no Curs is added", () => {
        const cursCollection: ICurs[] = [{ id: 123 }];
        expectedResult = service.addCursToCollectionIfMissing(
          cursCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(cursCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
