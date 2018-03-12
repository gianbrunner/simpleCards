package services;


import models.Collection;
import java.util.ArrayList;
import java.util.List;

public class DefaultCollectionService implements CollectionService {

    private final ArrayList<Collection> collections = new ArrayList<>();

    /**
     * Return's list of all collections.
     *
     * @param search String to filter list
     * @return list of all collections
     */
    @Override
    public List<Collection> get(String search) {
        if(null != search) {
            ArrayList<Collection> collectionsFiltered = new ArrayList<>();
            for (Collection collection: collections) {
                if(collection.getName().contains(search)) {
                    collectionsFiltered.add(collection);
                }
            }
            return collectionsFiltered;
        }
        return collections;
    }

    /**
     * Returns collection with given identifier.
     *
     * @param id collection identifier
     * @return collection with given identifier or {@code null}
     */
    @Override
    public Collection get(int id) {
        for (Collection collection: collections) {
            if(id == collection.getId()) {
                return collection;
            }
        }
        return null;
    }

    /**
     * Returns changed collection.
     *
     * @param updateCollection collection to update
     * @return updated collection or {@code null}
     */
    @Override
    public Collection change(Collection updateCollection) {
        for (Collection collection: collections) {
            if(collection.getId() == updateCollection.getId()){
                collections.remove(collection);
                collections.add(updateCollection);
                return updateCollection;
            }
        }
        return null;
    }

    /**
     * Removes collection with given identifier.
     *
     * @param id collection identifier
     * @return {@code true} on success  {@code false} on failure
     */
    @Override
    public boolean delete(int id) {
        for (Collection collection: collections) {
            if(id == collection.getId()){
                return collections.remove(collection);
            }
        }
        return false;
    }

    /**
     * Adds the given collection.
     *
     * @param collection to add
     * @return added collection
     */
    @Override
    public Collection add(Collection collection) {
        collections.add(collection);
        return collections.get(collections.size()-1);
    }
}
