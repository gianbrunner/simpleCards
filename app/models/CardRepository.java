package models;

        import play.db.jpa.JPAApi;
        import javax.inject.Inject;
        import javax.persistence.EntityManager;
        import java.util.List;
        import java.util.concurrent.CompletionStage;
        import java.util.function.Function;
        import java.util.stream.Stream;
        import static java.util.concurrent.CompletableFuture.supplyAsync;

public class CardRepository {
    private final JPAApi jpaApi;
    @Inject
    public CardRepository(JPAApi jpaApi) {
        this.jpaApi = jpaApi;
    }
    public CompletionStage<Card> add(Card card) {
        return supplyAsync(() -> wrap(em -> insert(em, card)));
    }
    public CompletionStage<Stream<Card>> list() {
        return supplyAsync(() -> wrap(em -> list(em)));
    }
    private <T> T wrap(Function<EntityManager, T> function) {
        return jpaApi.withTransaction(function);
    }
    private Card insert(EntityManager em, Card card) {
        em.persist(card);
        return card;
    }
    private Stream<Card> list(EntityManager em) {
        List<Card> cards = em.createQuery("select c from card c", Card.class).getResultList();
        return cards.stream();
    }
}