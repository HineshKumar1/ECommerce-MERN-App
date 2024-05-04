const { Queue } = require("bullmq");


const notificationQueue = new Queue("email-queue");

async function init() {
  const result = await notificationQueue.add("email to hinesh", {
    email: "hineshkumar46@gmail.com",
    subject: "Welcome msg",
    body: "Hey Hinesh Kumar",
  });
  console.log("Job added to queue",result.id);

}

init();