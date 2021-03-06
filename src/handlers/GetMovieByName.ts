import { APIGatewayEvent } from "aws-lambda";
import "source-map-support/register";
import DemoContainer from "../containers/MoviesContainer";
import SERVICE_IDENTIFIERS from "../containers/ServiceIdentifiers";
import IMovieService from "../interfaces/IMovieService";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
exports.handler = async (event: APIGatewayEvent) => {
    if (!event || !event.pathParameters) {
        return {
            body: "Search criteria invalid or missing",
            statusCode: 400,
        };
    }
    const movieService = DemoContainer.get<IMovieService>(SERVICE_IDENTIFIERS.IMovieService);
    const { s: searchString } = event.pathParameters;

    const movieResponse = await movieService.getMovieByName(searchString);

    if (movieResponse) {
        return {
            body: JSON.stringify(movieResponse),
            statusCode: 200,
        };
    }
    return {
        body: `No movie found for search criteria: ${searchString}`,
        statusCode: 404,
    };
};
