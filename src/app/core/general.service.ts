import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Grade } from '@app/models/grade';
import { Course } from '@app/models/course';
import { Student } from '@app/models/student';
import { StudentCourse } from '@app/models/student-course';
import { Task } from '@app/models/task';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private subs: any[] = [];
  private url: string = 'http://localhost:50881/api';
  public grades: Observable<Grade[]> = new Observable<Grade[]>();

  constructor(public httpClient: HttpClient) { }

  getGrades(): Observable<Grade[]> {
    var obs = this.httpClient.get<Grade[]>(`${this.url}/Grades`);
    return obs;
  }

  getCourses(): Observable<Course[]> {
    var obs = this.httpClient.get<Course[]>(`${this.url}/Courses`);
    return obs;
  }

  getStudents(): Observable<Student[]> {
    var obs = this.httpClient.get<Student[]>(`${this.url}/Students`);
    return obs;
  }

  getTasks(): Observable<Task[]> {
    var obs = this.httpClient.get<Task[]>(`${this.url}/Tasks`);
    return obs;
  }

  getStudentCourses(): Observable<StudentCourse[]> {
    var obs = this.httpClient.get<StudentCourse[]>(`${this.url}/StudentCourses`);
    return obs;
  }

  addGrade(grade: Grade) {
    var obs = this.httpClient.post(`${this.url}/Grades`, { obj: Grade.copy(grade) });
    return obs;
  }

  updateGrade(grade: Grade) {
    var obs = this.httpClient.put(`${this.url}/Grades`, { obj: Grade.copy(grade) });
    return obs;
  }
}
