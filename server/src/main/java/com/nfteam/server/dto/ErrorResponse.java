package com.nfteam.server.dto;

import com.nfteam.server.exception.NFTCustomException;
import lombok.Getter;

@Getter
public class ErrorResponse {

    private String code;
    private String message;

    private ErrorResponse() {
    }

    public ErrorResponse(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public static ErrorResponse of(NFTCustomException e) {
        return new ErrorResponse(e.getExceptionCode().getValue(), e.getMessage());
    }

}
