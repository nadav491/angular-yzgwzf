export class StudentCourse{
    public studentCourseId:number;
    public studentId:number;
    public courseId:number;

    constructor(obj:any){
        this.studentCourseId = obj && obj.studentCourseId || 0;
        this.studentId = obj && obj.studentId || 0;
        this.courseId = obj && obj.courseId || 0;
    }
}