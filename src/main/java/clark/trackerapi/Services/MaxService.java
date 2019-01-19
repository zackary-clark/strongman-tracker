package clark.trackerapi.Services;

import clark.trackerapi.Data.Max;
import clark.trackerapi.Data.MaxRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class MaxService {
    @Autowired
    private MaxRepository maxRepository;

    public List<Max> indexMaxes() {
        List<Max> allMaxes = new ArrayList<>();
        try {
            maxRepository.findAll().forEach(allMaxes::add);
        } catch (Exception e) {
            throw e;
        }
        return allMaxes;
    }

    public void insertMax(Max max) {
        try {
            maxRepository.save(max);
        } catch (Exception e) {
            throw e;
        }
    }
}
