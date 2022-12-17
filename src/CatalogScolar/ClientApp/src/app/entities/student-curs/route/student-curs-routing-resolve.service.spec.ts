import { TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
  ActivatedRouteSnapshot,
  ActivatedRoute,
  Router,
  convertToParamMap,
} from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";

import { IStudentCurs, StudentCurs } from "../student-curs.model";
import { StudentCursService } from "../service/student-curs.service";

import { StudentCursRoutingResolveService } from "./student-curs-routing-resolve.service";

describe("StudentCurs routing resolve service", () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: StudentCursRoutingResolveService;
  let service: StudentCursService;
  let resultStudentCurs: IStudentCurs | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest
      .spyOn(mockRouter, "navigate")
      .mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(StudentCursRoutingResolveService);
    service = TestBed.inject(StudentCursService);
    resultStudentCurs = undefined;
  });

  describe("resolve", () => {
    it("should return IStudentCurs returned by find", () => {
      // GIVEN
      service.find = jest.fn((id) => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService
        .resolve(mockActivatedRouteSnapshot)
        .subscribe((result) => {
          resultStudentCurs = result;
        });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultStudentCurs).toEqual({ id: 123 });
    });

    it("should return new IStudentCurs if id is not provided", () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService
        .resolve(mockActivatedRouteSnapshot)
        .subscribe((result) => {
          resultStudentCurs = result;
        });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultStudentCurs).toEqual(new StudentCurs());
    });

    it("should route to 404 page if data not found in server", () => {
      // GIVEN
      jest
        .spyOn(service, "find")
        .mockReturnValue(
          of(new HttpResponse({ body: null as unknown as StudentCurs }))
        );
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService
        .resolve(mockActivatedRouteSnapshot)
        .subscribe((result) => {
          resultStudentCurs = result;
        });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultStudentCurs).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(["404"]);
    });
  });
});
