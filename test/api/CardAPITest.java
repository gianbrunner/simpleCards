package api;

import com.fasterxml.jackson.databind.JsonNode;
import models.Card;
import org.junit.Test;
import play.libs.Json;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import static org.junit.Assert.assertEquals;

/**
 * Functional-Test of CardAPI
 */
public class CardAPITest {

    /**
     * Opens a HTTP-connection and sends a GET request to the URL=http://localhost:9000/api/cards/1 .
     * The result is a json-object from the card with id = 1.
     * The json-object is converted to a card-object.
     * The card-object parameters are compared with the expected parameters in assertequals-functions.
     *
     * IMPORTANT: The webapplication has to run, in order to receive a response from the server.
     */
    @Test
    public void testGetCardWithID1(){
        try {
            URL url = new URL("http://localhost:9000/api/cards/1");
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
            Card dut = Json.fromJson(cardJsonNode, Card.class);

            assertEquals(200, responseCode);
            assertEquals((Long)1L, dut.getId());
            assertEquals((Long)1L, dut.getFk_id());
            assertEquals("Englisches Wort für Apfel?", dut.getQuestion());
            assertEquals("Apple", dut.getAnswer());

        } catch (Exception e) {
            e.printStackTrace();

        }
    }
}