import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";

import { CursService } from "../service/curs.service";

import { CursComponent } from "./curs.component";

describe("Curs Management Component", () => {
  let comp: CursComponent;
  let fixture: ComponentFixture<CursComponent>;
  let service: CursService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CursComponent],
    })
      .overrideTemplate(CursComponent, "")
      .compileComponents();

    fixture = TestBed.createComponent(CursComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CursService);

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
    expect(comp.curs?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
