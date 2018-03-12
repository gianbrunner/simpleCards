package controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import play.*;
import play.mvc.*;
//import services.DefaultCardService;

@Api(value = "Card Controller", produces = "application/json")
public class CardController extends Controller{

    @ApiOperation(value = "Get Cards", notes = "Get list of cards filtered by string.")
    public Result getCards(String name){
        return ok("changeCard with Name works!");
    }

    @ApiOperation(value = "Create Card", notes = "Create a new Card.")
    public Result createNewCard(){
        return ok("CreateNewCard works!");
    }

    @ApiOperation(value = "Change Card", notes = "Change a card with given id.")
    public Result changeCard(Long id){
        if(id==5){
            return ok("changeCard with ID works!");
        }
        else{
            return ok("changeCard works!");
        }
    }

    @ApiOperation(value = "Get Card", notes = "Get the card with given id.")
    public Result getCard(Long id){
        if(id==5){
            return ok("getCard with ID works!");
        }
        else{
            return ok("getCard works!");
        }
    }

    @ApiOperation(value = "Delete Card", notes = "Delete card with given id.")
    public Result deleteCard(Long id){
        if(id==5){
            return ok("deleteCard with ID works!");
        }
        else{
            return ok("deleteCard works!");
        }
    }
}
