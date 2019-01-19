package clark.trackerapi.Services;

import clark.trackerapi.Data.Max;
import clark.trackerapi.Data.MaxRepository;
import clark.trackerapi.TestHelpers.TestData;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoSession;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(SpringJUnit4ClassRunner.class)
public class MaxServiceTests {

    private MockitoSession mockito;

    @Mock
    private MaxRepository maxRepository;

    @InjectMocks
    private MaxService maxService;

    @Before
    public void Before() {
        mockito = Mockito.mockitoSession()
                .initMocks(this)
                .startMocking();
    }

    @After
    public void tearDown() {
        mockito.finishMocking();
    }

    @Test
    public void indexMaxesGetsAllMaxesFromRepo() {
        List<Max> expectedMaxes = TestData.getDefaultListOfMaxes();
        when(maxRepository.findAll()).thenReturn(expectedMaxes);
        List<Max> actualMaxes = maxService.indexMaxes();
        assertEquals(actualMaxes, expectedMaxes);
    }

}
