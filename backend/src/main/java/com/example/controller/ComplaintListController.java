/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.controller;

import dbAccess.AdmDAO;
import dbAccess.ComplaintListDAO;
import dbAccess.OrdersDAO;
import dbAccess.UserDAO;
import entity.Adm;
import entity.ComplaintList;
import entity.Orders;
import entity.User;
import java.util.List;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Lenovo
 */
@RestController
public class ComplaintListController {
    @RequestMapping("/complaintlist/id")
    public List<ComplaintList> complaintlistUserSearch(@RequestParam String id) {
        
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        ComplaintListDAO CDao = (ComplaintListDAO) applicationContext.getBean("complaintListDAO");
        AdmDAO ADao = (AdmDAO) applicationContext.getBean("admDAO");
        
        String sql = "select * from administrator " + "where id = '"+ id +"';";
        List<Adm> res = ADao.query(sql, null);
        
        if(res.isEmpty()) {
            sql = "select * from complaintlist "
                + "where plaintiff = '" + id + "' or defendant = '" + id + "';";
            return CDao.query(sql, null);
        }else return null;
    }
    
    @RequestMapping("/complaintlist/userupdate")
    public void complaintlistUserUpdate(
            @RequestParam String id,
            @RequestParam String plaintiff,
            @RequestParam String reason) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        ComplaintListDAO Dao = (ComplaintListDAO) applicationContext.getBean("complaintListDAO");
        OrdersDAO ODao = (OrdersDAO) applicationContext.getBean("ordersDAO");
        UserDAO UDao = (UserDAO) applicationContext.getBean("userDAO");
        
        String sql = "select * from orders where id = '" + id + "'";
        List<Orders> li = ODao.query(sql, null);
        String oppo = li.get(0).getPosterId();
        if(oppo.equals(plaintiff)) oppo = li.get(0).getRiderId();
        
        sql = "select * from user where id = '" + li.get(0).getPosterId() + "'";
        List<User> lu = UDao.query(sql, null);
        String pAvar = lu.get(0).getAvatar();
        
        sql = "select * from user where id = '" + li.get(0).getRiderId() + "'";
        lu = UDao.query(sql, null);
        String rAvar = lu.get(0).getAvatar();
        
        sql = "insert into complaintlist(id, plaintiff, defendant, posterAvatarUrl, riderAvatarUrl, reason, valid) values('"
            + id + "','" 
            + plaintiff + "','" 
            + oppo + "','"
            + pAvar + "','"
            + rAvar + "','"
            + reason + "','"
            + "waiting" + "')";
        
        Dao.update(sql, null);
    }
    
    @RequestMapping("/complaintlist/search")
    public List<ComplaintList> complaintlistquery(@RequestParam String id) {
        
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        ComplaintListDAO Dao = (ComplaintListDAO) applicationContext.getBean("complaintListDAO");
        AdmDAO AdmDao = (AdmDAO) applicationContext.getBean("admDAO");
        String sql = "select * from administrator where id = '" + id + "'";
        List<Adm> li = AdmDao.query(sql, null);
        if(li.isEmpty()) {return null;}
        
        sql = "select * from complaintlist "
                        + "where valid = 'waiting' and plaintiff = '" + id +"'";
        return Dao.query(sql, null);
    }
    
    @RequestMapping("/complaintlist/update")
    public void userUpdate(
            @RequestParam String id,
            @RequestParam String valid) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        ComplaintListDAO Dao = (ComplaintListDAO) applicationContext.getBean("complaintListDAO");

        String sql = "update complaintlist set"
                + " valid = '" + valid + "' where id = '" + id +"'";
        
        Dao.update(sql, null);
    }
    
    @RequestMapping("/complaintlist/getbyid")
    public List<ComplaintList> ordersComplaint(@RequestParam String id) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        ComplaintListDAO Dao = (ComplaintListDAO) applicationContext.getBean("complaintListDAO");

        String sql = "select * from complaintlist "
                        + "where id = " + "'" + id + "'";
        
        return Dao.query(sql, null);
    }
}
