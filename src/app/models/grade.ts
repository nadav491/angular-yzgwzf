import { Task } from "@app/models/task";

export class Grade {
    static copy(old: Grade) {
        let g = new Grade({
            studentCourseId: old.studentCourseId,
            taskId: old.taskId,
            gradeScore: old.gradeScore
        })
        return g;
    }

    public studentCourseId: number;
    public taskId: number;
    public gradeScore: number;

    public taskObject: Task;
    public isChanged: boolean;
    public isNew: boolean;

    constructor(obj: any) {
        this.studentCourseId = obj && obj.studentCourseId || 0;
        this.taskId = obj && obj.taskId || 0;
        this.gradeScore = obj && obj.gradeScore || 100;

        this.taskObject = new Task(null);
        this.isChanged = obj && obj.isChanged || false;
        this.isNew = obj && obj.isNew || false;
    }
}