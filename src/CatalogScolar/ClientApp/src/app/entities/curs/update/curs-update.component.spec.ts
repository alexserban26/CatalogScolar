import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of, Subject, from } from "rxjs";

import { CursService } from "../service/curs.service";
import { ICurs, Curs } from "../curs.model";
import { IProfesor } from "app/entities/profesor/profesor.model";
import { ProfesorService } from "app/entities/profesor/service/profesor.service";

import { CursUpdateComponent } from "./curs-update.component";

describe("Curs Management Update Component", () => {
  let comp: CursUpdateComponent;
  let fixture: ComponentFixture<CursUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cursService: CursService;
  let profesorService: ProfesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CursUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CursUpdateComponent, "")
      .compileComponents();

    fixture = TestBed.createComponent(CursUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cursService = TestBed.inject(CursService);
    profesorService = TestBed.inject(ProfesorService);

    comp = fixture.componentInstance;
  });

  describe("ngOnInit", () => {
    it("Should call Profesor query and add missing value", () => {
      const curs: ICurs = { id: 456 };
      const profesor: IProfesor = { id: 4352 };
      curs.profesor = profesor;

      const profesorCollection: IProfesor[] = [{ id: 50325 }];
      jest
        .spyOn(profesorService, "query")
        .mockReturnValue(of(new HttpResponse({ body: profesorCollection })));
      const additionalProfesors = [profesor];
      const expectedCollection: IProfesor[] = [
        ...additionalProfesors,
        ...profesorCollection,
      ];
      jest
        .spyOn(profesorService, "addProfesorToCollectionIfMissing")
        .mockReturnValue(expectedCollection);

      activatedRoute.data = of({ curs });
      comp.ngOnInit();

      expect(profesorService.query).toHaveBeenCalled();
      expect(
        profesorService.addProfesorToCollectionIfMissing
      ).toHaveBeenCalledWith(profesorCollection, ...additionalProfesors);
      expect(comp.profesorsSharedCollection).toEqual(expectedCollection);
    });

    it("Should update editForm", () => {
      const curs: ICurs = { id: 456 };
      const profesor: IProfesor = { id: 49428 };
      curs.profesor = profesor;

      activatedRoute.data = of({ curs });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(curs));
      expect(comp.profesorsSharedCollection).toContain(profesor);
    });
  });

  describe("save", () => {
    it("Should call update service on save for existing entity", () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Curs>>();
      const curs = { id: 123 };
      jest.spyOn(cursService, "update").mockReturnValue(saveSubject);
      jest.spyOn(comp, "previousState");
      activatedRoute.data = of({ curs });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: curs }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(cursService.update).toHaveBeenCalledWith(curs);
      expect(comp.isSaving).toEqual(false);
    });

    it("Should call create service on save for new entity", () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Curs>>();
      const curs = new Curs();
      jest.spyOn(cursService, "create").mockReturnValue(saveSubject);
      jest.spyOn(comp, "previousState");
      activatedRoute.data = of({ curs });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: curs }));
      saveSubject.complete();

      // THEN
      expect(cursService.create).toHaveBeenCalledWith(curs);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it("Should set isSaving to false on error", () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Curs>>();
      const curs = { id: 123 };
      jest.spyOn(cursService, "update").mockReturnValue(saveSubject);
      jest.spyOn(comp, "previousState");
      activatedRoute.data = of({ curs });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error("This is an error!");

      // THEN
      expect(cursService.update).toHaveBeenCalledWith(curs);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe("Tracking relationships identifiers", () => {
    describe("trackProfesorById", () => {
      it("Should return tracked Profesor primary key", () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProfesorById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
