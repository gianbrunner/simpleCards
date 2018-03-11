package controllers;

import play.*;
import play.mvc.*;
//import services.DefaultCardService;

public class CardController extends Controller{


    public Result getCards(String name){
        return ok("changeCard with Name works!");
    }
    public Result createNewCard(){
        return ok("CreateNewCard works!");
    }
    public Result changeCard(Long id){
        if(id==5){
            return ok("changeCard with ID works!");
        }
        else{
            return ok("changeCard works!");
        }
    }
    public Result getCard(Long id){
        if(id==5){
            return ok("getCard with ID works!");
        }
        else{
            return ok("getCard works!");
        }
    }
    public Result deleteCard(Long id){
        if(id==5){
            return ok("deleteCard with ID works!");
        }
        else{
            return ok("deleteCard works!");
        }
    }
}
