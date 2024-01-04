using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models;

public class Chore 
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public int Difficulty { get; set; }
    [Required]
    public int ChoreFrequencyDays { get; set; }
    public List<ChoreAssignment>? ChoreAssignments { get; set; }
    public List<ChoreCompletion>? ChoreCompletions { get; set; }
}