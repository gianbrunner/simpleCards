package api;

import com.fasterxml.jackson.databind.JsonNode;
import models.Collection;
import org.junit.Test;
import play.libs.Json;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import static org.junit.Assert.assertEquals;

/**
 * Functional-Test of CollectionAPI
 */
public class CollectionAPITest {

    /**
     * Opens a HTTP-connection and sends a GET request to the URL=http://localhost:9000/api/collections/1 .
     * The result is a json-object from the collection with id = 1.
     * The json-object is converted to a collection-object.
     * The collection-object parameters are compared with the expected parameters in assertequals-functions.
     *
     * IMPORTANT: The webapplication has to run, in order to receive a response from the server.
     */
    @Test
    public void testGetCollectionWithID1(){
        try {
            URL url = new URL("http://localhost:9000/api/collections/1");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            // Response code
            int responseCode = con.getResponseCode();
            // The JSON response
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream())
            );
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // Convert stringbuffer to collection-object
            String responseJsonString = response.toString();
            JsonNode cardJsonNode = Json.parse(responseJsonString);
            Collection dut = Json.fromJson(cardJsonNode, Collection.class);

            assertEquals(200, responseCode);
            assertEquals((Long)1L, dut.getId());
            assertEquals("Englisch Wörter", dut.getName());
            assertEquals("Englisch", dut.getTopic());
            assertEquals("Wörter übersetzen", dut.getDescription());

        } catch (Exception e) {
            e.printStackTrace();

        }
    }
}