import jwt from "jsonwebtoken";
import { promisify } from "util";

import authConfig from "../../config/auth";
import message from "../../utils/Messages";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: message.tokenNotProvided });
  }

  const token = authHeader.split(" ")[1];

  try {
    // jwt.verify(token, secret, (err, result) => {})
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: message.invalidToken });
  }
};
