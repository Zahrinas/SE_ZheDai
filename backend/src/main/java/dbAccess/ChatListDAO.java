package dbAccess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import entity.ChatList;
import java.util.List;

@Repository("chatListDAO")
public class ChatListDAO {
 
    @Autowired
    private JdbcTemplate jdbc;
    
    public int update(String sql, Object[] param) {
        return jdbc.update(sql, param);
    }
 
    public List<ChatList> query(String sql, Object[] param) {
        RowMapper<ChatList> rowMapper=new BeanPropertyRowMapper<>(ChatList.class);
        return jdbc.query(sql, rowMapper, param);
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
    public List<String> getreceiveId(String id){
        String sql = "select distinct receiveId from chatlist where sendId = "+ "'" + id + "'" ;
        List<String> l = jdbc.queryForList(sql,String.class);
        return l;
    }
//    public String getsendId(String id){
//        String sql = "select distinct receiveId from chatlist where sendId = " + "'" + id + "'" ;
//        List<String> l = jdbc.queryForList(sql,String.class);
//        return l.get(0);
//    }
    
}