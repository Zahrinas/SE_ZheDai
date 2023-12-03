package com.example.controller;

import dbAccess.OrdersDAO;
import entity.Orders;
import java.util.List;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrdersController {
    @RequestMapping("/orders/all")
            public List<Orders> ordersAll() {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        OrdersDAO Dao = (OrdersDAO) applicationContext.getBean("ordersDAO");

        String sql = "select * from orders ";
        return Dao.query(sql, null);
    }
    @RequestMapping("/orders/update")
    public void ordersUpdate(
            @RequestParam String id,
            @RequestParam String riderId
    ){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        OrdersDAO Dao = (OrdersDAO) applicationContext.getBean("ordersDAO");
         String sql = "update orders set"
                + " riderId = '" + riderId +"'"
                + "where id = '" + id + "'"  ;
        Dao.update(sql, null);
    }
    
    @RequestMapping("/orders/insert")
    public void ordersInsert(
            @RequestParam String id,
            @RequestParam String posterId,
            @RequestParam String nickname,
            @RequestParam String posterHeadImg,
            @RequestParam String riderId,
            @RequestParam String school,
            @RequestParam String type,
            @RequestParam String time,
            @RequestParam String reward,
            @RequestParam String comment) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        OrdersDAO Dao = (OrdersDAO) applicationContext.getBean("ordersDAO");

        String sql = "insert into orders(id, posterId, posterHeadImg, nickname, riderId, school, type, time, reward, remark) values "
                        + "('" + id + "'"
                        + ",'" + posterId + "'"
                        + ",'" + posterHeadImg + "'"
                        + ",'" + nickname + "'"
                        + ",'" + riderId + "'"
                        + ",'" + school + "'"
                        + ",'" + type + "'"
                        + ",'" + time + "'"
                        + ",'" + reward + "'"
                        + ",'" + comment + "')";
        
        Dao.update(sql, null);
    }
    
    @RequestMapping("/orders/order")
    public List<Orders> ordersOrder(@RequestParam String school, @RequestParam String type) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        OrdersDAO Dao = (OrdersDAO) applicationContext.getBean("ordersDAO");
        
        // 此处前端会为所有订单的riderId初始化为字符串'null'所以riderId = 'null'即筛选未被接单的订单
        String sql = "select * from orders "
                        + "where school = " + "'" + school + "'"
                        + "and type = " + "'" + type + "'"
                        + "and riderId = 'null'";
        
        if (type.equals("全部")){
            sql = "select * from orders where school = '"+ school + "' and riderId = 'null'";
        }
        return Dao.query(sql, null);
    }
    
    @RequestMapping("/orders/detail")
    public List<Orders> ordersPoster(@RequestParam String id) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        OrdersDAO Dao = (OrdersDAO) applicationContext.getBean("ordersDAO");

        String sql = "select * from orders "
                        + "where id = " + "'" + id + "'";
        
        return Dao.query(sql, null);
    }

    @RequestMapping("/orders/poster")
    public List<Orders> ordersPoster(@RequestParam String posterId,@RequestParam String school, @RequestParam String type) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        OrdersDAO Dao = (OrdersDAO) applicationContext.getBean("ordersDAO");

        String sql = "select * from orders "
                        + "where posterId = " + "'" + posterId + "'"
                        + "and school = " + "'" + school + "'"
                        + "and type = " + "'" + type + "'";
        
        return Dao.query(sql, null);
    }
    
}