import { json } from "@remix-run/node";

/**
 * Helper functions to return accurate HTTP status codes.
 */

/**
 * 201 Ok, resource created.
 */
export const created = (data) => json(data, { status: 201 });

/**
 * 400 Bad request.
 */
export const badRequest = (data) => json(data, { status: 400 });

/**
 * 404 Not found.
 */
export const notFound = (data) => json(data, { status: 404 });
