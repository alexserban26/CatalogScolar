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

import { ICurs, Curs } from "../curs.model";
import { CursService } from "../service/curs.service";

import { CursRoutingResolveService } from "./curs-routing-resolve.service";

describe("Curs routing resolve service", () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: CursRoutingResolveService;
  let service: CursService;
  let resultCurs: ICurs | undefined;

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
    routingResolveService = TestBed.inject(CursRoutingResolveService);
    service = TestBed.inject(CursService);
    resultCurs = undefined;
  });

  describe("resolve", () => {
    it("should return ICurs returned by find", () => {
      // GIVEN
      service.find = jest.fn((id) => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService
        .resolve(mockActivatedRouteSnapshot)
        .subscribe((result) => {
          resultCurs = result;
        });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCurs).toEqual({ id: 123 });
    });

    it("should return new ICurs if id is not provided", () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService
        .resolve(mockActivatedRouteSnapshot)
        .subscribe((result) => {
          resultCurs = result;
        });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCurs).toEqual(new Curs());
    });

    it("should route to 404 page if data not found in server", () => {
      // GIVEN
      jest
        .spyOn(service, "find")
        .mockReturnValue(
          of(new HttpResponse({ body: null as unknown as Curs }))
        );
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService
        .resolve(mockActivatedRouteSnapshot)
        .subscribe((result) => {
          resultCurs = result;
        });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCurs).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(["404"]);
    });
  });
});
