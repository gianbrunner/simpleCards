package services;

import models.Card;

import java.util.List;

public interface CardService {

    /**
     * Return's list of all cards.
     * @return list of all cards
     */
    List<Card> get(final String search);

    /**
     * Returns card with given identifier.
     * @param id card identifier
     * @return card with given identifier or {@code null}
     */
    Card get(final int id);

    /**
     * Returns changed card.
     * @param updateCard card to update
     * @return updated card or {@code null}
     */
    Card change(final Card updateCard);

    /**
     * Removes card with given identifier.
     * @param id card identifier
     * @return {@code true} on success  {@code false} on failure
     */
    boolean delete(final int id);

    /**
     * Adds the given card.
     * @param card to add
     * @return added card
     */
    Card add(final Card card);
}