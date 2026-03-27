package com.web.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatusInvoice {

    DANG_CHO_XAC_NHAN("Đang chờ xác nhận"),
    DA_XAC_NHAN("Đã xác nhận"),
    DA_GUI("Đã gửi"),
    DA_NHAN("Đã nhận"),
    DA_HUY("Đã hủy"),
    KHONG_NHAN_HANG("Không nhận hàng");

    private final String description;
}
