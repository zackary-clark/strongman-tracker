package clark.trackerapi.controllers;

import clark.trackerapi.data.Max;
import clark.trackerapi.services.MaxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MaxController {
    @Autowired
    private MaxService maxService;

    @GetMapping("/maxes")
    public List<Max> index() {
        try {
            return maxService.indexMaxes();
        } catch (Exception e) {
            throw new HttpServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to get Maxes.");
        }
    }

    @PostMapping(value="/max", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity insert(@RequestBody Max max) {
        try {
            maxService.insertMax(max);
            return ResponseEntity.ok("Success");
        } catch (Exception e) {
            throw new HttpServerErrorException(HttpStatus.BAD_REQUEST, "Unable to save Max.");
        }
    }
}
