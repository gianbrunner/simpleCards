package services;


import models.Collection;
import models.CollectionRepository;
import models.Collection;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

public class DefaultCollectionService implements CollectionService {

    private List<Collection> collections;
    private CollectionRepository collectionRepository;

    @Inject
    public DefaultCollectionService (CollectionRepository collectionRepository){
        collections = new ArrayList<>();
        this.collectionRepository = collectionRepository;
    }

    public CompletionStage<Stream<Collection>> get() { return collectionRepository.list();}

    public CompletionStage<Collection> get(final int id){ return collectionRepository.find(id);}

    public CompletionStage<Boolean> delete(final int id){ return collectionRepository.remove(id); }

    public CompletionStage<Collection> add(final Collection collection) {return collectionRepository.add(collection);}
}
