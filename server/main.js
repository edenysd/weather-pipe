import { Meteor } from "meteor/meteor";
import { LinksCollection } from "/imports/api/links";
import { startMethodMap } from "/imports/api/methods/map";
import { createOWTimer } from "/imports/api/timers/OWTimer";
import { publishDashboard } from "/imports/api/publications/example";

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  if ((await LinksCollection.find().countAsync()) === 0) {
    await insertLink({
      title: "Do the Tutorial",
      url: "https://www.solidjs.com/tutorial/introduction_basics",
    });

    await insertLink({
      title: "Follow the Guide",
      url: "https://guide.meteor.com",
    });

    await insertLink({
      title: "Read the Docs",
      url: "https://docs.meteor.com",
    });

    await insertLink({
      title: "Discussions",
      url: "https://forums.meteor.com",
    });
  }

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("links", function () {
    return LinksCollection.find();
  });
});

startMethodMap();
createOWTimer();
publishDashboard();
