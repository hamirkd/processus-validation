package com.processus;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
(scanBasePackages = {
	    "com.processus"
	})
public class ProcessusServeurApplication {

	public static void main(String[] args) {
	           SpringApplication.run(ProcessusServeurApplication.class, args);
       
 
    }

}
