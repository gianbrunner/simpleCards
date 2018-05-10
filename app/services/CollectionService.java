package services;

import com.google.inject.ImplementedBy;
import models.Collection;
import models.Collection;

import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

@ImplementedBy(DefaultCollectionService.class)
public interface CollectionService {

    /**
     * Return's list of all collections.
     * @return list of all collections
     */
    CompletionStage<Stream<Collection>> get();

    /**
     * Returns collection with given identifier.
     * @param id collection identifier
     * @return collection with given identifier or {@code null}
     */
    CompletionStage<Collection> get(final long id);

    /**
     * Removes collection with given identifier.
     * @param id collection identifier
     * @return {@code true} on success  {@code false} on failure
     */
    CompletionStage<Boolean> delete(final long id);

    /**
     * Adds the given collection.
     * @param collection to add
     * @return added collection
     */
    CompletionStage<Collection> add(final Collection collection);

    Collection getDummy();

}