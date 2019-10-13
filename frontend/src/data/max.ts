export interface IMax {
    id: string;
    date: string;
    squat1RM?: string;
    bench1RM?: string;
    deadlift1RM?: string;
    press1RM?: string;
}

export default class Max implements IMax {
    public id = "";
    public date = "";
    public squat1RM: string | undefined;
    public bench1RM: string | undefined;
    public deadlift1RM: string | undefined;
    public press1RM: string | undefined;

    public constructor(data: IMax) {
        this.id = data.id;
        this.date = data.date;
        this.squat1RM = data.squat1RM;
        this.bench1RM = data.bench1RM;
        this.deadlift1RM = data.deadlift1RM;
        this.press1RM = data.press1RM;
    }
}
