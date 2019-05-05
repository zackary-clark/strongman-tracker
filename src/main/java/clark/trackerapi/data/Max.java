package clark.trackerapi.data;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document
@Data
@AllArgsConstructor
public class Max {
    @Id
    private String id;
    @NonNull
    private LocalDate date;

    private Float squat1RM;
    private Float bench1RM;
    private Float deadlift1RM;
    private Float press1RM;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Float getSquat1RM() {
        return squat1RM;
    }

    public void setSquat1RM(Float squat1RM) {
        this.squat1RM = squat1RM;
    }

    public Float getBench1RM() {
        return bench1RM;
    }

    public void setBench1RM(Float bench1RM) {
        this.bench1RM = bench1RM;
    }

    public Float getDeadlift1RM() {
        return deadlift1RM;
    }

    public void setDeadlift1RM(Float deadlift1RM) {
        this.deadlift1RM = deadlift1RM;
    }

    public Float getPress1RM() {
        return press1RM;
    }

    public void setPress1RM(Float press1RM) {
        this.press1RM = press1RM;
    }
}
