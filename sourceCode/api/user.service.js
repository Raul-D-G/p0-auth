const { UserRepository } = require("../database");

// All Business logic will be here
class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;

    const existingUser = await this.repository.FindUser({ email });

    if (existingUser) {
      const validPassword = await ValidatePassword(
        password,
        existingUser.password,
        existingUser.salt
      );
      if (validPassword) {
        const token = await GenerateSignature({
          email: existingUser.email,
          _id: existingUser._id,
        });
        return FormateData({ id: existingUser._id, token });
      }
    }

    return FormateData(null);
  }

  async SignUp(userInputs) {
    const { email, password, phone } = userInputs;

    // create salt
    let salt = await GenerateSalt();

    let userPassword = await GeneratePassword(password, salt);

    const existingUser = await this.repository.CreateUser({
      email,
      password: userPassword,
      phone,
      salt,
    });

    const token = await GenerateSignature({
      email: email,
      _id: existingUser._id,
    });
    return FormateData({ id: existingUser._id, token });
  }
}

module.exports = UserService;
