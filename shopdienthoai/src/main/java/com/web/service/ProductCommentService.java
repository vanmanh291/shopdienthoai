package com.web.service;

import com.web.dto.request.CommentRequest;
import com.web.dto.response.ProductCommentResponse;
import com.web.entity.ProductComment;
import com.web.entity.ProductCommentImage;
import com.web.entity.User;
import com.web.exception.MessageException;
import com.web.mapper.ProductCommentMapper;
import com.web.repository.ProductCommentImageRepository;
import com.web.repository.ProductCommentRepository;
import com.web.utils.Contains;
import com.web.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Optional;

@Component
public class ProductCommentService {

    @Autowired
    private ProductCommentRepository productCommentRepository;

    @Autowired
    private ProductCommentMapper productCommentMapper;

    @Autowired
    private ProductCommentImageRepository productCommentImageRepository;

    @Autowired
    private UserUtils userUtils;

    
    public ProductCommentResponse create(CommentRequest commentRequest) {
        if(commentRequest.getId() != null){
           throw new MessageException("id must null");
        }
        ProductComment productComment = productCommentMapper.productCmtRequestToProductComment(commentRequest);
        productComment.setCreatedDate(new Date(System.currentTimeMillis()));
        productComment.setCreatedTime(new Time(System.currentTimeMillis()));
        productComment.setUser(userUtils.getUserWithAuthority());
        productComment.setApproved(false);
        ProductComment result = productCommentRepository.save(productComment);
        for(String s : commentRequest.getListLink()){
            ProductCommentImage image = new ProductCommentImage();
            image.setProductComment(result);
            image.setLinkImage(s);
            productCommentImageRepository.save(image);
        }
        ProductCommentResponse response = productCommentMapper.productCmtToProductCommentRes(result);
        response.setIsMyComment(true);
        return response;
    }

    
    public ProductCommentResponse update(CommentRequest commentRequest) {
        if(commentRequest.getId() == null){
            throw new MessageException("id require");
        }
        Optional<ProductComment> optional = productCommentRepository.findById(commentRequest.getId());
        if(optional.isEmpty()){
            throw new MessageException("comment not found");
        }
        User user = userUtils.getUserWithAuthority();
        System.out.printf("role delete "+user.getAuthorities().getName());
        if(optional.get().getUser().getId() != user.getId() && user.getAuthorities().getName().equals(Contains.ROLE_USER)){
            throw new MessageException("access denied");
        }
        ProductComment productComment = productCommentMapper.productCmtRequestToProductComment(commentRequest);
        productComment.setCreatedDate(new Date(System.currentTimeMillis()));
        productComment.setCreatedTime(new Time(System.currentTimeMillis()));
        productComment.setUser(userUtils.getUserWithAuthority());
        productComment.setProduct(optional.get().getProduct());

        ProductComment result = productCommentRepository.save(productComment);
        for(String s : commentRequest.getListLink()){
            ProductCommentImage image = new ProductCommentImage();
            image.setProductComment(result);
            image.setLinkImage(s);
            productCommentImageRepository.save(image);
        }
        ProductCommentResponse response = productCommentMapper.productCmtToProductCommentRes(result);
        response.setIsMyComment(true);
        return response;
    }

    
    public void delete(Long id) {
        if(id == null){
            throw new MessageException("id require");
        }
        Optional<ProductComment> optional = productCommentRepository.findById(id);
        if(optional.isEmpty()){
            throw new MessageException("comment not found");
        }
        User user = userUtils.getUserWithAuthority();
        if(optional.get().getUser().getId() != user.getId() && user.getAuthorities().getName().equals(Contains.ROLE_USER)){
            throw new MessageException("access denied");
        }
        productCommentRepository.deleteById(id);
    }

    
    public void deleteByAdmin(Long id) {
        productCommentRepository.deleteById(id);
    }

    public void duyet(Long id) {
        ProductComment p = productCommentRepository.findById(id).get();
        if(p.getApproved() == null){
            p.setApproved(true);
        }
        else{
            if(p.getApproved() == false){
                p.setApproved(true);
            }
            else{
                p.setApproved(false);
            }
        }
        productCommentRepository.save(p);
    }

    
    public ProductCommentResponse findById(Long productId) {
        if(productId == null){
            throw new MessageException("id require");
        }
        Optional<ProductComment> optional = productCommentRepository.findById(productId);
        if(optional.isEmpty()){
            throw new MessageException("comment not found");
        }
        if(optional.get().getUser().getId() != userUtils.getUserWithAuthority().getId()){
            throw new MessageException("access denied");
        }
        return productCommentMapper.productCmtToProductCommentRes(optional.get());
    }


    
    public List<ProductCommentResponse> findByProductId(Long productId) {
        List<ProductComment> list = productCommentRepository.findByProductId(productId);
        List<ProductCommentResponse> responses = productCommentMapper.listProductCmtToProCommentResponse(list);
        return responses;
    }


    public List<ProductCommentResponse> findAllByProductId(Long productId) {
        List<ProductComment> list = productCommentRepository.findAllByProductId(productId);
        List<ProductCommentResponse> responses = productCommentMapper.listProductCmtToProCommentResponse(list);
        return responses;
    }
}
