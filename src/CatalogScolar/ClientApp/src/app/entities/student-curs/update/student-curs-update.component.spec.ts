import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of, Subject, from } from "rxjs";

import { StudentCursService } from "../service/student-curs.service";
import { IStudentCurs, StudentCurs } from "../student-curs.model";
import { IStudent } from "app/entities/student/student.model";
import { StudentService } from "app/entities/student/service/student.service";
import { ICurs } from "app/entities/curs/curs.model";
import { CursService } from "app/entities/curs/service/curs.service";

import { StudentCursUpdateComponent } from "./student-curs-update.component";

describe("StudentCurs Management Update Component", () => {
  let comp: StudentCursUpdateComponent;
  let fixture: ComponentFixture<StudentCursUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let studentCursService: StudentCursService;
  let studentService: StudentService;
  let cursService: CursService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [StudentCursUpdateComponent],
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
      .overrideTemplate(StudentCursUpdateComponent, "")
      .compileComponents();

    fixture = TestBed.createComponent(StudentCursUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    studentCursService = TestBed.inject(StudentCursService);
    studentService = TestBed.inject(StudentService);
    cursService = TestBed.inject(CursService);

    comp = fixture.componentInstance;
  });

  describe("ngOnInit", () => {
    it("Should call Student query and add missing value", () => {
      const studentCurs: IStudentCurs = { id: 456 };
      const student: IStudent = { id: 43293 };
      studentCurs.student = student;

      const studentCollection: IStudent[] = [{ id: 13306 }];
      jest
        .spyOn(studentService, "query")
        .mockReturnValue(of(new HttpResponse({ body: studentCollection })));
      const additionalStudents = [student];
      const expectedCollection: IStudent[] = [
        ...additionalStudents,
        ...studentCollection,
      ];
      jest
        .spyOn(studentService, "addStudentToCollectionIfMissing")
        .mockReturnValue(expectedCollection);

      activatedRoute.data = of({ studentCurs });
      comp.ngOnInit();

      expect(studentService.query).toHaveBeenCalled();
      expect(
        studentService.addStudentToCollectionIfMissing
      ).toHaveBeenCalledWith(studentCollection, ...additionalStudents);
      expect(comp.studentsSharedCollection).toEqual(expectedCollection);
    });

    it("Should call Curs query and add missing value", () => {
      const studentCurs: IStudentCurs = { id: 456 };
      const curs: ICurs = { id: 75915 };
      studentCurs.curs = curs;

      const cursCollection: ICurs[] = [{ id: 35231 }];
      jest
        .spyOn(cursService, "query")
        .mockReturnValue(of(new HttpResponse({ body: cursCollection })));
      const additionalCurs = [curs];
      const expectedCollection: ICurs[] = [
        ...additionalCurs,
        ...cursCollection,
      ];
      jest
        .spyOn(cursService, "addCursToCollectionIfMissing")
        .mockReturnValue(expectedCollection);

      activatedRoute.data = of({ studentCurs });
      comp.ngOnInit();

      expect(cursService.query).toHaveBeenCalled();
      expect(cursService.addCursToCollectionIfMissing).toHaveBeenCalledWith(
        cursCollection,
        ...additionalCurs
      );
      expect(comp.cursSharedCollection).toEqual(expectedCollection);
    });

    it("Should update editForm", () => {
      const studentCurs: IStudentCurs = { id: 456 };
      const student: IStudent = { id: 31762 };
      studentCurs.student = student;
      const curs: ICurs = { id: 5249 };
      studentCurs.curs = curs;

      activatedRoute.data = of({ studentCurs });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(studentCurs));
      expect(comp.studentsSharedCollection).toContain(student);
      expect(comp.cursSharedCollection).toContain(curs);
    });
  });

  describe("save", () => {
    it("Should call update service on save for existing entity", () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StudentCurs>>();
      const studentCurs = { id: 123 };
      jest.spyOn(studentCursService, "update").mockReturnValue(saveSubject);
      jest.spyOn(comp, "previousState");
      activatedRoute.data = of({ studentCurs });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: studentCurs }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(studentCursService.update).toHaveBeenCalledWith(studentCurs);
      expect(comp.isSaving).toEqual(false);
    });

    it("Should call create service on save for new entity", () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StudentCurs>>();
      const studentCurs = new StudentCurs();
      jest.spyOn(studentCursService, "create").mockReturnValue(saveSubject);
      jest.spyOn(comp, "previousState");
      activatedRoute.data = of({ studentCurs });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: studentCurs }));
      saveSubject.complete();

      // THEN
      expect(studentCursService.create).toHaveBeenCalledWith(studentCurs);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it("Should set isSaving to false on error", () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<StudentCurs>>();
      const studentCurs = { id: 123 };
      jest.spyOn(studentCursService, "update").mockReturnValue(saveSubject);
      jest.spyOn(comp, "previousState");
      activatedRoute.data = of({ studentCurs });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error("This is an error!");

      // THEN
      expect(studentCursService.update).toHaveBeenCalledWith(studentCurs);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe("Tracking relationships identifiers", () => {
    describe("trackStudentById", () => {
      it("Should return tracked Student primary key", () => {
        const entity = { id: 123 };
        const trackResult = comp.trackStudentById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe("trackCursById", () => {
      it("Should return tracked Curs primary key", () => {
        const entity = { id: 123 };
        const trackResult = comp.trackCursById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
