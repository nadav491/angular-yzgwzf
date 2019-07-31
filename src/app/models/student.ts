export class Student{
    public studentId:number;
    public name:string;

    constructor(obj:any){
        this.studentId = obj && obj.studentId || 0;
        this.name = obj && obj.name || "";
    }
}