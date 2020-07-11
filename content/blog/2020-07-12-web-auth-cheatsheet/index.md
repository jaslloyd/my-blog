---
title: "Web Authentication and Authorization Cheat sheet"
date: "2020-07-12"
description: "A cheat sheet / reference sheet for Web Authentication and Authorization. Discussing Sessions, JWTs and more"
---

Welcome back this post is going to a quick reference for Web Authentication and Authorization specifically discussing Sessions, JWTs and more. Lets get started:

- Authentication is the process of verifying who a user is.
- Authorization is the process of verifying what they have access to.

## Terminology

- Session - Users session on the website, usually session id stored server side and cleared after certain amount of time.
- JWT - JSON Web token used for authorization
- id token - ID Tokens are JSON Web Tokens (JWTs) meant for use by the application only. For example, if there's an app that uses Google to log in users and to sync their calendars, Google sends an ID Token to the app that includes information about the user.
- access token - Access Tokens are used to inform an API that the bearer of the token has been authorized to access the API and perform a predetermined set of actions (specified by the scopes granted). Access Tokens must never be used for authentication.
- refresh token - A Refresh Token is a special kind of token used to obtain a renewed Access Token. You can request new Access Tokens until the Refresh Token is blacklisted.

## Sessions + JWT

Sessions are usually stored / validated on the server or if there is more than one server they are stored in something like Memcache or Redis i.e it a Stateful form of Authorization.

Session ID are usually sent from the client in a cookie or header, the server looks up that session id and checks if the user has permission to do what they are requesting.

JWT on the other hand is Stateless, it is sent either in the header in form "Bearer XYZ" or could be in a cookie that is sent along to the server, the server reads that token and validates(valid jwt and not expired) if it is valid it allows the request. JWT is stateless because the server doesn't need to know these id a head of time, it is validated when the request comes in. JWT can be secured / encrypted using keys to give an extra layer of security. This also means you won't need something like Redis to manage the sessions because there are none.

## OAuth

Allows you to connect your application to any identity providers you want to use e.g (Google, Facebook, or some internal user etc...).

### OAuth Grants

OAuth has various different flows/grants for different situations see [here](https://auth0.com/docs/api-auth/which-oauth-flow-to-use) for different use cases from Implicit being least secure to Authorization Code Flow be most secure.

#### Authorization Code Flow

- Recommended if your web app sits on a server or you have a BE server that goes along with your web app
- All communication is done with BE server and not through client browser \*There is a variation where first step is done through browser

The OAuth Authorization code redirection flow is:

1. User goes to /login page or is redirected there, that page either has a bunch of sign in options (e.g Google, Facebook etc).
2. User clicks options to sign in and application will be redirected to that Identity providers Sign in page.
3. Once the user signs in and gives permissions for the application the Identity provider redirects the user back to the application (i.e as specified in redirect_uri), along with that redirect there will be an Authorization code query parameter e.g: http://myawesomeapplication.com/auth_redirect?code=XYZ... This authorization code is a one time use code that our application can exchange for an access/id_token.
4. Our application extracts that code, sends another request with that token + our application client id & secret (usually Base64 encoded) to the identity provider (usually xyz.com/oauth/token)
5. The Identity provider validates the Authorization + Client ID + Client secret, if valid it returns and id token, access and refresh token to the application.
6. Our application can then use the access token to get more use information / get the information it requested access to.

## Storing JWT tokens

Every request need to send along the JWT token to the BE server(s) so it can validate it and return the data the client needs, the next question that comes is where to save this? There are usually 3 main options that are talked about:

- Local Storage
  - Pros
    - Easy to access via localStorage
    - Can be read JS / decoded checked etc completely client side
  - Cons
    - Any JS can access it meaning malicious JS can get your tokens
    - Have to read it from localStorage and attach it to every request
    - Exposes you to an XSS Attack
- Cookies
  - Pros:
    - Easy to access via document.cookie
    - Can be very secure if you use httpOnly and Secure cookies but has cons
    - Automatically send along with every request (if cookie domain matches client domain)
  - Cons:
    - Storing in a non httpOnly cookie exposes you to CSRF attack
    - Cookies can be a little heavier than localstorage so a few extra bytes getting transferred
    - As they become more secure with httpOnly and Secure cookies they become harder to access and work with. JS can no longer read it if it needs something.
    - Can be a problem when you have multiple Backend across multiple domains (microservices) - Approach to solve this would be to put the Microservices behind an API gateway and put API gateway on same domain as client code.
- In memory
  - Pros:
    - Most secure as its only available with your application context
    - Don't need to worry about accessing localStorage or worrying about cookies.
  - Cons:
    - User reloads the page it goes away - Suggested fix for this to store the refresh token in an httpOnly cookie with path /refresh when the user reloads the page you use the refresh token to get a new jwt token and store it in memory, although much more complicated
    - Requires extra code to manage this in memory

Recommendation - Store it in memory if you can (storing refresh_token in httpOnly cookie), if you cannot do that because of architecture limitations and you can still store use cookies then do that, if you cannot use cookies because you don't have an API gateway or you have many backend services use Local storage.

## Conclusion

I hope that helped clarify some terms and you can use this as a reference sheet for Web Auth. There are no examples in this post since there are plenty of them out there, I wish I had this when I started looking to into this!, there are some other methods that I haven't discussed in this video such as SAML and basic auth but I think I covered the main ones you would run into. Check out the resources below!

Until next time,
Jason

## Resources

[Auth0 Docs](https://auth0.com/docs)

[Id Tokens & Access Tokens](https://auth0.com/docs/tokens)

[LogRocket JWT Auth](https://blog.logrocket.com/jwt-authentication-best-practices/)

[Token Storage](https://auth0.com/docs/tokens/concepts/token-storage)

[Simple and Secure API Auth for SPAS](https://medium.com/@sadnub/simple-and-secure-api-authentication-for-spas-e46bcea592ad)

[The Ultimate Guide to handling JWTs on frontend clients](https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/)
