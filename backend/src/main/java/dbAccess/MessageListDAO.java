package dbAccess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import entity.MessageList;
import java.util.List;

@Repository("messageListDAO")
public class MessageListDAO {
 
    @Autowired
    private JdbcTemplate jdbc;
    
    public int update(String sql, Object[] param) {
        return jdbc.update(sql, param);
    }
 
    public List<MessageList> query(String sql, Object[] param) {
        RowMapper<MessageList> rowMapper=new BeanPropertyRowMapper<>(MessageList.class);
        return jdbc.query(sql, rowMapper, param);
    }
    
    public int getid(){
        String sql = "select count(*) from messagelist" ;
        int rowCount = jdbc.queryForObject(sql, Integer.class);
        return rowCount+1;
    }
    public String getavatar(String id){
        String sql = "select distinct avatar from user where id = " + "'" + id + "'" ;
        List<String> l = jdbc.queryForList(sql,String.class);
        return l.get(0);
    }
    public String getnickname(String id){
        String sql = "select distinct nickname from user where id = "+ "'" + id + "'" ;
        List<String> l = jdbc.queryForList(sql,String.class);
        return l.get(0);
    }
}