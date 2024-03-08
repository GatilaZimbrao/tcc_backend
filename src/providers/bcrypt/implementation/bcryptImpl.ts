import bcrypt from "bcrypt";
import { IBcrypt } from "providers/bcrypt/bcrypt";
import { injectable } from "tsyringe";
import util from "util";

@injectable()
export class Bcrypt implements IBcrypt {
  async compare(password: string, hash: string): Promise<boolean> {
    const compare = util.promisify(bcrypt.compare);
    return compare(password, hash);
  }

  async hash(password: string): Promise<string> {
    return new Promise((res, rej) => {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) return rej(err);
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) return rej(err);
          res(hash);
        });
      });
    });
  }
}
