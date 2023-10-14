import { createApp } from "./app.js"

import { AuthModel } from "./models/pg/auth.js"

createApp({ authModel: AuthModel })