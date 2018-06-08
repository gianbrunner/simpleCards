package models;
import javax.persistence.*;

/**
 * This class represents a learning card with Fields for id, fk_id (Reference to Collection), Question and Answer
 * The Cards are mapped to the Entity "card" in h2-Database
 * Field "id" is generated automatically by the Database
 */
@Entity(name = "card")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long fk_id;
    private String question;
    private String answer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Long getFk_id() { return fk_id; }

    public void setFk_id(Long fk_id) { this.fk_id = fk_id; }
}
