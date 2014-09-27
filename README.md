user-login-register
===================

It's a login and register REST API sample code

##REST API

    GET /posts - return a list of posts and associated metadata
    POST /posts - create a new post
    GET /posts/:id - return an individual post with associated comments
    PUT /posts/:id - update an post by id and return an individual post
    DELETE /posts/:id - delete an psot by id and return deleted message
    PUT /posts/:id/upvote - upvote a post, notice we use the post ID in the URL
    POST /posts/:id/comments - add a new comment to a post by ID
    PUT /posts/:id/comments/:id/upvote - upvote a comment