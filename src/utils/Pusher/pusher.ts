import Pusher from "pusher-js";
const PUSHER_KEY = process.env.REACT_APP_PUSHER_KEY;
console.log(PUSHER_KEY);

const pusherClient = new Pusher(
    PUSHER_KEY!, 
    {
        cluster: `ap2`,
    }
);

export default pusherClient;