package services;

import models.Collection;

import java.util.List;

public interface CollectionService {

    /**
     * Return's list of all collections.
     * @return list of all collections
     */
    List<Collection> get(final String search);

    /**
     * Returns collection with given identifier.
     * @param id collection identifier
     * @return collection with given identifier or {@code null}
     */
    Collection get(final int id);

    /**
     * Returns changed collection.
     * @param updateCollection collection to update
     * @return updated collection or {@code null}
     */
    Collection change(final Collection updateCollection);

    /**
     * Removes collection with given identifier.
     * @param id collection identifier
     * @return {@code true} on success  {@code false} on failure
     */
    boolean delete(final int id);

    /**
     * Adds the given collection.
     * @param collection to add
     * @return added collection
     */
    Collection add(final Collection collection);

}