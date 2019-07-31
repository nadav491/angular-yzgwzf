import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { GeneralService } from '@app/core/general.service';
import { Grade } from '@app/models/grade';
import { Task } from '@app/models/task';
import { Course } from '@app/models/course';
import { Student } from '@app/models/student';
import { StudentCourse } from '@app/models/student-course';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss']
})
export class LabsComponent implements OnInit {
  public isLoading: boolean;
  public tasks: Task[] = [];
  public filteredTasks: Task[] = [];
  public courses: Course[] = [];
  public students: Student[] = [];
  public studentCourses: StudentCourse[] = [];
  public grades: Grade[] = [];
  public filteredGrades: Grade[] = [];
  public editMode: boolean = false;
  public filterCourseId?: number = null;
  public filterStudentId?: number = null;
  public addSelectedCourse: Course = null;
  public addSelectedStudent: Student = null;
  public addSelectedTask: Task = null;
  public addGradeScore: number = null;
  private flag: number = 0;

  constructor(public g: GeneralService) { }

  ngOnInit() {
    this.isLoading = true;
    this.g.getTasks().subscribe((res) => {
      this.tasks = res;
      this.filteredTasks = this.tasks.filter(t=>{
        return t.taskType == 1;
      })
      this.flag |= 1;
      this.loadGrades();
    });
    this.g.getCourses().subscribe((res) => {
      this.courses = res;
      this.flag |= 2;
      this.loadGrades();
    });
    this.g.getStudents().subscribe((res) => {
      this.students = res;
      this.flag |= 4;
      this.loadGrades();
    });
    this.g.getStudentCourses().subscribe((res) => {
      this.studentCourses = res;
      this.flag |= 8;
      this.loadGrades();
    });
  }

  loadGrades() {
    if (this.flag == 15) {
      this.g.getGrades().subscribe((res) => {
        this.grades = res.map<Grade>((grade, i, arr) => {
          grade.taskObject = this.tasks.find(t => t.taskId == grade.taskId);
          return grade;
        }).filter(grade => {
          var res = grade.taskObject.taskType == 1
          return res;
        });
        this.filterGrades();
        this.isLoading = false;
      });
    }
  }

  updateFilterStudentId(val?: any) {
    if (val == null || val == "") {
      this.filterStudentId = null;
    }
    else {
      this.filterStudentId = parseInt("" + val);
    }
    this.filterGrades();
  }

  updateFilterCourseId(val?: any) {
    if (val == null || val == "") {
      this.filterCourseId = null;
    }
    else {
      this.filterCourseId = parseInt("" + val);
    }
    this.filterGrades();
  }

  filterGrades() {
    this.filteredGrades = this.grades.filter(grade => {
      var res = this.studentCourses.find(c => !this.filterCourseId || (c.studentCourseId == grade.studentCourseId && c.courseId.toString().includes("" + this.filterCourseId))) &&
        this.studentCourses.find(c => !this.filterStudentId || (c.studentCourseId == grade.studentCourseId && c.studentId.toString().includes("" + this.filterStudentId)))
      return res;
    });
  }

  tryUpdateGrade(grade: Grade, ctrl?: any) {
    ctrl.touched = true;
    if (this.checkValidGrade(ctrl)) {
      let gradeScore = parseInt("" + ctrl.value);
      grade.gradeScore = !isNaN(gradeScore) ? gradeScore : null;
      grade.isChanged = true;
    }
  }

  tryAddGrade(ctrl?: any) {
    ctrl.touched = true;
    if (this.checkValidGrade(ctrl)) {
      let gradeScore = parseInt("" + ctrl.value);
      this.addGradeScore = !isNaN(gradeScore) ? gradeScore : null;
    }
  }

  checkValidGrade(ctrl?: any) {
    let gradeScore = 0;

    if (ctrl.touched) {
      try {
        gradeScore = parseInt("" + ctrl.value);
        if (!(gradeScore >= 0 && gradeScore <= 100)) {
          return false;
        }
      }
      catch{
        return false;
      }
    }
    return true;
  }

  addGrade() {
    let studentCourse: StudentCourse = this.studentCourses.find(s => {
      return s.courseId == this.addSelectedCourse.courseId && s.studentId == this.addSelectedStudent.studentId;
    }) || null;
    if (studentCourse == null) {
      alert("The student is not belong to the course!");
      return;
    }

    let gradeExist: Grade = this.grades.find(s => {
      return s.studentCourseId == studentCourse.studentCourseId && s.taskId == this.addSelectedTask.taskId;
    }) || null;
    if (gradeExist != null) {
      alert("The student already has grade in that task!");
      return;
    }

    let grade = new Grade({
      studentCourseId: studentCourse.studentCourseId,
      taskId: this.addSelectedTask.taskId,
      gradeScore: this.addGradeScore
    });
    this.g.addGrade(grade);

    grade.taskObject = this.tasks.find(t => t.taskId == grade.taskId);
    this.grades.push(grade);
    this.filterGrades();
    alert("The frade added succesfully, please look at the table above :-)");
  }

  save() {
    this.grades.forEach(grade => {
      if (grade.isNew) {
        this.g.addGrade(grade);
      }
      else if (grade.isChanged) {
        this.g.updateGrade(grade);
      }
    });
    this.editMode = false;
  }
}
