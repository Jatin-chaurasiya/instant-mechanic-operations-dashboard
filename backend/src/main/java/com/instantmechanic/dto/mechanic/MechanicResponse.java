package com.instantmechanic.dto.mechanic;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MechanicResponse {

    private Long id;

    private String mechanicCode;

    private String name;

    private String phone;

    private String location;

    private String status;

    private long jobsCompleted;
}