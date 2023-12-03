package entity;

public class User {
    private String id;
    private String nickname;
    private String school;
    private String vx;
    private String avatar;
    private String indentity;
    
    public void setID(String id){
        this.id = id;
    }
    
    public String getID(){
        return id;
    }
    
    public void setNickname(String nickname){
        this.nickname = nickname;
    }
    
    public String getNickname(){
        return nickname;
    }
    
    public void setSchool(String school){
        this.school = school;
    }
    
    public String getSchool(){
        return school;
    }
    
    public void setVx(String vx){
        this.vx = vx;
    }
    
    public String getVx(){
        return vx;
    }
    
    public void setAvatar(String avatar){
        this.avatar = avatar;
    }
    
    public String getAvatar(){
        return avatar;
    }
    public void setIdentity(String indentity){
        this.indentity = indentity;
    }
    
    public String getIndentity(){
        return indentity;
    }
    
}