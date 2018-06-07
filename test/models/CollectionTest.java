package models;

import org.junit.Test;
import static org.junit.Assert.assertEquals;


public class CollectionTest {


    /**
     * Testcollection erzeugen
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
