package controllers;

import play.*;
import play.mvc.*;

public class IndexController extends Controller{


    public Result getIndex(String name){
        return ok("changeIndex with Name works!");
    }
    public Result createNewIndex(){
        return ok("CreateNewIndex works!");
    }
    public Result changeIndex(Long id){
        if(id==5){
            return ok("changeIndex with ID works!");
        }
        else{
            return ok("changeIndex works!");
        }
    }
    public Result getIndexById(Long id){
        if(id==5){
            return ok("getIndex with ID works!");
        }
        else{
            return ok("getIndex works!");
        }
    }
    public Result deleteIndex(Long id){
        if(id==5){
            return ok("deleteIndex with ID works!");
        }
        else{
            return ok("deleteIndex works!");
        }
    }
}
