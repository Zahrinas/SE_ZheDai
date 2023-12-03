/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dbAccess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import entity.ComplaintList;
import java.util.List;

/**
 *
 * @author Lenovo
 */
@Repository("complaintListDAO")
public class ComplaintListDAO {
    @Autowired
    private JdbcTemplate jdbc;
    
    public int update(String sql, Object[] param) {
        return jdbc.update(sql, param);
    }
 
    public List<ComplaintList> query(String sql, Object[] param) {
        RowMapper<ComplaintList> rowMapper=new BeanPropertyRowMapper<>(ComplaintList.class);
        return jdbc.query(sql, rowMapper, param);
    }
}
