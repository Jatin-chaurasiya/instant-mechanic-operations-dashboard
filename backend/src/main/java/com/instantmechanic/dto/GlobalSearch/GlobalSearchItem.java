package com.instantmechanic.dto.GlobalSearch;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GlobalSearchItem {

    private String type;

    private Long id;

    private String title;

    private String subtitle;
}