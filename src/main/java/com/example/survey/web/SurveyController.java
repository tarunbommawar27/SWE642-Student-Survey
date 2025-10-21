package com.example.survey.web;

import com.example.survey.model.Survey;
import com.example.survey.repo.SurveyRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/surveys")
public class SurveyController {
  private final SurveyRepository repo;
  public SurveyController(SurveyRepository repo) { this.repo = repo; }

  @GetMapping public List<Survey> all() { return repo.findAll(); }

  @GetMapping("/{id}")
  public ResponseEntity<Survey> one(@PathVariable Long id) {
    return repo.findById(id).map(ResponseEntity::ok)
              .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<Survey> create(@Valid @RequestBody Survey s) {
    return ResponseEntity.ok(repo.save(s));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Survey> update(@PathVariable Long id, @Valid @RequestBody Survey in) {
    return repo.findById(id).map(s -> {
      s.setFirstName(in.getFirstName());
      s.setLastName(in.getLastName());
      s.setStreetAddress(in.getStreetAddress());
      s.setCity(in.getCity());
      s.setState(in.getState());
      s.setZip(in.getZip());
      s.setTelephone(in.getTelephone());
      s.setEmail(in.getEmail());
      s.setDateOfSurvey(in.getDateOfSurvey());
      s.setLikedMost(in.getLikedMost());
      s.setInterestSource(in.getInterestSource());
      s.setRecommendLikelihood(in.getRecommendLikelihood());
      s.setComments(in.getComments());
      return ResponseEntity.ok(repo.save(s));
    }).orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    if (!repo.existsById(id)) return ResponseEntity.notFound().build();
    repo.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
