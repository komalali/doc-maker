import * as awsx from "@pulumi/awsx";

const handler = async () => ({
    statusCode: 200,
    body: Buffer.from(
        JSON.stringify({
            status: "ok",
            source: "AWS",
        }),
        "utf8",
    ).toString("base64"),
    isBase64Encoded: true,
    headers: { "content-type": "application/json" },
});

// Create a public HTTP endpoint
const endpoint = new awsx.apigateway.API("doc-maker", {
    routes: [
        {
            path: "/",
            method: "GET" as const,
            eventHandler: handler,
        },
    ],
});

// Export the name of the bucket
export const url = endpoint.url;
