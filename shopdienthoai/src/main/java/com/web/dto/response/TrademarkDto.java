package com.web.dto.response;

import com.web.entity.Product;

import java.util.List;

public interface TrademarkDto {

    public Long getId();

    public String getName();

    public Long getQuantity();

    public List<Product> getProduct();
}
