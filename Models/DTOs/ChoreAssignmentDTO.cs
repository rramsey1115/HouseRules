
using HouseRules.Models.DTOs;

public class ChoreAssignment
{
    public int Id { get; set; }
    public int UserProfileId { get; set; }
    public UserProfileDTO UserProfile { get; set; }
    public int ChoreId { get; set; }
    public ChoreDTO Chore { get; set; }
}