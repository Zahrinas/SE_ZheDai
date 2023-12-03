package entity;

public class Orders {
    private String id;
    private String posterId;
    private String posterHeadImg;
    private String riderId;
    private String school;
    private String type;
    private String time;
    private String reward;
    private String remark;
    private String nickname;
    
    public void setID(String id){
        this.id = id;
    }
    
    public String getID(){
        return id;
    }
    
    public void setPosterId(String posterId){
        this.posterId = posterId;
    }
    
    public String getPosterId(){
        return posterId;
    }
    
    public void setPosterHeadImg(String posterHeadImg){
        this.posterHeadImg = posterHeadImg;
    }
    
    public String getPosterHeadImg(){
        return posterHeadImg;
    }
    
    public void setRiderId(String riderId){
        this.riderId = riderId;
    }
    
    public String getRiderId(){
        return riderId;
    }
    
    public void setSchool(String school){
        this.school = school;
    }
    
    public String getSchool(){
        return school;
    }
    
    public void setType(String type){
        this.type = type;
    }
    
    public String getType(){
        return type;
    }
    
    public void setTime(String time){
        this.time = time;
    }
    
    public String getTime(){
        return time;
    }
    
    public void setReward(String reward){
        this.reward = reward;
    }
    
    public String getReward(){
        return reward;
    }
    
    public void setRemark(String remark){
        this.remark = remark;
    }
    
    public String getRemark(){
        return remark;
    }
    public void setNickname(String nickname){
        this.nickname = nickname;
    }
    
    public String getNickname(){
        return nickname;
    }
}
