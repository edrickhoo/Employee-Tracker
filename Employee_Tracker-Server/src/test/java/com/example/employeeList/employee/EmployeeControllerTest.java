package com.example.employeeList.employee;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest()
@AutoConfigureMockMvc
public class EmployeeControllerTest {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void createEmployeeTest() throws Exception {
        // given
        EmployeeDTO employeeDTO = new EmployeeDTO(
                "Water", "", "Jack", "water@test.com", "0412345678", "123 Example St, Sydney NSW 2000", "Permanent", 17, "March", 2017, 20, "April", 2019, false, "Full-time", 44);
        Employee employee = new Employee(
                "Water", "", "Jack", "water@test.com", "0412345678", "123 Example St, Sydney NSW 2000", "Permanent", 17, "March", 2017, 20, "April", 2019, false, "Full-time", 44);

        // when
        ResultActions resultActions = mockMvc
                .perform(MockMvcRequestBuilders.post("/employees/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(employeeDTO)));
        // then
        resultActions.andExpect(status().isCreated());
        List<Employee> employees = employeeRepository.findAll();
        assertThat(employees)
                .usingElementComparatorIgnoringFields("id")
                .contains(employee);
    }

    @Test
    void deleteEmployeeTest() throws Exception {
        EmployeeDTO employeeDTO = new EmployeeDTO(
                "Water", "", "Jack", "water@test.com", "0412345678", "123 Example St, Sydney NSW 2000", "Permanent", 17, "March", 2017, 20, "April", 2019, false, "Full-time", 44);
        Employee employee = new Employee(
                "Water", "", "Jack", "water@test.com", "0412345678", "123 Example St, Sydney NSW 2000", "Permanent", 17, "March", 2017, 20, "April", 2019, false, "Full-time", 44);

        mockMvc.perform(MockMvcRequestBuilders.post("/employees/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

        // Mocks request to all get employees and maps them as a List of Employee
        MvcResult getEmployeeResult = mockMvc.perform(get("/employees")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = getEmployeeResult
                .getResponse()
                .getContentAsString();

        List<Employee> employees = objectMapper.readValue(
                contentAsString,
                new TypeReference<>() {
                }
        );

        // Finding an id in database with the same email just created
        long id = employees.stream()
                .filter(e -> e.getEmail().equals(employee.getEmail()))
                .map(Employee::getId)
                .findFirst()
                .orElseThrow(() ->
                        new IllegalStateException(
                                "Employee with email not found"));
        // when
        ResultActions resultActions = mockMvc
                .perform(delete("/employees/remove/" + id));

        // then
        resultActions.andExpect(status().isNoContent());
        boolean exists = employeeRepository.existsById(id);
        assertThat(exists).isFalse();
    }

    @Test
    void getAllEmployeeTest() throws Exception {
        EmployeeDTO employeeDTO = new EmployeeDTO(
                "Water", "", "Jack", "water@test.com", "0412345678", "123 Example St, Sydney NSW 2000", "Permanent", 17, "March", 2017, 20, "April", 2019, false, "Full-time", 44);
        Employee employee = new Employee(
                "Water", "", "Jack", "water@test.com", "0412345678", "123 Example St, Sydney NSW 2000", "Permanent", 17, "March", 2017, 20, "April", 2019, false, "Full-time", 44);

        mockMvc.perform(MockMvcRequestBuilders.post("/employees/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

        mockMvc.perform(MockMvcRequestBuilders.post("/employees/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));
        // when
        // Mocks request to all get employees and maps them as a List of Employee
        MvcResult getEmployeesResult = mockMvc.perform(get("/employees")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = getEmployeesResult
                .getResponse().getContentAsString();

        List<Employee> employeesList = objectMapper.readValue(
                contentAsString,
                new TypeReference<>() {
                }
        );
        // then
        List<Employee> employees = employeeRepository.findAll();
        assertThat(employeesList.size()).isEqualTo(employees.size());
    }

    @Test
    void getEmployeeByIdTest() throws Exception {
        EmployeeDTO employeeDTO = new EmployeeDTO(
                "Water", "", "Jack", "pizza@test.com", "0412345678", "123 Example St, Sydney NSW 2000", "Permanent", 17, "March", 2017, 20, "April", 2019, false, "Full-time", 44);
        Employee employee = new Employee(
                "Water", "", "Jack", "pizza@test.com", "0412345678", "123 Example St, Sydney NSW 2000", "Permanent", 17, "March", 2017, 20, "April", 2019, false, "Full-time", 44);

        // Mocks request to all get employees and maps them as a List of Employee
        mockMvc.perform(MockMvcRequestBuilders.post("/employees/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));

        MvcResult getEmployeeResult = mockMvc.perform(get("/employees")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = getEmployeeResult
                .getResponse()
                .getContentAsString();

        List<Employee> employees = objectMapper.readValue(
                contentAsString,
                new TypeReference<>() {
                }
        );
        // Finding an id in database with the same email just created
        long id = employees.stream()
                .filter(e -> e.getEmail().equals(employee.getEmail()))
                .map(Employee::getId)
                .findFirst()
                .orElseThrow(() ->
                        new IllegalStateException(
                                "Employee with email not found"));
        // when
        ResultActions resultActions = mockMvc
                .perform(get("/employees/" + id));

        // then
        resultActions.andExpect(status().isOk());
        Optional<Employee> employeeFromRepo = employeeRepository.findById(id);
        assertThat(employeeFromRepo.get().getId()).isEqualTo(id);
    }

    @Test
    void updateEmployeeTest() throws Exception {
        // given
        EmployeeDTO employeeDTO = new EmployeeDTO(
                "Water", "", "Jack", "testing@test.com", "0412345678", "123 Example St, Sydney NSW 2000", "Permanent", 17, "March", 2017, 20, "April", 2019, false, "Full-time", 44);
        Employee employee = new Employee(
                "Water", "", "Jack", "testing@test.com", "0412345678", "123 Example St, Sydney NSW 2000", "Permanent", 17, "March", 2017, 20, "April", 2019, false, "Full-time", 44);
        EmployeeDTO updateEmployeeDTO = new EmployeeDTO(
                "Peter", "", "Jack", "updatedEmail@test.com", "0412345678", "123 Example St, Sydney NSW 2000", "Permanent", 17, "March", 2017, 20, "April", 2019, false, "Full-time", 44);

        mockMvc.perform(MockMvcRequestBuilders.post("/employees/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(employeeDTO)));
        // Mocks request to all get employees and maps them as a List of Employee
        MvcResult getEmployeeResult = mockMvc.perform(get("/employees")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = getEmployeeResult
                .getResponse()
                .getContentAsString();

        List<Employee> employees = objectMapper.readValue(
                contentAsString,
                new TypeReference<>() {
                }
        );
        // Finding an id in database with the same email just created
        long id = employees.stream()
                .filter(e -> e.getEmail().equals(employee.getEmail()))
                .map(Employee::getId)
                .findFirst()
                .orElseThrow(() ->
                        new IllegalStateException(
                                "Employee with email not found"));
        // when
        MvcResult updateEmployeeResults = mockMvc.perform(MockMvcRequestBuilders.put("/employees/update/" + id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateEmployeeDTO))
        ).andExpect(status().isAccepted()).andReturn();

        String updateEmployeeAsString = updateEmployeeResults
                .getResponse().getContentAsString();

        Employee updateEmployee = objectMapper.readValue(
                updateEmployeeAsString,
                new TypeReference<>() {
                }
        );
        // then
        Optional<Employee> employeeFromRepo = employeeRepository.findById(id);
        assertThat(employeeFromRepo.get().getFirstName()).isEqualTo(updateEmployee.getFirstName());
    }
}
