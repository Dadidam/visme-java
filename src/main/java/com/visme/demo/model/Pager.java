package com.visme.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

public class Pager {

    @NotEmpty
    @Min(value = 0, message = "Pager `start` value must be not less than 0")
    private final int start;

    @NotEmpty
    @Min(value = 1, message = "Pager `size` value must be not less than 1")
    private final int size;

    @NotEmpty
    @Min(value = 0, message = "Pager `total` value must be not less than 0")
    private final int total;

    public Pager(
            @JsonProperty("start") int start,
            @JsonProperty("size") int size,
            @JsonProperty("total") int total
    ) {
        this.start = start;
        this.size = size;
        this.total = total;
    }

    public int getStart() {
        return start;
    }

    public int getSize() {
        return size;
    }

    public int getTotal() {
        return total;
    }
}
