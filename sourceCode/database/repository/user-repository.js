const { UserModel } = require("../models");

//Dealing with data base operations
class UserRepository {
  async CreateUser({ rol, mail, parola, nume, adresa, cui }) {
    try {
      // Verificăm dacă există deja un utilizator cu aceeași adresă de email
      const existingUser = await this.GetUserByEmail(mail);
      if (existingUser) {
        throw new Error("Adresa de email este deja înregistrată.");
      }

      const user = new UserModel({
        rol,
        mail,
        parola,
        nume,
        adresa,
        cui,
      });

      // Salvăm utilizatorul în baza de date
      const savedUser = await user.save();

      // Returnăm ID-ul utilizatorului salvat
      return savedUser._id;
    } catch (error) {
      throw error;
    }
  }

  async GetUserByEmail(mail) {
    return await UserModel.findOne({ mail: mail });
  }

  async GetUserById(id) {
    return await UserModel.findById(id);
  }

  async GetUsers() {
    return await UserModel.find({}, { parola: 0, __v: 0 });
  }

  async deleteUser(id) {
    try {
      const result = await UserModel.deleteOne({ _id: id });
      return result.deletedCount;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(data) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(data.id, data, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
