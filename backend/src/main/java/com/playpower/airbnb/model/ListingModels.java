package com.playpower.airbnb.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

/** Immutable API payloads (Java records) for the listing page. */
public final class ListingModels {
    private ListingModels() {}

    public record Photo(String id, String category, String src, String alt, List<String> tags) {}
    public record PhotoGroup(String category, List<String> tags, List<Photo> photos) {}
    public record Host(String name, String avatar, int yearsHosting, double rating, int reviews,
                       String details, String responseRate, String responseTime,
                       List<String> coHosts, List<String> facts) {}
    public record Review(String id, String author, String avatar, String meta, String date,
                         String text, boolean truncated) {}
    public record RatingCategory(String label, double score) {}
    public record AmenityGroup(String group, List<String> items) {}
    public record SimilarStay(String id, String title, int priceInr, double rating, String image) {}
    public record Listing(
            String id, String title, String placeType, String location,
            int guests, int bedrooms, int beds, int bathrooms,
            double rating, int reviewCount, int nightlyInr, int total5NightsInr,
            String checkIn, String checkOut, int defaultGuests,
            String description, String fullDescription,
            List<String> highlights, Host host,
            List<Photo> photos, List<PhotoGroup> photoTour,
            List<AmenityGroup> amenities, List<String> amenitiesPreview,
            List<RatingCategory> ratingCategories,
            List<int[]> ratingDistribution,
            List<Review> reviews, List<SimilarStay> similar,
            List<String> sleeping) {}

    public record QuoteRequest(
            @NotBlank String checkIn,
            @NotBlank String checkOut,
            @Min(1) int guests) {}

    public record Quote(int nights, int nightlyInr, int subtotalInr, int cleaningInr,
                        int serviceInr, int taxesInr, int totalInr, String freeCancelBefore) {}
}
