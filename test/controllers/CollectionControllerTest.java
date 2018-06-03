package controllers;

import org.junit.Test;
import play.Application;
import play.inject.guice.GuiceApplicationBuilder;
import play.mvc.Http;
import play.mvc.Result;
import play.test.Helpers;
import play.test.WithApplication;
import services.CollectionService;
import services.DefaultCollectionService;
import services.MockCollectionService;

import static org.junit.Assert.assertEquals;
import static play.mvc.Http.Status.OK;
import static play.test.Helpers.GET;
import static play.test.Helpers.route;

public class CollectionControllerTest extends WithApplication{
    protected Application provideApplication() {
        return new GuiceApplicationBuilder()
                .overrides(bind(DefaultCollectionService.class).to(MockCollectionService.class)) //DefaultCollectionService oder CollectionService?
                .build();
    }
    @Test
    public void testDummy() {
        Http.RequestBuilder request = Helpers.fakeRequest()
                .method(GET)
                .uri("/api/dummy");
        Result result = route(app, request);
        assertEquals(OK, result.status());
    }
}
