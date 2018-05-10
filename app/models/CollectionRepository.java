package models;

import play.db.jpa.JPAApi;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.function.Function;
import java.util.stream.Stream;
import static java.util.concurrent.CompletableFuture.supplyAsync;

public class CollectionRepository {
    private final JPAApi jpaApi;
    @Inject
    public CollectionRepository(JPAApi jpaApi) {
        this.jpaApi = jpaApi;
    }
    public CompletionStage<Collection> add(Collection collection) {
        return supplyAsync(() -> wrap(em -> insert(em, collection)));
    }
    public CompletionStage<Stream<Collection>> list() {
        return supplyAsync(() -> wrap(em -> list(em)));
    }
    public CompletionStage<Collection> find(long id) {
        return supplyAsync(() -> wrap(em -> find(em, id)));
    }
    public CompletionStage<Boolean> remove(long id) {
        return supplyAsync(() -> wrap(em -> remove(em, id)));
    }
    private <T> T wrap(Function<EntityManager, T> function) {
        return jpaApi.withTransaction(function);
    }


    private Collection insert(EntityManager em, Collection collection) {
        em.persist(collection);
        return collection;
    }
    private Stream<Collection> list(EntityManager em) {
        List<Collection> collections = em.createQuery("select c from collection c", Collection.class).getResultList();
        return collections.stream();
    }
    private Collection find(EntityManager em, long id) {
        return em.find(Collection.class, id);
    }
    private Boolean remove(EntityManager em, long id) {
        Collection collection = em.find(Collection.class, id);
        if(null != collection) {
            em.remove(collection);
            return true;

        }
        return false;
    }
}