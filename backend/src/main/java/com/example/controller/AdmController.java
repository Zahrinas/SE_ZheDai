package com.example.controller;

import dbAccess.AdmDAO;
import entity.Adm;
import java.util.List;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdmController {
    
    public class retClass{
        public String identity;
        public retClass(String s){
            identity = s;
        }
    }
    
    @RequestMapping("/adm/query")
    public retClass userQuery(@RequestParam String id) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        AdmDAO Dao = (AdmDAO) applicationContext.getBean("admDAO");

        String sql = "select * from administrator where id = '" + id + "'";
        
        List<Adm> li = Dao.query(sql, null);
        if(!li.isEmpty()) return new retClass("admin");
        else return new retClass("user");
    }
    
}