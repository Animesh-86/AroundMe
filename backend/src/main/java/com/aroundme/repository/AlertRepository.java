package com.aroundme.repository;

import com.aroundme.model.Alert;
import com.aroundme.model.AlertCategory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AlertRepository extends MongoRepository<Alert, String> {
    
    List<Alert> findByIsActiveTrue();
    
    List<Alert> findByCategoryAndIsActiveTrue(AlertCategory category);
    
    List<Alert> findByIsActiveTrueAndTimestampAfter(LocalDateTime timestamp);
    
    List<Alert> findByCategoryInAndIsActiveTrueOrderByTimestampDesc(List<AlertCategory> categories);
}
