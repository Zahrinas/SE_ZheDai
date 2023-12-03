package dbAccess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;
import entity.Adm;

@Repository("admDAO")
public class AdmDAO {
 
    @Autowired
    private JdbcTemplate jdbc;
    
    public int update(String sql, Object[] param) {
        return jdbc.update(sql, param);
    }
 
    public List<Adm> query(String sql, Object[] param) {
        RowMapper<Adm> rowMapper=new BeanPropertyRowMapper<>(Adm.class);
        return jdbc.query(sql, rowMapper, param);
    }
}