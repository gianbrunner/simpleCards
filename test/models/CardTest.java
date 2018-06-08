package models;

import org.junit.Test;
import static org.junit.Assert.assertEquals;


public class CardTest {


    /**
     * Creates a testcard, fills it with information and checks if the response is correct
     */
    @Test
    public void testCard(){
        Card card = new Card();

        card.setId(1l);
        card.setQuestion("Question");
        card.setAnswer("Answer");
        card.setFk_id(3l);

        assertEquals(Long.valueOf(1l), card.getId());
        assertEquals("Question", card.getQuestion());
        assertEquals("Answer", card.getAnswer());
        assertEquals(Long.valueOf(3l), card.getFk_id());
    }
}
