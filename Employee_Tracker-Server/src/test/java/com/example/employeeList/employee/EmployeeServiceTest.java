package com.example.employeeList.employee;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {
    @Mock
    private EmployeeRepository employeeRepository;
    private EmployeeService underTest;

    @BeforeEach
    void setUp() {
        underTest = new EmployeeService(employeeRepository);
    }

    @Test
    void create() {
        // given
        EmployeeDTO employeeDTO = new EmployeeDTO(  "Frank", "bob", "test", "test@hotmail.com", "0412345678", "5 John St", "Permanent", 15, "March", 2015, 15, "April", 2016, false, "test", 33
        );

        // when
        Employee employee = underTest.create(employeeDTO);

        // then
        ArgumentCaptor<Employee> studentArgumentCaptor =
                ArgumentCaptor.forClass(Employee.class);

        verify(employeeRepository)
                .save(studentArgumentCaptor.capture());

        Employee capturedEmployee = studentArgumentCaptor.getValue();

        assertThat(capturedEmployee).isEqualTo(employee);
    }

    @Test
    void getAll() {
        // when
        underTest.getAll();
        //then
        verify(employeeRepository).findAll();
    }

    @Test
    void getById() {
       // when
        long id = 7;
        underTest.getById(id);
        //then
        verify(employeeRepository).findById(id);

    }

    @Test
    void update() {
        // given
        EmployeeDTO employeeDTO = new EmployeeDTO(  "NewName", "NewMiddle", "SameLast", "new@hotmail.com", "0412345678", "25 Peter St", "Permanent", 25, "March", 2013, 17, "July", 2015, false, "Full-time", 33
        );
        Employee employee = new Employee( "Franka", "bob", "SameLast", "test@hotmail.com", "0412345678", "25 Peter St", "Permanent", 25, "March", 2013, 17, "July", 2015, false, "Full-time", 33
        );
        employee.setId(1L);
        long id = 1;

        // when
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);

        underTest.update(employeeDTO, id);
        // then
        verify(employeeRepository).findById(1L);
        verify(employeeRepository).save(
                argThat(savedEmployee -> savedEmployee.getFirstName().equals(employeeDTO.getFirstName())
                       && savedEmployee.getEmail().equals(employeeDTO.getEmail()) && savedEmployee.getMiddleName().equals(employeeDTO.getMiddleName())));
    }

    @Test
    void delete() {
        // given
        long id = 10;
        given(employeeRepository.existsById(id))
                .willReturn(true);
        // when
        underTest.delete(id);

        // then
        verify(employeeRepository).deleteById(id);
    }
}