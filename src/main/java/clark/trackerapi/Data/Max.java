package clark.trackerapi.Data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Data
@AllArgsConstructor
public class Max {
    @Id
    private String id;
    @NonNull
    private Date date;

    private Float squat1RM;
    private Float bench1RM;
    private Float deadlift1RM;
    private Float press1RM;
}
