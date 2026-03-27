package com.web.config;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CorsFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) 
            throws ServletException, IOException {
        
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
        response.setHeader("Access-Control-Max-Age", "3600");
        // ✅ Thêm đầy đủ các headers cần thiết
        response.setHeader("Access-Control-Allow-Headers", 
            "Authorization, authorization, Content-Type, content-type, " +
            "xsrf-token, X-Requested-With, Accept, Origin");
        response.setHeader("Access-Control-Expose-Headers", "xsrf-token, Authorization");
        
        if ("OPTIONS".equals(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return; // ✅ Dùng return thay vì else để rõ ràng hơn
        }
        
        filterChain.doFilter(request, response);
    }
}