package com.instantmechanic.dto.booking;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingPageResponse {

    private List<BookingResponse> bookings;

    private int currentPage;

    private int pageSize;

    private long totalElements;

    private int totalPages;

    private boolean last;
}