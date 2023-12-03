package com.example.controller;
import dbAccess.ChatListDAO;
import entity.ChatList;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatListController {

     @RequestMapping("/chatlist/insert")
    public void chatInsert(
            @RequestParam String sendId,
            @RequestParam String receiveId,
            @RequestParam String lastMsg
    ) {
            ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
            ChatListDAO Dao = (ChatListDAO) applicationContext.getBean("chatListDAO");
            
            String sql = "select * from chatlist " + "where sendId = '"+ sendId +"' and receiveId = '"+receiveId + "'";
            List<ChatList> res = Dao.query(sql, null);
            if(res.isEmpty()) {
                SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
                String date = "";
                    try {
                        date = df.format(new Date());
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                sql = "insert into chatlist(sendId, receiveId, avatar, nickname, lastMsg, time, self) values "
                                + "('" + sendId + "'"
                                + ",'" + receiveId + "'"
                                + ",'" + Dao.getavatar(receiveId) + "'"
                                + ",'" + Dao.getnickname(receiveId) + "'"
                                + ",'" + lastMsg + "'"
                                + ",'" + date + "'"
                                + ",'0')";
                System.out.println("ChatlistSQL=" + sql);
                Dao.update(sql, null);
            }
            else {
                SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
                String date = "";
                    try {
                        date = df.format(new Date());
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                 sql = "update chatlist set"
                + " time = '"+ date+ "' ,"
                + " lastMsg = '" +lastMsg +"' ,"
                + " avatar = '" + Dao.getavatar(receiveId) + "' ,"
                + " nickname = '" + Dao.getnickname(receiveId) + "'"  
                + "where sendId = '"+sendId+ "' and receiveId = '"+receiveId+"'";
                    Dao.update(sql, null);
            }
        }
    
    
    public void chatupdate(String id){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        ChatListDAO Dao = (ChatListDAO) applicationContext.getBean("chatListDAO");
        String sql = "update chatlist set"
                + " self = '1' "
                + "where sendId = '" + id + "'";
        Dao.update(sql, null);
        sql = "update chatlist set"
                + " self = '0' "
                + "where receiveId = '" + id + "'";
        Dao.update(sql, null);
                sql = "update chatlist set"
                + " sendId = (SELECT @temp := sendId), sendId = receiveId, receiveId = @temp"
                + " where receiveId = '" + id + "'";
        Dao.update(sql, null);
        List<String> l = Dao.getreceiveId(id);
        for(String ID : l){
            sql = "update chatlist set"
            + " nickname =  '"+ Dao.getnickname(ID)+"' ,"
            +" avatar = '"+Dao.getavatar(ID)+"' "
            + "where sendId = '" + ID + "'";
            Dao.update(sql, null);
        }

    }
    @RequestMapping("/chatlist/search")
    public List<ChatList> chatquery(@RequestParam String sendId) {
        
        
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        ChatListDAO Dao = (ChatListDAO) applicationContext.getBean("chatListDAO");
        chatupdate(sendId);
        String sql = "select * from chatlist "
                        + "where sendId = " + "'" + sendId + "'"
                        + "or receiveId = " + "'" + sendId + "'";
        
        return Dao.query(sql, null);
    }
    
}