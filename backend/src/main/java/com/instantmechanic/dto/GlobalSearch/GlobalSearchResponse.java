package com.instantmechanic.dto.GlobalSearch;

import com.instantmechanic.dto.GlobalSearch.GlobalSearchItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GlobalSearchResponse {

    private String query;

    private int totalResults;

    private List<GlobalSearchItem> results;
}