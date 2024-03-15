import { JWKS, JWT } from 'jose';
import KeyStore = JWKS.KeyStore;

export async function verifyToken(token, issuer, audiences, clockTolerance = 5, clientSecret) {
    const { header } = JWT.decode(token, { complete: true });

    let key;
    if (clientSecret && (header as any).alg.startsWith('HS')) {
        key = clientSecret;
    } else {
        key = new KeyStore(...await issuer.keystore());
    }

    return JWT.verify(token, key, {
        issuer: issuer.issuer,
        audience: audiences,
        algorithms: issuer.id_token_signing_alg_values_supported,
        clockTolerance: `${clockTolerance} secs`,
    });
}
