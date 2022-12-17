import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";

import { ProfesorService } from "../service/profesor.service";

import { ProfesorComponent } from "./profesor.component";

describe("Profesor Management Component", () => {
  let comp: ProfesorComponent;
  let fixture: ComponentFixture<ProfesorComponent>;
  let service: ProfesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProfesorComponent],
    })
      .overrideTemplate(ProfesorComponent, "")
      .compileComponents();

    fixture = TestBed.createComponent(ProfesorComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ProfesorService);

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
    expect(comp.profesors?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
