package com.example;

public class imgdata {

  public String imgname;
  public String alttext;
  public String imgurl;
  public String id;

  public void setId(String i){
    this.id = i;
  }

  public void setAlttext(String t) {
    this.alttext = t;
  }

  public void setImgname(String n) {
    this.imgname = n;
  }

  public void setImgurl(String u) {
    this.imgurl = u;
  }

  public String getId() {
    return this.id;
  }

  public String getAlttext() {
    return this.alttext;
  }
  
  public String getImgname() {
    return this.imgname;
  }

  public String getImgurl() {
    return this.imgurl;
  }

 }