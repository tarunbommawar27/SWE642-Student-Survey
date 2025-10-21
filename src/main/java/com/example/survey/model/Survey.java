package com.example.survey.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Survey {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank private String firstName;
  @NotBlank private String lastName;

  @NotBlank private String streetAddress;
  @NotBlank private String city;
  @NotBlank private String state;

  @NotBlank @Pattern(regexp="\\d{5}", message="Zip must be 5 digits")
  private String zip;

  @NotBlank @Pattern(regexp="\\+?\\d[\\d\\- ]{7,}", message="Invalid phone")
  private String telephone;

  @NotBlank @Email private String email;

  @NotNull private LocalDate dateOfSurvey;

  // checkboxes
  @ElementCollection
  private List<@NotBlank String> likedMost;

  @NotNull @Enumerated(EnumType.STRING)
  private InterestSource interestSource;

  @NotNull @Enumerated(EnumType.STRING)
  private RecommendLikelihood recommendLikelihood;

  @Column(length = 2000)
  private String comments;

  public Survey() {}

  // getters/setters
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getFirstName() { return firstName; }
  public void setFirstName(String firstName) { this.firstName = firstName; }
  public String getLastName() { return lastName; }
  public void setLastName(String lastName) { this.lastName = lastName; }
  public String getStreetAddress() { return streetAddress; }
  public void setStreetAddress(String streetAddress) { this.streetAddress = streetAddress; }
  public String getCity() { return city; }
  public void setCity(String city) { this.city = city; }
  public String getState() { return state; }
  public void setState(String state) { this.state = state; }
  public String getZip() { return zip; }
  public void setZip(String zip) { this.zip = zip; }
  public String getTelephone() { return telephone; }
  public void setTelephone(String telephone) { this.telephone = telephone; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public LocalDate getDateOfSurvey() { return dateOfSurvey; }
  public void setDateOfSurvey(LocalDate dateOfSurvey) { this.dateOfSurvey = dateOfSurvey; }
  public List<String> getLikedMost() { return likedMost; }
  public void setLikedMost(List<String> likedMost) { this.likedMost = likedMost; }
  public InterestSource getInterestSource() { return interestSource; }
  public void setInterestSource(InterestSource interestSource) { this.interestSource = interestSource; }
  public RecommendLikelihood getRecommendLikelihood() { return recommendLikelihood; }
  public void setRecommendLikelihood(RecommendLikelihood recommendLikelihood) { this.recommendLikelihood = recommendLikelihood; }
  public String getComments() { return comments; }
  public void setComments(String comments) { this.comments = comments; }
}
