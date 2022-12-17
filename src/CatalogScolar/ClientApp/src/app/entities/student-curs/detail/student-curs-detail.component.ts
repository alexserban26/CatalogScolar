import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { IStudentCurs } from "../student-curs.model";

@Component({
  selector: "jhi-student-curs-detail",
  templateUrl: "./student-curs-detail.component.html",
})
export class StudentCursDetailComponent implements OnInit {
  studentCurs: IStudentCurs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ studentCurs }) => {
      this.studentCurs = studentCurs;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
