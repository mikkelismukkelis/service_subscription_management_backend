# Service subscription management system, Backend

## Backend still UNFINISHED, not even tested with sql server

For new service I need to collect email addresses as "subscription".

Idea is that collection is done in simplest possible way. So there is only one input and button. Input for email and button for submit.

When submitted:

1.  Email is first validated and warning shown if not ok.
2.  After passed validation email is sent to backend for subscription
3.  If email not found from database, it will be added and subscription succes info message shown to user
4.  If email already on database, confirmation about unsubscription is asked from user. If Yes is answered, email will be deleted from DB
