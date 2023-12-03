package dbAccess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import entity.User;
import java.util.List;

@Repository("userDAO")
public class UserDAO {
 
    @Autowired
    private JdbcTemplate jdbc;
    
    public int update(String sql, Object[] param) {
        return jdbc.update(sql, param);
    }
 
    public List<User> query(String sql, Object[] param) {
        RowMapper<User> rowMapper=new BeanPropertyRowMapper<>(User.class);
        return jdbc.query(sql, rowMapper, param);
    }
}