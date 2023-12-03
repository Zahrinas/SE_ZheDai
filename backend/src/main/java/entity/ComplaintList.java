/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package entity;

/**
 *
 * @author Lenovo
 */
public class ComplaintList {
    private String id;
    private String plaintiff;
    private String defendant;
    private String posterAvatarUrl;
    private String riderAvatarUrl;
    private String reason;
    private String valid;
    
    public void setId(String id){
        this.id = id;
    }
    
    public String getId (){
        return id;
    }
    public void setPlaintiff(String plaintiff){
        this.plaintiff = plaintiff;
    }
    
    public String getPlaintiff(){
        return plaintiff;
    }
    public void setDefendant(String defendant){
        this.defendant = defendant;
    }
    
    public String getDefendant(){
        return defendant;
    }
    public void setPosterAvatarUrl(String posterAvatarUrl){
        this.posterAvatarUrl = posterAvatarUrl;
    }
    
    public String getPosterAvatarUrl(){
        return posterAvatarUrl;
    }
    public void setRiderAvatarUrl(String riderAvatarUrl){
        this.riderAvatarUrl = riderAvatarUrl;
    }
    
    public String getRiderAvatarUrl(){
        return riderAvatarUrl;
    }
    public void setReason(String reason){
        this.reason = reason;
    }
    
    public String getReason(){
        return reason;
    }
    public void setValid(String valid){
        this.valid = valid;
    }
    
    public String getValid(){
        return valid;
    }
}
