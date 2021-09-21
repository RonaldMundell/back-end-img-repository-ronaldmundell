/*
 * Copyright 2002-2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.example;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import ch.qos.logback.core.joran.conditional.IfAction;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Map;

@Controller
@SpringBootApplication
public class Main {

  @Value("${spring.datasource.url}")
  private String dbUrl;

  @Autowired
  private DataSource dataSource;

  public static void main(String[] args) throws Exception {
    SpringApplication.run(Main.class, args);
  }

  @GetMapping("/")
  String index(Map<String, Object> model) {

    try (Connection connection = dataSource.getConnection()) {
      Statement stmt = connection.createStatement();
      stmt.executeUpdate("CREATE TABLE IF NOT EXISTS images (id serial, alttext varchar(50), imgname varchar(50), imgurl varchar(200))");
      String sql = "SELECT * FROM images";
      ResultSet rs = stmt.executeQuery(sql);
      imgdata[] imgs = new imgdata[50];
      int i = 1;
      while(rs.next()){
        imgdata img = new imgdata();
        img.setId(rs.getString("id"));
        img.setAlttext(rs.getString("alttext"));
        img.setImgname(rs.getString("imgname"));
        img.setImgurl(rs.getString("imgurl"));
        imgs[i-1] = img;
      }
      model.put("imgs", imgs);
      return "index";
    } catch (Exception e) {
      model.put("message", e.getMessage());
      return "error";
    }
  }

  @GetMapping("/ImageSubmit")
  String imagesubmit(Map<String, Object> model) {
    return "ImageSubmit";
  }

  @PostMapping(path = "/ImageSubmited", consumes = { MediaType.APPLICATION_FORM_URLENCODED_VALUE })
  String imagesubmited(Map<String, Object> model, imgdata Img) {
    try (Connection connection = dataSource.getConnection()) {
      Statement stmt = connection.createStatement();
      String sql = "INSERT INTO images (alttext, imgname, imgurl) VALUES ("+Img.getAlttext()+", "+Img.getImgname()+", "+Img.getImgurl()+")";
      stmt.executeUpdate(sql);
      sql = "SELECT * FROM images";
      ResultSet rs = stmt.executeQuery(sql);
      imgdata[] imgs = new imgdata[50];
      int i = 1;
      while(rs.next()){
        imgdata img = new imgdata();
        img.setId(rs.getString("id"));
        img.setAlttext(rs.getString("alttext"));
        img.setImgname(rs.getString("imgname"));
        img.setImgurl(rs.getString("imgurl"));
        imgs[i-1] = img;
      }
      model.put("imgs", imgs);
    return "index";
  }
}

  @GetMapping("/delete/{id}")
  String ImageDelete(Map<String, Object> model, @PathVariable String id) {
  try (Connection connection = dataSource.getConnection()) {
    Statement stmt = connection.createStatement();
    String sql = "DELETE FROM images WHERE id="+id;
    stmt.executeUpdate(sql);
    sql = "SELECT * FROM images";
    ResultSet rs = stmt.executeQuery(sql);
    imgdata[] imgs = new imgdata[50];
    int i = 1;
    while(rs.next()){
      imgdata img = new imgdata();
      img.setId(rs.getString("id"));
      img.setAlttext(rs.getString("alttext"));
      img.setImgname(rs.getString("imgname"));
      img.setImgurl(rs.getString("imgurl"));
      imgs[i-1] = img;
    }
    model.put("imgs", imgs);
    return "index";
  } catch (Exception e) {
    model.put("message", e.getMessage());
    return "error";
  }
  }
  @Bean
  public DataSource dataSource() throws SQLException {
    if (dbUrl == null || dbUrl.isEmpty()) {
      return new HikariDataSource();
    } else {
      HikariConfig config = new HikariConfig();
      config.setJdbcUrl(dbUrl);
      return new HikariDataSource(config);
    }
  }
}