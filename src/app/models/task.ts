export class Task{
    public taskId:number;
    public taskType:number;
    public name:string;
    public description:string;

    constructor(obj:any){
        this.taskId = obj && obj.taskId || 0;
        this.taskType = obj && obj.taskType || 0;
        this.name = obj && obj.name || "";
        this.description = obj && obj.description || "";
    }
}
