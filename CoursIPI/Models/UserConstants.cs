using System.Runtime.InteropServices;

namespace CoursIPI.Models
{
    public class UserConstants
    {
        public static List<UserModel> Users = new List<UserModel>()
        {
            new UserModel() { Username = "jason_admin", EmailAddress = "jason.admin@email.com", Password = "MyPass_w0rd", GivenName = "Jason", Surname = "Bryant", Role = "Administrator" },
            new UserModel() { Username = "test", EmailAddress = "elyse.seller@email.com", Password = "test", GivenName = "Elyse", Surname = "Lambert", Role = "Seller" },
        };
    } 
}