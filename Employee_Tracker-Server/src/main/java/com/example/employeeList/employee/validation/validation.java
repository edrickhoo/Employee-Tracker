package com.example.employeeList.employee.validation;

import java.time.Month;

public class validation {
    public static boolean isValidDate (int startDay, String startMonth, int startYear, int endDay, String endMonth, int endYear) {
        int convStartMonth = Month.valueOf(startMonth.toUpperCase()).getValue();
        int convEndMonth = Month.valueOf(endMonth.toUpperCase()).getValue();
        if(endYear - startYear < 0) {
            return false;
        }
        if(endYear - startYear == 0 && convEndMonth - convStartMonth < 0) {
            return false;
        }
        if(endYear - startYear == 0 && convEndMonth - convStartMonth == 0 && endDay - startDay < 0) {
            return false;
        }
        return true;
    }
}
