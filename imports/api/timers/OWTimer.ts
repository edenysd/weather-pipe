export const createOWTimer = () => {
  Meteor.setInterval(() => {
    console.log("SIUUU");
  }, 1000 * 60);
};
