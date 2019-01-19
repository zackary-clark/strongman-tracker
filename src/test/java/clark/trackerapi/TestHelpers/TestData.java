package clark.trackerapi.TestHelpers;

import clark.trackerapi.Data.Max;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class TestData {
    public static Max getDefaultMax() {
        Max max1 = new Max();
        max1.setId("1");
        max1.setDate(LocalDate.parse("2019-01-18"));
        max1.setSquat1RM(190.5F);
        max1.setBench1RM(191.5F);
        max1.setDeadlift1RM(192.5F);
        max1.setPress1RM(193.5F);
        return max1;
    }

    public static List<Max> getDefaultListOfMaxes() {
        List<Max> maxes = new ArrayList<>();
        Max max1 = getDefaultMax();
        Max max2 = getDefaultMax();
        max2.setId("2");
        maxes.add(max1);
        maxes.add(max2);
        return maxes;
    }
}
