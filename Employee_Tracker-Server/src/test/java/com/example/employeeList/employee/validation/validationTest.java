package com.example.employeeList.employee.validation;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class validationTest {
    @Test
    public void testSameDate() {
        boolean result = Validation.isValidDate(16, "January", 2019, 16, "January", 2019);
        assertEquals(true, result);
    }

    @Test
    public void testEndDateEarlierThanStar() {
        boolean result = Validation.isValidDate(16, "January", 2019, 15, "January", 2015);
        assertEquals(false, result);
    }

    @Test
    public void testEndDateLaterThanStart() {
        boolean result = Validation.isValidDate(16, "March", 2019, 17, "April", 2021);
        assertEquals(true, result);
    }
}