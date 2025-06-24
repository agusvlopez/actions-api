import { createApp } from "./index.js";
import ActionModel from "./models/mongodb/action.js";

createApp({ actionModel: ActionModel })