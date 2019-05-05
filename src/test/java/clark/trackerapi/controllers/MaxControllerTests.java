package clark.trackerapi.controllers;

import clark.trackerapi.data.Max;
import clark.trackerapi.services.MaxService;
import clark.trackerapi.testHelpers.TestData;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(MaxController.class)
public class MaxControllerTests {
    private MockMvc mockMvc;

    @MockBean
    private MaxService maxService;

    @Autowired
    private WebApplicationContext context;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .build();
    }

    @Test
    public void indexMaxesReturnsListOfMaxes() throws Exception {
        List<Max> maxes = TestData.getDefaultListOfMaxes();

        given(maxService.indexMaxes()).willReturn(maxes);

        this.mockMvc.perform(get("/maxes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value("1"))
                .andExpect(jsonPath("$[0].date").value("2019-01-18"))
                .andExpect(jsonPath("$[0].squat1RM").value(190.5))
                .andExpect(jsonPath("$[0].bench1RM").value(191.5))
                .andExpect(jsonPath("$[0].deadlift1RM").value(192.5))
                .andExpect(jsonPath("$[0].press1RM").value(193.5));
    }

    @Test
    public void postMaxCallsMaxServiceWithCorrectData() throws Exception {
        Max newMax = TestData.getDefaultMax();

        this.mockMvc.perform(post("/max")
                .header("Content-Type", "application/json")
                .content("{\n" +
                        "\t\"date\": \"2019-01-18\",\n" +
                        "\t\"squat1RM\": 190.5,\n" +
                        "\t\"bench1RM\": 191.5,\n" +
                        "\t\"deadlift1RM\": 192.5,\n" +
                        "\t\"press1RM\": 193.5\n" +
                        "}"))
                .andExpect(status().isOk());

        ArgumentCaptor<Max> argumentCaptor = ArgumentCaptor.forClass(Max.class);

        verify(maxService).insertMax(argumentCaptor.capture());

        assertThat(argumentCaptor.getValue().getDate(), equalTo(newMax.getDate()));
        assertThat(argumentCaptor.getValue().getSquat1RM(), equalTo(newMax.getSquat1RM()));
        assertThat(argumentCaptor.getValue().getBench1RM(), equalTo(newMax.getBench1RM()));
        assertThat(argumentCaptor.getValue().getDeadlift1RM(), equalTo(newMax.getDeadlift1RM()));
        assertThat(argumentCaptor.getValue().getPress1RM(), equalTo(newMax.getPress1RM()));
    }
}
