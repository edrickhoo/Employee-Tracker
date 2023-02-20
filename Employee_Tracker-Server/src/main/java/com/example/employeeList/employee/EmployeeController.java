package com.example.employeeList.employee;

import java.util.List;
import java.util.Optional;



import javax.validation.Valid;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
	Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private EmployeeService service;

	@CrossOrigin
	@PostMapping("/add")
	public ResponseEntity<Employee> create(@RequestBody @Valid EmployeeDTO data) {
		try {
			Employee createdEmployee = this.service.create(data);
			logger.info("Create request was successful");
			return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
		} catch (Exception e) {
			logger.error("Internal Server Error occurred, message: " + e.getMessage(), e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@CrossOrigin
	@GetMapping
	public ResponseEntity<List<Employee>> getAll() {
		try {
			List<Employee> allEmployees = this.service.getAll();
			logger.info("GetAll request was successful");
			return new ResponseEntity<>(allEmployees, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Internal Server Error occurred, message: " + e.getMessage(), e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@CrossOrigin
	@GetMapping("/{id}")
	public ResponseEntity<Employee> getById(@PathVariable Long id){

		try {
			Optional<Employee> maybeEmployee = this.service.getById(id);
			if(maybeEmployee.isEmpty()) {
				logger.error("Employee with id " + id + " does not exists");
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
			logger.info("Get by id request was successful");
			return new ResponseEntity<>(maybeEmployee.get(), HttpStatus.OK);
		}  catch (Exception e) {
			logger.error("Internal Server Error occurred: " + id + ", message: " + e.getMessage(), e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	@CrossOrigin
	@PutMapping("/update/{id}")
	public ResponseEntity<Employee> update(@RequestBody @Valid EmployeeDTO data, @PathVariable Long id) {
		try {
			Optional<Employee> maybeEmployee = this.service.getById(id);
			if(maybeEmployee.isEmpty()) {
				Employee createdEmployee = this.service.create(data);
				logger.info("Update request was successful no existing id found, new entry was created");
				return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
			}

			Employee updatedEmployee = this.service.update(data, id);
			logger.info("Update request was successful existing entry was updated");
			return new ResponseEntity<>(updatedEmployee, HttpStatus.ACCEPTED);
		} catch (Exception e) {
			logger.error("Internal Server Error occurred: " + id + ", message: " + e.getMessage(), e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@CrossOrigin
	@DeleteMapping("/remove/{id}")
	public ResponseEntity<Employee> delete(@PathVariable Long id) {
		try {
			boolean gotDeleted = this.service.delete(id);
			if(!gotDeleted) {
				logger.info("Employee with id " + id + " does not exists");
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
			logger.info("Delete request was successful id " + id + " was deleted");
			return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
		}  catch (Exception e) {
			logger.error("Internal Server Error occurred: " + id + ", message: " + e.getMessage(), e);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	

}
