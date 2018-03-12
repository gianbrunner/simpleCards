package controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import play.*;
import play.mvc.*;
import services.DefaultCollectionService;

@Api(value = "Collection Controller", produces = "application/json")
public class CollectionController extends Controller{

    DefaultCollectionService defCollService = new DefaultCollectionService();

    @ApiOperation(value = "Get Collections", notes = "Get list of collections filtered by string.")
    public Result getCollections(String name){
        return ok("getCollections with Name works!");
    }

    @ApiOperation(value = "Create Collection", notes = "Create a new collection from json.")
    public Result createNewCollection(){
        return ok("CreateNewCollection works!");
    }

    @ApiOperation(value = "Change Collection", notes = "Change the collection with collection from json.")
    public Result changeCollection(){
        return ok("changeCollection works!");
    }

    @ApiOperation(value = "Get Collection", notes = "Get the collection with given id.")
    public Result getCollection(int id){
        if(id==5){
            return ok("getCollection with ID works!");
        }
        else{
            return ok("getCollection works!");
        }
    }

    @ApiOperation(value = "Delete Collection", notes = "Delete the collection with given id.")
    public Result deleteCollection(int id){
        if(id==5){
            return ok("deleteCollection with ID works!");
        }
        else{
            return ok("deleteIndex works!");
        }
    }
}
