package dbAccess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import entity.Orders;
import java.util.List;

@Repository("ordersDAO")
public class OrdersDAO {
 
    @Autowired
    private JdbcTemplate jdbc;
    
    public int update(String sql, Object[] param) {
        return jdbc.update(sql, param);
    }
 
    public List<Orders> query(String sql, Object[] param) {
        RowMapper<Orders> rowMapper=new BeanPropertyRowMapper<>(Orders.class);
        return jdbc.query(sql, rowMapper, param);
    }
}