import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { IStudentCurs, StudentCurs } from "../student-curs.model";

import { StudentCursService } from "./student-curs.service";

describe("StudentCurs Service", () => {
  let service: StudentCursService;
  let httpMock: HttpTestingController;
  let elemDefault: IStudentCurs;
  let expectedResult: IStudentCurs | IStudentCurs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(StudentCursService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nota: 0,
      anScolar: "AAAAAAA",
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

    it("should create a StudentCurs", () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service
        .create(new StudentCurs())
        .subscribe((resp) => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: "POST" });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it("should update a StudentCurs", () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nota: 1,
          anScolar: "BBBBBB",
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

    it("should partial update a StudentCurs", () => {
      const patchObject = Object.assign(
        {
          nota: 1,
        },
        new StudentCurs()
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

    it("should return a list of StudentCurs", () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nota: 1,
          anScolar: "BBBBBB",
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

    it("should delete a StudentCurs", () => {
      service.delete(123).subscribe((resp) => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: "DELETE" });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe("addStudentCursToCollectionIfMissing", () => {
      it("should add a StudentCurs to an empty array", () => {
        const studentCurs: IStudentCurs = { id: 123 };
        expectedResult = service.addStudentCursToCollectionIfMissing(
          [],
          studentCurs
        );
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(studentCurs);
      });

      it("should not add a StudentCurs to an array that contains it", () => {
        const studentCurs: IStudentCurs = { id: 123 };
        const studentCursCollection: IStudentCurs[] = [
          {
            ...studentCurs,
          },
          { id: 456 },
        ];
        expectedResult = service.addStudentCursToCollectionIfMissing(
          studentCursCollection,
          studentCurs
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a StudentCurs to an array that doesn't contain it", () => {
        const studentCurs: IStudentCurs = { id: 123 };
        const studentCursCollection: IStudentCurs[] = [{ id: 456 }];
        expectedResult = service.addStudentCursToCollectionIfMissing(
          studentCursCollection,
          studentCurs
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(studentCurs);
      });

      it("should add only unique StudentCurs to an array", () => {
        const studentCursArray: IStudentCurs[] = [
          { id: 123 },
          { id: 456 },
          { id: 68310 },
        ];
        const studentCursCollection: IStudentCurs[] = [{ id: 123 }];
        expectedResult = service.addStudentCursToCollectionIfMissing(
          studentCursCollection,
          ...studentCursArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it("should accept varargs", () => {
        const studentCurs: IStudentCurs = { id: 123 };
        const studentCurs2: IStudentCurs = { id: 456 };
        expectedResult = service.addStudentCursToCollectionIfMissing(
          [],
          studentCurs,
          studentCurs2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(studentCurs);
        expect(expectedResult).toContain(studentCurs2);
      });

      it("should accept null and undefined values", () => {
        const studentCurs: IStudentCurs = { id: 123 };
        expectedResult = service.addStudentCursToCollectionIfMissing(
          [],
          null,
          studentCurs,
          undefined
        );
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(studentCurs);
      });

      it("should return initial array if no StudentCurs is added", () => {
        const studentCursCollection: IStudentCurs[] = [{ id: 123 }];
        expectedResult = service.addStudentCursToCollectionIfMissing(
          studentCursCollection,
          undefined,
          null
        );
        expect(expectedResult).toEqual(studentCursCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
