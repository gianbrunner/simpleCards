package services;

import models.*;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

public class DefaultCardService implements CardService {

    private List<Card> cards;
    private CardRepository cardRepository;

    @Inject
    public DefaultCardService (CardRepository cardRepository){
        cards = new ArrayList<>();
        this.cardRepository = cardRepository;
    }

    public CompletionStage<Stream<Card>> get() { return cardRepository.list();}

    public CompletionStage<Card> get(final int id){ return cardRepository.find(id);}

    public CompletionStage<Boolean> delete(final int id){ return cardRepository.remove(id); }

    public CompletionStage<Card> add(final Card card) {return cardRepository.add(card);}
}
