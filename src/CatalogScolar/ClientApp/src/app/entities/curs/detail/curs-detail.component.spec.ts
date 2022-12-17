import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { CursDetailComponent } from "./curs-detail.component";

describe("Curs Management Detail Component", () => {
  let comp: CursDetailComponent;
  let fixture: ComponentFixture<CursDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ curs: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CursDetailComponent, "")
      .compileComponents();
    fixture = TestBed.createComponent(CursDetailComponent);
    comp = fixture.componentInstance;
  });

  describe("OnInit", () => {
    it("Should load curs on init", () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.curs).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
