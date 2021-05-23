import store from "../store";
import { CHANGE_REMINDERS, GET_COMPLETED_REMINDERS } from "../types";
localStorage.setItem(
  "mashCompletedReminder",
  JSON.stringify([])
);
localStorage.setItem("mashReminder", JSON.stringify([]));
let completedNumberReminders = JSON.parse(
  localStorage.getItem("mashCompletedReminder")
).length;
console.log(completedNumberReminders);
store.dispatch({
  type: GET_COMPLETED_REMINDERS,
  payload: completedNumberReminders,
});
setInterval(() => {
const completedReminderId = [];
const reminder = JSON.parse(localStorage.getItem("mashReminder"));
for (let i = 0; i < reminder.length; i++) {
  
    let date = new Date(reminder[i].expiryTime) - new Date();
    if (date <= 0 ) {
        // console.log(date);
        if(!completedReminderId.includes(reminder[i].id)){
            completedReminderId.push(reminder[i].id);
            localStorage.setItem(
              "mashCompletedReminder",
              JSON.stringify(completedReminderId)
            );
        }
        
    }
}
if (completedNumberReminders !== completedReminderId.length) {
  //........
  console.log("Send notification");
  store.dispatch({
    type: CHANGE_REMINDERS,
    payload: completedReminderId.length,
  });
  completedNumberReminders = completedReminderId.length;
}

}, 1000);