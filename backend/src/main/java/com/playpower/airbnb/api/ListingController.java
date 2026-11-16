package com.playpower.airbnb.api;

import com.playpower.airbnb.data.ListingSeed;
import com.playpower.airbnb.model.ListingModels.*;
import com.playpower.airbnb.service.QuoteService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:4173"})
public class ListingController {

    private final ListingSeed seed;
    private final QuoteService quotes;

    public ListingController(ListingSeed seed, QuoteService quotes) {
        this.seed = seed;
        this.quotes = quotes;
    }

    private boolean known(String id) {
        return id.equals(seed.listing().id());
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "ok", "service", "airbnb-clone-api");
    }

    @GetMapping("/listings/{id}")
    public ResponseEntity<Listing> listing(@PathVariable String id) {
        return known(id) ? ResponseEntity.ok(seed.listing()) : ResponseEntity.notFound().build();
    }

    @GetMapping("/listings/{id}/photos")
    public ResponseEntity<List<PhotoGroup>> photos(@PathVariable String id) {
        return known(id) ? ResponseEntity.ok(seed.listing().photoTour()) : ResponseEntity.notFound().build();
    }

    @GetMapping("/listings/{id}/reviews")
    public ResponseEntity<List<Review>> reviews(@PathVariable String id) {
        return known(id) ? ResponseEntity.ok(seed.listing().reviews()) : ResponseEntity.notFound().build();
    }

    @GetMapping("/listings/{id}/similar")
    public ResponseEntity<List<SimilarStay>> similar(@PathVariable String id) {
        return known(id) ? ResponseEntity.ok(seed.listing().similar()) : ResponseEntity.notFound().build();
    }

    @PostMapping("/listings/{id}/quote")
    public ResponseEntity<Quote> quote(@PathVariable String id, @Valid @RequestBody QuoteRequest req) {
        if (!known(id)) return ResponseEntity.notFound().build();
        Listing listing = seed.listing();
        return ResponseEntity.ok(quotes.quote(listing.nightlyInr(), listing.guests(), req));
    }
}
