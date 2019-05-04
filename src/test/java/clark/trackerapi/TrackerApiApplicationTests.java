package clark.trackerapi;

import clark.trackerapi.controllers.LoginController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TrackerApiApplicationTests {

	@Autowired
	private LoginController loginController;

	@Test
	public void contextLoads() {
		assertNotNull(loginController);
	}
}
