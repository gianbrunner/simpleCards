package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import models.Collection;
import play.*;
import play.libs.Json;
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.*;
import services.CardService;
import services.CollectionService;
import services.DefaultCollectionService;

import javax.inject.Inject;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

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
    public CompletionStage<Result> getCollections(){
        return collectionService.get().thenApplyAsync(collectionStream -> {
            return ok(Json.toJson(collectionStream.collect(Collectors.toList())));
        }, ec.current());

    }

    @ApiOperation(value = "Create Collection", notes = "Create a new collection from json-data.")
    public CompletionStage<Result> createNewCollection(){
        final JsonNode json = request().body().asJson();
        final Collection collectionToPersist = Json.fromJson(json, Collection.class);
        return collectionService.add(collectionToPersist).thenApplyAsync(collection -> {
            return ok(Json.toJson(collection));
        });
    }

    @ApiOperation(value = "Get Collection", notes = "Get the collection with given id.")
    public CompletionStage<Result> getCollection(long id){
        return collectionService.get(id).thenApplyAsync(collection -> {
            return ok(Json.toJson(collection));
        }, ec.current());
    }

    @ApiOperation(value = "Delete Collection", notes = "Delete the collection with given id.")
    public CompletionStage<Result> deleteCollection(long id){
        return collectionService.delete(id).thenApplyAsync(removed -> {
            return removed ? ok() : internalServerError();
        }, ec.current());
    }

    public Result dummy() {
        return ok(Json.toJson(collectionService.getDummy()));
    }
}
