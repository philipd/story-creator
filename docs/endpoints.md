# Page Endpoints
## These will utilize res.render

Welcome page (redirect if logged in):  /

Browse all stories:  /stories  

View Story:   /stories/:storyid

My stories:   /stories/:userid

My contributions: /contributions/:userid

# API Endpoints
## These will return json

## Users
B get /api/users/

R get /api/users/:userid

E post /api/users/:userid

A post /api/users/

D post /api/users/:userid/delete

## Stories
B get /api/stories/

R get /api/stories/:storyid

E post /api/stories/:storyid

A post /api/stories/

D post /api/users/:storyid/delete

## Contributions
B get /api/contributions/

R get /api/contributions/:contributionid

E post /api/contributions/:contributionid

A post /api/contributions/

D post /api/contributions/:contributionid/delete
