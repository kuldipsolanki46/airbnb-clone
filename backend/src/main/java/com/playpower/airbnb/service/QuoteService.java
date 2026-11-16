package com.playpower.airbnb.service;

import com.playpower.airbnb.model.ListingModels.Quote;
import com.playpower.airbnb.model.ListingModels.QuoteRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoUnit;
import java.util.Locale;

@Service
public class QuoteService {
    public Quote quote(int nightlyInr, int maxGuests, QuoteRequest req) {
        if (req.guests() < 1 || req.guests() > maxGuests) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "guests must be between 1 and " + maxGuests);
        }
        final LocalDate in;
        final LocalDate out;
        try {
            in = LocalDate.parse(req.checkIn());
            out = LocalDate.parse(req.checkOut());
        } catch (DateTimeParseException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "checkIn/checkOut must be ISO dates (yyyy-MM-dd)");
        }
        if (!out.isAfter(in)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "checkOut must be after checkIn");
        }
        long nights = ChronoUnit.DAYS.between(in, out);
        int subtotal = (int) (nightlyInr * nights);
        int cleaning = 1200;
        int service = (int) Math.round(subtotal * 0.12);
        int taxes = (int) Math.round(subtotal * 0.08);
        String cancel = in.minusDays(1).format(DateTimeFormatter.ofPattern("d MMMM", Locale.ENGLISH));
        return new Quote((int) nights, nightlyInr, subtotal, cleaning, service, taxes,
                subtotal + cleaning + service + taxes, cancel);
    }
}
