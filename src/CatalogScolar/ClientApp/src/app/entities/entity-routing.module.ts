import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "profesor",
        data: { pageTitle: "Profesors" },
        loadChildren: () =>
          import("./profesor/profesor.module").then((m) => m.ProfesorModule),
      },
      {
        path: "curs",
        data: { pageTitle: "Curs" },
        loadChildren: () =>
          import("./curs/curs.module").then((m) => m.CursModule),
      },
      {
        path: "profesor",
        data: { pageTitle: "Profesors" },
        loadChildren: () =>
          import("./profesor/profesor.module").then((m) => m.ProfesorModule),
      },
      {
        path: "student",
        data: { pageTitle: "Students" },
        loadChildren: () =>
          import("./student/student.module").then((m) => m.StudentModule),
      },
      {
        path: "profesor",
        data: { pageTitle: "Profesors" },
        loadChildren: () =>
          import("./profesor/profesor.module").then((m) => m.ProfesorModule),
      },
      {
        path: "curs",
        data: { pageTitle: "Curs" },
        loadChildren: () =>
          import("./curs/curs.module").then((m) => m.CursModule),
      },
      {
        path: "student",
        data: { pageTitle: "Students" },
        loadChildren: () =>
          import("./student/student.module").then((m) => m.StudentModule),
      },
      {
        path: "profesor",
        data: { pageTitle: "Profesors" },
        loadChildren: () =>
          import("./profesor/profesor.module").then((m) => m.ProfesorModule),
      },
      {
        path: "curs",
        data: { pageTitle: "Curs" },
        loadChildren: () =>
          import("./curs/curs.module").then((m) => m.CursModule),
      },
      {
        path: "curs",
        data: { pageTitle: "Curs" },
        loadChildren: () =>
          import("./curs/curs.module").then((m) => m.CursModule),
      },
      {
        path: "profesor",
        data: { pageTitle: "Profesors" },
        loadChildren: () =>
          import("./profesor/profesor.module").then((m) => m.ProfesorModule),
      },
      {
        path: "student",
        data: { pageTitle: "Students" },
        loadChildren: () =>
          import("./student/student.module").then((m) => m.StudentModule),
      },
      {
        path: "student",
        data: { pageTitle: "Students" },
        loadChildren: () =>
          import("./student/student.module").then((m) => m.StudentModule),
      },
      {
        path: "profesor",
        data: { pageTitle: "Profesors" },
        loadChildren: () =>
          import("./profesor/profesor.module").then((m) => m.ProfesorModule),
      },
      {
        path: "curs",
        data: { pageTitle: "Curs" },
        loadChildren: () =>
          import("./curs/curs.module").then((m) => m.CursModule),
      },
      {
        path: "student",
        data: { pageTitle: "Students" },
        loadChildren: () =>
          import("./student/student.module").then((m) => m.StudentModule),
      },
      {
        path: "profesor",
        data: { pageTitle: "Profesors" },
        loadChildren: () =>
          import("./profesor/profesor.module").then((m) => m.ProfesorModule),
      },
      {
        path: "curs",
        data: { pageTitle: "Curs" },
        loadChildren: () =>
          import("./curs/curs.module").then((m) => m.CursModule),
      },
      {
        path: "student",
        data: { pageTitle: "Students" },
        loadChildren: () =>
          import("./student/student.module").then((m) => m.StudentModule),
      },
      {
        path: "profesor",
        data: { pageTitle: "Profesors" },
        loadChildren: () =>
          import("./profesor/profesor.module").then((m) => m.ProfesorModule),
      },
      {
        path: "curs",
        data: { pageTitle: "Curs" },
        loadChildren: () =>
          import("./curs/curs.module").then((m) => m.CursModule),
      },
      {
        path: "student-curs",
        data: { pageTitle: "StudentCurs" },
        loadChildren: () =>
          import("./student-curs/student-curs.module").then(
            (m) => m.StudentCursModule
          ),
      },
      {
        path: "profesor",
        data: { pageTitle: "Profesors" },
        loadChildren: () =>
          import("./profesor/profesor.module").then((m) => m.ProfesorModule),
      },
      {
        path: "curs",
        data: { pageTitle: "Curs" },
        loadChildren: () =>
          import("./curs/curs.module").then((m) => m.CursModule),
      },
      {
        path: "student",
        data: { pageTitle: "Students" },
        loadChildren: () =>
          import("./student/student.module").then((m) => m.StudentModule),
      },
      {
        path: "student",
        data: { pageTitle: "Students" },
        loadChildren: () =>
          import("./student/student.module").then((m) => m.StudentModule),
      },
      {
        path: "profesor",
        data: { pageTitle: "Profesors" },
        loadChildren: () =>
          import("./profesor/profesor.module").then((m) => m.ProfesorModule),
      },
      {
        path: "curs",
        data: { pageTitle: "Curs" },
        loadChildren: () =>
          import("./curs/curs.module").then((m) => m.CursModule),
      },
      {
        path: "student-curs",
        data: { pageTitle: "StudentCurs" },
        loadChildren: () =>
          import("./student-curs/student-curs.module").then(
            (m) => m.StudentCursModule
          ),
      },
      {
        path: "curs",
        data: { pageTitle: "Curs" },
        loadChildren: () =>
          import("./curs/curs.module").then((m) => m.CursModule),
      },
      {
        path: "profesor",
        data: { pageTitle: "Profesors" },
        loadChildren: () =>
          import("./profesor/profesor.module").then((m) => m.ProfesorModule),
      },
      {
        path: "student",
        data: { pageTitle: "Students" },
        loadChildren: () =>
          import("./student/student.module").then((m) => m.StudentModule),
      },
      {
        path: "student-curs",
        data: { pageTitle: "StudentCurs" },
        loadChildren: () =>
          import("./student-curs/student-curs.module").then(
            (m) => m.StudentCursModule
          ),
      },
      {
        path: "student-curs",
        data: { pageTitle: "StudentCurs" },
        loadChildren: () =>
          import("./student-curs/student-curs.module").then(
            (m) => m.StudentCursModule
          ),
      },
      {
        path: "profesor",
        data: { pageTitle: "Profesors" },
        loadChildren: () =>
          import("./profesor/profesor.module").then((m) => m.ProfesorModule),
      },
      {
        path: "curs",
        data: { pageTitle: "Curs" },
        loadChildren: () =>
          import("./curs/curs.module").then((m) => m.CursModule),
      },
      {
        path: "student",
        data: { pageTitle: "Students" },
        loadChildren: () =>
          import("./student/student.module").then((m) => m.StudentModule),
      },
      {
        path: "student-curs",
        data: { pageTitle: "StudentCurs" },
        loadChildren: () =>
          import("./student-curs/student-curs.module").then(
            (m) => m.StudentCursModule
          ),
      },
      {
        path: "profesor",
        data: { pageTitle: "Profesors" },
        loadChildren: () =>
          import("./profesor/profesor.module").then((m) => m.ProfesorModule),
      },
      {
        path: "curs",
        data: { pageTitle: "Curs" },
        loadChildren: () =>
          import("./curs/curs.module").then((m) => m.CursModule),
      },
      {
        path: "student",
        data: { pageTitle: "Students" },
        loadChildren: () =>
          import("./student/student.module").then((m) => m.StudentModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
