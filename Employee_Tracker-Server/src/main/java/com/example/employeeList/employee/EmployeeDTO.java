package com.example.employeeList.employee;

import javax.validation.constraints.NotNull;

public class EmployeeDTO {

	@NotNull
	private String firstName;
	
	private String middleName;
	
	@NotNull
	private String lastName;
	
	@NotNull
	private String email;
	
	@NotNull
	private String phone;
	
	@NotNull
	private String address;
	
	@NotNull
	private String contract;

	@NotNull
	private String startDateDay;
	
	@NotNull
	private String startDateMonth;
	
	@NotNull
	private String startDateYear;
	
	@NotNull
	private String endDateDay;

	@NotNull
	private String endDateMonth;
	
	@NotNull
	private String endDateYear;
	
	@NotNull
	private boolean onGoing;
	
	@NotNull
	private String basis;
	
	@NotNull
	private int hoursPerWeek;
	public EmployeeDTO (String firstName,  String middleName, String lastName, String email,String phone, String address, String contract, String startDateDay, String startDateMonth, String startDateYear,String endDateDay,String endDateMonth,String endDateYear, boolean onGoing, String basis, int hoursPerWeek) {
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.contract = contract;
		this.startDateDay = startDateDay;
		this.startDateMonth = startDateMonth;
		this.startDateYear = startDateYear;
		this.endDateDay = endDateDay;
		this.endDateMonth = endDateMonth;
		this.endDateYear = endDateYear;
		this.onGoing = onGoing;
		this.basis = basis;
		this.hoursPerWeek = hoursPerWeek;
	}
	
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getMiddleName() {
		return middleName;
	}
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getContract() {
		return contract;
	}
	public void setContract(String contract) {
		this.contract = contract;
	}
	public String getStartDateDay() {
		return startDateDay;
	}
	public void setStartDateDay(String startDateDay) {
		this.startDateDay = startDateDay;
	}
	public String getStartDateMonth() {
		return startDateMonth;
	}
	public void setStartDateMonth(String startDateMonth) {
		this.startDateMonth = startDateMonth;
	}
	public String getStartDateYear() {
		return startDateYear;
	}
	public void setStartDateYear(String startDateYear) {
		this.startDateYear = startDateYear;
	}
	public String getEndDateDay() {
		return endDateDay;
	}
	public void setEndDateDay(String endDateDay) {
		this.endDateDay = endDateDay;
	}
	public String getEndDateMonth() {
		return endDateMonth;
	}
	public void setEndDateMonth(String endDateMonth) {
		this.endDateMonth = endDateMonth;
	}
	public String getEndDateYear() {
		return endDateYear;
	}
	public void setEndDateYear(String endDateYear) {
		this.endDateYear = endDateYear;
	}
	public boolean isOnGoing() {
		return onGoing;
	}
	public void setOnGoing(boolean onGoing) {
		this.onGoing = onGoing;
	}
	public String getBasis() {
		return basis;
	}
	public void setBasis(String basis) {
		this.basis = basis;
	}
	public int getHoursPerWeek() {
		return hoursPerWeek;
	}
	public void setHoursPerWeek(int hoursPerWeek) {
		this.hoursPerWeek = hoursPerWeek;
	}

}
