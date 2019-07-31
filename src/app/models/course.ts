export class Course{
    public courseId:number;
    public name:string;
    public points:number;

    constructor(obj:any){
        this.courseId = obj && obj.courseId || 0;
        this.name = obj && obj.name || "";
        this.points = obj && obj.points || 0;
    }
}