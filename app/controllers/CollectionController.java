package controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import play.*;
import play.libs.Json;
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.*;
import services.CardService;
import services.CollectionService;
import services.DefaultCollectionService;

import javax.inject.Inject;

@Api(value = "Collection Controller", produces = "application/json")
public class CollectionController extends Controller{

    private final CollectionService collectionService;
    private final HttpExecutionContext ec;

    @Inject
    public CollectionController(CollectionService collectionService, HttpExecutionContext ec){
        this.collectionService = collectionService;
        this.ec = ec;
    }

    @ApiOperation(value = "Get Collections", notes = "Get list of collections filtered by string.")
    public Result getCollections(){
        return ok("getCollections with Name works!");
    }

    @ApiOperation(value = "Create Collection", notes = "Create a new collection from json-data.")
    public Result createNewCollection(){
        return ok("CreateNewCollection works!");
    }

    @ApiOperation(value = "Change Collection", notes = "Change a collection from json-data.")
    public Result changeCollection(){
        return ok("changeCollection works!");
    }

    @ApiOperation(value = "Get Collection", notes = "Get the collection with given id.")
    public Result getCollection(long id){
        if(id==5){
            return ok("getCollection with ID works!");
        }
        else{
            return ok("getCollection works!");
        }
    }

    @ApiOperation(value = "Delete Collection", notes = "Delete the collection with given id.")
    public Result deleteCollection(long id){
        if(id==5){
            return ok("deleteCollection with ID works!");
        }
        else{
            return ok("deleteIndex works!");
        }
    }

    public Result dummy() {
        return ok(Json.toJson(collectionService.getDummy()));
    }
}
