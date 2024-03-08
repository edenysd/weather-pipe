import { Meteor, SimpleSchema } from "meteor/meteor";
const MAX_TODOS = 1000;

Meteor.publish("todos.inList", function (listId, limit) {
  //Secure publication
  if (!this.userId) {
    return this.ready();
  }

  //Validate data
  new SimpleSchema({
    listId: { type: String },
    limit: { type: Number },
  }).validate({ listId, limit });

  //Setup Pagination
  const options = {
    sort: { createdAt: -1 },
    limit: Math.min(limit, MAX_TODOS),
  };

  // ...
});
