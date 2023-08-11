package com.skillstorm.backend;
import com.skillstorm.backend.services.TaxReturnService;
import com.skillstorm.backend.services.UserService;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackendApplicationTests {

	@Autowired
	TaxReturnService taxReturnService;

	@Autowired
	UserService userService;

	String filing_status = "widow";
	String username = "thursday@gmail.com";
	String password = "test";

	@Test
	void testDeduction() {
		assertEquals(taxReturnService.deduction(filing_status), 27700.01, 1);
	}

	/** Cannot test due to lack of user connection to AWS to package up
	@Test
	void testLogin(){
		assertTrue(userService.checkLogin(username, password));
	}*/
}
