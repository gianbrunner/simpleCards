package api;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Test;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import static org.junit.Assert.assertEquals;


public class CardApiTest {


    @Test
    public void testPOSTCard() {
        try {

            String payload = "{\"question\":\"TestQuestion\",\"answer\":\"TestAnswer\",\"nTries\":\"10\",\"nCorrect\":\"5\",\"category\":{\"id\":\"1\"},\"box\":{\"id\":\"1\"}}";
            StringEntity entity = new StringEntity(payload,
                    ContentType.APPLICATION_FORM_URLENCODED);

            HttpClient httpClient = HttpClientBuilder.create().build();
            HttpPost request = new HttpPost("http://localhost:9000/api/card");
            request.setEntity(entity);
            request.setHeader("Content-type", "application/json");

            HttpResponse response = httpClient.execute(request);
            assertEquals(200, response.getStatusLine().getStatusCode());


        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @Test
    public void testGETAllCards() {
        try {
            URL url = new URL("http://localhost:9000/api/card");
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

            // Test if responseCode equals 200
            assertEquals(200, responseCode);

            // Tests:
            // question equals "Brotaufstrich"
            // answer equals "spread"
            String responseJsonString = response.toString();
            JSONArray jsonarray = new JSONArray(responseJsonString);
            assertEquals("Brotaufstrich", jsonarray.getJSONObject(0).getString("question"));
            assertEquals("spread", jsonarray.getJSONObject(0).getString("answer"));


        } catch (Exception e) {
            e.printStackTrace();

        }


    }

    @Test
    public void testGETBoxWithId() {
        int cardid = 2;
        try {
            URL url = new URL("http://localhost:9000/api/card/" + cardid);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");

            // Response code
            int responseCode = con.getResponseCode();


            //The JSON response
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(con.getInputStream())
            );

            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // Test if responseCode equals 200
            assertEquals(200, responseCode);


            // Tests Box with Id 2
            // question equals "König"
            // answer equals "king"
            String responseJsonString = response.toString();
            JSONObject jsonObj = new JSONObject(responseJsonString);
            assertEquals("König", jsonObj.getString("question"));
            assertEquals("king", jsonObj.getString("answer"));

        } catch (Exception e) {
            e.printStackTrace();

        }

    }


}




