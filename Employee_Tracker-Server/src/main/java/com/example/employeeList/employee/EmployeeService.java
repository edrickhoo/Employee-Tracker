package com.example.employeeList.employee;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.example.employeeList.employee.exception.BadRequestException;
import com.example.employeeList.employee.validation.Validation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
@AllArgsConstructor
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;

	public Employee create(EmployeeDTO data) {
		boolean dateValid = Validation.isValidDate(data.getStartDateDay(), data.getStartDateMonth(), data.getStartDateYear(), data.getEndDateDay(),data.getEndDateMonth(), data.getEndDateYear());
		if(!dateValid) {
			throw new BadRequestException(
					"Invalid dates please ensure end date is later than start date");
		}
		Employee newEmployee = new Employee(data.getFirstName(), data.getMiddleName() , data.getLastName(), data.getEmail(), data.getPhone(), data.getAddress(), data.getContract(), data.getStartDateDay(), data.getStartDateMonth(), data.getStartDateYear(), data.getEndDateDay(), data.getEndDateMonth(), data.getEndDateYear(), data.isOnGoing(), data.getBasis(), data.getHoursPerWeek());
		this.employeeRepository.save(newEmployee);
		return newEmployee;
	}

	public List<Employee> getAll() {
		List<Employee> allEmployees = this.employeeRepository.findAll();
		return allEmployees;
	}

	public Optional<Employee> getById(Long id) {
		Optional<Employee> maybeEmployee = this.employeeRepository.findById(id);
		return maybeEmployee;
	}

	public Employee update(EmployeeDTO data, Long id) {
		boolean dateValid = Validation.isValidDate(data.getStartDateDay(), data.getStartDateMonth(), data.getStartDateYear(), data.getEndDateDay(),data.getEndDateMonth(), data.getEndDateYear());
		if(!dateValid) {
			throw new BadRequestException(
					"Invalid dates please ensure end date is later than start date");
		}

		Optional<Employee> maybeEmployee = this.employeeRepository.findById(id);
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
		return this.employeeRepository.save(foundEmployee);

	}

	public boolean delete(Long id) {
		if(!employeeRepository.existsById(id)) {
			return false;
		}
		this.employeeRepository.deleteById(id);
		return true;
	}
}
