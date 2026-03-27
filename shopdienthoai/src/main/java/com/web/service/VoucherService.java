package com.web.service;

import com.web.entity.User;
import com.web.entity.Voucher;
import com.web.exception.MessageException;
import com.web.repository.InvoiceRepository;
import com.web.repository.UserRepository;
import com.web.repository.VoucherRepository;
import com.web.utils.Contains;
import com.web.utils.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Component
public class VoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MailService mailService;

    public Voucher create(Voucher voucher) {
        Optional<Voucher> ex = voucherRepository.findByCode(voucher.getCode());
        if(ex.isPresent()){
            throw new MessageException("Mã voucher đã tồn tại");
        }
        Voucher result = voucherRepository.save(voucher);
        List<User> users = userRepository.getUserByRole(Contains.ROLE_USER);
        for(User u : users){
            mailService.sendEmail(u.getEmail(), "Có mã khuyến mại mới", "Chúng tôi xin gửi đến bạn mã khuyến mại "+result.getCode()+"<br>" +
                    "Mã khuyến mại sẽ được giảm giá "+formatToVND(result.getDiscount())+" khi mua đơn hàng từ "+formatToVND(result.getMinAmount())+" trở lên<br>" +
                    "Mã khuyến mại sẽ có thể áp dụng từ ngày "+result.getStartDate()+" đến ngày "+result.getEndDate()+"<br>" +
                    "Nhanh tay mua sắm để có thể sử dụng mã khuyến mại này", false, true);
        }
        return result;
    }

    public String formatToVND(Double amount) {
        Locale vietnamLocale = new Locale("vi", "VN"); // Định dạng theo Việt Nam
        NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(vietnamLocale);
        return currencyFormatter.format(amount);
    }
    
    public Voucher update(Voucher voucher) {
        Optional<Voucher> ex = voucherRepository.findByCode(voucher.getCode());
        if(ex.isPresent()){
            if(ex.get().getId() != voucher.getId()){
                throw new MessageException("Mã voucher đã tồn tại");
            }
        }
        Voucher result = voucherRepository.save(voucher);
        return result;
    }

    
    public void delete(Long id) {
        invoiceRepository.setNullVoucher(id);
        voucherRepository.deleteById(id);
    }

    
    public List<Voucher> findAll(Date start, Date end) {
        if(start == null || end == null){
            start = Date.valueOf("2000-01-01");
            end = Date.valueOf("2200-01-01");
        }
        List<Voucher> list = voucherRepository.findByDate(start,end);
        return list;
    }

    
    public Page<Voucher> findAll(Date start, Date end, Pageable pageable) {
        if(start == null || end == null){
            start = Date.valueOf("2000-01-01");
            end = Date.valueOf("2200-01-01");
        }
        Page<Voucher> page = voucherRepository.findByDate(start,end,pageable);
        return page;
    }

    
    public Optional<Voucher> findById(Long id) {
        Optional<Voucher> ex = voucherRepository.findById(id);
        if(ex.isEmpty()){
            throw new MessageException("Not found");
        }
        return ex;
    }

    
    public void block(Long id) {
        Optional<Voucher> ex = voucherRepository.findById(id);
        if(ex.isEmpty()){
            throw new MessageException("Not found");
        }
        if (ex.get().getBlock() == true) {
            ex.get().setBlock(false);
        } else {
            ex.get().setBlock(true);
        }
        voucherRepository.save(ex.get());
    }

    
    public Optional<Voucher> findByCode(String code, Double amount) {
        Optional<Voucher> ex = voucherRepository.findByCode(code);
        if(ex.isEmpty()){
            throw new MessageException("Mã voucher không khả dụng");
        }
        if(ex.get().getBlock() == true){
            throw new MessageException("Mã voucher không thể sử dụng");
        }
        Date now = new Date(System.currentTimeMillis());
        if(!((ex.get().getStartDate().before(now) || ex.get().getStartDate().equals(now))
                && (ex.get().getEndDate().after(now) || ex.get().getEndDate().equals(now)))){
            throw new MessageException("Mã voucher đã hết hạn");
        }
        if(ex.get().getMinAmount() > amount){
            throw new MessageException("Số tiền đơn hàng chưa đủ, hãy mua thêm "+(ex.get().getMinAmount() - amount)+" để được áp dụng voucher");
        }
        return ex;
    }
}
