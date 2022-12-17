import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";

import { StudentCursService } from "../service/student-curs.service";

import { StudentCursComponent } from "./student-curs.component";

describe("StudentCurs Management Component", () => {
  let comp: StudentCursComponent;
  let fixture: ComponentFixture<StudentCursComponent>;
  let service: StudentCursService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StudentCursComponent],
    })
      .overrideTemplate(StudentCursComponent, "")
      .compileComponents();

    fixture = TestBed.createComponent(StudentCursComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(StudentCursService);

    const headers = new HttpHeaders();
    jest.spyOn(service, "query").mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it("Should call load all on init", () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.studentCurs?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
