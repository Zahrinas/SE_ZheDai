package entity;

public class MessageList{
    private String id;
    private String sendId;
    private String receiveId;
    private String nickname;
    private String Msg;
    private String time;
    private String self;

    public void setNickname(String nickname){
        this.nickname = nickname;
    }
    
    public String getNickname(){
        return nickname;
    }

    public void setSendId(String sendId){
        this.sendId = sendId;
    }
    
    public String getSendId(){
        return sendId;
    }
    public void setReceiveId(String receiveId){
        this.receiveId = receiveId;
    }
    
    public String getReceiveId(){
        return receiveId;
    }
    
    public void setSelf(String self){
        this.self = self;
    }
    public String getSelf(){
        return self;
    }
    

    public void setMsg(String Msg){
        this.Msg = Msg;
    }
    
    public String getMsg(){
        return Msg;
    }
    
    public void setTime(String time){
        this.time = time;
    }
    
    public String getTime(){
        return time;
    }

    public void setId(String id){
        this.id = id;
    }
    public String getId(){
        return id;
    }
}