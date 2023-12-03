package com.example.controller;

import dbAccess.MessageListDAO;
import entity.MessageList;
import java.util.List;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.text.SimpleDateFormat;
import java.util.Date;
@RestController
public class MessageListController {
    

    public void messageInsert(
            @RequestParam String id,
            @RequestParam String sendId,
            @RequestParam String receiveId,
            @RequestParam String avatar,
            @RequestParam String nickname,    
            @RequestParam String Msg,
            @RequestParam String time,
            @RequestParam String self
    ) {
            ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
            MessageListDAO Dao = (MessageListDAO) applicationContext.getBean("messageListDAO");
            String sql = "insert into messagelist(id, sendId, receiveId, avatar, nickname, Msg, time, self) values "
                            + "('" + id + "'"
                            + ",'" + sendId + "'"
                            + ",'" + receiveId + "'"
                            + ",'" + avatar + "'"
                            + ",'" + nickname + "'"
                            + ",'" + Msg + "'"
                            + ",'" + time + "'"
                            + ",'" + self + "')";

            Dao.update(sql, null);
        }
    
    
    @RequestMapping("/messagelist/insert")
    public void messageinsert(String sid,String rid,String message){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        MessageListDAO Dao = (MessageListDAO) applicationContext.getBean("messageListDAO");
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
        String date = "";
                try {
                    date = df.format(new Date());
                } catch (Exception e) {
                    e.printStackTrace();
                }
        String sql = "insert into messagelist(id, sendId, receiveId, avatar, nickname, Msg, time, self) values "
                            + "(" + Dao.getid() + ""
                            + ",'" + sid + "'"
                            + ",'" + rid + "'"
                            + ",'" + Dao.getavatar(sid) + "'"
                            + ",'" + Dao.getnickname(sid) + "'"
                            + ",'" + message + "'"
                            + ",'" + date + "'"
                            + ",'1')";
        System.out.println("SQL=" + sql);
        Dao.update(sql, null);
    }
    @RequestMapping("/messagelist/search")
    public List<MessageList> messagequery(@RequestParam String sendId,@RequestParam String receiveId,@RequestParam(value = "Msg", required = false) String message) {
        System.out.println("接收到查询消息的请求");
        System.out.println("sendId=" + sendId);
        System.out.println("receiveId=" + receiveId);
        System.out.println("Msg=" + message);
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        MessageListDAO Dao = (MessageListDAO) applicationContext.getBean("messageListDAO");
        if(message!=null){
            messageinsert(sendId,receiveId,message);
        }
        String sql = "update messagelist set"
                + " self = '1' "
                + "where sendId = '" + sendId + "'" + "and receiveId = "+"'"+receiveId + "'" ;
        Dao.update(sql, null);
        sql = "update messagelist set"
                + " self = '0' "
                + "where sendId = '" + receiveId + "'" + "and receiveId = "+"'"+sendId + "'" ;
        Dao.update(sql, null);        
        sql = "select * from messagelist "
                + "where (sendId = " + "'" + sendId + "'"
                + "and receiveId = " + "'" + receiveId + "') or (sendId = "
                + "'" + receiveId + "'"
                + "and receiveId = " + "'" + sendId + "')";
        return Dao.query(sql, null);
    }
    
}