package entity;

public class ChatList{
    private String sendId;
    private String receiveId;
    private String avatar;
    private String nickname;
    private String lastMsg;
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

    public void setAvatar(String avatar){
        this.avatar = avatar;
    }
    
    public String getAvatar(){
        return avatar;
    }

    public void setLastMsg(String lastMsg){
        this.lastMsg = lastMsg;
    }
    
    public String getLastMsg(){
        return lastMsg;
    }
    
    public void setTime(String time){
        this.time = time;
    }
    
    public String getTime(){
        return time;
    }

    public void setSelf(String self){
        this.self = self;
    }
    public String getSelf(){
        return self;
    }
}