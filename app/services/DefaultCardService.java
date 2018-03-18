package services;

import models.Card;
import java.util.ArrayList;
import java.util.List;

public class DefaultCardService implements CardService {

    private final ArrayList<Card> cards = new ArrayList<>();

    /**
     * Return's list of all cards.
     *
     * @param search
     * @return list of all cards
     */
    @Override
    public List<Card> get(String search) {
        if(null != search) {
            ArrayList<Card> cardsFiltered = new ArrayList<>();
            for (Card card: cards) {
                if(card.getQuestion().contains(search)) {
                    cardsFiltered.add(card);
                }
            }
            return cardsFiltered;
        }
        return cards;
    }

    /**
     * Returns card with given identifier.
     *
     * @param id card identifier
     * @return card with given identifier or {@code null}
     */
    @Override
    public Card get(int id) {
        for (Card card: cards) {
            if(id == card.getId()) {
                return card;
            }
        }
        return null;
    }

    /**
     * Returns changed card.
     *
     * @param updateCard card to update
     * @return updated card or {@code null}
     */
    @Override
    public Card change(Card updateCard) {
        for (Card card: cards) {
            if(card.getId() == updateCard.getId()){
                cards.remove(card);
                cards.add(updateCard);
                return updateCard;
            }
        }
        return null;
    }

    /**
     * Removes card with given identifier.
     *
     * @param id card identifier
     * @return {@code true} on success  {@code false} on failure
     */
    @Override
    public boolean delete(int id) {
        for (Card card: cards) {
            if(id == card.getId()){
                return cards.remove(card);
            }
        }
        return false;
    }

    /**
     * Adds the given card.
     *
     * @param card to add
     * @return added card
     */
    @Override
    public Card add(Card card) {
        cards.add(card);
        return cards.get(cards.size()-1);
    }
}
