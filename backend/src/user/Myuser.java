package com.company;//package com.company;
//导入包

import java.sql.*;
import java.util.Calendar;
import java.util.Scanner;

/*ß
 * 数据库连接
 */
public class MyUser {

    static Connection con;

    public static void main(String[] args) {
        start("root", "802302");
        System.out.println("图书管理系统已关闭");
    }
    public static void start(String userid, String passwd) {
        //jdbc驱动
        String driver="com.mysql.cj.jdbc.Driver";
        String url="jdbc:mysql://localhost:3306/cloud1?&useSSL=true&serverTimezone=UTC";
        String user=userid;
        String password=passwd;
        try {
            //注册JDBC驱动程序
            Class.forName(driver);
            //建立连接
            con = DriverManager.getConnection(url, user, password);
            if (!con.isClosed()) {
//                System.out.println("数据库连接成功");
                System.out.println("******************************************************");
                System.out.println("\t\t\t\t\t欢迎使用XX平台");
                System.out.println("******************************************************");
            }
            /*****************************************************
             * Code here!
             */
            Scanner readin = new Scanner(System.in);
            String Fop;
            String InID;
            String Pword;
            String Myone ="1";
            while(true){
                System.out.println("1.登录账号 2.注册账号 3.销毁账号 0.退出平台");
                Fop = readin.nextLine();
                switch (Fop) {
                    case "0":
                        con.close();
                        return;
                    case "1":
                        break;
                    case "2":
                        add_user();
                        break;
                    case "3":
                        remove_user();
                        break;
                    default:
                        System.out.println("服务编号输入错误");
                }
                if(Fop.equals(Myone)){
                    System.out.println("输入你的用户ID");
                    InID = readin.nextLine();
                    System.out.println("输入你的密码");
                    Pword = readin.nextLine();
                    String query;
                    Statement stmt;
                    ResultSet rset;
                    stmt = con.createStatement();
                    query = "SELECT * FROM user WHERE UID = '" + InID + "' and Pword = '" + Pword + "'";
                    rset = stmt.executeQuery(query);
                    if(rset.isBeforeFirst()) {
                        System.out.println("登陆成功！");
                        break;
                    }
                    stmt.close();
                    System.out.println("ID/密码错误！");
                }

            };

            // Main body of the io
            while(true) {
                System.out.println("1.修改密码 2.查找用户 0.退出系统");
                System.out.println("请输入需要的服务编号:");
                String choice;

                choice = readin.nextLine();

                switch (choice) {
                    case "0":
                        con.close();
                        return;
                    case "1":
                        ad_pword(InID);
                        break;
                    case "2":
                        select_user();
                        break;
                    default:
                        System.out.println("服务编号输入错误");
                }
            }

        } catch (ClassNotFoundException e) {
            System.out.println("数据库驱动没有安装");
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("数据库连接失败");
        }
    }


    static int myGetTime(Calendar c) {
        int res;
        res = c.get(Calendar.YEAR);
        res *= 100;
        res += c.get(Calendar.MONTH) + 1; // Jan. with MONTH 0
        res *= 100;
        res += c.get(Calendar.DATE);

        return res;
    }
    static void print_sep()
    {
        System.out.println("============================");
    }



    static void  ad_pword (String InID){
        String query;
        Scanner reader=new Scanner(System.in);
        Statement stmt;
        ResultSet rset = null;

        System.out.println("输入用户新密码");
        String TPword = reader.nextLine();
        System.out.println("重复用户新密码");
        String CheckWord = reader.nextLine();

        if(!TPword.equals(CheckWord)){
            System.out.println("两次输入密码不同，请重新尝试");
            return;
        }
        try {
            stmt = con.createStatement();
            query = "UPDATE user SET Pword = '" + TPword +"' WHERE UID = '" + InID + "'";
            rset = stmt.executeQuery(query);
            if(!rset.isBeforeFirst()) {
                System.out.println("请检查新密码格式");
                return;
            }
            System.out.println("修改密码成功");
        } catch(SQLException eee) {
            System.out.println("操作失败");
        }

    }

    static void  remove_user()  {
        String query;
        Scanner reader=new Scanner(System.in);

        Statement stmt;
        ResultSet rset = null;

        String UID_rm;
        String Pw_rm;
        System.out.println("请输入要注销的用户ID：");
        UID_rm = reader.nextLine();
        System.out.println("请输入要注销的用户密码：");
        Pw_rm = reader.nextLine();

        try {
            stmt = con.createStatement();
            query = "SELECT * FROM user WHERE UID = '" + UID_rm + "' and Pword = '" + Pw_rm + "'";
            rset = stmt.executeQuery(query);
            if(!rset.isBeforeFirst()) {
                System.out.println("没有ID为："+ UID_rm +"且密码为"+Pw_rm +"的账号");
                return;
            }
        } catch(SQLException eee) {
            ;
        }

        query = "DELETE FROM user WHERE UID = '" + UID_rm + "'";

        try{
            stmt = con.createStatement();
            stmt.executeUpdate(query);
        } catch(SQLException e) {
            e.printStackTrace();
            System.out.println("该账号存在问题");
        }
        System.out.println("ID为："+ UID_rm +"的账号已经注销");
    }

    static void select_user(){
        String query;//查询语句
        String choice="0";//存放用户选项

        Scanner reader=new Scanner(System.in);

        Statement stmt = null;
        ResultSet rset = null;

        String Sid;

        System.out.println("输入查询用户ID");
        Sid = reader.nextLine();
        try {
            stmt = con.createStatement();
            query = "SELECT * FROM user WHERE UID = '" + Sid + "'";
            rset = stmt.executeQuery(query);
            System.out.println("ID: (其他信息待补充");
            String Tid = rset.getString("UID");
            System.out.println(Tid);
            if(!rset.isBeforeFirst()) {
                System.out.println("请检查ID格式");
                return;
            }
        } catch(SQLException eee) {
            System.out.println("该账号存在问题");
        }

    }




    static void add_user()  {
        String query;//查询语句
        String choice="0";//存放用户选项

        Scanner reader=new Scanner(System.in);

        Statement stmt = null;
        ResultSet rset = null;

        String Tid;
        String TPword;
        String CheckWord;
        System.out.println("输入用户ID");
        Tid = reader.nextLine();
        System.out.println("输入用户密码");
        TPword = reader.nextLine();
        System.out.println("重复用户密码");
        CheckWord = reader.nextLine();

        if(!TPword.equals(CheckWord)){
          System.out.println("两次输入密码不同，请重新尝试");
          return;
        }

        final int PrimaryKey_duplicate = 1062;



        // bno, category, title, year, author, price, total, stock
        query = "INSERT INTO user VALUES('"+Tid+"', "+TPword+")";

//        System.out.println(query);

        try{
            stmt = con.createStatement();
            stmt.executeUpdate(query);
        } catch(SQLException e) {
            if(e.getErrorCode() == PrimaryKey_duplicate) {
                System.out.println("ID为：" + Tid +"的账号已被注册，换一个ID试试吧");
                return;
            } else {
                System.out.println("注册失败，请检查字符格式");
                return;
            }
//            e.printStackTrace();
//            System.out.print(e.getErrorCode());
        }
        System.out.println("ID为：" + Tid +"的账号已注册成功");
        return;

    }



}
