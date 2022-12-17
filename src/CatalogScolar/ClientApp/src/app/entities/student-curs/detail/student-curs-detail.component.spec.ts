import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { StudentCursDetailComponent } from "./student-curs-detail.component";

describe("StudentCurs Management Detail Component", () => {
  let comp: StudentCursDetailComponent;
  let fixture: ComponentFixture<StudentCursDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentCursDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ studentCurs: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(StudentCursDetailComponent, "")
      .compileComponents();
    fixture = TestBed.createComponent(StudentCursDetailComponent);
    comp = fixture.componentInstance;
  });

  describe("OnInit", () => {
    it("Should load studentCurs on init", () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.studentCurs).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
