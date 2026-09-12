package com.instantmechanic.dto.booking;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignMechanicRequest {

    @NotNull(message = "Mechanic ID is required")
    private Long mechanicId;
}