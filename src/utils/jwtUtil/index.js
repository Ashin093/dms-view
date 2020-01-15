import jwt from 'jsonwebtoken';
import settings from './../../config/settings';
export default {
    decode: function (token) {
        let decoded;
        if (token) {
            decoded = jwt.decode(token, { complete: true });
            return decoded.payload;
        }
    },
    encode: function (param) {
        return jwt.sign(param, settings.api.jwt_secret);
    },
}