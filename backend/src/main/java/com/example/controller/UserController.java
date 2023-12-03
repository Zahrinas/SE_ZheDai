package com.example.controller;

import com.mysql.cj.util.StringUtils;
import dbAccess.UserDAO;
import entity.User;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.UUID;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class UserController {
    
    @RequestMapping("/user/query")
    public List<User> userQuery(@RequestParam String id) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        UserDAO Dao = (UserDAO) applicationContext.getBean("userDAO");

        String sql = "select * from user where id = '" + id + "'";
        
        return Dao.query(sql, null);
    }
    
    @RequestMapping("/user/update")
    public List<User> userUpdate(
            @RequestParam String id,
            @RequestParam String nickname,
            @RequestParam String school,
            @RequestParam String vx) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        UserDAO Dao = (UserDAO) applicationContext.getBean("userDAO");

        String sql = "update user set"
                + " nickname = '" + nickname + "',"
                + " school = '" + school + "',"
                + " vx = '" + vx + "' "
                + "where id = '" + id + "'";
        
        Dao.update(sql, null);
        
        sql = "select * from user where id = '" + id + "'";
        
        return Dao.query(sql, null);
    }
    
    @RequestMapping("/user/login")
    public void userLogin(
            @RequestParam String id,
            @RequestParam String avatar
        ) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        UserDAO Dao = (UserDAO) applicationContext.getBean("userDAO");

        String sql = "select * from user where id = '" + id + "'";
        
        List<User> li =  Dao.query(sql, null);
        
        if(li.isEmpty()) sql = "insert into user(id, avatar) values('" + id + "','" + avatar + "')";
        else sql = "update user set avatar = '" + avatar + "' where id = '" + id + "'";
        
        Dao.update(sql, null);
    }
    
    
    @RequestMapping("/user/image")
    public List<User> userImage(@RequestParam String id, @RequestParam("imgFile") MultipartFile[] files) throws FileNotFoundException, IOException {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        UserDAO Dao = (UserDAO) applicationContext.getBean("userDAO");
        
        String path = "D:/SE_ZheDai/updateFiles/";
        if(files!=null && files.length>=1) {
	    String fileName = files[0].getOriginalFilename();
	    if(!StringUtils.isNullOrEmpty(fileName)) {
                path = path + UUID.randomUUID().toString() + getType(fileName);
                File outFile = new File(path);
                OutputStream output = new FileOutputStream(path);
                output.write(files[0].getBytes());
            }
        }
        
        String sql = "update user set"
                + " avatar = '" + path + "' "
                + "where id = '" + id + "'";
        
        Dao.update(sql, null);
        
        sql = "select * from user where id = '" + id + "'";
        
        return Dao.query(sql, null);
    }//May be reedited
    
    private String getType(String fileName){
        if(fileName.endsWith(".jpg") || fileName.endsWith(".jepg")){
        	return ".jpg";
        }else if(fileName.endsWith(".png") || fileName.endsWith(".PNG")){
        	return ".png";
        } else{
            return "application/octet-stream";
        }
    }
}