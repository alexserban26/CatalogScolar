import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ICurs } from "../curs.model";

@Component({
  selector: "jhi-curs-detail",
  templateUrl: "./curs-detail.component.html",
})
export class CursDetailComponent implements OnInit {
  curs: ICurs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ curs }) => {
      this.curs = curs;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
