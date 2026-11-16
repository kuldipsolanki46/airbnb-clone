package com.playpower.airbnb;

import com.playpower.airbnb.model.ListingModels.QuoteRequest;
import com.playpower.airbnb.service.QuoteService;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class QuoteServiceTest {
    private final QuoteService service = new QuoteService();

    @Test
    void fiveNightQuoteMatchesListingTerms() {
        var q = service.quote(5699, 3, new QuoteRequest("2026-10-18", "2026-10-23", 2));
        assertEquals(5, q.nights());
        assertEquals(28495, q.subtotalInr());
        assertEquals(1200, q.cleaningInr());
        assertEquals(q.subtotalInr() + q.cleaningInr() + q.serviceInr() + q.taxesInr(), q.totalInr());
        assertEquals("17 October", q.freeCancelBefore());
    }

    @Test
    void rejectsCheckoutNotAfterCheckIn() {
        assertThrows(ResponseStatusException.class,
                () -> service.quote(5699, 3, new QuoteRequest("2026-10-18", "2026-10-18", 1)));
    }

    @Test
    void rejectsGuestsAboveCapacity() {
        assertThrows(ResponseStatusException.class,
                () -> service.quote(5699, 3, new QuoteRequest("2026-10-18", "2026-10-23", 4)));
    }
}
