package com.visme.demo.response;

import com.visme.demo.model.Pager;
import org.springframework.http.HttpStatus;

import java.util.List;

public class ResponseTransfer {
    private HttpStatus httpStatus;
    private List<Object> data;
    private Pager pagination;

    public ResponseTransfer(HttpStatus httpStatus, List<Object> data, Pager pagination) {
        this.httpStatus = httpStatus;
        this.data = data;
        this.pagination = pagination;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }

    public List<Object> getData() {
        return data;
    }

    public void setData(List<Object> data) {
        this.data = data;
    }

    public Pager getPagination() {
        return pagination;
    }

    public void setPagination(Pager pagination) {
        this.pagination = pagination;
    }
}
