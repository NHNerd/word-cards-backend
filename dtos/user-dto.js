//? DTO - Data Transfer  Object ( without sensetive information )

class UserDto {
  email;
  id;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.id = model._id; // mongo added _ for mark this field is const
    this.isActivated = model.isActivated;
  }
}

export default UserDto;
