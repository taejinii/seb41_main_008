package com.nfteam.server.dto.request.item;

import lombok.Getter;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotNull;

@Getter
public class ItemSellRequest {

    @NotNull(message = "가격은 필수값입니다.")
    @Range(min = 0, max = 10000, message = "가격은 0 ~ 10000 이내로 입력해주세요.")
    private String itemPrice;

}