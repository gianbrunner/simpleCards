package services;

import models.Collection;

import javax.inject.Inject;
import java.util.concurrent.CompletionStage;
import java.util.stream.Stream;

public class MockCollectionService implements CollectionService {
    @Inject
    public MockCollectionService(){

    }

    @Override
    public CompletionStage<Stream<Collection>> get() {
        return null;
    }

    @Override
    public CompletionStage<Collection> get(long id) {
        return null;
    }

    @Override
    public CompletionStage<Boolean> delete(long id) {
        return null;
    }

    @Override
    public CompletionStage<Collection> add(Collection collection) {
        return null;
    }

    @Override
    public Collection getDummy() {
        return null;
    }
}
