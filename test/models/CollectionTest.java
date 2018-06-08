package models;

import org.junit.Test;
import static org.junit.Assert.assertEquals;


public class CollectionTest {


    /**
     * Creates a testcollection, fills it with information and checks if the response is correct
     */
    @Test
    public void testCollection(){
        Collection collection = new Collection();

        collection.setId(1l);
        collection.setName("Name");
        collection.setTopic("Topic");
        collection.setDescription("Description");

        assertEquals(Long.valueOf(1l), collection.getId());
        assertEquals("Name", collection.getName());
        assertEquals("Topic", collection.getTopic());
        assertEquals("Description", collection.getDescription());
    }
}
