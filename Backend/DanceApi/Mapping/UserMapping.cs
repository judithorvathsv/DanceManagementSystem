using DanceApi.Models.Dtos;
using DanceApi.Models.Entities;
using DanceApi.Models.Requests;

namespace DanceApi.Mapping
{

	public static class UserMapping
    {
        public static User UserRequesetToUser(UserRequest request)
        {
            return new User()
            {
                Name = request.Name,
                Email = request.Email,
                Password = request.Password,
            };
        }
        public static UserDto UserToUserDto(User user)
        {
            return new UserDto()
            {
                Name = user.Name,
                Email = user.Email,
                Password = user.Password,
                Role = user.Role.ToString(),
            };
        }
    }
}
