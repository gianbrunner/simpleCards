package services;

import com.google.inject.ImplementedBy;
import models.Card;

import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

@ImplementedBy(DefaultCardService.class)
public interface CardService {

    /**
     * Return's list of all cards.
     * @return list of all cards
     */
    CompletionStage<Stream<Card>> get();

    /**
     * Returns card with given identifier.
     * @param id card identifier
     * @return card with given identifier or {@code null}
     */
    CompletionStage<Card> get(final int id);

    /**
     * Removes card with given identifier.
     * @param id card identifier
     * @return {@code true} on success  {@code false} on failure
     */
    CompletionStage<Boolean> delete(final int id);

    /**
     * Adds the given card.
     * @param card to add
     * @return added card
     */
    CompletionStage<Card> add(final Card card);
}