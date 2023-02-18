package com.example.employeeList.employee;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class EmployeeService {

@Autowired
private EmployeeRepository repository;


public Employee create(EmployeeDTO data) {
	Employee newEmployee = new Employee(data.getFirstName(), data.getMiddleName(), data.getLastName(), data.getEmail(), data.getPhone(), data.getAddress(), data.getContract(), data.getStartDateDay(), data.getStartDateMonth(), data.getStartDateYear(), data.getEndDateDay(), data.getEndDateMonth(), data.getEndDateYear(), data.isOnGoing(), data.getBasis(), data.getHoursPerWeek());
	this.repository.save(newEmployee);
	
	return newEmployee;
}


public List<Employee> getAll() {
	List<Employee> allEmployees = this.repository.findAll();
	
	return allEmployees;
}


public Optional<Employee> getById(Long id) {
		Optional<Employee> maybeEmployee = this.repository.findById(id);
		
		return maybeEmployee;
	
}


public Employee update(EmployeeDTO data, Long id) {
	Optional<Employee> maybeEmployee = this.repository.findById(id);
	Employee foundEmployee = maybeEmployee.get();
	foundEmployee.setFirstName(data.getFirstName());
	foundEmployee.setMiddleName(data.getMiddleName());
	foundEmployee.setLastName(data.getLastName());
	foundEmployee.setAddress(data.getAddress());
	foundEmployee.setEmail(data.getEmail());
	foundEmployee.setBasis(data.getBasis());
	foundEmployee.setEndDateDay(data.getEndDateDay());
	foundEmployee.setEndDateMonth(data.getEndDateMonth());
	foundEmployee.setEndDateYear(data.getEndDateYear());
	foundEmployee.setHoursPerWeek(data.getHoursPerWeek());
	foundEmployee.setPhone(data.getPhone());
	foundEmployee.setStartDateDay(data.getStartDateDay());
	foundEmployee.setStartDateMonth(data.getStartDateMonth());
	foundEmployee.setStartDateYear(data.getStartDateYear());
	foundEmployee.setOnGoing(data.isOnGoing());
	foundEmployee.setContract(data.getContract());
	
	return this.repository.save(foundEmployee);
	
}


public boolean delete(Long id) {
	Optional<Employee> maybeEmployee = this.repository.findById(id);
	
	if(maybeEmployee.isEmpty()) {
		return false;
	}
	
	this.repository.deleteById(id);
	
	return true;
	
}




}
