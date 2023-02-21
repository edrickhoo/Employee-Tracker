package com.example.employeeList.employee;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "employees")
public class Employee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String firstName;
	
	@Column
	private String middleName;
	
	@Column
	private String lastName;
	
	@Column
	private String email;
	
	@Column
	private String phone;
	
	@Column
	private String address;
	
	@Column
	private String contract;

	@Column
	private Integer startDateDay;
	
	@Column
	private String startDateMonth;
	
	@Column
	private Integer startDateYear;
	
	@Column
	private Integer endDateDay;

	@Column
	private String endDateMonth;
	
	@Column
	private Integer endDateYear;
	
	@Column
	private boolean onGoing;
	
	@Column
	private String basis;
	
	@Column
	private Integer hoursPerWeek;
	
	public Employee() {
		// TODO Auto-generated constructor stub
	}
	
	public Employee(String firstName,  String middleName, String lastName, String email,String phone, String address, String contract, Integer startDateDay, String startDateMonth, Integer startDateYear,Integer endDateDay,String endDateMonth,Integer endDateYear, boolean onGoing, String basis, Integer hoursPerWeek) {
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Integer getStartDateDay() {
		return startDateDay;
	}

	public void setStartDateDay(Integer startDateDay) {
		this.startDateDay = startDateDay;
	}

	public String getStartDateMonth() {
		return startDateMonth;
	}

	public void setStartDateMonth(String startDateMonth) {
		this.startDateMonth = startDateMonth;
	}

	public Integer getStartDateYear() {
		return startDateYear;
	}

	public void setStartDateYear(Integer startDateYear) {
		this.startDateYear = startDateYear;
	}

	public Integer getEndDateDay() {
		return endDateDay;
	}

	public void setEndDateDay(Integer endDateDay) {
		this.endDateDay = endDateDay;
	}

	public String getEndDateMonth() {
		return endDateMonth;
	}

	public void setEndDateMonth(String endDateMonth) {
		this.endDateMonth = endDateMonth;
	}

	public Integer getEndDateYear() {
		return endDateYear;
	}

	public void setEndDateYear(Integer endDateYear) {
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

	public Integer getHoursPerWeek() {
		return hoursPerWeek;
	}

	public void setHoursPerWeek(Integer hoursPerWeek) {
		this.hoursPerWeek = hoursPerWeek;
	}
}
