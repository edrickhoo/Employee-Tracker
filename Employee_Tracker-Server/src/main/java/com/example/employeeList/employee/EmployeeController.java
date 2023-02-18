package com.example.employeeList.employee;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

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

	@Autowired
	private EmployeeService service;
	@CrossOrigin
	@PostMapping("/add")
	public ResponseEntity<Employee> create(@RequestBody @Valid EmployeeDTO data) {
		Employee createdEmployee = this.service.create(data);
		return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
	}
	@CrossOrigin
	@GetMapping
	public ResponseEntity<List<Employee>> getAll() {
		List<Employee> allEmployees = this.service.getAll();
		return new ResponseEntity<>(allEmployees, HttpStatus.CREATED);
	}
	
	@CrossOrigin
	@GetMapping("/{id}")
	public ResponseEntity<Employee> getById(@PathVariable Long id){
		Optional<Employee> maybeEmployee = this.service.getById(id);
		if(maybeEmployee.isEmpty()) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(maybeEmployee.get(), HttpStatus.OK);
	
	}
	
	@CrossOrigin
	@PutMapping("/update/{id}")
	public ResponseEntity<Employee> update(@RequestBody @Valid EmployeeDTO data, @PathVariable Long id) {
		Optional<Employee> maybeEmployee = this.service.getById(id);
		if(maybeEmployee.isEmpty()) {
			Employee createdEmployee = this.service.create(data);
			return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
		}
		
		Employee updatedEmployee = this.service.update(data, id);
		return new ResponseEntity<>(updatedEmployee, HttpStatus.ACCEPTED);
	}
	
	@CrossOrigin
	@DeleteMapping("/remove/{id}")
	public ResponseEntity<Employee> delete(@PathVariable Long id) {
		boolean gotDeleted = this.service.delete(id);
		
		if(gotDeleted) {
			return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		
	}
	

}
