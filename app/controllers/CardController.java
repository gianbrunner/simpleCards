package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import models.Card;
import play.libs.concurrent.HttpExecutionContext;
import play.libs.Json;

import play.mvc.*;
import services.CardService;

import javax.inject.Inject;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

/**
 * This controller contains different actions to interact with the service of the card-model.
 * The implementation is completely asynchronous.
 */
public class CardController extends Controller{

    private final CardService cardService;
    private final HttpExecutionContext ec;

    @Inject
    public CardController(CardService cardService, HttpExecutionContext ec){
        this.cardService = cardService;
        this.ec = ec;
    }

    public CompletionStage<Result> getCards(){
        return cardService.get().thenApplyAsync(cardStream->{
            return ok(Json.toJson(cardStream.collect(Collectors.toList())));
        }, ec.current());
    }

    public CompletionStage<Result> createNewCard(){
        final JsonNode json = request().body().asJson();
        final Card cardToPersist = Json.fromJson(json, Card.class);
        return cardService.add(cardToPersist).thenApplyAsync(card -> {
            return ok(Json.toJson(card));
        }, ec.current());
    }

    public CompletionStage<Result> getCard(long id){
        return cardService.get(id).thenApplyAsync(card -> {
            return ok(Json.toJson(card));
        }, ec.current());
    }

    public CompletionStage<Result> deleteCard(long id){
        return cardService.delete(id).thenApplyAsync(removed ->{
            return removed ? ok() : internalServerError();
        }, ec.current());
    }

    public Result dummy() {
        return ok(Json.toJson(cardService.getDummy()));
    }
}
